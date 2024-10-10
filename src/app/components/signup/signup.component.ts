import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  // declare all variables
  accountForm: FormGroup
  
  /**
   * @param router 
   * @param formBuilder
   */
  constructor(private router:Router,private formBuilder:FormBuilder){
    // initialize account form
    this.accountForm = this.formBuilder.group({
      // declare and initialize all variables
      firstName: ['',[Validators.required]],
      lastName: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
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

  }

}
