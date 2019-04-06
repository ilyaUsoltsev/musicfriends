import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostPage } from './add-post.page';

describe('AddPostPage', () => {
  let component: AddPostPage;
  let fixture: ComponentFixture<AddPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
