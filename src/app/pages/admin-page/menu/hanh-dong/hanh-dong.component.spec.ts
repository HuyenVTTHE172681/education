import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HanhDongComponent } from './hanh-dong.component';

describe('HanhDongComponent', () => {
  let component: HanhDongComponent;
  let fixture: ComponentFixture<HanhDongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HanhDongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HanhDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
