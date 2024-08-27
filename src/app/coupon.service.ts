import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  url: string = "http://localhost:8080/coupons"
  couponResponse: any = {"discount": 0};

  constructor(private httpClient:HttpClient, private router: Router) { }
  
 getCoupons(){
    return this.httpClient.get(this.url);
  }

  addCoupon(data: NgForm){
    console.log(data.value);
    this.httpClient.post(this.url, data.value).pipe(
      catchError(error=>{
        alert(error.error.message);
        return throwError(()=> error);
      }))
    .subscribe(response=>{
      if(response){
        alert("Coupon Added!");
        this.router.navigateByUrl('/').then(() => {
        this.router.navigateByUrl('/coupons');
        });
      } else {
        alert("Something went wrong!");
      }
    });
  }

  deleteCoupon(id: number){
    this.httpClient.delete(this.url + "/coupon/" + id).subscribe(response=>{
      console.log(response);
    });
    alert("Deleted!");
    this.router.navigateByUrl('/').then(() => {
      this.router.navigateByUrl('/coupons');
    });
  }

  public updateCoupon(data:NgForm){
    console.log(data.value);
    let updateUrl = this.url + "/coupon/" + data.value.id;
    this.httpClient.put(updateUrl, data.value).pipe(
      catchError(error=>{
        alert(error.error.message);
        return throwError(()=> error);
      }))
    .subscribe(response=>{
      if(response){
        alert("Update Successful");
        this.router.navigateByUrl('/').then(() => {
          this.router.navigateByUrl('/coupons');
        });
      } else {
        alert("Something went wrong!")
      }
    });
  }

  public validateCoupon(code: any) {
    let updateUrl = this.url + "/validate";
    this.httpClient.post(updateUrl, {"code": code}).pipe(
      catchError(error=>{
        alert(error.error.message);
        this.couponResponse = {"discount":0}
        return throwError(()=> error);
      }))
    .subscribe(response=>{
      if(response){
        alert("Coupon Found");
        this.couponResponse = response;
        console.log(response);
      } else {
        alert("Something went wrong!");
      }
    });
  }
}
