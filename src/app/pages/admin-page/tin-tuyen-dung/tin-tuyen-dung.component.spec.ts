import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinTuyenDungComponent } from './tin-tuyen-dung.component';

describe('TinTuyenDungComponent', () => {
  let component: TinTuyenDungComponent;
  let fixture: ComponentFixture<TinTuyenDungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TinTuyenDungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinTuyenDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
