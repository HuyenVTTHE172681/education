import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationTestComponent } from './information-test.component';

describe('InformationTestComponent', () => {
  let component: InformationTestComponent;
  let fixture: ComponentFixture<InformationTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
