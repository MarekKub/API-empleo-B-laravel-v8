import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferNewComponent } from './job-offer-new.component';

describe('JobOfferNewComponent', () => {
  let component: JobOfferNewComponent;
  let fixture: ComponentFixture<JobOfferNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOfferNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
