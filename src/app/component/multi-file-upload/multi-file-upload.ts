import { ChangeDetectionStrategy, Component, forwardRef, signal, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MockBackendService } from '../../services/mock-backend';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileUploadModalComponent } from '../file-upload-modal/file-upload-modal';

export interface FileUpload {
  id: string;
  file: File;
  previewUrl: string | null;
  progress: number;
  error: string | null;
  uploadedUrl: string | null;
  serialNumber: number;
}

export interface FileSet {
  id: string;
  name: string;
  files: FileUpload[];
}

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
  fileSets = signal<FileSet[]>([]);
  touched = signal(false);
  disabled = signal(false);

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(
    private mockBackend: MockBackendService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mockBackend.getPredefinedSets().subscribe(setNames => {
      const sets = setNames.map(name => ({
        id: name.replace(/\s+/g, '-').toLowerCase(),
        name,
        files: [],
      }));
      this.fileSets.set(sets);
    });
  }

  writeValue(value: any): void {
    // Can be implemented to load initial file sets
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

  openUploadModal(set: FileSet): void {
    const dialogRef = this.dialog.open(FileUploadModalComponent, {
      width: '600px',
      data: { set },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fileSets.update(sets =>
          sets.map(s => (s.id === set.id ? { ...s, files: result } : s))
        );
        this.updateFormValue();
      }
    });
  }

  removeFile(fileId: string, setId: string): void {
    this.fileSets.update(sets =>
      sets.map(s =>
        s.id === setId
          ? { ...s, files: s.files.filter(f => f.id !== fileId) }
          : s
      )
    );
    this.updateFormValue();
  }

  updateFormValue(): void {
    const value = this.fileSets().map(set => ({
      id: set.id,
      name: set.name,
      files: set.files
        .filter(f => f.uploadedUrl)
        .map(f => ({ id: f.id, url: f.uploadedUrl!, serialNumber: f.serialNumber })),
    }));
    this.onChange(value);
    this.onTouched();
  }
}