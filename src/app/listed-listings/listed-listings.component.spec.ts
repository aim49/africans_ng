import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedListingsComponent } from './listed-listings.component';

describe('ListedListingsComponent', () => {
  let component: ListedListingsComponent;
  let fixture: ComponentFixture<ListedListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedListingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
