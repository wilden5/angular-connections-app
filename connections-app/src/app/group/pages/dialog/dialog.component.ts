import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { ProjectPages } from '../../../../environment/environment';
import { loadGroupDialog, sendNewMessage } from '../../../redux/actions/dialog.actions';
import { selectDialogById } from '../../../redux/selectors/dialog.selectors';
import { IGroupMessageTransformed } from '../../../core/models/group.model';
import { selectUserById } from '../../../redux/selectors/people.selectors';
import { selectGroupById } from '../../../redux/selectors/group.selectors';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-group',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  protected readonly selectUserById = selectUserById;

  protected readonly selectGroupById = selectGroupById;

  protected readonly ProjectPages = ProjectPages;

  protected groupID: string;

  protected authorUid: string;

  protected chatForm = this.fb.group({
    message: ['', Validators.required],
  });

  protected groupResponse$:
    | Observable<{
        messages: IGroupMessageTransformed[];
        since: number;
      }>
    | undefined;

  constructor(
    private fb: FormBuilder,
    protected store: Store,
    private activatedRoute: ActivatedRoute,
    protected dialogService: DialogService
  ) {
    this.authorUid = JSON.parse(localStorage.getItem('userObject')!).uid;
    this.groupID = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
    this.synchronizeGroupMessages();
  }

  synchronizeGroupMessages(): void {
    const group$ = this.store.select(selectDialogById({ groupID: this.groupID }));
    group$
      .pipe(
        take(1),
        tap((item) => {
          if (item) {
            this.store.dispatch(loadGroupDialog({ groupID: this.groupID, since: item.since }));
          } else {
            this.store.dispatch(loadGroupDialog({ groupID: this.groupID, since: 0 }));
          }
        })
      )
      .subscribe();
    this.groupResponse$ = group$;
  }

  get message(): AbstractControl {
    return this.chatForm.get('message')!;
  }

  isAuthorMessage(message: IGroupMessageTransformed): string {
    return this.authorUid === message.authorID ? 'author-message' : '';
  }

  onUpdateButtonClick(): void {
    this.synchronizeGroupMessages();
    this.dialogService.isExceptionSubject.next(true);
    // todo: Implement timer3
  }

  onSendNewMessageButtonClick(abc: string): void {
    this.store.dispatch(sendNewMessage({ newMessage: { groupID: this.groupID, message: abc } }));
    this.chatForm.reset();
    // 2. synchronizeGroupMessages
  }
}
