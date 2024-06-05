import { Component, OnInit } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { MAhaComponent } from "../../m-framework/m-aha/m-aha.component";
import { ToastService } from '../../services/toast.service';
 
export class message {
    key: string;
    sender_username: string;
    message_content: string;
 
    constructor(key: string, sender_username: string, content: string) {
        this.key = key;
        this.sender_username = sender_username;
        this.message_content = content;
    }
}
 
@Component({
    selector: 'app-chat-seller',
    standalone: true,
    templateUrl: './chat-seller.component.html',
    styleUrls: ['./chat-seller.component.css'],
    imports: [FormsModule, CommonModule, MContainerComponent, MAhaComponent]
})
export class ChatSellerComponent implements OnInit {
  sender_username: string;
  message_content: string;
  messages: message[];
 
  constructor(private firebase: FirebaseService, public toast: ToastService) {
    this.sender_username = "Seller";
    this.message_content = "";
    this.messages = [];
  }
 
  ngOnInit(): void {
    this.getMessages();
  }
 
  getMessages(): void {
    this.firebase.getDataContinuously('messages').subscribe((data: any) => {
      this.messages = [];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          const item = data[key];
          this.messages.push(new message(key, item.sender_username, item.message_content));
        }
      }
    });
  }


  sendMessage(): void {
    if (this.message_content.trim() !== "") {
      const new_message = { message_content: this.message_content, sender_username: this.sender_username };
      let key = this.firebase.addToList('/messages', new_message)!;
      if(new_message.sender_username != this.sender_username){
        this.toast.prepare(new_message.sender_username + ": " +new_message.message_content,"success",5000,"New message alert").show();
      }
      this.message_content = '';
    }
  }
}
