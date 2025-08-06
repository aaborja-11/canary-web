import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AccountLoginRequest } from './models/account-login-request.model';
import {
  ApiResponse,
  ErrorDetails,
  Error,
} from '../../shared/models/api-response.model';
import { Account } from '../../shared/models/account.model';
import { LoginService } from './services/login.service';
import { AccountStorageService } from '../../shared/services/account-storage.service';
import { FormFieldService } from '../../shared/services/form-field.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private accountStorageService: AccountStorageService,
    private formFieldService: FormFieldService
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.errorMessage) {
        this.errorMessage = '';
      }
    });
  }

  submit() {
    this.errorMessage = '';

    this.loginService
      .login(this.loginForm.value as AccountLoginRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<Account>) => {
          this.accountStorageService.setAccount(response.data);
          this.router.navigate(['/']);
        },
        error: (error: ApiResponse<ErrorDetails>) => {
          this.formFieldService.showErrorMessage(this.loginForm, error.data);

          if (!error.data.errors) {
            this.errorMessage = error.data.message;
            this.cd.markForCheck();
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
