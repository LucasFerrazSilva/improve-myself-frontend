import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentFormDialogComponent } from './investment-form-dialog.component';

describe('InvestmentFormDialogComponent', () => {
  let component: InvestmentFormDialogComponent;
  let fixture: ComponentFixture<InvestmentFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
