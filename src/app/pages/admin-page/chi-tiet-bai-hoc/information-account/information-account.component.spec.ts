import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationAccountComponent } from './information-account.component';

describe('InformationAccountComponent', () => {
  let component: InformationAccountComponent;
  let fixture: ComponentFixture<InformationAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
