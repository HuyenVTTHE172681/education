import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCourseDetailComponent } from './dashboard-course-detail.component';

describe('DashboardCourseDetailComponent', () => {
  let component: DashboardCourseDetailComponent;
  let fixture: ComponentFixture<DashboardCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCourseDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
