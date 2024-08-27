import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private items = JSON.parse(localStorage.getItem('wishItems') || '[]');

  constructor() { }

  addToCart(product:any) {
    if (this.items.some((item: any) => item.id === product.id)){
      alert("Already in Wishlist");
    } else {
      this.items.push(product);
    }

    localStorage.setItem('wishItems', JSON.stringify(this.items));
  }

  getItems() {
    return this.items;
  }

  delete(product: any){
    this.items = this.items.filter((i: { id: any; }) => i.id !== product.id);

    localStorage.setItem('wishItems', JSON.stringify(this.items));
  }
}
