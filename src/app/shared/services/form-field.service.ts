import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorDetails, Error } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class FormFieldService {
  showErrorMessage(form: FormGroup, errorDetails: ErrorDetails): void {
    errorDetails.errors?.forEach((e: Error) => {
      const control = form.get(e.field);
      if (control) {
        control.setErrors({ invalid: e.message });
        control.markAsTouched();
      }
    });
  }
}
