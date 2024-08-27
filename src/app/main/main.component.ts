import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ProductService } from '../product.service';
import { catchError, throwError } from 'rxjs';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  productsList =  [] as any;
  products = [] as any;
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  productService = inject(ProductService);
  
  constructor(private router:Router){}

  ngOnInit(): void {
    if (localStorage.getItem('user') == null){
      this.router.navigate(['/login']);
    }
    this.productService.getProducts().pipe(
      catchError(error=>{
        alert("Invalid credentials");
        return throwError(()=> error);
      }))
      .subscribe(response=>{
        this.productsList = response;
        this.products = this.productsList;
      });
  }

  filter(category: string | null){
    this.products = this.productsList;
    if (category != "All"){
      this.products = this.products.filter((i: { category: string; }) => i.category == category);
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  deleteFromCart(product:any){
    this.cartService.delete(product);
  }

  addToWishlist(product: any) {
    this.wishlistService.addToCart(product);
  }

  deleteFromWishlist(product:any){
    this.wishlistService.delete(product);
  }

  moveToCart(product: any) {
    this.addToCart(product);
    this.deleteFromWishlist(product);
  }
}
