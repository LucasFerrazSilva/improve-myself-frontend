import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedExpenseComponent } from './expected-expense.component';

describe('ExpectedExpenseComponent', () => {
  let component: ExpectedExpenseComponent;
  let fixture: ComponentFixture<ExpectedExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpectedExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
