import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamformComponent } from './paramform.component';

describe('ParamformComponent', () => {
  let component: ParamformComponent;
  let fixture: ComponentFixture<ParamformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
