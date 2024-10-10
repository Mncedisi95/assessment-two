import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  // declare all variables
  loginForm: FormGroup

  /**
   * Default Constructor 
   * 
   * @param router 
   * @param formBuilder
   */
  constructor(private router:Router,private formBuilder:FormBuilder){
    // initialize login form
    this.loginForm = this.formBuilder.group({
      // declare email and password
      email: ['',[Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
  }

  /**
   * Helper function that redirect user to signup page
   */
  redirectToSignUp(){
    // redirect user to signup 
    this.router.navigate(['signup'])
  }

  /**
   * Helper function that authenticate user and redirect to todo list page.
   */
  authenticate(){

  }
}
