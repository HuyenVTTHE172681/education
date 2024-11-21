import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuongTrinhHocComponent } from './chuong-trinh-hoc.component';

describe('ChuongTrinhHocComponent', () => {
  let component: ChuongTrinhHocComponent;
  let fixture: ComponentFixture<ChuongTrinhHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChuongTrinhHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChuongTrinhHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
