import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterspecificComponent } from './ajouterspecific.component';

describe('AjouterspecificComponent', () => {
  let component: AjouterspecificComponent;
  let fixture: ComponentFixture<AjouterspecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterspecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterspecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
