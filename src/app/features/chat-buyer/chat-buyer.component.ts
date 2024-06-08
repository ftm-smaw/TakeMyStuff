import { Component, OnInit } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { chat_session, message } from '../../app-data/Data';
import { ToastService } from '../../services/toast.service';
import { MAhaComponent } from "../../m-framework/m-aha/m-aha.component";
 
@Component({
    selector: 'app-chat-buyer',
    standalone: true,
    imports: [FormsModule, CommonModule, MContainerComponent, MAhaComponent],
    templateUrl: './chat-buyer.component.html',
    styleUrl: './chat-buyer.component.css',
})
export class ChatBuyerComponent implements OnInit {
  sender_username: string;
  message_content: string = "";
  messages: message[];
  current_chat_session: chat_session;
 
 
  constructor(private firebase: FirebaseService, public toast: ToastService) {
    this.sender_username = "Buyer";
    this.message_content = "";
    this.messages = [];
    this.current_chat_session = new chat_session("", this.messages);
  }
 
  ngOnInit(): void {
    this.createNewChat();
    this.getMessages();
  }
 
  createNewChat(){
    this.firebase.createObject('/chat_session', this.current_chat_session);
  }

  getMessages(): void {
    this.firebase.getDataContinuously('messages').subscribe((data: any) => {
      this.messages = [];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          const item = data[key];
          this.messages.push(new message(key, item.sender_username, item.message_content));
          console.log("in getMessages(), this.messages was successfully initialised");
          this.firebase.updateObject('/chat_session',this.current_chat_session.key,{key: this.current_chat_session.key, messages: this.messages});
          let notification: string = data[key].sender_username + ": " + data[key].message_content;
          this.toast.prepare(notification,"success",5000,"New message alert").show();
        }
      }
    });
  }
 
 endChatSession(){
    this.firebase.deleteObject('/chat_sessions',this.current_chat_session.key);
    while(this.messages.length != 0)
      {for(let i = 0; i < this.messages.length; i++){
      this.firebase.deleteObject('/messages',this.messages[i].key);
     }}
     this.toast.prepare("All messages are removed","success",5000,"Chat Session Ended").show();
  }

  sendMessage(): void {
    const new_message = { message_content: this.message_content, sender_username: this.sender_username };
    if (new_message.message_content.trim() !== "") {
      let key = this.firebase.addToList('/messages', new_message)!;
    }
    this.message_content = "";
  }
}
 