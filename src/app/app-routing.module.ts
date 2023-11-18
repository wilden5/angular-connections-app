import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { MainComponent } from './core/pages/main/main.component';
import { authGuard } from './core/guards/auth.guard';
import { ProjectPath } from './utils/project-constants';

const routes: Routes = [
  { path: ProjectPath.Empty, component: MainComponent, canActivate: [authGuard] },
  {
    path: ProjectPath.Search,
    loadChildren: () => import('./youtube/youtube.module').then((m) => m.YoutubeModule),
    canActivate: [authGuard],
  },
  { path: ProjectPath.Login, loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  {
    path: 'favorite',
    loadChildren: () => import('./favorite/favorite.module').then((m) => m.FavoriteModule),
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
