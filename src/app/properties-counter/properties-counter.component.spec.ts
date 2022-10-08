import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesCounterComponent } from './properties-counter.component';

describe('PropertiesCounterComponent', () => {
  let component: PropertiesCounterComponent;
  let fixture: ComponentFixture<PropertiesCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
