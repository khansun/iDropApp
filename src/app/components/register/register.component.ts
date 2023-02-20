import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  msg: string = 'none';
  userRoles: Array<any> = [];

  private roleURL = "http://localhost:8080/auth/roles";
  private apiURL = "http://localhost:8080/auth/user/save";
  private userRoleURL = "http://localhost:8080/auth/role/addtouser";
  constructor (private http: HttpClient, private router: Router) {
    this.http.get(this.roleURL).subscribe(
      res => {        
        Array.from(Object.keys(res), k=>res[k]).forEach(element => {
          this.userRoles.push(element);
        });
      });
  sessionStorage.clear(); 
  }
  

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      fullName: new FormControl(''),
      userRole: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
  onAlertClose(){
    this.msg = 'none';
  }
  userRegister(registerForm: any): void{
    const formValue = registerForm.value;
    // console.log(formValue);
    const headerDict = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
    
    const addUserDict = {   
      "name": formValue.fullName,
      "username": formValue.username,
      "password": formValue.password,
      "roles": []
  }
    const addUserRoleDict = {   
      "username": formValue.username,
      "role" : formValue.role
  }
    console.log(formValue);

    this.http.post(this.apiURL, addUserDict).subscribe(
      res => {
        if(res["username"]==formValue.username){
          sessionStorage.setItem('username',formValue.username);
          console.log("User added successfully");
          this.http.post(this.userRoleURL, addUserRoleDict).subscribe(
            res => {
                sessionStorage.setItem('role',formValue.role);
                console.log("Role added successfully");
              });
          this.router.navigate(['../dashboard']);
          this.msg = 'none';
        }
        else{
          this.msg = 'Please try again!';
          // console.log("Please try again");
        }
      },
      (err: HttpErrorResponse) => {
        if (err['status'] === 401) {
          this.msg = 'Invalid Credentials';
          // console.log('Invalid Credentials.');
        } else {
          this.msg = 'Invalid Request';
          // console.log('Invalid Request.');
        }
      }
      
    );
      

    




  }
 
}

