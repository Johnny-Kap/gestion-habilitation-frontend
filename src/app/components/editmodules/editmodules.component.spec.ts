import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmodulesComponent } from './editmodules.component';

describe('EditmodulesComponent', () => {
  let component: EditmodulesComponent;
  let fixture: ComponentFixture<EditmodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
