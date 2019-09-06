import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DateRangePickerDirective } from './ng-date-range-picker.directive';
import { NgDateRangePickerService } from './ng-date-range-picker.service';

import $ from 'jquery';

@Component({
  template: `
    <input type="text" ngDateRangePicker [options]="options" />
  `
})
class TestDateRangePickerDirectiveComponent {
  public options = {
    opens: 'left'
  };
}

describe('DateRangePickerDirective', () => {
  const ngDateRangePickerServiceSpy = jasmine.createSpyObj('NgDateRangePickerService', ['embedCSS', 'settings']);
  let component: TestDateRangePickerDirectiveComponent;
  let fixture: ComponentFixture<TestDateRangePickerDirectiveComponent>;
  let inputEl: DebugElement;
  let dateRangePickerDirective: DateRangePickerDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NgDateRangePickerService, useValue: ngDateRangePickerServiceSpy }],
      declarations: [TestDateRangePickerDirectiveComponent, DateRangePickerDirective]
    });

    ngDateRangePickerServiceSpy.settings = { test: 'value' };
    ngDateRangePickerServiceSpy.embedCSS.and.returnValue(true);

    fixture = TestBed.createComponent(TestDateRangePickerDirectiveComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    dateRangePickerDirective = inputEl.injector.get(DateRangePickerDirective);

    ngDateRangePickerServiceSpy.embedCSS.calls.reset();
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
    expect(inputEl).toBeTruthy();
    expect(dateRangePickerDirective).not.toBeNull();
  });

  it('should pick up options from input', () => {
    fixture.detectChanges();

    expect(dateRangePickerDirective.options).toBeTruthy();
    expect(dateRangePickerDirective.options.opens).toBe('left');
  });

  describe('ngAfterViewInit', () => {
    it('should call embedCSS', () => {
      dateRangePickerDirective.ngAfterViewInit();

      expect(ngDateRangePickerServiceSpy.embedCSS.calls.count()).toBe(1);
    });
  });

  describe('render', () => {
    it('should set the targetOptions', () => {
      dateRangePickerDirective.options = { opens: 'left' };

      dateRangePickerDirective.render();

      expect(dateRangePickerDirective.datePicker).toBeDefined();
    });
  });

  // describe('attachEvents', () => {
  //   beforeEach(() => {
  //     dateRangePickerDirective.attachEvents();
  //   });

  //   describe('cancel.daterangepicker', () => {
  //     it('should fire when the event is triggered', (done) => {
  //       dateRangePickerDirective.cancelDaterangepicker.subscribe(x => {
  //         // Just need to make sure we got in here;
  //         expect(true).toBeTruthy();
  //         done();
  //       });

  //       inputEl.triggerEventHandler('cancel', {});
  //     });
  //   });
  // });
});
