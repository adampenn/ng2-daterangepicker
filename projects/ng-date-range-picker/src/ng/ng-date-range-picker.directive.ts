import {
  Directive,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  KeyValueDiffer,
  KeyValueDiffers,
  ElementRef,
  OnDestroy,
  DoCheck
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgDateRangePickerService } from './ng-date-range-picker.service';

import $ from 'jquery';
import * as moment from 'moment';
import 'bootstrap-daterangepicker';

@Directive({
  selector: '[ngDateRangePicker]'
})
export class DateRangePickerDirective implements AfterViewInit, OnDestroy, DoCheck {
  private activeRange: any;
  private targetOptions: any = {};
  private differ: any = {};

  public datePicker: any;

  // daterangepicker properties
  @Input() options: any = {};

  // daterangepicker events
  @Output() selected = new EventEmitter();
  @Output() cancelDaterangepicker = new EventEmitter();
  @Output() applyDaterangepicker = new EventEmitter();
  @Output() hideCalendarDaterangepicker = new EventEmitter();
  @Output() showCalendarDaterangepicker = new EventEmitter();
  @Output() hideDaterangepicker = new EventEmitter();
  @Output() showDaterangepicker = new EventEmitter();

  constructor(private input: ElementRef, private config: NgDateRangePickerService, private differs: KeyValueDiffers) {
    this.differ.options = differs.find(this.options).create();
    this.differ.settings = differs.find(this.config.settings).create();

    // comnmentr
  }

  ngAfterViewInit() {
    this.config.embedCSS();
    this.render();
    this.attachEvents();
  }

  render() {
    this.targetOptions = Object.assign({}, this.config.settings, this.options);

    // cast $ to any to avoid jquery type checking
    ($(this.input.nativeElement) as any).daterangepicker(this.targetOptions, this.callback.bind(this));

    this.datePicker = ($(this.input.nativeElement) as any).data('daterangepicker');
  }

  attachEvents() {
    $(this.input.nativeElement).on('cancel.daterangepicker', (e: any, picker: any) => {
      const event = { event: e, picker };
      this.cancelDaterangepicker.emit(event);
    });

    $(this.input.nativeElement).on('apply.daterangepicker', (e: any, picker: any) => {
      const event = { event: e, picker };
      this.applyDaterangepicker.emit(event);
    });

    $(this.input.nativeElement).on('hideCalendar.daterangepicker', (e: any, picker: any) => {
      const event = { event: e, picker };
      this.hideCalendarDaterangepicker.emit(event);
    });

    $(this.input.nativeElement).on('showCalendar.daterangepicker', (e: any, picker: any) => {
      const event = { event: e, picker };
      this.showCalendarDaterangepicker.emit(event);
    });

    $(this.input.nativeElement).on('hide.daterangepicker', (e: any, picker: any) => {
      const event = { event: e, picker };
      this.hideDaterangepicker.emit(event);
    });

    $(this.input.nativeElement).on('show.daterangepicker', (e: any, picker: any) => {
      const event = { event: e, picker };
      this.showDaterangepicker.emit(event);
    });
  }

  private callback(start?: any, end?: any, label?: any): void {
    this.activeRange = {
      start,
      end,
      label
    };

    this.selected.emit(this.activeRange);
  }

  destroyPicker() {
    try {
      ($(this.input.nativeElement) as any).data('daterangepicker').remove();
    } catch (e) {
      console.log(e.message);
    }
  }

  ngOnDestroy() {
    this.destroyPicker();
  }

  ngDoCheck() {
    const optionsChanged = this.differ.options.diff(this.options);
    const settingsChanged = this.differ.settings.diff(this.config.settings);

    if (optionsChanged || settingsChanged) {
      this.render();
      this.attachEvents();
      if (this.activeRange && this.datePicker) {
        this.datePicker.setStartDate(this.activeRange.start);
        this.datePicker.setEndDate(this.activeRange.end);
      }
    }
  }
}
