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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableDataSourceModule } from '@angular/material/table';

import { IndicatorsService } from './services/indicators.service';
import { IndicatorsComponent } from './indicators/indicators.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { SearchKeyComponent } from './search-key/search-key.component';

@NgModule({
  declarations: [
    AppComponent,
    IndicatorsComponent,
    FormatDatePipe,
    SearchKeyComponent,
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
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [IndicatorsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
