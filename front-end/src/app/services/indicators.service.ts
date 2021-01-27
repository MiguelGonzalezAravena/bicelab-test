import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalVar } from '../../config';
import { Indicators } from '../entities/indicators';

@Injectable({
  providedIn: 'root',
})
export class IndicatorsService {
  private url_getLast: string = '';
  private url_getValues: string = '';
  private url_getValuesByDate: string = '';
  private url_getKeys: string = '';

  constructor(private http: HttpClient) {
    this.url_getLast = GlobalVar.URL_BACK + 'getLast';
    this.url_getValues = GlobalVar.URL_BACK + 'getValues';
    this.url_getValuesByDate = GlobalVar.URL_BACK + 'getValuesByDate';
    this.url_getKeys = GlobalVar.URL_BACK + 'getKeys';
  }

  processResponse(data: Indicators) {
    if (data.status == 'ERROR') {
      throwError(data.error);
    } else if (data.status == 'OK') {
      return data.data;
    }

    return data;
  }

  getLast(): Observable<any> {
    return this.http.post<Indicators>(this.url_getLast, null).pipe(
      map((data) => this.processResponse(data)),
      catchError((err: HttpErrorResponse) => err.error.message)
    );
  }

  getValues(key: string): Observable<any> {
    const param = { key: key };
    return this.http
      .post<Indicators>(this.url_getValues, { arg: JSON.stringify(param) })
      .pipe(
        map((data) => this.processResponse(data)),
        catchError((err: HttpErrorResponse) => err.error.message)
      );
  }

  getValuesByDate(key: string, date: string): Observable<any> {
    const params = { key: key, date: date };
    return this.http
      .post<Indicators>(this.url_getValuesByDate, {
        arg: JSON.stringify(params),
      })
      .pipe(
        map((data) => this.processResponse(data)),
        catchError((err: HttpErrorResponse) => err.error.message)
      );
  }

  getKeys(): Observable<any> {
    return this.http.post<Indicators>(this.url_getKeys, null).pipe(
      map((data) => this.processResponse(data)),
      catchError((err: HttpErrorResponse) => err.error.message)
    );
  }
}
