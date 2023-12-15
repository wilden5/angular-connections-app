import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ProjectPages } from '../../../../environment/environment';
import { ModalService } from '../../../core/services/modal.service';
import { selectPeopleList, selectUserById } from '../../../redux/selectors/people.selectors';
import { IDiscussionMessageTransformed } from '../../model/discussion.model';
import { loadDiscussion, sendDiscussionMessage } from '../../state/discussion/discussion.actions';
import { selectSpecificConversationById } from '../../state/discussion/discussion.selectors';
import { loadPeopleList } from '../../../redux/actions/people.actions';

@Component({
  selector: 'app-conversation',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscussionComponent implements OnInit {
  protected readonly selectUserById = selectUserById;

  protected readonly selectSpecificConversationById = selectSpecificConversationById;

  protected readonly ProjectPages = ProjectPages;

  protected conversationID: string;

  protected authorUid: string;

  protected conversationResponse$:
    | Observable<{
        messages: IDiscussionMessageTransformed[];
        since: number;
      }>
    | undefined;

  protected chatForm = this.fb.group({
    message: ['', Validators.required],
  });

  constructor(
    protected store: Store,
    protected modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.authorUid = JSON.parse(localStorage.getItem('userObject')!).uid;
    this.conversationID = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
    this.synchronizeConversationMessages();

    this.store
      .select(selectPeopleList)
      .pipe(take(1))
      .subscribe((list) => {
        if (list.length === 0) {
          this.store.dispatch(loadPeopleList());
        }
      });
  }

  get message(): AbstractControl {
    return this.chatForm.get('message')!;
  }

  synchronizeConversationMessages(): void {
    const conversation$ = this.store.select(
      selectSpecificConversationById({ conversationID: this.conversationID })
    );
    conversation$
      .pipe(
        take(1),
        tap((item) => {
          if (item) {
            this.store.dispatch(
              loadDiscussion({ conversationID: this.conversationID, since: item.since })
            );
          } else {
            this.store.dispatch(loadDiscussion({ conversationID: this.conversationID, since: 0 }));
          }
        })
      )
      .subscribe();
    this.conversationResponse$ = conversation$;
  }

  onUpdateButtonClick(): void {
    this.synchronizeConversationMessages();
  }

  onDeleteConversationButtonClick(): void {
    this.modalService.openConfirmationDialog(this.conversationID, false);
  }

  onSendNewMessageButtonClick(message: string): void {
    this.store.dispatch(
      sendDiscussionMessage({
        conversationMessage: { conversationID: this.conversationID, message },
      })
    );
    this.chatForm.reset();

    setTimeout(() => {
      this.synchronizeConversationMessages();
    }, 1500);
  }

  isAuthorMessage(message: IDiscussionMessageTransformed): string {
    return this.authorUid === message.authorID ? 'author-message' : '';
  }
}
