import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomCauHoiComponent } from './nhom-cau-hoi.component';

describe('NhomCauHoiComponent', () => {
  let component: NhomCauHoiComponent;
  let fixture: ComponentFixture<NhomCauHoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NhomCauHoiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NhomCauHoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
