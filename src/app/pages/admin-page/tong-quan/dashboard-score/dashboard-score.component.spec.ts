import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardScoreComponent } from './dashboard-score.component';

describe('DashboardScoreComponent', () => {
  let component: DashboardScoreComponent;
  let fixture: ComponentFixture<DashboardScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
