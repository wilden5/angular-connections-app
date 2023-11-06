import { Pipe, PipeTransform } from '@angular/core';
import { ISearchItem } from '../../youtube/models/search-item.model';

@Pipe({
  name: 'sortByKeyword',
})
export class SortByKeywordPipe implements PipeTransform {
  transform(items: ISearchItem[], searchTerm: string): ISearchItem[] {
    const loweredSearchTerm = searchTerm.toLowerCase();
    return items.filter((item) => item.snippet.title.toLowerCase().includes(loweredSearchTerm));
  }
}
