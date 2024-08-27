import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { NgIf } from '@angular/common';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: any = {
    email: "",
    password: "",
    roles: ["USER"]
  }

  constructor(private loginService: LoginService){}
  
  authenticateUser() {
    this.loginService.authenticateUser(this.credentials);
  }

  registerUser() {
    this.loginService.registerUser(this.credentials);
  }

  isAdmin(){
    return this.loginService.checkAdmin();
  }
}
