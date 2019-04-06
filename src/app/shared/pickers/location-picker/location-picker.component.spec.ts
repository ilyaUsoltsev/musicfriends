import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPickerPage } from './location-picker.page';

describe('LocationPickerPage', () => {
  let component: LocationPickerPage;
  let fixture: ComponentFixture<LocationPickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
