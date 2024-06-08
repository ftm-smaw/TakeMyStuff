import { Routes } from '@angular/router';
import { ChatSellerComponent } from './features/chat-seller/chat-seller.component';
import { DailyFeedComponent } from './features/daily-feed/daily-feed.component';
import { CreateItemListingComponent } from './features/create-item-listing/create-item-listing.component';
import { CreatePrefsComponent } from './features/create-prefs/create-prefs.component';
import { ChatBuyerComponent } from './features/chat-buyer/chat-buyer.component';
 
export const routes: Routes = [
    {path: '', component:DailyFeedComponent},
    {path: 'seller', component:ChatSellerComponent},
    {path: 'buyer', component:ChatBuyerComponent},
    {path: 'listing', component:CreateItemListingComponent},
    {path: 'preference', component:CreatePrefsComponent},
 
];
 