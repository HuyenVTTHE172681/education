import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideSupportComponent } from './guide-support.component';

describe('GuideSupportComponent', () => {
  let component: GuideSupportComponent;
  let fixture: ComponentFixture<GuideSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuideSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
