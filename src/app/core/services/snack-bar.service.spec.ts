import { TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatSnackBar],
      imports: [BrowserAnimationsModule],
    });
    service = TestBed.inject(SnackBarService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snack bar when setSnackBar is called', () => {
    const spy = jest.spyOn(snackBar, 'open');
    service.setSnackBar('Test message');

    expect(spy).toHaveBeenCalledWith('Test message', '', {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  });
});
