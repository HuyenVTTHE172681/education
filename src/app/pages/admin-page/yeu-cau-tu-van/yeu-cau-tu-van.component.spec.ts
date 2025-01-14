import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YeuCauTuVanComponent } from './yeu-cau-tu-van.component';

describe('YeuCauTuVanComponent', () => {
  let component: YeuCauTuVanComponent;
  let fixture: ComponentFixture<YeuCauTuVanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YeuCauTuVanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YeuCauTuVanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
