import { Injectable } from '@angular/core';
import { getDatabase, ref, set, get, update, remove, push, child, onValue } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService { 
  db: any;

  constructor() {
    this.setupFirebase();  
    this.db = getDatabase();    
  }
  
  setupFirebase(){
    const firebaseConfig = {
      apiKey: "AIzaSyDWjZofwxC7HziHtWh90rbgDYEaIW0FKGw",
      authDomain: "takemystuff-b07c0.firebaseapp.com",
      databaseURL: "https://takemystuff-b07c0-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "takemystuff-b07c0",
      storageBucket: "takemystuff-b07c0.appspot.com",
      messagingSenderId: "501506519992",
      appId: "1:501506519992:web:98b7ab93c19c7ee5afd54d"
    };

    initializeApp(firebaseConfig);
  }
  
  createObject(path: string, data: any) {
    return set(ref(this.db, path), data);
  }
  
  async readObject(path: string, key: string): Promise<string>{
    return get(child(ref(this.db), `${path}/${key}`)).then((snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    })      
    }
  
    updateObject(path: string, key: string, data: any) {
    update(ref(this.db, `${path}/${key}`), data);
  }
  
  deleteObject(path: string, key: string){
    remove(ref(this.db, `${path}/${key}`));
  }

  async readList(path: string): Promise<any[]> {
    const snapshot = await get(ref(this.db, path));
    const list: any[] = [];
    snapshot.forEach(childSnapshot => {
      list.push(childSnapshot.val());
    });
    return list;
  }

  addToList(path: string, data: any){
    return push(ref(this.db, path), data).key;
  }

  removeFromList(path: string, key: string){
    remove(ref(this.db, `${path}/${key}`));
  }

  getDataContinuously(path: string): Observable<[]>{
  return new Observable((observer) => {
    onValue(ref(this.db, path), (data) => {
      if(data.valueOf()!= null)
        observer.next(data.val())})})
  }
  
  reset(){
    remove(ref(this.db, '/'));
  }

}