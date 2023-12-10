import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ProjectPages } from '../../../../environment/environment';
import { loadGroupDialog } from '../../../redux/actions/dialog.actions';
import { selectDialogById } from '../../../redux/selectors/dialog.selectors';
import { IGroupMessageTransformed } from '../../../core/models/group.model';
import { selectUserById } from '../../../redux/selectors/people.selectors';
import { selectGroupById } from '../../../redux/selectors/group.selectors';

@Component({
  selector: 'app-group',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  protected readonly selectDialogById = selectDialogById;

  protected readonly selectUserById = selectUserById;

  protected readonly selectGroupById = selectGroupById;

  protected readonly ProjectPages = ProjectPages;

  protected groupID: string;

  protected authorUid: string;

  protected chatForm = this.fb.group({
    message: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    protected store: Store,
    private activatedRoute: ActivatedRoute
  ) {
    this.authorUid = JSON.parse(localStorage.getItem('userObject')!).uid;
    this.groupID = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  get message(): AbstractControl {
    return this.chatForm.get('message')!;
  }

  ngOnInit(): void {
    this.store.dispatch(loadGroupDialog({ groupID: this.groupID, since: 0 }));
  }

  isAuthorMessage(message: IGroupMessageTransformed): string {
    return this.authorUid === message.authorID ? 'author-message' : '';
  }
}
