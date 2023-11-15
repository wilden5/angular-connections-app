import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritePageComponent } from './pages/favorite-page/favorite-page.component';
import { SharedModule } from '../shared/shared.module';
import { FavoriteRoutingModule } from './favorite-routing.module';

@NgModule({
  declarations: [FavoritePageComponent],
  imports: [CommonModule, SharedModule, FavoriteRoutingModule],
})
export class FavoriteModule {}
