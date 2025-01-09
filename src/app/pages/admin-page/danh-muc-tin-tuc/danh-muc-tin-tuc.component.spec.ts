import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucTinTucComponent } from './danh-muc-tin-tuc.component';

describe('DanhMucTinTucComponent', () => {
  let component: DanhMucTinTucComponent;
  let fixture: ComponentFixture<DanhMucTinTucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DanhMucTinTucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhMucTinTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
