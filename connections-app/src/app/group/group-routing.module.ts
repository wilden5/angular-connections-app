import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPages } from '../../environment/environment';
import { DialogComponent } from './pages/dialog/dialog.component';

const routes: Routes = [{ path: `${ProjectPages.GroupId}`, component: DialogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
