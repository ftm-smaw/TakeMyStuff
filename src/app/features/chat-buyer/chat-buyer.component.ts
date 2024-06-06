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
    console.log("constructor called");
  }
 
  ngOnInit(): void {
    this.createNewChat();
    this.getMessages();
    console.log("ngOnInit called");
  }
 
  createNewChat(){
    this.firebase.createObject('/chat_session', this.current_chat_session);
    console.log("createNewChat called");
  }
 
  /*getMessages(){
    this.firebase.getDataContinuously('/chat_sessions/' + this.current_chat_session.key + '/messages').subscribe((data: any) => {
      this.messages = [];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          const item = data[key];
          this.messages.push(new message(key, item.sender_username, item.message_content));
          console.log("in getMessages(), this.messages was successfully initialised");
        }
      }
      console.log("in getMessages(), data was recieved successfully");
    });
 
    console.log("getMessages called");
  }*/

  getMessages(): void {
    this.firebase.getDataContinuously('messages').subscribe((data: any) => {
      this.messages = [];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          const item = data[key];
          this.messages.push(new message(key, item.sender_username, item.message_content));
          console.log("in getMessages(), this.messages was successfully initialised");
          this.firebase.updateObject('/chat_session',this.current_chat_session.key,{key: this.current_chat_session.key, messages: this.messages});
          
          //TODO:
          //add a function that adds the message to the messages array in the current_chat_session
          //then pushes it to the firebase thing
        }
      }
      console.log("in getMessages(), data was recieved successfully");
    });
    console.log("getMessages called");
  }
 
  endChatSession(){
    this.firebase.deleteObject('/chat_sessions',this.current_chat_session.key);
    for(let i = 0; i <= this.messages.length; i++){
      this.firebase.deleteObject('/messages',this.messages[i].key);
      console.log(i);
    }
    console.log("endChatSession called");
  }
 
 
  /*sendMessage(){
    const new_message = { message_content: this.message_content, sender_username: this.sender_username };
    if (new_message.message_content.trim() !== "") {
      let key = this.firebase.addToList('/chat_session/messages', new_message)!;
      console.log("in sendMessages(), the newest messages was sucessfully pushed to the firebase");
    }
    
    let notification: string = new_message.sender_username + ": " +new_message.message_content;
    this.toast.prepare(notification,"success",5000,"New message alert").show();
    this.message_content = "";
    console.log("sendMessage called");
  }*/

  sendMessage(): void {
    const new_message = { message_content: this.message_content, sender_username: this.sender_username };
    if (new_message.message_content.trim() !== "") {
      let key = this.firebase.addToList('/messages', new_message)!;
      console.log("in sendMessages(), the newest messages was sucessfully pushed to the firebase");
    }
    
    let notification: string = new_message.sender_username + ": " +new_message.message_content;
    this.toast.prepare(notification,"success",5000,"New message alert").show();
    this.message_content = "";
    console.log("sendMessage called");
  }
}
 