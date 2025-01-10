import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationNewsComponent } from './information-news.component';

describe('InformationNewsComponent', () => {
  let component: InformationNewsComponent;
  let fixture: ComponentFixture<InformationNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
