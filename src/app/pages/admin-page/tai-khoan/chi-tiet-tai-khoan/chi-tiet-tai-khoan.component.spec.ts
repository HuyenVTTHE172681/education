import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietTaiKhoanComponent } from './chi-tiet-tai-khoan.component';

describe('ChiTietTaiKhoanComponent', () => {
  let component: ChiTietTaiKhoanComponent;
  let fixture: ComponentFixture<ChiTietTaiKhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiTietTaiKhoanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiTietTaiKhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
