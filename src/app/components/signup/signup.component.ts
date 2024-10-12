import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { first } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  // declare all variables
  accountForm: FormGroup
  showMessage: boolean = false;
  
  /**
   * @param router 
   * @param formBuilder
   */
  constructor(private router:Router,private formBuilder:FormBuilder){
    // initialize account form
    this.accountForm = this.formBuilder.group({
      // declare and initialize all variables
      fname: ['',[Validators.required]],
      lname: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      confirmPass: ['', [Validators.required, Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
    })
  }

  /**
   * Helper function that redirect user to signin page
   */
  redirectToSignIn(){
    // redirect user to signin page
    this.router.navigate(['/signin'])
  }

  /**
   * Helper function that create account for new user 
   */
  createAccount(){

    // create new user account
    const newUser = {firstName: this.accountForm.get('fname')?.value, lastName: this.accountForm.get('lname')?.value, 
      email: this.accountForm.get('email')?.value, password: this.accountForm.get('password')?.value}

    fetch('http://localhost:3000/users', {

      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser),
    })
    .then(response => response.json())
    .then(users => console.log(users));

    // set timeout 
    setTimeout(() => {
    //clear form 
    this.accountForm.reset()
    // show message 
    this.showMessage = true

    // set timeout to hide message
    setTimeout(() => {
      // hide success message
      this.showMessage = false
    }, 2500);
      
    }, 3000);
  }
  
}
