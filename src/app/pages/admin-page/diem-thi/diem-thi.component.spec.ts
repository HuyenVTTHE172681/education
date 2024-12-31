import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiemThiComponent } from './diem-thi.component';

describe('DiemThiComponent', () => {
  let component: DiemThiComponent;
  let fixture: ComponentFixture<DiemThiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiemThiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiemThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
