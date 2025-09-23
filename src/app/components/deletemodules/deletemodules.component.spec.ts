import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemodulesComponent } from './deletemodules.component';

describe('DeletemodulesComponent', () => {
  let component: DeletemodulesComponent;
  let fixture: ComponentFixture<DeletemodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletemodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletemodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
