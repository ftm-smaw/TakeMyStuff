import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MMainMenuComponent } from '../../m-framework/m-main-menu/m-main-menu.component';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from '../../services/firebase.service'; // Import your Firebase service

export class preference{
  key: string;
  category: string;
  location_latitude: string;
  location_longitude: string;
  available_time: string;
  address: string;


  constructor(
    key: string,
    category: string,
    location_latitude: string,
    location_longitude: string,
    available_time: string,
    address: string
  
  ) {
    this.key = key;
    this.address = address;
    this.category = category;
    this.location_latitude = location_latitude;
    this.location_longitude = location_longitude;
    this.available_time = available_time;
  }
}

@Component({
  selector: 'app-create-prefs',
  standalone: true,
  imports: [MContainerComponent, MMainMenuComponent, CommonModule, FormsModule],
  templateUrl: './create-prefs.component.html',
  styleUrl: './create-prefs.component.css'
})
export class CreatePrefsComponent {
  category: string;
  location: string;
  AvailabilityTime: string;
  long: number;
  lati: number;
  address: string;
  dataDays: any[] = [];
  reversegeocodingurl: string = '';

  anItem: any; // Define the anItem property
  items: any[] = []; // Initialize the items array

  constructor(private http: HttpClient, private firebase:FirebaseService) { // Inject FirebaseService
 
    this.lati = 0;
    this.long = 0;
    this.category = 'default';
    this.location = '';
    this.AvailabilityTime = '';
    this.address = '';

    this.anItem = new preference("","","","","","");
    this.items = [];
    this.items.push(this.anItem);
  }

  getLocation() {
    console.log("Inside function");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("In get current position");
          this.long = position.coords.longitude;
          this.lati = position.coords.latitude;
          this.getAddress();
        },
        (error) => {
          console.error('Error getting location:', error);
          this.location = 'Unable to retrieve location';
        }
      );
    }
  }

  getAddress() {
    this.reversegeocodingurl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.lati},${this.long}&key=AIzaSyB4YV2oKXy5f6zQXtBDZRg-_DNeU4nocAM`;
    this.http.get(this.reversegeocodingurl).subscribe(
      (cityData: any) => {
        if (cityData.results && cityData.results.length > 0) {
          this.address = cityData.results[0].formatted_address;
          console.log('Address:', this.address);
          this.location = this.address;
        } else {
          console.error('No address found for the given coordinates. Response:', cityData);
        }
      },
      (error) => {
        console.error('Error fetching address:', error);
      }
    );
  }

  setCategory(category: string) {
    this.category = category;
  }

  addnew() {
    if (this.anItem != null && this.items != null) {
      const object = {
        address: this.address,
        category: this.category,
        location_latitude: this.lati.toString(),
        location_longitude: this.long.toString(),
        available_time: this.AvailabilityTime.toString()
    };

    let key=this.firebase.addToList('preferences', object)!;
    this.items.push(new preference(
          key,
          this.category,
          this.lati.toString(),
          this.long.toString(),
          this.AvailabilityTime,
          this.address,
        ));
      }
    }
}
