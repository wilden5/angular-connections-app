import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
// eslint-disable-next-line max-len
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { createGroup, deleteGroup } from '../../group/state/group.actions';
// eslint-disable-next-line max-len
import { CreateGroupModalComponent } from '../components/create-group-modal/create-group-modal.component';
import { deleteConversation } from '../../redux/actions/conversation.actions';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public isExceptionSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) {}

  openConfirmationDialog(id: string, isGroup: boolean): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isExceptionSubject.next(true);
        if (isGroup) {
          this.store.dispatch(deleteGroup({ id }));
        } else {
          this.store.dispatch(deleteConversation({ id }));
        }
      }
    });
  }

  openCreateGroupDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupModalComponent);
    // todo: modal window should be closed only if http-request succeeded
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isExceptionSubject.next(true);
        this.store.dispatch(createGroup({ name: result }));
      }
    });
  }
}
