import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:8080/products"
  products = [] as any;

  constructor(private httpClient:HttpClient, private router: Router) { }

  Products = [] as any;
  
 getProducts(){
    return this.httpClient.get(this.url);
  }

  addProduct(data: NgForm){
    console.log(data.value);
    this.httpClient.post(this.url + "/create", data.value).pipe(
      catchError(error=>{
        alert(error.error.message);
        return throwError(()=> error);
      }))
    .subscribe(response=>{
      if(response){
        alert("Product Added!");
        this.router.navigateByUrl('/').then(() => {
        this.router.navigateByUrl('/products');
        });
      } else {
        alert("Something went wrong!");
      }
    });
  }

  deleteProduct(id: number){
    this.httpClient.delete(this.url + "/" + id).subscribe(response=>{
      console.log(response);
    });
    alert("Deleted!");
    this.router.navigateByUrl('/').then(() => {
      this.router.navigateByUrl('/products');
    });
  }

  public updateProduct(data:NgForm){
    console.log(data.value);
    let updateUrl = this.url + "/" + data.value.id;
    this.httpClient.put(updateUrl, data.value).pipe(
      catchError(error=>{
        alert(error.error.message);
        return throwError(()=> error);
      }))
    .subscribe(response=>{
      if(response){
        alert("Update Successful");
        this.router.navigateByUrl('/').then(() => {
          this.router.navigateByUrl('/products');
        });
      } else {
        alert("Something went wrong!")
      }
    });
  }
}
