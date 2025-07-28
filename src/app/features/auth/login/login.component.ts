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
import { AuthService } from '../services/auth.service';
import { AccountLoginRequest } from '../../../core/models/account-login-request.model';
import {
  ApiResponse,
  Error,
  ErrorDetails,
} from '../../../core/models/api-response.model';
import { Account } from '../../../core/models/account.model';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AccountStorageService } from '../../../core/services/account-storage.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private accountStorageService: AccountStorageService
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

    this.authService
      .login(this.loginForm.value as AccountLoginRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<Account>) => {
          this.accountStorageService.setAccount(response.data);
          //this.router.navigate(['/dashboard']);
        },
        error: (error: ApiResponse<ErrorDetails>) => {
          error.data.errors?.forEach((e: Error) => {
            const control = this.loginForm.get(e.field);
            if (control) {
              control.setErrors({ invalid: e.message });
              control.markAsTouched();
            }
          });

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
