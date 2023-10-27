import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './pages/search/search-results/search-results.component';
import { SearchItemComponent } from './pages/search/search-item/search-item.component';
import { ColoredBorderDirective } from './directives/colored-border.directive';
import { FilterComponent } from './components/filter/filter.component';
import { SortByKeywordPipe } from './pipes/sort-by-keyword.pipe';
import { SharedModule } from '../shared/shared.module';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
    ColoredBorderDirective,
    FilterComponent,
    SortByKeywordPipe,
  ],
  imports: [CommonModule, YoutubeRoutingModule, SharedModule],
  exports: [SearchResultsComponent],
  providers: [SortByKeywordPipe],
})
export class YoutubeModule {}
