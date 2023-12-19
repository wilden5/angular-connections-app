import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
// eslint-disable-next-line max-len
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { createGroup, deleteGroup } from '../../group/state/group.actions';
// eslint-disable-next-line max-len
import { CreateGroupModalComponent } from '../components/create-group-modal/create-group-modal.component';
import { deleteDiscussion } from '../../conversation/state/discussion/discussion.actions';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private dialog: MatDialog,
    private store: Store
  ) {}

  openConfirmationDialog(id: string, isGroup: boolean): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (isGroup) {
          this.store.dispatch(deleteGroup({ id }));
        } else {
          this.store.dispatch(deleteDiscussion({ id }));
        }
      }
    });
  }

  openCreateGroupDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(createGroup({ name: result }));
      }
    });
  }
}
