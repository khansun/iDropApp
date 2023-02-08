import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  private apiURL = "http://localhost:8080/auth/login";
  constructor (private http: HttpClient) {}
  


  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  userLogin(loginForm: any): void{
    const formValue = loginForm.value;
    console.log(formValue);
    const headerDict = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
    this.http.get(this.apiURL+"?"+"username="+formValue.username+"&password="+formValue.password).subscribe(
      res => {
        console.log("GET  ",res)},
      mockError => {
        console.log("GET Error", mockError);
      }
        );
    ;
    // this.http.post(this.apiURL, null, { headers: headerDict, params: formValue }).subscribe(
      
    //   res => {
    //     console.log("Successful ",formValue);
    //     console.log( res);
    //   },
    //   mockError => {
    //     console.log("ERROOOOOORRR", formValue);
    //     console.log('error', mockError);
    //   }
    // );



  }
}

