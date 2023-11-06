import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { FilterComponent } from './components/filter/filter.component';
import { SharedModule } from '../shared/shared.module';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { CustomButtonComponent } from '../shared/components/custom-button.component';
import { DetailedInformationComponent } from './pages/detailed-information/detailed-information.component';

@NgModule({
  declarations: [SearchResultsComponent, SearchItemComponent, FilterComponent, DetailedInformationComponent],
  imports: [CommonModule, CustomButtonComponent, YoutubeRoutingModule, SharedModule],
  exports: [SearchResultsComponent],
})
export class YoutubeModule {}
