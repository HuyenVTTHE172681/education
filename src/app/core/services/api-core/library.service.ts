import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../../../common/constants';
import { IResponseList } from '../../models/common.model';
import { Library } from '../../models/library.model';

@Injectable({
    providedIn: 'root',
})
export class LibraryService {
    apiBaseUrl: string = '';

    constructor(private http: HttpClient) {
        this.apiBaseUrl = API_URL.URL_API_CORE;
    }

    getLibrariesFolder(
        callFromAdmin: number,
        folderId: string,
        type: string
    ): Observable<IResponseList<Library>> {

        const query = `/Library/GetLibrariesFolder`;

        const apiURL = `${this.apiBaseUrl}${query}`;

        const payload = {
            callFromAdmin: callFromAdmin,
            folderId: folderId,
            type: type
        };

        return this.http
            .post<IResponseList<Library>>(apiURL, payload )
              .pipe(catchError(this.handleError));
    }

    getLibrariesFile(
        callFromAdmin: number,
        folderId: string,
        offSet: number,
        pageSize: number,
        type: string
    ): Observable<IResponseList<Library>> {

        const query = `/Library/GetLibrariesFile`;

        const apiURL = `${this.apiBaseUrl}${query}`;

        const payload = {
            callFromAdmin: callFromAdmin,
            folderId: folderId,
            offSet: offSet,
            pageSize: pageSize,
            type: type
        };

        return this.http
            .post<IResponseList<Library>>(apiURL, payload)
            .pipe(catchError(this.handleError));
    }

    // Hàm xử lý lỗi
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${JSON.stringify(error.error)}`
            );
        }
        return throwError(
            () => new Error('Something went wrong; please try again later.')
        );
    }
}
