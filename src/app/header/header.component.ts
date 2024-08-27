import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { MaterialModule } from '../material/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, MaterialModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  menu:String = "Home"
  constructor(private loginService: LoginService){}

  setMenu(name: String){
    this.menu = name;
  }

  isAdmin(){
    return this.loginService.checkAdmin();
  }

  isLoggedIn(){
    return this.loginService.checkLoggedIn();
  }

  logout() {
    this.loginService.logout();
    }

    home() {
      this.loginService.home();
      }
}
