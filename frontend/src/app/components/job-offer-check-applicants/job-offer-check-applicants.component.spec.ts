import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferCheckApplicantsComponent } from './job-offer-check-applicants.component';

describe('JobOfferCheckApplicantsComponent', () => {
  let component: JobOfferCheckApplicantsComponent;
  let fixture: ComponentFixture<JobOfferCheckApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferCheckApplicantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOfferCheckApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
