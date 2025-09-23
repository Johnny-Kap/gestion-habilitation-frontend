import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamformhistoricComponent } from './paramformhistoric.component';

describe('ParamformhistoricComponent', () => {
  let component: ParamformhistoricComponent;
  let fixture: ComponentFixture<ParamformhistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamformhistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamformhistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
