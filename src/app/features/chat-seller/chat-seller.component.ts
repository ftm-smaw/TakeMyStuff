import { Component, OnInit } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { MAhaComponent } from "../../m-framework/m-aha/m-aha.component";
import { ToastService } from '../../services/toast.service';
import { message } from '../../app-data/Data';
 
@Component({
    selector: 'app-chat-seller',
    standalone: true,
    imports: [FormsModule, CommonModule, MContainerComponent, MAhaComponent],
    templateUrl: './chat-seller.component.html',
    styleUrls: ['./chat-seller.component.css']
})
export class ChatSellerComponent implements OnInit {
  sender_username: string;
  message_content: string = "";
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
    const new_message = { message_content: this.message_content, sender_username: this.sender_username };
    if (new_message.message_content.trim() !== "") {
      let key = this.firebase.addToList('/messages', new_message)!;
    }
    
    let notification: string = new_message.sender_username + ": " +new_message.message_content;
    this.toast.prepare(notification,"success",5000,"New message alert").show();
    this.message_content = "";
  }
}
