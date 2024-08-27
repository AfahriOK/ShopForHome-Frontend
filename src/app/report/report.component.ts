import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { MaterialModule } from '../material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  orders = [] as any;
  ordersList = [] as any;
  orderService = inject(OrderService);
  search = "ALL";

  constructor(private router:Router){}

  ngOnInit(): void {
    if (localStorage.getItem('user') == null){
      this.router.navigate(['/login']);
    }
     this.orderService.getOrders()
    .subscribe(response =>{
      this.ordersList = response;
      this.orders = this.ordersList;
    });
  }

  filter(search: string | null){
    this.orders = this.ordersList;
    switch (search) {
      case "1st Quarter": 
        this.orders = this.orders.filter((i: { date: string; }) => i.date >= "2024-01-01" && i.date <= "2024-03-30");
        break;
      case "2nd Quarter":
        this.orders = this.orders.filter((i: { date: string; }) => i.date >= "2024-04-01" && i.date <= "2024-06-30");
        break;
      case "3rd Quarter": 
      this.orders = this.orders.filter((i: { date: string; }) => i.date >= "2024-07-01" && i.date <= "2024-09-30");
        break;
      case "4th Quarter":
        this.orders = this.orders.filter((i: { date: string; }) => i.date >= "2024-10-01" && i.date <= "2024-12-31");
        break;
      default:
        this.orders = this.ordersList;
    }
  }
}
