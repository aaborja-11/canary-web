import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { AccountLoginRequest } from '../../../core/models/account-login-request.model';
import { error } from 'console';
import {
  ApiResponse,
  Error,
  ErrorDetails,
} from '../../../core/models/api-response.model';
import { Account } from '../../../core/models/account.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }
  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.errorMessage) {
        this.errorMessage = '';
      }
    });
  }

  submit() {
    this.errorMessage = '';

    this.authService
      .login(this.loginForm.value as AccountLoginRequest)
      .subscribe({
        next: (response: ApiResponse<Account>) => {
          console.log(response);
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
}
