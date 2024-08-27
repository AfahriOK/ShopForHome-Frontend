import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:8080/users"

  constructor(private httpClient:HttpClient, private router: Router) { }

  public getUsers() {
    return this.httpClient.get(this.url + "/all");
  }

  public addUser(data: NgForm) {
    this.httpClient.post(this.url + "/create", data.value).pipe(
      catchError(error=>{
        alert(error.error.message);
        return throwError(()=> error);
      }))
    .subscribe(response=>{
      if(response){
        alert("User Added!");
        this.router.navigateByUrl('/').then(() => {
          this.router.navigateByUrl('/users');
        });
      } else {
        alert("Something went wrong!");
      }
    });
  }

  public deleteUser(id: number){
    let deleteUrl = this.url + "/user/" + id;
    this.httpClient.delete(deleteUrl).subscribe(response=>{
      console.log(response);
    });
    alert("User Deleted!");
    this.router.navigateByUrl('/').then(() => {
      this.router.navigateByUrl('/users');
    });
  }

  public updateUser(data:NgForm){
    let updateUrl = this.url + "/user/" + data.value.id;
    this.httpClient.put(updateUrl, data.value).pipe(
      catchError(error=>{
        alert(error.error.message);
        return throwError(()=> error);
      }))
    .subscribe(response=>{
      if(response){
        alert("Update Successful");
        this.router.navigateByUrl('/').then(() => {
          this.router.navigateByUrl('/users');
        });
      } else {
        alert("Something went wrong!")
      }
    });
  }
}
