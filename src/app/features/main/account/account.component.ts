import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { AccountStorageService } from '../../../core/services/account-storage.service';

@Component({
  selector: 'app-account',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  accountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountStorageService: AccountStorageService
  ) {
    const account = this.accountStorageService.getAccount();
    this.accountForm = this.fb.nonNullable.group({
      firstname: [account?.firstname, Validators.required],
      lastname: [account?.lastname, Validators.required],
      username: [account?.username, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const { password, confirmPassword } = form.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.accountForm.valid) {
      console.log(this.accountForm.value);
    }
  }
}
