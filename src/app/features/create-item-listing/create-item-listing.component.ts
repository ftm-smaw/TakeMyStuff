import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MMainMenuComponent } from '../../m-framework/m-main-menu/m-main-menu.component';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from '../../services/firebase.service';
 
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
  imports: [MContainerComponent, MMainMenuComponent, CommonModule, FormsModule],
  templateUrl: './create-item-listing.component.html',
  styleUrls: ['./create-item-listing.component.css']
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
 
  price: number;
  selectedImage: string;
 
  items: ItemListing[] = []; // Initialize the items array
 
  constructor(private http: HttpClient, private firebase: FirebaseService) {
    this.age = 30;
    this.lati = 0;
    this.long = 0;
    this.category = 'default';
    this.desc = '';
    this.itemName = '';
    this.location = '';
    this.AvailabilityTime = '';
    this.address = '';
    this.price = 0;
    this.selectedImage='';
  }
 
  setCategoryAsLighting() {
    this.category = "Lighting";
  }
  setCategoryAsDecoration() {
    this.category = "Decoration";
  }
  setCategoryAsFurniture() {
    this.category = "Furniture";
  }
  setCategoryAsElectronics() {
    this.category = "Electronics";
  }
  setCategoryAsStorage() {
    this.category = "Storage";
  }
  setCategoryAsOther() {
    this.category = "Other";
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
    if (this.itemName.trim() !== '' && this.desc.trim() !== '' && this.address.trim() !== '' && this.price > 0) {
      const object = {
        itemName: this.itemName,
        category: this.category,
        itemDesc: this.desc,
        location_latitude: this.lati.toString(),
        location_longitude: this.long.toString(),
        address: this.address,
        available_time: this.AvailabilityTime.toString(),
        imageURL: this.selectedImage.toString() ,
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
         this.selectedImage.toString(),
        this.price
      ));
    }
  }
}