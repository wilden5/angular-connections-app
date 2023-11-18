import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { DetailedInformationComponent } from './pages/detailed-information/detailed-information.component';
import { authGuard } from '../core/guards/auth.guard';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ProjectPath } from '../utils/project-constants';

const routes: Routes = [
  { path: ProjectPath.Empty, component: SearchResultsComponent },
  {
    path: `${ProjectPath.Item}/${ProjectPath.ItemId}`,
    component: DetailedInformationComponent,
    canActivate: [authGuard],
  },
  { path: ProjectPath.Admin, component: AdminPageComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
