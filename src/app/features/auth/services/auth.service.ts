import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountLoginRequest } from '../../../core/models/account-login-request.model';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Account } from '../../../core/models/account.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = environment.apiUrl;
  private readonly ACCOUNT_SESSION_ENDPOINT = '/v1/accounts/sessions';

  constructor(private http: HttpClient) {}

  login(request: AccountLoginRequest): Observable<ApiResponse<Account>> {
    return this.http.post<ApiResponse<Account>>(
      `${this.BASE_URL + this.ACCOUNT_SESSION_ENDPOINT}`,
      request
    );
  }
}
