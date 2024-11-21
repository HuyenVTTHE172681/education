import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAbilityRegisterComponent } from './test-ability-register.component';

describe('TestAbilityRegisterComponent', () => {
  let component: TestAbilityRegisterComponent;
  let fixture: ComponentFixture<TestAbilityRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestAbilityRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAbilityRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
