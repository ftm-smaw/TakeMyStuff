import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MWeatherComponent } from '../../m-framework/m-weather/m-weather.component';
import { WeatherData } from '../../data/WeatherData';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-feature5',
  standalone: true,
  imports: [MWeatherComponent,MContainerComponent,FormsModule,CommonModule],
  templateUrl: './feature5.component.html',
  styleUrl: './feature5.component.css'
})
export class Feature5Component {
  weatherDataObjects: WeatherData[];
  long: number; 
  lati: number; 
  reversegeocodingurl: string; 
  dataDays: any;
  address: string; 
  getNYCWeather(){
    this.lati = 40.7484;
    this.long = -73.9857;
    this.getWeatherData();
  }
  getLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      this.long = position.coords.longitude; 
      this.lati = position.coords.latitude;
      this.getWeatherData();
    });
  }
  getWeatherData(){
    this.reversegeocodingurl = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+this.lati+","+this.long+"&key=AIzaSyAvdbNyMkWpcMBKRwghEShYjD4lFFKKo68";
      this.http.get(this.reversegeocodingurl).subscribe((cityData: any)=>{
        this.address = cityData.results[0].formatted_address;
        console.log(cityData);
        this.http.get(
          "https://my.meteoblue.com/packages/basic-day?apikey=PGHRiq1IYubvtFMN&lat="
          +this.lati+"&lon="+this.long+"&asl=6&format=json&forecast_days=7&history_days=4").subscribe((weatherData: any)=>{
            this.weatherDataObjects = [];
            this.dataDays = weatherData.data_day;
            console.log(this.dataDays);
            this.processWeatherData();
          })
        
      })
  }
  processWeatherData(){
    for (let index = 0 ; index < 11; index++)
    {
      let singleWeatherData = new WeatherData({
        time: this.dataDays.time[index],
        precipitation: this.dataDays.precipitation[index],
        temperatureMax: this.dataDays.temperature_max[index],
        windspeedMean: this.dataDays.windspeed_mean[index],
        temperatureMin: this.dataDays.temperature_min[index],
        windDirection: this.dataDays.winddirection[index],
        rainSpot: this.dataDays.rainspot[index],
        relativeHumidityMean: this.dataDays.relativehumidity_mean[index],
      });
      this.weatherDataObjects.push(singleWeatherData);
    }
  }
  constructor(private http:HttpClient){
    this.long = 0;
    this.lati = 0;
    this.address = "";
    this.reversegeocodingurl = ""; 
    this.dataDays = [];
    this.weatherDataObjects = [];
  }
}
