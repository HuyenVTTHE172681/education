import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietCauHoiComponent } from './chi-tiet-cau-hoi.component';

describe('ChiTietCauHoiComponent', () => {
  let component: ChiTietCauHoiComponent;
  let fixture: ComponentFixture<ChiTietCauHoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiTietCauHoiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiTietCauHoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
