import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  adminForm = this.fb.group({
    title: ['', Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    description: ['', Validators.maxLength(255)],
    coverImageLink: ['', Validators.required],
    videoLink: ['', Validators.required],
    creationDate: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  get title(): AbstractControl | null {
    return this.adminForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.adminForm.get('description');
  }

  get coverImageLink(): AbstractControl | null {
    return this.adminForm.get('coverImageLink');
  }

  get videoLink(): AbstractControl | null {
    return this.adminForm.get('videoLink');
  }

  get creationDate(): AbstractControl | null {
    return this.adminForm.get('creationDate');
  }

  onCreateCardButtonClick(): void {}
}
