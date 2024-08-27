import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { catchError, throwError } from 'rxjs';
import { MaterialModule } from '../material/material.module';
import { FormsModule, NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  products =  [] as any;
  productsList = [] as any;
  product = {
    id: -1,
    name:"",
    price: -1,
    description:"",
    category:"",
    image: "",
    stock: ""
  }

  isUpdating: boolean = false;

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

  addProduct(form: NgForm){
    this.productService.addProduct(form);
  }

  displayForm(product: any){
    this.product = product;
    this.isUpdating = !this.isUpdating;
  }

  filter(category: string | null){
    this.products = this.productsList;
    if (category != "All"){
      this.products = this.products.filter((i: { category: string; }) => i.category == category);
    }
  }

  cancel(){
    this.products = this.productsList;
    this.isUpdating = !this.isUpdating;
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id);
  }

  updateProduct(form: NgForm){
    this.isUpdating = !this.isUpdating;
    this.productService.updateProduct(form);
  }
}
