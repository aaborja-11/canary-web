import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountStorageService {
  private readonly key = 'app_user';

  setAccount(account: Account): void {
    localStorage.setItem(this.key, JSON.stringify(account));
  }

  getAccount(): Account | null {
    const accountData = localStorage.getItem(this.key);
    return accountData ? JSON.parse(accountData) : null;
  }

  clearAccount(): void {
    localStorage.removeItem(this.key);
  }

  isAuthenticated(): boolean {
    return this.getAccount() !== null;
  }
}
