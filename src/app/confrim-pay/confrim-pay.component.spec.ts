import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimPayComponent } from './confrim-pay.component';

describe('ConfrimPayComponent', () => {
  let component: ConfrimPayComponent;
  let fixture: ComponentFixture<ConfrimPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfrimPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfrimPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
