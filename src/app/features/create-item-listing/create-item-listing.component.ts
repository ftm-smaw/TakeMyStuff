import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MMainMenuComponent } from '../../m-framework/m-main-menu/m-main-menu.component';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from '../../services/firebase.service'; // Import your Firebase service

export class ItemListing {
  key: string;
  itemName: string;
  category: string;
  itemDesc: string;
  location_latitude: string;
  location_longitude: string;
  address:string;
  available_time: string;
  imageURL: string;
  price: number;

  constructor(
    key: string,
    itemName: string,
    category: string,
    itemDesc: string,
    location_latitude: string,
    location_longitude: string,
    address:string,
    available_time: string,
    imageURL: string,
    price:number
  ) {
    this.key = key;
    this.itemName = itemName;
    this.category = category;
    this.itemDesc = itemDesc;
    this.location_latitude = location_latitude;
    this.location_longitude = location_longitude;
    this.address = address;
    this.available_time = available_time;
    this.imageURL = imageURL;
    this.price = price;
  }
}
@Component({
  selector: 'app-create-item-listing',
  standalone: true,
  imports: [MContainerComponent, MMainMenuComponent, CommonModule, FormsModule],
  templateUrl: './create-item-listing.component.html',
  styleUrl: './create-item-listing.component.css'
})
export class CreateItemListingComponent {
  age: number;
  category: string;
  desc: string;
  itemName: string;
  location: string;
  AvailabilityTime: string;
  long: number;
  lati: number;
  address: string;
  dataDays: any[] = [];
  reversegeocodingurl: string = '';
  imageURL: string;
  price: number;

  anItem: ItemListing; // Define the anItem property
  items: ItemListing[] = []; // Initialize the items array

  constructor(private http: HttpClient, private firebase: FirebaseService) { // Inject FirebaseService
    this.age = 30;
    this.lati = 0;
    this.long = 0;
    this.category = 'default';
    this.desc = '';
    this.itemName = '';
    this.location = '';
    this.AvailabilityTime = '';
    this.address = '';
    this.imageURL = '';
    this.price = 0;

    this.anItem = new ItemListing("","","","","","","","","",0);
    this.items = [];
    this.items.push(this.anItem);
  
  }

  setCategoryAsLighting(){
    this.category = "Lighting;"
  }
  setCategoryAsDecoration(){
    this.category = "Decoration;"
  }
  setCategoryAsFurniture(){
    this.category = "Furniture;"
  }
  setCategoryAsElectronics(){
    this.category = "Electronic;"
  }
  setCategoryAsStorage(){
    this.category = "Storage;"
  }
  setCategoryAsOther(){
    this.category = "Lighting;"
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


  addItemToList() {
    if (this.anItem != null && this.items != null) {
      const object = {
        itemName: this.itemName,
        category: this.category,
        itemDesc: this.desc,
        location_latitude: this.lati.toString(),
        location_longitude: this.long.toString(),
        address: this.address,
        available_time: this.AvailabilityTime.toString(),
        imageURL: this.imageURL,
        price: this.price
      };

      let key = this.firebase.addToList('/items', object)!;
      this.items.push(new ItemListing(
            key,
            this.itemName,
            this.category,
            this.desc,
            this.lati.toString(),
            this.long.toString(),
            this.address,
            this.AvailabilityTime.toString(),
            this.imageURL,
            this.price
          ));
        }
      }

}
