import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCourseComponent } from './dashboard-course.component';

describe('DashboardCourseComponent', () => {
  let component: DashboardCourseComponent;
  let fixture: ComponentFixture<DashboardCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
