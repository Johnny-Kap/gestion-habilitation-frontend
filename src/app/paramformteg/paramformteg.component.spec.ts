import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamformtegComponent } from './paramformteg.component';

describe('ParamformtegComponent', () => {
  let component: ParamformtegComponent;
  let fixture: ComponentFixture<ParamformtegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamformtegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamformtegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
