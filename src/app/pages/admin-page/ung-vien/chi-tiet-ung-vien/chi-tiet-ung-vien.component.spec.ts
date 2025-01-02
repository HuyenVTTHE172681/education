import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietUngVienComponent } from './chi-tiet-ung-vien.component';

describe('ChiTietUngVienComponent', () => {
  let component: ChiTietUngVienComponent;
  let fixture: ComponentFixture<ChiTietUngVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiTietUngVienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiTietUngVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
