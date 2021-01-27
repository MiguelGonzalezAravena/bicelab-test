import { Component, OnInit, ViewChild } from '@angular/core';
import { StockChart } from 'angular-highcharts';
import { IndicatorsService } from '../services/indicators.service';

@Component({
  selector: 'app-search-key',
  templateUrl: './search-key.component.html',
  styleUrls: ['./search-key.component.scss'],
})
export class SearchKeyComponent implements OnInit {
  keys: Array<string> = [];
  key: string = '';

  results: any;
  isSubmit: boolean = false;

  chartData: any = [];
  chart!: any;

  constructor(private indicatorsService: IndicatorsService) {
    this.indicatorsService.getKeys().subscribe(
      (data) => {
        this.keys = data;
        console.log('getKeys: ', this.keys);
      },
      (err) => console.log('Error al obtener la lista de indicadores', err)
    );
  }

  onSendKey(): any {
    this.isSubmit = true;
    this.indicatorsService.getValues(this.key).subscribe(
      (data) => {
        this.results = data;
        console.log('onSendKey', this.results);
        Object.entries(this.results.values).forEach(async ([key, value]) => {
          await this.chartData.push([<any>key * 1000, value]);
        });
        this.chart = new StockChart({
          rangeSelector: {
            selected: 1,
          },
          title: {
            text: `Valor de ${this.key.toUpperCase()} en ${this.results.unit.toUpperCase()}`,
          },
          series: [
            {
              type: 'line',
              tooltip: {
                valueDecimals: 2,
              },
              name: this.key.toUpperCase(),
              data: this.chartData,
            },
          ],
        });
      },
      (err) => console.log('Error al obtener valores por indicador', err)
    );
  }

  ngOnInit(): void {
    this.isSubmit = false;
  }
}
