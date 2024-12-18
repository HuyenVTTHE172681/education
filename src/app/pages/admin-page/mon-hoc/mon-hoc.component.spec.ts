import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonHocComponent } from './mon-hoc.component';

describe('MonHocComponent', () => {
  let component: MonHocComponent;
  let fixture: ComponentFixture<MonHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
