import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { MainComponent } from './core/pages/main/main.component';
import { authGuard } from './core/guards/auth.guard';
import { DetailedInformationComponent } from './youtube/pages/detailed-information/detailed-information.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [authGuard] },
  {
    path: 'search',
    loadChildren: () => import('./youtube/youtube.module').then((m) => m.YoutubeModule),
    canActivate: [authGuard],
  },
  { path: 'item/:id', component: DetailedInformationComponent, canActivate: [authGuard] },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
