import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroGiupComponent } from './tro-giup.component';

describe('TroGiupComponent', () => {
  let component: TroGiupComponent;
  let fixture: ComponentFixture<TroGiupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TroGiupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TroGiupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
