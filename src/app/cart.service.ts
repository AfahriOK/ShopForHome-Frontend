import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items = JSON.parse(localStorage.getItem('cartItems') || '[]');

  constructor() { }

  addToCart(product:any) {
    if (this.items.some((item: any) => item.id === product.id)){
      this.incrementQuantity(product.id);
    } else {
      this.items.push({...product, quantity: 1});
    }

    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  getItems() {
    return this.items;
  }

  delete(product: any){
    this.items = this.items.filter((i: { id: any; }) => i.id !== product.id);

    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  incrementQuantity(id: number){
    let item = this.items.find((i: { id: number; }) => i.id === id);
    if (item) {
      item.quantity++;
    }
    
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
  decrementQuantity(id: number){
    let item = this.items.find((i: { id: number; }) => i.id === id);
    if (item) {
      item.quantity--;
      if(item.quantity < 1) {
        this.delete(item);
      }

      localStorage.setItem('cartItems', JSON.stringify(this.items));
    }
  }

  getTotal(){
    return this.items.reduce((acc: number, item: { price: number; quantity: number; }) => {
      return Number((acc + item.price * item.quantity).toFixed(2));
    }, 0);
  }

  clear(){
    localStorage.setItem('cartItems', '[]');
    this.items = JSON.parse(localStorage.getItem('cartItems') || '[]');
  }
}
