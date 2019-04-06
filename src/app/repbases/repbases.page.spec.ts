import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepbasesPage } from './repbases.page';

describe('RepbasesPage', () => {
  let component: RepbasesPage;
  let fixture: ComponentFixture<RepbasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepbasesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepbasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
