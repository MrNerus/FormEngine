/*
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ImageUploadService } from '../../services/image-upload.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './image-upload.html',
  styleUrls: ['./image-upload.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  imageFile = input.required<File>();

  uploadProgress = signal<number | null>(null);
  uploadError = signal<string | null>(null);
  uploadedUrl = signal<string | null>(null);

  private imageUploadService = inject(ImageUploadService);

  ngOnInit(): void {
    this.uploadFile(this.imageFile());
  }

  uploadFile(file: File): void {
    this.uploadProgress.set(0);
    this.uploadError.set(null);
    this.uploadedUrl.set(null);

    this.imageUploadService.uploadImage(file, file.name).subscribe({
      next: (progress) => {
        this.uploadProgress.set(progress);
      },
      error: (error) => {
        this.uploadError.set('Upload failed. Please try again.');
        console.error(error);
      },
      complete: () => {
        this.uploadProgress.set(100);
        // This is a mock URL. In a real app, the backend would return the URL.
        this.uploadedUrl.set(`https://example.com/uploads/${file.name}`);
      },
    });
  }
}
*/