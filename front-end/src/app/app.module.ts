import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { IndicatorsService } from './services/indicators.service';
import { IndicatorsComponent } from './indicators/indicators.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { SearchKeyComponent } from './search-key/search-key.component';
import { SearchKeyDateComponent } from './search-key-date/search-key-date.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    IndicatorsComponent,
    FormatDatePipe,
    SearchKeyComponent,
    SearchKeyDateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [IndicatorsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
