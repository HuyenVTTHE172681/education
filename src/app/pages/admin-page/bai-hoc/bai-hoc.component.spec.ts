import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaiHocComponent } from './bai-hoc.component';

describe('BaiHocComponent', () => {
  let component: BaiHocComponent;
  let fixture: ComponentFixture<BaiHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaiHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaiHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
