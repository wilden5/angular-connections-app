import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SortByKeywordPipe } from './pipes/sort-by-keyword.pipe';
import { ColoredBorderDirective } from './directives/colored-border.directive';
import { ColoredItemFilterDirective } from './directives/colored-item-filter.directive';

@NgModule({
  declarations: [SortByKeywordPipe, ColoredBorderDirective, ColoredItemFilterDirective],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ColoredBorderDirective,
    ColoredItemFilterDirective,
    SortByKeywordPipe,
  ],
  providers: [SortByKeywordPipe],
})
export class SharedModule {}
