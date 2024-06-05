import { Injectable } from '@angular/core';
import { ApplicationRef } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message: string;
  type: string; //error, warning, info 
  duration: number; 
  header: string; 
  ngIfControl: boolean; 
  constructor(private appref:ApplicationRef ) { 
    this.message = "";
    this.type = "";
    this.duration = 0; 
    this.header = "";
    this.ngIfControl = false; 
  }
  prepare(message: string, type: string, duration: number, header: string){
    this.message = message;
    this.header = header; 
    this.duration = duration; 
    this.type = type;
    this.ngIfControl = false;
    return this;
  }

  
  show(){
    
    this.ngIfControl = true;
    this.appref.tick();
    setTimeout(()=>{
      this.ngIfControl = false;
      this.appref.tick();
    },this.duration);
  }

}
