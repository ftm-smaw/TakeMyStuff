import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
//@ts-ignore
declare var google;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  lat: number;
  lng: number;
  map: any;
  marker: any;
  circle: any;
  markersAndCircles: any[] = [];

  constructor() {
    this.lat = 0;
    this.lng = 0;
  }

  async initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    this.map = new Map(document.getElementById("map"), {
      center: { lat: this.lat, lng: this.lng },
      zoom: 20,
      mapId: "DEMO_MAP_ID"
    });

    const droneFlag = document.createElement('img');
    droneFlag.src = 'assets/drone_big.png';

    // Event listener for double click to add new marker
    google.maps.event.addListener(this.map, 'dblclick', (event:any) => {
          const newCircle = new google.maps.Circle({
            map: this.map,
            radius: 100, 
            center: event.latLng,
            editable: true
          });
          google.maps.event.addListener(newCircle, 'radius_changed', () => {
            const newRadius = newCircle.getRadius();
            const newCenter = newCircle.getCenter();
            console.log("Circle:", newRadius);
            console.log("Circle:", newCenter.toJSON());
            this.updateCircle(newCircle);
            
          });
          google.maps.event.addListener(newCircle, 'center_changed', () => {
            const newRadius = newCircle.getRadius();
            const newCenter = newCircle.getCenter();
            console.log("Circle:", newRadius);
            console.log("Circle:", newCenter.toJSON());   
          });

          this.markersAndCircles.push(newCircle);
      });
  }
  updateCircle(myCircle:any){
    this.markersAndCircles[this.markersAndCircles.indexOf(myCircle)] = myCircle;

  }

  ngOnInit() {
    this.getLocation();
  }
  printAll(){
    for (let i = 0 ; i < this.markersAndCircles.length; i++)
    {
      console.log(this.markersAndCircles[i].getCenter().toJSON());
      console.log(this.markersAndCircles[i].getRadius());
    }
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.initMap();
    });
  }

}
