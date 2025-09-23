import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteapplicationComponent } from './deleteapplication.component';

describe('DeleteapplicationComponent', () => {
  let component: DeleteapplicationComponent;
  let fixture: ComponentFixture<DeleteapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
