import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { ReportComponent } from './report/report.component';
import { CouponComponent } from './coupon/coupon.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    {path:"", component: LoginComponent},
    {path:"login", component: LoginComponent},
    {path:"home", component: MainComponent},
    {path:"products", component: ProductComponent},
    {path:"users", component: UserComponent},
    {path:"reports", component: ReportComponent},
    {path:"coupons", component: CouponComponent},
    {path:"checkout", component: CheckoutComponent}
];
