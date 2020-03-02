import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinantialControlComponent } from './finantial-control.component';

describe('FinantialControlComponent', () => {
  let component: FinantialControlComponent;
  let fixture: ComponentFixture<FinantialControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinantialControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinantialControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
