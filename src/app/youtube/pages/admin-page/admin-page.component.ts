import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { projectConstants } from '../../../utils/project-constants';
import { customCardDateValidator } from '../../validators/card-date.validator';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  adminForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', Validators.maxLength(255)],
    coverImageLink: ['', [Validators.required, Validators.pattern(/(http(s?):)([/.\w\s-])*\.(?:jpg|png)/g)]],
    videoLink: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/g)]],
    creationDate: ['', [Validators.required, customCardDateValidator]],
    tags: this.fb.array([this.fb.control('', Validators.required)]),
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

  getErrorMessageForTitle(): string {
    if (this.title?.hasError('required')) {
      return 'Please enter a title';
    }
    if (this.title?.hasError('minlength')) {
      return 'The title is too short';
    }
    if (this.title?.hasError('maxlength')) {
      return 'The title is too long';
    }
    return '';
  }

  getErrorMessageForCreationDate(): string {
    if (this.creationDate?.hasError('required')) {
      return 'Please enter a creation date';
    }
    if (this.creationDate?.hasError('futureDate')) {
      return 'The date is invalid';
    }
    return '';
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
}
