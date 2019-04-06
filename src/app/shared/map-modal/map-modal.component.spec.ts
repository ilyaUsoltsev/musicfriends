import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapModalPage } from './map-modal.page';

describe('MapModalPage', () => {
  let component: MapModalPage;
  let fixture: ComponentFixture<MapModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
