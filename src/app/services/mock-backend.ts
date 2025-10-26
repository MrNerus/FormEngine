import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {
  getPredefinedSets() {
    const sets = ['Set A', 'Set B', 'Set C', 'Set D', 'Set E', 'Set F'];
    return of(sets).pipe(delay(500));
  }

  getPresignedUrl(key: string) {
    // Simulate a 50% chance of failure
    if (Math.random() < 0.5) {
      return throwError(() => new Error(`Failed to get presigned URL for ${key}`)).pipe(delay(500));
    }

    const presignedUrl = `https://mock-storage.com/upload/${key}`;
    return of({ url: presignedUrl, key }).pipe(delay(500));
  }
}
