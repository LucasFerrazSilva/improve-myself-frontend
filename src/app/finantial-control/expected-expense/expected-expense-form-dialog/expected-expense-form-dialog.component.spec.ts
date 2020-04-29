import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedExpenseFormDialogComponent } from './expected-expense-form-dialog.component';

describe('ExpectedExpenseFormDialogComponent', () => {
  let component: ExpectedExpenseFormDialogComponent;
  let fixture: ComponentFixture<ExpectedExpenseFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpectedExpenseFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedExpenseFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
