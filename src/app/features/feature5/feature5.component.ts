import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MWeatherComponent } from '../../m-framework/m-weather/m-weather.component';
import { WeatherData } from '../../data/WeatherData';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-feature5',
  standalone: true,
  imports: [MWeatherComponent,MContainerComponent,FormsModule,CommonModule],
  templateUrl: './feature5.component.html',
  styleUrl: './feature5.component.css'
})
export class Feature5Component {
  weatherDataObjects: WeatherData[];
  constructor(){
    //dataDays will be replaced by the data from the api
    let dataDays = {"time": [
      "2024-04-18",
      "2024-04-19",
      "2024-04-20",
      "2024-04-21",
      "2024-04-22",
      "2024-04-23",
      "2024-04-24",
      "2024-04-25",
      "2024-04-26",
      "2024-04-27",
      "2024-04-28"
    ],
    "temperature_instant": [6.52, 6.62, 7.63, 7.75, 6.85, 6.12, 5.98, 6.57, 4.88, 6.47, 7.78],
    "precipitation": [0.73, 0, 1.55, 0, 0, 0, 0, 0.41, 0, 0, 1.53],
    "predictability": [44, 80, 59, 84, 83, 85, 63, 62, 75, 70, 41],
    "temperature_max": [7.09, 7.63, 7.86, 7.8, 7.01, 6.76, 8.51, 6.12, 6.71, 7.78, 9.07],
    "sealevelpressure_mean": [1019, 1020, 1013, 1014, 1017, 1021, 1014, 1027, 1032, 1035, 1028],
    "windspeed_mean": [9.38, 6.93, 4.54, 5.51, 5.07, 2.62, 6.75, 7.2, 5.18, 4.75, 6.88],
    "precipitation_hours": [4, 0, 5, 0, 0, 0, 0, 7, 0, 0, 14],
    "sealevelpressure_min": [1018, 1017, 1010, 1012, 1012, 1017, 1011, 1021, 1029, 1033, 1023],
    "pictocode": [16, 3, 16, 2, 2, 1, 3, 7, 1, 1, 7],
    "snowfraction": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "humiditygreater90_hours": [0.13, 0.38, 1, 0, 0, 0, 0.5, 0, 0, 0, 0.71],
    "convective_precipitation": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "relativehumidity_max": [86, 93, 99, 83, 81, 75, 92, 72, 75, 82, 92],
    "temperature_min": [6.33, 6.52, 7.25, 6.43, 6.11, 5.98, 5.98, 4.36, 4.93, 6.49, 7.76],
    "winddirection": [90, 90, 270, 270, 315, 90, 225, 45, 90, 90, 225],
    "felttemperature_max": [0.88, 4.06, 5.09, 3.01, 3.44, 4.36, 2.54, -0.37, 2.71, 4.77, 3.87],
    "relativehumidity_min": [82, 86, 85, 74, 66, 68, 75, 64, 68, 75, 83],
    "felttemperature_mean": [-1.31, 1.25, 3.76, 1.36, 1.62, 3, 1.5, -2.11, 0.85, 2.73, 3.11],
    "windspeed_min": [5.96, 3.91, 3.01, 3.94, 1.65, 1.26, 2.44, 4.39, 3.99, 4.34, 5.29],
    "felttemperature_min": [-3.05, -0.33, 1.31, 0.54, -0.29, 2.03, -1.86, -4.16, -0.49, 1.28, 2.73],
    "precipitation_probability": [8, 2, 46, 0, 2, 0, 27, 15, 1, 2, 31],
    "uvindex": [1, 5, 2, 4, 6, 6, 3, 6, 6, 5, 2],
    "rainspot": [
      "2221111111111111111111111111111111111111111111111",
      "0000000000000000000000000000000000000000000000000",
      "1111122111111221111112222111222222122222222222222",
      "0000000000000000000000000000000000000000000000000",
      "0000000000000000000000000000000000000000000000000",
      "0000000000000000000000000000000000000000000000000",
      "0000110110001010000101000010110000011111101111100",
      "9911111991111191111110111111000000100000000000000",
      "0000000000000000000000000000000000000000000000000",
      "0000000000000000000000000000000000000000001000000",
      "9900000119900022111112222119222221133322212233321"
    ],
    "temperature_mean": [6.64, 7.08, 7.63, 6.73, 6.64, 6.28, 7.42, 4.86, 6.02, 7.18, 8.57],
    "sealevelpressure_max": [1020, 1021, 1017, 1015, 1021, 1023, 1020, 1029, 1034, 1036, 1032],
    "relativehumidity_mean": [84, 88, 97, 78, 71, 71, 84, 67, 71, 78, 89],
    "predictability_class": [3, 5, 3, 5, 5, 5, 4, 4, 4, 4, 3],
    "windspeed_max": [11.45, 8.24, 7.6, 7.75, 7.76, 3.86, 9.68, 10.45, 5.69, 5.4, 7.95]
  };

  this.weatherDataObjects = dataDays.time.map(time => {
    const index = dataDays.time.indexOf(time);
      return new WeatherData({
          time: dataDays.time[index],
          precipitation: dataDays.precipitation[index],
          temperatureMax: dataDays.temperature_max[index],
          windspeedMean: dataDays.windspeed_mean[index],
          temperatureMin: dataDays.temperature_min[index],
          windDirection: dataDays.winddirection[index],
          rainSpot: dataDays.rainspot[index],
          relativeHumidityMean: dataDays.relativehumidity_mean[index],
      });
  });

}
}
