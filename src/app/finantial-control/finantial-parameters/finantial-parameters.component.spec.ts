import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinantialParametersComponent } from './finantial-parameters.component';

describe('FinantialParametersComponent', () => {
  let component: FinantialParametersComponent;
  let fixture: ComponentFixture<FinantialParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinantialParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinantialParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
