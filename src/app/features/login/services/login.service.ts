import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AccountLoginRequest } from '../models/account-login-request.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Account } from '../../../shared/models/account.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
