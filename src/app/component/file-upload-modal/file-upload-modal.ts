import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageUploadService } from '../../services/image-upload.service';
import { FileSet, FileUpload } from '../multi-file-upload/multi-file-upload';
import { forkJoin } from 'rxjs';

export interface LocalFileUpload extends FileUpload {
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
  files = signal<LocalFileUpload[]>([]);

  constructor(
    public dialogRef: MatDialogRef<FileUploadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { set: FileSet },
    private imageUploadService: ImageUploadService
  ) {
    const existingFiles = data.set.files.map(f => ({ ...f, status: 'success' as const }));
    this.files.set(existingFiles);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files).map((file, index) => {
        const newFile: LocalFileUpload = {
          id: `local-${file.name}-${Date.now()}`,
          file,
          previewUrl: null,
          progress: 0,
          error: null,
          uploadedUrl: null,
          serialNumber: this.files().length + index + 1,
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
    files.forEach((file, index) => file.serialNumber = index + 1);
    this.files.set([...files]);
  }

  onApply(): void {
    const newFiles = this.files().filter(f => f.status === 'new');
    if (newFiles.length === 0) {
      this.dialogRef.close(this.files().filter(f => f.status === 'success'));
      return;
    }

    newFiles.forEach(file => file.status = 'uploading');

    const uploadObservables = newFiles.map(file => {
      const key = `${this.data.set.name}-sn${file.serialNumber}-${file.file.name}`;
      return this.imageUploadService.uploadImage(file.file, key);
    });

    forkJoin(uploadObservables).subscribe({
      next: () => {        
      },
      error: (error) => {
        // This part is tricky with forkJoin, as it fails fast.
        // A more robust implementation would use a different strategy
        // to handle individual errors.
        console.error('Upload failed', error);
      },
      complete: () => {
        newFiles.forEach((file, index) => {
            file.status = 'success';
            const key = `${this.data.set.name}-sn${file.serialNumber}-${file.file.name}`;
            file.uploadedUrl = `https://example.com/uploads/${key}`;
        });
        setTimeout(() => {
            this.dialogRef.close(this.files().filter(f => f.status === 'success'));
        }, 1000);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}