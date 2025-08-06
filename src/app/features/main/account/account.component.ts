import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccountStorageService } from '../../../shared/services/account-storage.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccountModificationRequest } from './models/account-modification-request.model';
import { AccountService } from './services/account.service';
import { Subject, takeUntil } from 'rxjs';
import {
  ApiResponse,
  ErrorDetails,
} from '../../../shared/models/api-response.model';
import { Account } from '../../../shared/models/account.model';
import { FormFieldService } from '../../../shared/services/form-field.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  readonly panelOpenState = signal(false);
  private destroy = new Subject<void>();
  private snackbar = inject(MatSnackBar);
  accountForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private accountStorageService: AccountStorageService,
    private accountService: AccountService,
    private formFieldService: FormFieldService,
    private cd: ChangeDetectorRef
  ) {
    const account = this.accountStorageService.getAccount();
    this.accountForm = this.fb.group({
      firstname: [account?.firstname, Validators.required],
      lastname: [account?.lastname, Validators.required],
      username: [account?.username, Validators.required],
      password: ['', Validators.required],
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const { password, confirmPassword } = form.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  updateAccountDetails() {
    if (this.accountForm.valid) {
      this.errorMessage = '';
      const accountId = this.accountStorageService.getAccountId();

      this.accountService
        .updateAccountDetails(
          accountId,
          this.accountForm.value as AccountModificationRequest
        )
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: (response: ApiResponse<Account>) => {
            this.accountStorageService.setAccount(response.data);
            this.snackbar.open('Account successfully updated', 'OK', {
              duration: 3000,
            });
          },
          error: (error: ApiResponse<ErrorDetails>) => {
            this.formFieldService.showErrorMessage(
              this.accountForm,
              error.data
            );

            if (!error.data.errors) {
              this.errorMessage = error.data.message;
              this.cd.markForCheck();
            }
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
