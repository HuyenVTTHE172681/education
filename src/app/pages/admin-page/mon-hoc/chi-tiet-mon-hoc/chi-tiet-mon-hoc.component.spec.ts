import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietMonHocComponent } from './chi-tiet-mon-hoc.component';

describe('ChiTietMonHocComponent', () => {
  let component: ChiTietMonHocComponent;
  let fixture: ComponentFixture<ChiTietMonHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiTietMonHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiTietMonHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
