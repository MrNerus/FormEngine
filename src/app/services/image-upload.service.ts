import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockBackendService } from './mock-backend';
import { Observable, interval } from 'rxjs';
import { IClientDocuments, IFileSet } from '../models/DTOs';

interface PresignedUrlResponse {
  url: string;
  key: string;
}

import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private http = inject(HttpClient);
  private mockBackend = inject(MockBackendService);

  getPresignedUrls(clientDocuments: IClientDocuments): Observable<IClientDocuments> {
    return this.mockBackend.getPresignedUrlsForClientDocuments(clientDocuments);
  }

  uploadFileToS3(file: File, presignedUrl: string): Observable<number> {
    console.log(`Uploading ${file.name} to ${presignedUrl}`);
    // Simulate upload progress
    const uploadTime = Math.random() * 1500 + 500; // Simulate 0.5-2 seconds upload time
    const updates = 100;
    return interval(uploadTime / updates).pipe(
      take(updates),
      map((i: number) => i + 1) // progress from 1 to 100
    );
  }
}
