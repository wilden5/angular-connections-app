import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FavoritePageComponent } from './pages/favorite-page/favorite-page.component';
import { ProjectPath } from '../utils/project-constants';

const routes: Routes = [{ path: ProjectPath.Empty, component: FavoritePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteRoutingModule {}
