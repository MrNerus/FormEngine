import { ChangeDetectionStrategy, Component, forwardRef, signal, OnInit, input } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiFileUploadComponent),
      multi: true,
    },
  ],
})
export class MultiFileUploadComponent implements ControlValueAccessor, OnInit {
  businessName = input.required<string>();
  panNo = input.required<string>();
  fileSets = signal<IFileSet[]>([]);
  touched = signal(false);
  disabled = signal(false);

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(
    private mockBackend: MockBackendService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mockBackend.getPredefinedSets().subscribe(fileSets => {
      this.fileSets.set(fileSets);
      this.onChange(fileSets);
    });
  }

  writeValue(value: IFileSet[]): void {
    if (value) {
      this.fileSets.set(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  openUploadModal(set: IFileSet): void {
    const dialogRef = this.dialog.open(FileUploadModalComponent, {
      width: '40rem',
      data: { set, clientData: { businessName: this.businessName(), panNo: this.panNo() } },
    });

    dialogRef.afterClosed().subscribe((result: IFile[] | undefined) => {
      if (result) {
        this.fileSets.update(sets => {
          const updatedSets = sets.map(s => (s.documentId === set.documentId ? { ...s, files: result } : s));
          this.onChange(updatedSets);
          return updatedSets;
        });
      }
    });
  }

  removeFile(sn: number, documentId: number): void {
    this.fileSets.update(sets => {
      const updatedSets = sets.map(s =>
        s.documentId === documentId
          ? { ...s, files: s.files?.filter(f => f.sn !== sn) ?? null }
          : s
      );
      this.onChange(updatedSets);
      return updatedSets;
    });
  }
}