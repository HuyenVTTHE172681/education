import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamHocComponent } from './nam-hoc.component';

describe('NamHocComponent', () => {
  let component: NamHocComponent;
  let fixture: ComponentFixture<NamHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NamHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
