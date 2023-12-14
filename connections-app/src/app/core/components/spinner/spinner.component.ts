import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSpinnerState } from '../../../redux/selectors/spinner.selectors';
import { ISpinnerStatus } from '../../models/spinner.model';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  isLoaded$?: Observable<ISpinnerStatus>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoaded$ = this.store.select(selectSpinnerState);
  }
}
