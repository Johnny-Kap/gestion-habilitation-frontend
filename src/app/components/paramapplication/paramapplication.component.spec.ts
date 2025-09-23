import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamapplicationComponent } from './paramapplication.component';

describe('ParamapplicationComponent', () => {
  let component: ParamapplicationComponent;
  let fixture: ComponentFixture<ParamapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
