import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, convertToParamMap, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      imports: [NgOptimizedImage, RouterLink],
      providers: [{ provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) } }],
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to main page', () => {
    const mainLink = fixture.nativeElement.querySelector('.home-link');
    expect(mainLink.textContent).toContain('home');
    expect(mainLink.getAttribute('href')).toEqual('/');
  });
});
