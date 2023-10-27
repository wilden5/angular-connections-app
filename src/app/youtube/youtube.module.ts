import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SearchResultsComponent } from './pages/search/search-results/search-results.component';
import { SearchItemComponent } from './pages/search/search-item/search-item.component';
import { ColoredBorderDirective } from './directives/colored-border.directive';
import { FilterComponent } from './components/filter/filter.component';
import { SortByKeywordPipe } from './pipes/sort-by-keyword.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
    ColoredBorderDirective,
    FilterComponent,
    SortByKeywordPipe,
  ],
  imports: [CommonModule, MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, SharedModule],
  exports: [SearchResultsComponent],
  providers: [SortByKeywordPipe],
})
export class YoutubeModule {}
