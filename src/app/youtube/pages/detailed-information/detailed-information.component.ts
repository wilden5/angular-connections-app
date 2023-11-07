import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ISearchItem } from '../../models/search-item.model';
import { YoutubeItemService } from '../../services/youtube-item.service';

@Component({
  selector: 'app-detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.scss'],
})
export class DetailedInformationComponent implements OnInit {
  @Input() searchItem: ISearchItem | undefined;

  constructor(
    private route: ActivatedRoute,
    private youtubeItemService: YoutubeItemService,
    private location: Location,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.youtubeItemService
        .getSpecificItemById(itemId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data) => {
          this.searchItem = data;
        });
    }
  }

  onBackButtonClick(): void {
    this.location.back();
  }
}
