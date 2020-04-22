import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesPerMonthComponent } from './expenses-per-month.component';

describe('ExpensesPerMonthComponent', () => {
  let component: ExpensesPerMonthComponent;
  let fixture: ComponentFixture<ExpensesPerMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesPerMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
