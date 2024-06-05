import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { MSearchButtonComponent } from '../../m-framework/m-search-button/m-search-button.component';

import { Router } from '@angular/router';
import { MTableComponent } from '../../m-framework/m-table/m-table.component';
import { FirebaseService } from '../../services/firebase.service';
import { message } from '../chat-seller/chat-seller.component';

export class chat{
    key: string;
    lastMessage: message;
    recipient: string;
    allmessages: message[];

    constructor(key: string, recipient:string, lastMessage: message){
        this.key = key;
        this.recipient = recipient;
        
        this.lastMessage = lastMessage;
        this.allmessages = [];
    }
}

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, MContainerComponent, MCardComponent, MSearchButtonComponent, MTableComponent],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent implements OnInit{
  chatlist: chat[];
  filterTerm: string = "";

  constructor(private router: Router, private firebase: FirebaseService){
    this.chatlist = [];
    let chat1 = new chat("", "John", new message("","","")); 
    this.chatlist.push(chat1);
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  goToChat(){
    //TODO: the router navigates to a specific chat based on which chat you clicked on
    this.router.navigate(['chat']);
  }

  getChat(){
  }

  deleteChat(chatId: number){
    let index = 0;
    for(let i = 0; i < this.chatlist.length; i++){
      if(this.chatlist[i].key == chatId.toString())
        index = i;
    }
    this.chatlist.splice(index,1);
    this.firebase.removeFromList("items",chatId.toString());
  }

}
