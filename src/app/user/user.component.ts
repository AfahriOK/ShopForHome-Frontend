import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

isUpdating: boolean = false;
userService = inject(UserService);
user = {
  id: -1,
  email: "",
  password: "",
  roles: []
}
users = [] as any;

constructor(private router: Router){}

ngOnInit(): void {
  if (localStorage.getItem('user') == null){
    this.router.navigate(['/login']);
  }
  this.userService.getUsers()
    .subscribe(response=>{
      this.users = response;
    });
}

addUser(form: NgForm) {
  if(form.value.roles) {
    form.value.roles = ["USER","ADMIN"];
  } else{
    form.value.roles = ["USER"];
  }
  this.userService.addUser(form);
}


  displayForm(user: any){
    this.user = user;
    this.isUpdating = true;
  }

  deleteUser(id: number){
    this.userService.deleteUser(id);
  }

  updateUser(form: NgForm) {
    this.isUpdating = !this.isUpdating;
    if(form.value.roles) {
      form.value.roles = ["USER","ADMIN"];
    } else{
      form.value.roles = ["USER"];
    }
    this.userService.updateUser(form);
    }

    cancel(){
      this.isUpdating = false;
    }
}
