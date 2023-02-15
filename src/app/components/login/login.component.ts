import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  msg: string = 'none';
  

  private apiURL = "http://localhost:8080/auth/login";
  constructor (private http: HttpClient, private router: Router) {
  sessionStorage.clear(); 
  }
  

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
  onAlertClose(){
    this.msg = 'none';
  }
  userLogin(loginForm: any): void{
    const formValue = loginForm.value;
    console.log(formValue);
    const headerDict = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
    

    this.http.post(this.apiURL, formValue, { headers: headerDict }).subscribe(
      res => {
        if(res["status"]==200){
          sessionStorage.setItem('username',res["username"]);
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

