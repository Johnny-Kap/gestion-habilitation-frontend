import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditformapplicationComponent } from './editformapplication.component';

describe('EditformapplicationComponent', () => {
  let component: EditformapplicationComponent;
  let fixture: ComponentFixture<EditformapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditformapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditformapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
