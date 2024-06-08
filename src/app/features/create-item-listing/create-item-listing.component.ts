import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MMainMenuComponent } from '../../m-framework/m-main-menu/m-main-menu.component';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from '../../services/firebase.service';
import { MMapComponent } from '../../m-framework/m-map/m-map.component';
 
 
 
//@ts-ignore
 
declare var google: any;
 
export class ItemListing {
  key: string;
  itemName: string;
  category: string;
  itemDesc: string;
  location_latitude: string;
  location_longitude: string;
  address: string;
  available_time: string;
  selectedImage: string;
  price: number;
 
  constructor(
    key: string,
    itemName: string,
    category: string,
    itemDesc: string,
    location_latitude: string,
    location_longitude: string,
    address: string,
    available_time: string,
    selectedImage: string,
    price: number
  ) {
    this.key = key;
    this.itemName = itemName;
    this.category = category;
    this.itemDesc = itemDesc;
    this.location_latitude = location_latitude;
    this.location_longitude = location_longitude;
    this.address = address;
    this.available_time = available_time;
    this.selectedImage = selectedImage;
    this.price = price;
  }
}
 
@Component({
  selector: 'app-create-item-listing',
  standalone: true,
  imports: [MContainerComponent, MMainMenuComponent, MMapComponent,CommonModule, FormsModule],
  templateUrl: './create-item-listing.component.html',
  styleUrls: ['./create-item-listing.component.css']
})
export class CreateItemListingComponent {
  category: string;
  desc: string;
  itemName: string;
  routeNumber: number;
  AvailabilityTime: string;
  lng: number;
  lat: number;
  list: any[];
  address: string;
  reversegeocodingurl: string = '';
  useMapForLocation: boolean;
  map: any;
  location:String;
  price: number;
  selectedImage: string;
  items: ItemListing[] = []; // Initialize the items array
 
  constructor(private http: HttpClient, private firebase: FirebaseService) {
    this.lat = 0;
    this.lng = 0;
    this.routeNumber=0
    this.category = 'default';
    this.desc = '';
    this.itemName = '';
    this.AvailabilityTime = '';
    this.address = '';
    this.list = [];
    this.price = 0;
    this.location='';
    this.selectedImage = '';
    this.useMapForLocation = true; // Default to using map for location
  }
 
  drawMarker(latitude: number, longitude: number) {
    const marker = new google.maps.Marker({
      map: this.map,
      position: { lat: latitude, lng: longitude }
    });
  }
 
  getMapInstance(map: any) {
    this.map = map;
    this.map.addListener("click", (event: any) => {
      if (this.useMapForLocation) {
        let location = event.latLng;
        this.drawMarker(location.lat(), location.lng());
        this.lat = location.lat();
        this.lng = location.lng();
        this.getAddress(); // Fetch address after getting the coordinates
      }
    });
  }
 
  showUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.setCenter({ lat: this.lat, lng: this.lng });
        this.drawMarker(this.lat, this.lng);
        this.getAddress(); // Fetch address after getting the coordinates
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
 
  toggleLocationInput(useMap: boolean) {
    this.useMapForLocation = useMap;
  }
 
  saveLocation() {
    const locationData = {
      lat: this.lat.toString(),
      lng: this.lng.toString(),
      category: this.category,
      available_time: this.AvailabilityTime,
      address: this.address
    };
    this.firebase.addToList('user-locations', locationData);
  }
 
 
 
 
  storeRoute() {
    if (this.routeNumber > 0) {
      let route = {
        routeNumber: this.routeNumber,
        locations: this.list
      };
      this.firebase.addToList("/routes", route);
      alert("Route Stored successfully");
    } else {
      alert("Error. Route number must be positive");
    }
  }
 
  async getRouteFromFirebase() {
    let routes = [];
    routes = await this.firebase.readList("/routes");
    routes.forEach(route => {
      if (route.routeNumber == this.routeNumber) {
        this.list = route.locations;
        this.list.forEach((location) => {
          this.drawMarker(location.lat, location.lng);
          this.map.setCenter({ lat: location.lat, lng: location.lng });
        });
      }
    });
  }
 
  playRoute() { }
 
  setCategory(category: string) {
    this.category = category;
  }
 
  getLocation() {
    console.log("Inside function");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("In get current position");
          this.lng = position.coords.longitude;
          this.lat = position.coords.latitude;
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
    this.reversegeocodingurl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.lat},${this.lng}&key=AIzaSyB4YV2oKXy5f6zQXtBDZRg-_DNeU4nocAM`;
    this.http.get(this.reversegeocodingurl).subscribe(
      (cityData: any) => {
        if (cityData.results && cityData.results.length > 0) {
          this.address = cityData.results[0].formatted_address;
          console.log('Address:', this.address);
          this.saveLocation(); // Save location after fetching the address
        } else {
          console.error('No address found for the given coordinates. Response:', cityData);
        }
      },
      (error) => {
        console.error('Error fetching address:', error);
      }
    );
  }
 
  onSelectImage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      if (file.size < 5000000) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Image size more than 5MB');
      }
    }
  }
 
  addItemToList() {
      const object = {
        itemName: this.itemName,
        category: this.category,
        itemDesc: this.desc,
        location_latitude: this.lat.toString(),
        location_longitude: this.lng.toString(),
        address: this.address,
        available_time: this.AvailabilityTime.toString(),
        selectedImage: this.selectedImage.toString(),
        price: this.price
      };
 
      let key = this.firebase.addToList('/items', object)!;
      this.items.push(new ItemListing(
        key,
        this.itemName,
        this.category,
        this.desc,
        this.lat.toString(),
        this.lng.toString(),
        this.address,
        this.AvailabilityTime.toString(),
        this.selectedImage.toString(),
        this.price
      ));
    }
  }