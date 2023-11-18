import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { projectConstants } from '../../../utils/project-constants';
import { customCardDateValidator } from '../../validators/card-date.validator';
import { customURLValidator } from '../../validators/url.validator';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  adminForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', Validators.maxLength(255)],
    coverImageLink: ['', [Validators.required, customURLValidator]],
    videoLink: ['', [Validators.required, customURLValidator]],
    creationDate: ['', [Validators.required, customCardDateValidator]],
    tags: this.fb.array([this.fb.control('', Validators.required)]),
  });

  public isCardCreated = false;

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

  get tags(): FormArray {
    return this.adminForm.get('tags') as FormArray;
  }

  addTag(): void {
    const tags = this.adminForm.get('tags') as FormArray;
    if (tags.length < 5) {
      tags.push(this.fb.control('', Validators.required));
    }
  }

  onCreateCardButtonClick(): void {
    this.isCardCreated = true;
  }

  onResetFormButtonClick(): void {
    this.adminForm.reset();
    this.tags.clear();
    this.tags.push(this.fb.control('', Validators.required));
  }

  getErrorMessageForTitle(): string {
    if (this.title?.hasError('required')) {
      return projectConstants.ADMIN_FORM_TITLE_MESSAGE_REQUIRED;
    }
    if (this.title?.hasError('minlength')) {
      return projectConstants.ADMIN_FORM_TITLE_MESSAGE_MIN_LENGTH;
    }
    if (this.title?.hasError('maxlength')) {
      return projectConstants.ADMIN_FORM_TITLE_MESSAGE_MAX_LENGTH;
    }
    return '';
  }

  getErrorMessageForCreationDate(): string {
    if (this.creationDate?.hasError('required')) {
      return projectConstants.ADMIN_FORM_CREATION_DATE_MESSAGE_REQUIRED;
    }
    if (this.creationDate?.hasError('futureDate')) {
      return projectConstants.ADMIN_FORM_CREATION_DATE_MESSAGE_FUTURE_DATE;
    }
    return '';
  }
}
