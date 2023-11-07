import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { DetailedInformationComponent } from './pages/detailed-information/detailed-information.component';
import { authGuard } from '../core/guards/auth.guard';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const routes: Routes = [
  { path: '', component: SearchResultsComponent },
  { path: 'item/:id', component: DetailedInformationComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
