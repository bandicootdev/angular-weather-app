import {Component, OnInit} from '@angular/core';
import {WeatherService} from './services/weather.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  weather;

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit(): void {
  }

  getWeather(cityName: string, countryCode: string) {
    this.weatherService.getWeather(cityName, countryCode)
      .subscribe(
        res => this.weather = res,
        err => console.log(err)
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
