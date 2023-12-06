import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
// eslint-disable-next-line max-len
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { deleteGroup } from '../../redux/actions/group.actions';

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
}
