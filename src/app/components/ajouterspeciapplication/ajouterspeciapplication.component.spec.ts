import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterspeciapplicationComponent } from './ajouterspeciapplication.component';

describe('AjouterspeciapplicationComponent', () => {
  let component: AjouterspeciapplicationComponent;
  let fixture: ComponentFixture<AjouterspeciapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterspeciapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterspeciapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
