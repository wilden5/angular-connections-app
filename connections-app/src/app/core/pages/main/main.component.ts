import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupService } from '../../services/group.service';
import { loadGroupList, loadGroupListDirectHttp } from '../../../redux/actions/group.actions';
import { selectGroupList } from '../../../redux/selectors/group.selectors';
import { ProjectPages } from '../../../../environment/environment';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  protected userUid = JSON.parse(localStorage.getItem('userObject') as string).uid;

  protected readonly selectGroupList = selectGroupList;

  protected readonly ProjectPages = ProjectPages;

  constructor(
    protected store: Store,
    protected groupService: GroupService,
    protected modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadGroupList());
  }

  onUpdateButtonClick(): void {
    this.store.dispatch(loadGroupListDirectHttp());
    this.groupService.isExceptionSubject.next(true);
  }

  onDeleteGroupButtonClick(id: string): void {
    this.modalService.openConfirmationDialog(id);
  }
}
