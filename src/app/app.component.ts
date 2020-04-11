import {Component, OnInit} from '@angular/core';
import {WeatherService} from './services/weather.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  weather;

  constructor(private weatherService: WeatherService, private spinnerService: NgxSpinnerService) {

  }

  ngOnInit(): void {
  }

  getWeather(cityName: string, countryCode: string) {
    this.spinnerService.show();
    this.weatherService.getWeather(cityName, countryCode)
      .subscribe(
        res => {
          this.weather = res;
          this.spinnerService.hide();
        },
        err => {
          console.log(err);
          if (err.status === 404) {
            this.spinnerService.hide();
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: `No se encontro ningun resultado`,
            });
          } else if (err.name === 'HttpErrorResponse') {
            this.spinnerService.hide();
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: `No posee conexion a internet`,
            });
          } else if (err.message) {
            this.spinnerService.hide();
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: `FATAL ERROR: ${err.message}`,
            });
          }
        }
      );
  }

  submitLocation(cityName: HTMLInputElement, countryCode: HTMLInputElement) {
    if (cityName.value && countryCode.value) {
      this.getWeather(cityName.value, countryCode.value);
      cityName.value = '';
      countryCode.value = '';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Los campos son requeridos',
      });
    }
    cityName.focus();
    return false;
  }
}
