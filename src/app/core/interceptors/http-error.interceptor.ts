import {
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // ✅ Full error object
      console.error('Full error:', error);

      if (!error.error.data) {
        error.error.data = {};
      }

      error.error.data.message =
        error?.error?.data?.message ??
        'Unknown error. Please contact administrator.';

      return throwError(() => error.error);
    })
  );
};
