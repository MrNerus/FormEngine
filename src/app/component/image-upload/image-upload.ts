import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadService } from '../../services/image-upload.service';
import { IFormInput } from '../text-box/text-box';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './image-upload.html',
  styleUrls: ['./image-upload.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  @Input({ required: true }) field!: IFormInput;
  @Input({ required: true }) form!: FormGroup;

  previewUrl = signal<string | null>(null);
  uploadProgress = signal<number>(0);
  uploadError = signal<string | null>(null);
  uploading = signal<boolean>(false);

  constructor(private imageUploadService: ImageUploadService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.form.get(this.field.name)?.setValue(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl.set(reader.result as string);
      };
      reader.readAsDataURL(file);

      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    this.uploading.set(true);
    this.uploadProgress.set(0);
    this.uploadError.set(null);

    this.imageUploadService.uploadImage(file, file.name).subscribe({
      next: (progress) => {
        this.uploadProgress.set(progress);
      },
      error: (error) => {
        this.uploadError.set(error.message);
        this.uploading.set(false);
      },
      complete: () => {
        this.uploading.set(false);
      },
    });
  }
}