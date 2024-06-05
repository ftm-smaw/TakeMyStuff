import { Component, OnInit } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { ItemListing } from '../create-item-listing/create-item-listing.component';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
 
@Component({
  standalone: true,
  selector: 'app-daily-feed',
  imports: [CommonModule, MContainerComponent],
  templateUrl: './daily-feed.component.html',
  styleUrls: ['./daily-feed.component.css']
})
export class DailyFeedComponent implements OnInit {
  listings: ItemListing[] = [];
 
  constructor(private firebase: FirebaseService, private router: Router) {}
 
  ngOnInit() {
    this.getListings();
  }
 
  async getListings() {
    try {
      this.listings = await this.firebase.readList('items');
    } catch (error) {
      console.error('Error fetching listings', error);
    }
  }

  goToChat(){
    //TODO: the router navigates to a specific chat based on which user you clicked on
    this.router.navigate(['chat']);
  }
}