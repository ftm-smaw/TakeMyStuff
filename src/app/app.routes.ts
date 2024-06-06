import { Routes } from '@angular/router';
import { ChatListComponent } from './features/chat-list/chat-list.component';
import { ChatSellerComponent } from './features/chat-seller/chat-seller.component';
import { LoginComponent } from './features/login/login.component';
import { DailyFeedComponent } from './features/daily-feed/daily-feed.component';
import { CreateItemListingComponent } from './features/create-item-listing/create-item-listing.component';
import { CreatePrefsComponent } from './features/create-prefs/create-prefs.component';
import { RouteComponent } from './features/route/route.component';
import { ChatBuyerComponent } from './features/chat-buyer/chat-buyer.component';

export const routes: Routes = [
    {path: '', component:DailyFeedComponent},
    {path: 'login', component:LoginComponent},
    {path: 'chat1', component:ChatSellerComponent},
    {path: 'chat2', component:ChatBuyerComponent},
    {path: 'listing', component:CreateItemListingComponent},
    {path: 'preference', component:CreatePrefsComponent},
    {path: 'route', component:RouteComponent},
];
