import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
// eslint-disable-next-line max-len
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { createGroup, deleteGroup } from '../../redux/actions/group.actions';
// eslint-disable-next-line max-len
import { CreateGroupModalComponent } from '../components/create-group-modal/create-group-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public isExceptionSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) {}

  openConfirmationDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isExceptionSubject.next(true);
        this.store.dispatch(deleteGroup({ id }));
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
