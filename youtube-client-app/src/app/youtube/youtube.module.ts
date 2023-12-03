import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchItemComponent } from '../shared/components/search-item/search-item.component';
import { FilterComponent } from './components/filter/filter.component';
import { SharedModule } from '../shared/shared.module';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';
import { DetailedInformationComponent } from './pages/detailed-information/detailed-information.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
    FilterComponent,
    DetailedInformationComponent,
    AdminPageComponent,
  ],
  imports: [CommonModule, CustomButtonComponent, YoutubeRoutingModule, SharedModule],
  exports: [SearchResultsComponent, SearchItemComponent],
})
export class YoutubeModule {}
