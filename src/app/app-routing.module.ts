import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { MainComponent } from './core/pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'search', loadChildren: () => import('./youtube/youtube.module').then((m) => m.YoutubeModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
