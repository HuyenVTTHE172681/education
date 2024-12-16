import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietGiaoVienComponent } from './chi-tiet-giao-vien.component';

describe('ChiTietGiaoVienComponent', () => {
  let component: ChiTietGiaoVienComponent;
  let fixture: ComponentFixture<ChiTietGiaoVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiTietGiaoVienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiTietGiaoVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
