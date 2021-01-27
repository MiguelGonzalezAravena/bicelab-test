import { Component, OnInit } from '@angular/core';
import { IndicatorsService } from '../services/indicators.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss'],
})
export class IndicatorsComponent implements OnInit {
  indicators: any;

  constructor(private indicatorsService: IndicatorsService) {
    this.indicatorsService.getLast().subscribe(
      (data) => {
        this.indicators = data;
        console.log('getLast: ', this.indicators);
      },
      (err) => console.log('Error al obtener los últimos indicadores', err)
    );
  }

  ngOnInit(): void {}
}
