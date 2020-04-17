import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesCategoriesComponent } from './expenses-categories.component';

describe('ExpensesCategoriesComponent', () => {
  let component: ExpensesCategoriesComponent;
  let fixture: ComponentFixture<ExpensesCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
