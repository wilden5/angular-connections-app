import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss'],
})
export class CreateGroupModalComponent {
  createGroupForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9 ]+$')],
    ],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateGroupModalComponent>
  ) {}

  get name(): AbstractControl {
    return this.createGroupForm.get('name')!;
  }

  onCreateButtonClick(): void {
    if (this.createGroupForm.valid) {
      this.dialogRef.close(this.name.value);
    }
  }
}
