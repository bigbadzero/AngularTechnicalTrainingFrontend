import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core'
import {AssetType} from '../models/assetType';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class AssetTypeService{
    apiURL = 'https://localhost:7289';
    /**
     *
     */
    constructor(private http: HttpClient) {}
  
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    getAllAssetTypes(): Observable<AssetType[]> {
        return this.http
          .get<AssetType[]>(this.apiURL + '/AssetType')
          .pipe(retry(1), catchError(this.handleError));
      }

      handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
          return errorMessage;
        });
      }
}