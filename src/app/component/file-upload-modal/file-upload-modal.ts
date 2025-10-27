import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin, of } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { IFile, IFileSet, ILocalFileUpload, IFileUpload, IClientDocuments } from '../../models/DTOs';
import { ImageUploadService } from '../../services/image-upload.service';

export interface LocalFileUpload extends IFileUpload {
  status: 'new' | 'uploading' | 'success' | 'error';
}

@Component({
  selector: 'app-file-upload-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    DragDropModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './file-upload-modal.html',
  styleUrls: ['./file-upload-modal.css'],
})
export class FileUploadModalComponent {
  files = signal<ILocalFileUpload[]>([]);

  constructor(
    public dialogRef: MatDialogRef<FileUploadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { set: IFileSet, clientData: { businessName: string, panNo: string } },
    private imageUploadService: ImageUploadService
  ) {
    const existingFiles = data.set.files?.map(f => ({ ...f, status: 'success' as const, file: new File([], f.fileName), progress: 100, error: null, previewUrl: f.link })) ?? [];
    this.files.set(existingFiles);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files).map((file, index) => {
        const newFile: ILocalFileUpload = {
          file,
          previewUrl: null,
          progress: 0,
          error: null,
          link: null,
          sn: this.files().length + index + 1,
          fileName: file.name,
          status: 'new',
        };
        if (file.type.startsWith('image')) {
          const reader = new FileReader();
          reader.onload = () => {
            newFile.previewUrl = reader.result as string;
            this.files.update(fs => [...fs]); // Trigger change detection
          };
          reader.readAsDataURL(file);
        }
        return newFile;
      });
      this.files.update(fs => [...fs, ...newFiles]);
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    const files = this.files();
    moveItemInArray(files, event.previousIndex, event.currentIndex);
    files.forEach((file, index) => file.sn = index + 1);
    this.files.set([...files]);
  }

  removeFile(sn: number): void {
    this.files.update(files => files.filter(f => f.sn !== sn));
  }

  onApply(): void {
    const filesToUpload = this.files().filter(f => f.status === 'new');
    const clientDocuments: IClientDocuments = {
      businessName: this.data.clientData.businessName,
      panNo: this.data.clientData.panNo,
      document: {
        ...this.data.set,
        files: this.files().map(f => ({ fileName: f.fileName, sn: f.sn, link: f.link }))
      }
    };

    this.imageUploadService.getPresignedUrls(clientDocuments).pipe(
      switchMap((clientDocumentsWithUrls: IClientDocuments) => {
        const fileSetWithUrls = clientDocumentsWithUrls.document;
        const uploadObservables = filesToUpload.map(localFile => {
          const correspondingFile = fileSetWithUrls?.files?.find((f: IFile) => f.sn === localFile.sn);
          if (correspondingFile && correspondingFile.link) {
            localFile.status = 'uploading';
            localFile.link = correspondingFile.link;
            return this.imageUploadService.uploadFileToS3(localFile.file, correspondingFile.link).pipe(
              tap((progress: number) => {
                localFile.progress = progress;
              }),
              finalize(() => {
                localFile.status = 'success';
              })
            );
          } else {
            localFile.status = 'error';
            return of(null);
          }
        });
        return forkJoin(uploadObservables);
      })
    ).subscribe({
      next: () => {
        // All uploads are complete
        const finalFiles = this.files().map(f => ({ fileName: f.fileName, sn: f.sn, link: f.link }));
        this.dialogRef.close(finalFiles);
      },
      error: (err: any) => {
        console.error('An error occurred during the upload process', err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}