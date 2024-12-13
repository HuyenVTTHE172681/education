import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaoVienComponent } from './giao-vien.component';

describe('GiaoVienComponent', () => {
  let component: GiaoVienComponent;
  let fixture: ComponentFixture<GiaoVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GiaoVienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiaoVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
