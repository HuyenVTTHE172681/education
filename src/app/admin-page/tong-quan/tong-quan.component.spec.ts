import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TongQuanComponent } from './tong-quan.component';

describe('TongQuanComponent', () => {
  let component: TongQuanComponent;
  let fixture: ComponentFixture<TongQuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TongQuanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TongQuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
