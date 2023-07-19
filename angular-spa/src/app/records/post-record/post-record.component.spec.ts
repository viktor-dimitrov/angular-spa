import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRecordComponent } from './post-record.component';

describe('PostRecordComponent', () => {
  let component: PostRecordComponent;
  let fixture: ComponentFixture<PostRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostRecordComponent]
    });
    fixture = TestBed.createComponent(PostRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
