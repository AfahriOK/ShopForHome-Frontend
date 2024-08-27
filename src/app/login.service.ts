import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "http://localhost:8080/users"
  
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  authResponse: any;

  constructor(private httpClient:HttpClient, private router: Router) { }

   public async authenticateUser(credentials: any) {
    console.log(credentials);
    await this.httpClient.post(this.url + "/authenticate", credentials).pipe(
      catchError(error=>{
        alert("Invalid credentials");
        return throwError(()=> error);
      }))
    .subscribe(response=>{
      if(response) {
        console.log(response);
        this.authResponse = response;
        this.isLoggedIn = true;
        this.isAdmin = this.authResponse.admin;
        localStorage.setItem("jwt", this.authResponse.jwt);
        localStorage.setItem("user", credentials.email)
        this.home();
      } else {
        alert("Something went wrong!")
      };
    });
  }

  async registerUser(credentials: any) {
    await this.httpClient.post(this.url + "/create", credentials).pipe(
      catchError(error=>{
        alert(error.error.message);
        return throwError(()=> error);
      }))
      .subscribe(response =>{
        if(response) {
          alert("Registration successful")
        }
      }
    );
  }

  home() {
    this.router.navigate(["/home"]);
  }

  public checkLoggedIn(): boolean{
    return this.isLoggedIn;
  }

  public checkAdmin(): boolean{
    return this.isAdmin;
  }

  public logout() {
    this.isAdmin = false;
    this.isLoggedIn = false;
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    this.router.navigateByUrl("/login");
  }
}
