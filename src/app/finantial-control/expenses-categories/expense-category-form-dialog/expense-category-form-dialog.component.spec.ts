import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategoryFormDialogComponent } from './expense-category-form-dialog.component';

describe('ExpenseCategoryFormDialogComponent', () => {
  let component: ExpenseCategoryFormDialogComponent;
  let fixture: ComponentFixture<ExpenseCategoryFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseCategoryFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCategoryFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
