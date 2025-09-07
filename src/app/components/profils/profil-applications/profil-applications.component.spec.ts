import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilApplicationsComponent } from './profil-applications.component';

describe('ProfilApplicationsComponent', () => {
  let component: ProfilApplicationsComponent;
  let fixture: ComponentFixture<ProfilApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
