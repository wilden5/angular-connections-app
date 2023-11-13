import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { projectConstants } from '../../../utils/project-constants';
import { customCardDateValidator } from '../../validators/card-date.validator';
import { AppState } from '../../../redux/app.state';
import { addCustomItem } from '../../../redux/actions/custom-item.actions';
import { ISearchItem } from '../../models/search-item.model';

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

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

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
    const customItem: ISearchItem = this.createCustomItem();
    this.store.dispatch(addCustomItem({ customItem }));
    this.router.navigate(['/search']);
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

  createCustomItem(): ISearchItem {
    return {
      etag: 'custom-item-etag',
      id: {
        kind: 'custom-kind',
        videoId: `cv${String(Math.floor(Math.random() * 9000))}`,
      },
      kind: 'youtube#video',
      snippet: {
        title: this.adminForm.value.title as string,
        publishedAt: this.adminForm.value.creationDate as string,
        description: this.adminForm.value.description as string,
        thumbnails: {
          medium: {
            url: this.adminForm.value.coverImageLink as string,
            height: 123,
            width: 223,
          },
        },
      },
      statistics: {
        viewCount: String(Math.floor(Math.random() * 100000)),
        commentCount: String(Math.floor(Math.random() * 100)),
        dislikeCount: '',
        favoriteCount: String(Math.floor(Math.random() * 50)),
        likeCount: String(Math.floor(Math.random() * 1000)),
      },
    };
  }
}
