import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ProjectPages } from '../../../../environment/environment';
import { ModalService } from '../../../core/services/modal.service';
import { ConversationService } from '../../../core/services/conversation.service';
import { IConversationMessageTransformed } from '../../../core/models/conversation.model';
import { selectUserById } from '../../../redux/selectors/people.selectors';
import {
  loadSpecificConversation,
  sendConversationMessage,
} from '../../../redux/actions/conversation.actions';
// eslint-disable-next-line max-len
import { selectSpecificConversationById } from '../../../redux/selectors/specificConversation.selectors';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationComponent implements OnInit {
  protected readonly selectUserById = selectUserById;

  protected readonly selectSpecificConversationById = selectSpecificConversationById;

  protected readonly ProjectPages = ProjectPages;

  protected conversationID: string;

  protected authorUid: string;

  protected conversationResponse$:
    | Observable<{
        messages: IConversationMessageTransformed[];
        since: number;
      }>
    | undefined;

  protected chatForm = this.fb.group({
    message: ['', Validators.required],
  });

  constructor(
    protected store: Store,
    protected modalService: ModalService,
    protected conversationService: ConversationService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.authorUid = JSON.parse(localStorage.getItem('userObject')!).uid;
    this.conversationID = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
    this.synchronizeConversationMessages();
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
              loadSpecificConversation({ conversationID: this.conversationID, since: item.since })
            );
          } else {
            this.store.dispatch(
              loadSpecificConversation({ conversationID: this.conversationID, since: 0 })
            );
          }
        })
      )
      .subscribe();
    this.conversationResponse$ = conversation$;
  }

  onUpdateButtonClick(): void {
    this.synchronizeConversationMessages();
    this.conversationService.isExceptionSubject.next(true);
    // todo: Implement timer4
  }

  onDeleteConversationButtonClick(): void {
    this.modalService.openConfirmationDialog(this.conversationID, false);
  }

  onSendNewMessageButtonClick(message: string): void {
    this.conversationService.isExceptionSubject.next(true);
    this.store.dispatch(
      sendConversationMessage({
        conversationMessage: { conversationID: this.conversationID, message },
      })
    );
    this.chatForm.reset();

    setTimeout(() => {
      this.synchronizeConversationMessages();
      this.conversationService.isExceptionSubject.next(false);
    }, 1500);
  }

  isAuthorMessage(message: IConversationMessageTransformed): string {
    return this.authorUid === message.authorID ? 'author-message' : '';
  }
}
