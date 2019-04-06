import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepbaseDetailPage } from './repbase-detail.page';

describe('RepbaseDetailPage', () => {
  let component: RepbaseDetailPage;
  let fixture: ComponentFixture<RepbaseDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepbaseDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepbaseDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
