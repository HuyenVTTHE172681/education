import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietBaiHocComponent } from './chi-tiet-bai-hoc.component';

describe('ChiTietBaiHocComponent', () => {
  let component: ChiTietBaiHocComponent;
  let fixture: ComponentFixture<ChiTietBaiHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiTietBaiHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiTietBaiHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
