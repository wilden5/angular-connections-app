import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPages } from '../../environment/environment';
import { GroupComponent } from './pages/group/group.component';

const routes: Routes = [{ path: `${ProjectPages.GroupId}`, component: GroupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
