import { Component, inject } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule, NgForm } from '@angular/forms';
import { CartService } from '../cart.service';
import { CouponService } from '../coupon.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  discount: number = 0;
  cart = localStorage.getItem('cartItems');
  cartService = inject(CartService);
  couponService = inject(CouponService);
  orderService = inject(OrderService);
  totalPrice: number = this.cartService.getTotal();

  checkout(form: NgForm) {
    const data = {
      user: localStorage.getItem("user"),
      originalPrice: this.cartService.getTotal(),
      finalPrice: this.totalPrice,
      coupon: form.value.coupon
    }

    this.orderService.createOrder(data);
  }

    deleteFromCart(product: any) {
      this.cartService.delete(product);
    }

    validateCoupon(code: any) {
      this.couponService.validateCoupon(code.value);
      this.discount = this.couponService.couponResponse.discount;
      this.totalPrice = Number((this.cartService.getTotal() - (this.cartService.getTotal() * (this.discount/100))).toFixed(2));
      }

}
