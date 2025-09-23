import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsimulationComponent } from './dashboardsimulation.component';

describe('DashboardsimulationComponent', () => {
  let component: DashboardsimulationComponent;
  let fixture: ComponentFixture<DashboardsimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardsimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
