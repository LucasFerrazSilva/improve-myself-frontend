import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinantialParameterFormDialogComponent } from './finantial-parameter-form-dialog.component';

describe('FinantialParameterFormDialogComponent', () => {
  let component: FinantialParameterFormDialogComponent;
  let fixture: ComponentFixture<FinantialParameterFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinantialParameterFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinantialParameterFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
