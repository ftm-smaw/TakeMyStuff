import { Component, OnInit } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { ToastService } from '../../services/toast.service';
import { preference } from '../create-prefs/create-prefs.component';
import { ItemListing } from '../create-item-listing/create-item-listing.component';
 
export class Listing {
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
  standalone: true,
  selector: 'app-daily-feed',
  imports: [CommonModule, MContainerComponent],
  templateUrl: './daily-feed.component.html',
  styleUrls: ['./daily-feed.component.css']
})
 
 
 
export class DailyFeedComponent implements OnInit {
  listings: Listing[] = [];
  categories: string[] = [];
 
  constructor(private firebase: FirebaseService, private router: Router, public toast: ToastService) {}
 
  ngOnInit(): void {
    this.getListings();
  }

  getPreferences(){
    this.firebase.getDataContinuously('/preferences').subscribe((data:any) => {
      this.categories = [];
      for (let key in data){
        if(data.hasOwnProperty(key)){
          const item = data[key];
          this.categories.push(item.category);
        }
      }

      console.log(this.categories);
    })
  }
 
  getListings() {
    this.getPreferences();
    this.firebase.getDataContinuously('/items').subscribe((data: any) => {
      this.listings = [];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          const item = data[key];
          if (this.categories.includes(item.category)) {
            this.listings.push(new ItemListing(
              key,
              item.itemName,
              item.category,
              item.itemDesc,
              item.location_latitude,
              item.location_longitude,
              item.address,
              item.available_time,
              item.selectedImage,
              item.price
            ));
            this.toast.prepare("A new listing was added to the feed", "success", 5000, "!").show();
          }
        }
      }
    });
  }
  goToChat(){
    this.router.navigate(['buyer']);
  }
}