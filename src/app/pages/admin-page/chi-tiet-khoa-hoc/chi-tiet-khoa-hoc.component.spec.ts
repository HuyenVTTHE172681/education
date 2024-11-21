import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietKhoaHocComponent } from './chi-tiet-khoa-hoc.component';

describe('ChiTietKhoaHocComponent', () => {
  let component: ChiTietKhoaHocComponent;
  let fixture: ComponentFixture<ChiTietKhoaHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiTietKhoaHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiTietKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
