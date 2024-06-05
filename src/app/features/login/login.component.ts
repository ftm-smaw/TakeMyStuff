import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
 
 
@Component({
  selector: 'app-feature1',
  standalone: true,
  imports: [CommonModule, FormsModule, MContainerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: string = '';
  username: string = '';
  correctusername: string='nada';
  correctpass: string='nada4321'
  loginfailed: boolean = false;
 
  constructor(private router: Router) {
    this.password = '';
    this.username = '';
  }
 
  login() {
    if (this.username === this.correctusername && this.password === this.correctpass) {
    this.router.navigate(['chat']);
    } else {
    'invaild pass or username'
      this.loginfailed = true;
    }
  }
}