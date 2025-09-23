import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterapplicationComponent } from './ajouterapplication.component';

describe('AjouterapplicationComponent', () => {
  let component: AjouterapplicationComponent;
  let fixture: ComponentFixture<AjouterapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
