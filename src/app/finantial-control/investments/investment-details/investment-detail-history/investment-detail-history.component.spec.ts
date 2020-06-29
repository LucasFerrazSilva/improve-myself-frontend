import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentDetailHistoryComponent } from './investment-detail-history.component';

describe('InvestmentDetailHistoryComponent', () => {
  let component: InvestmentDetailHistoryComponent;
  let fixture: ComponentFixture<InvestmentDetailHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentDetailHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentDetailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
