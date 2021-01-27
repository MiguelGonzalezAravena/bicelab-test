import { Component, OnInit } from '@angular/core';
import { IndicatorsService } from '../services/indicators.service';

@Component({
  selector: 'app-search-key-date',
  templateUrl: './search-key-date.component.html',
  styleUrls: ['./search-key-date.component.scss'],
})
export class SearchKeyDateComponent implements OnInit {
  keys: Array<string> = [];
  key: string = '';
  date: string = new Date().toString();

  result: any;
  isSubmit: boolean = false;

  constructor(private indicatorsService: IndicatorsService) {
    this.indicatorsService.getKeys().subscribe(
      (data) => {
        this.keys = data;
        console.log('getKeys: ', this.keys);
      },
      (err) => console.log('Error al obtener la lista de indicadores', err)
    );
  }

  changeDate(event: any) {
    const f = new Date(event.value);
    const date = f.getUTCDate();
    const month = f.getUTCMonth() + 1;
    const year = f.getUTCFullYear();
    this.date = `${this.strDate(date)}-${this.strDate(month)}-${year}`;
  }

  strDate(val: number) {
    return ('0' + val).substr(-2);
  }

  onSendKey(): any {
    this.isSubmit = true;
    this.indicatorsService
      .getValuesByDate(this.key, this.date.toString())
      .subscribe(
        (data) => {
          this.result = data;
          console.log('onSendKey', this.result);
        },
        // TO-DO: Mostrar errores de forma correcta
        (err) =>
          console.log('Error al obtener valores por indicador y fecha', err)
      );
  }

  ngOnInit(): void {
    this.isSubmit = false;
  }
}
