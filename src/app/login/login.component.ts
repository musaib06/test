import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;
  loginForm!:FormGroup;
  showAdmin:boolean=false
  showUser:boolean=false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    // user form with validator
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
// admin login form with validator
this.loginForm = this.formBuilder.group({
  email: ['', [Validators.required]],
  password: ['', [Validators.required]],
});

  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get name() {
    return this.userForm.get('name');
  }
 exam(){
this.router.navigate(['./exam-dashboard'])
 }
 login(){
  this.router.navigate(['./admin'])
 }
 toggleAdmin(){
  this.showAdmin=!this.showAdmin
}
toggleUser(){
  this.showUser=!this.showUser
}
}
