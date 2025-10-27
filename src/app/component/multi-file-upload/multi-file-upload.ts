import { ChangeDetectionStrategy, Component, forwardRef, signal, OnInit, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MockBackendService } from '../../services/mock-backend';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileUploadModalComponent } from '../file-upload-modal/file-upload-modal';
import { IFile, IFileSet, IClientDocuments } from '../../models/DTOs';


@Component({
  selector: 'app-multi-file-upload',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './multi-file-upload.html',
  styleUrls: ['./multi-file-upload.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiFileUploadComponent implements OnInit {
  parentForm = input.required<FormGroup>();
  fileSets = signal<IFileSet[]>([]);

  constructor(
    private mockBackend: MockBackendService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mockBackend.getPredefinedSets().subscribe(fileSets => {
      this.fileSets.set(fileSets);
    });
  }

  openUploadModal(set: IFileSet): void {
    const dialogRef = this.dialog.open(FileUploadModalComponent, {
      width: '40rem',
      data: { set, clientData: this.parentForm().value },
    });

    dialogRef.afterClosed().subscribe((result: IFile[] | undefined) => {
      if (result) {
        this.fileSets.update(sets =>
          sets.map(s => (s.documentId === set.documentId ? { ...s, files: result } : s))
        );
      }
    });
  }

  removeFile(sn: number, documentId: number): void {
    this.fileSets.update(sets =>
      sets.map(s =>
        s.documentId === documentId
          ? { ...s, files: s.files?.filter(f => f.sn !== sn) ?? null }
          : s
      )
    );
  }
}