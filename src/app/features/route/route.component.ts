import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { FormsModule } from '@angular/forms';
import { MAhaComponent } from '../../m-framework/m-aha/m-aha.component';
import { MMapComponent } from '../../m-framework/m-map/m-map.component';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

//@ts-ignore
declare var google;

class Location{
  lat: number;
  lng: number;
  constructor(lat: number, lng: number){
    this.lat = lat;
    this.lng = lng;
  }
}

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [MContainerComponent,FormsModule,MAhaComponent,MMapComponent,CommonModule],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent {
  routeNumber: number;
  lat: number;
  lng: number; 
  map: any; 
  list: any[];

  constructor(public toastService: ToastService, private firebaseService:FirebaseService){
    this.routeNumber = 0; 
    this.lat = 0;
    this.lng = 0;
    this.list = []; 
  }
  drawMarker(latitude: number, longitude: number){
    const marker = new google.maps.Marker({
      map: this.map,
      position:{lat: latitude, lng: longitude}
    });
  }
  getMapInstance(map:any){
    this.map = map; 
    // Google created the map and I finally know where it is (this.map)
    this.map.addListener("click",(event: any)=>{
      let location = event.latLng;
      this.drawMarker(location.lat(),location.lng());
      this.list.push(new Location(location.lat(),location.lng()));
      //this.toastService.prepare("User Clicked on "+location.lat()+","+location.lng(),"success",3000,"Location Clicked").show();
    });
  }
  storeRoute(){
    if(this.routeNumber > 0)
      {
        let route = {
          routeNumber: this.routeNumber,
          locations: this.list
        }
        this.firebaseService.addToList("/routes",route);
        this.toastService.prepare("Route Stored","success",3000,"Info").show();
      }
      else
        this.toastService.prepare("Error. Bus number must be positive","error",3000,"Error").show();
  }
  async getRouteFromFirebase(){
    let routes = [];
    routes = await this.firebaseService.readList("/routes");
    routes.forEach(route =>{
      if(route.routeNumber == this.routeNumber)
        {
          this.list = route.locations; 
          // An assignments. Center around the average of the route. 
          this.list.forEach((location)=>{
            this.drawMarker(location.lat, location.lng);
            this.map.setCenter({lat:location.lat, lng: location.lng});
          })
        }
    })
  }
  playRoute(){}
}
