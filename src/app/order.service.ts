import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = "http://localhost:8080/orders"

  constructor(private httpClient:HttpClient, private router: Router, private cartService:CartService) { }

  createOrder(data: { user: string | null; originalPrice: any; finalPrice: number; coupon: any; }){
    this.httpClient.post(this.url, data).pipe(
      catchError(error=>{
        alert(error.error.message);
        return throwError(()=> error);
      }))
    .subscribe(response=>{
      if(response){
        alert("Order Placed!");
        this.cartService.clear();
        this.router.navigateByUrl('/').then(() => {
          this.router.navigateByUrl('/home');
        });
      } else {
        alert("Something went wrong!");
      }
    });
  }

  getOrders(){
    return this.httpClient.get(this.url + "/all");
  }
}
