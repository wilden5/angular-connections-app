import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupService } from '../../services/group.service';
import { loadGroupList, loadGroupListDirectHttp } from '../../../redux/actions/group.actions';
import { selectGroupList } from '../../../redux/selectors/group.selectors';
import { ProjectPages } from '../../../../environment/environment';
import { ModalService } from '../../services/modal.service';
import { selectPeopleList } from '../../../redux/selectors/people.selectors';
import { loadPeopleList, loadPeopleListDirectHttp } from '../../../redux/actions/people.actions';
import { PeopleService } from '../../services/people.service';
import {
  createNewConversation,
  loadConversationList,
} from '../../../redux/actions/conversation.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  protected userUid = JSON.parse(localStorage.getItem('userObject') as string).uid;

  protected readonly selectGroupList = selectGroupList;

  protected readonly selectPeopleList = selectPeopleList;

  protected readonly ProjectPages = ProjectPages;

  companionIDs$: Observable<string[]> | undefined;

  constructor(
    protected store: Store,
    protected groupService: GroupService,
    protected modalService: ModalService,
    protected peopleService: PeopleService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadGroupList());
    this.store.dispatch(loadPeopleList());
    this.store.dispatch(loadConversationList());
  }

  onUpdateButtonClick(): void {
    this.store.dispatch(loadGroupListDirectHttp());
    this.groupService.isExceptionSubject.next(true);
  }

  onDeleteGroupButtonClick(id: string): void {
    this.modalService.openConfirmationDialog(id);
  }

  onCreateGroupButtonClick(): void {
    this.modalService.openCreateGroupDialog();
  }

  onUpdatePeopleListButtonClick(): void {
    this.store.dispatch(loadPeopleListDirectHttp());
    this.peopleService.isExceptionSubject.next(true);
  }

  onUserNameClick(companionId: string): void {
    this.store.dispatch(createNewConversation({ companionId }));
    console.log(companionId);
    console.log(this.companionIDs$);
  }
}
