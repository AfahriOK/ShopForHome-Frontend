import { Component, inject } from '@angular/core';
import { CouponService } from '../coupon.service';
import { MaterialModule } from '../material/material.module';
import { FormsModule, NgForm } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.css'
})
export class CouponComponent {

  coupons = [] as any
  coupon = {
    id: -1,
    code:"",
    discountPercent: -1,
    expDate: null,
  }

  isUpdating: boolean = false;
  couponService = inject(CouponService);

  constructor(){}

  ngOnInit(): void {
    this.couponService.getCoupons().pipe(
      catchError(error=>{
        alert("Invalid credentials");
        return throwError(()=> error);
      }))
      .subscribe(response=>{
        this.coupons = response;
      });
  }
  
  displayForm(coupon: any){
    this.coupon = coupon;
    this.isUpdating = !this.isUpdating;
  }

  cancel(){
    this.isUpdating = !this.isUpdating;
  }

  deleteCoupon(id: number){
    this.couponService.deleteCoupon(id);
  }

  updateCoupon(form: NgForm){
    this.isUpdating = !this.isUpdating;
    this.couponService.updateCoupon(form);
  }

  addCoupon(form: NgForm){
    this.couponService.addCoupon(form);
  }
}
