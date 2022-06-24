import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core'
import {Asset} from '../models/asset';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class AssetService{
    apiURL = 'https://localhost:7289';
    /**
     *
     */
    constructor(private http: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    getAllAssets(): Observable<Asset[]>{
        return this.http
        .get<Asset[]>(this.apiURL + '/Asset')
        .pipe(retry(1), catchError(this.handleError));
    }

    getAllAssetsAssignedToEmployee(id: number): Observable<Asset[]> {
        return this.http
          .get<Asset[]>(this.apiURL + '/Asset/EmployeeAssets/' + id)
          .pipe(retry(1), catchError(this.handleError));
      }

      updateAsset(asset: Asset): Observable<Asset> {
        return this.http
          .put<Asset>(
            this.apiURL + '/Asset',
            JSON.stringify(asset),
            this.httpOptions
          )
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

