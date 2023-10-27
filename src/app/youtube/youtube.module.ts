import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchResultsComponent } from './pages/search/search-results/search-results.component';
import { SearchItemComponent } from './pages/search/search-item/search-item.component';
import { ColoredBorderDirective } from '../directives/colored-border.directive';
import { FilterComponent } from './components/filter/filter.component';
import { CustomButtonComponent } from '../components/custom-button/custom-button.component';

@NgModule({
  declarations: [SearchResultsComponent, SearchItemComponent, ColoredBorderDirective, FilterComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, MatToolbarModule, CustomButtonComponent],
  exports: [SearchResultsComponent],
})
export class YoutubeModule {}
