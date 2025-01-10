import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCommentComponent } from './information-comment.component';

describe('InformationCommentComponent', () => {
  let component: InformationCommentComponent;
  let fixture: ComponentFixture<InformationCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
