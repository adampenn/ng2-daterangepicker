import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DateRangePickerDirective } from '../../../ng-date-range-picker/src/ng/ng-date-range-picker.directive';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, DateRangePickerDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
