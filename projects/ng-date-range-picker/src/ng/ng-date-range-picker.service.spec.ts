import { TestBed } from '@angular/core/testing';

import { NgDateRangePickerService } from './ng-date-range-picker.service';

import $ from 'jquery';

describe('NgDateRangePickerService', () => {
  let service: NgDateRangePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(NgDateRangePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('embedCSS', () => {
    afterEach(() => {
      $('head style').remove();
    });

    it('should add the css the first time its called', () => {
      expect($('head').length).toBe(1);
      expect($('head style').length).toBe(0);
      service.embedCSS();
      expect($('head style').length).toBe(1);
    });

    it('should only add the css once', () => {
      expect($('head').length).toBe(1);
      expect($('head style').length).toBe(0);
      service.embedCSS();
      expect($('head style').length).toBe(1);
      service.embedCSS();
      expect($('head style').length).toBe(1);
    });

    it('should not add the css if skipCSS is true', () => {
      service.skipCSS = true;
      expect($('head').length).toBe(1);
      expect($('head style').length).toBe(0);
      service.embedCSS();
      expect($('head style').length).toBe(0);
    });
  });
});
