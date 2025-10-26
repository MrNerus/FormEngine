import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockBackendService } from './mock-backend';
import { switchMap, map, take } from 'rxjs/operators';
import { of, interval } from 'rxjs';

interface PresignedUrlResponse {
  url: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private http = inject(HttpClient);
  private mockBackend = inject(MockBackendService);

  uploadImage(file: File, key: string) {
    return this.mockBackend.getPresignedUrl(key).pipe(
      switchMap((response: PresignedUrlResponse) => {
        console.log(`Uploading to ${response.url}`);
        // Simulate upload progress
        const uploadTime = Math.random() * 1500 + 500; // Simulate 0.5-2 seconds upload time
        const updates = 100;
        return interval(uploadTime / updates).pipe(
          take(updates),
          map(i => i + 1) // progress from 1 to 100
        );
      })
    );
  }
}
