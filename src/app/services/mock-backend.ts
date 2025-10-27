import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { IClientDocuments, IFileSet } from '../models/DTOs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {

    constructor(private http: HttpClient) {}

  getPredefinedSets() {
    const sets: IFileSet[] = [
      {
        "documentName": "Set A",
        "documentId": 1,
        "isRequiredForClientClosed": true,
        "allowMultiple": true,
        "files": null
      },
      {
        "documentName": "Set B",
        "documentId": 2,
        "isRequiredForClientClosed": true,
        "allowMultiple": true,
        "files": null
      },
      {
        "documentName": "Set C",
        "documentId": 3,
        "isRequiredForClientClosed": true,
        "allowMultiple": true,
        "files": null
      },
      {
        "documentName": "Set D",
        "documentId": 4,
        "isRequiredForClientClosed": true,
        "allowMultiple": true,
        "files": null
      },
    ];
    return of(sets).pipe(delay(500));
  }

  getPresignedUrlsForClientDocuments(clientDocuments: IClientDocuments) {
    const url = 'http://localhost:5038/api/clientProfile/getUploadURLs';
    return this.http.post<{ result: IClientDocuments }>(url, clientDocuments).pipe(
      map(response => response.result),
      catchError(err => throwError(() => err))
    );
  }

}
