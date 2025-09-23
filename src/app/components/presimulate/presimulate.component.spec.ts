import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresimulateComponent } from './presimulate.component';

describe('PresimulateComponent', () => {
  let component: PresimulateComponent;
  let fixture: ComponentFixture<PresimulateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresimulateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresimulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
