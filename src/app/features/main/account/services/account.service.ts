import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AccountModificationRequest } from '../models/account-modification-request.model';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { Observable } from 'rxjs';
import { Account } from '../../../../core/models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly BASE_URL = environment.apiUrl;
  private readonly ACCOUNT_SESSION_ENDPOINT = '/v1/accounts';

  constructor(private http: HttpClient) {}

  updateAccountDetails(
    accountId: string,
    request: AccountModificationRequest
  ): Observable<ApiResponse<Account>> {
    return this.http.put<ApiResponse<Account>>(
      `${this.BASE_URL + this.ACCOUNT_SESSION_ENDPOINT}/${accountId}`,
      request
    );
  }
}
