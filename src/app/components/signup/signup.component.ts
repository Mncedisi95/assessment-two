import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { first } from 'rxjs';
import { IUser } from '../../../Model/IUser';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  // declare all propeties
  accountForm: FormGroup
  showSuccessMessage: boolean = false;   showErrorMessage: boolean = false
  users: IUser[] = []
  
  /**
   * @param router 
   * @param formBuilder
   * @param userService
   */
  constructor(private router:Router,private formBuilder:FormBuilder,private userService: UsersService){
    // initialize account form
    this.accountForm = this.formBuilder.group({
      // declare and initialize all variables
      fname: ['',[Validators.required]],
      lname: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      confirmPass: ['', [Validators.required, Validators.minLength(8),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
    }, {
      // create a password validator 
      validators: this.passwordMatchValidator,
    })
  }

  ngOnInit(){
    // Get Request
    this.userService.getUsers().subscribe((data => {
      // get all users from the database
      this.users = data
    }))

  }

  /**
   * @param control 
   * @returns true if password matches or false if does not match 
   */
  passwordMatchValidator(control: AbstractControl){
    //check if password matchs confirm password
    return control.get('password')?.value === control.get('confirmPass')?.value? null : {mismatch: true};
  }

  /**
   * Helper function that verify email before registration
   * 
   * @returns true if their is a email matching or false if none 
   */
  emailVerification(): boolean{
    // declare a variable 
     var check : boolean = false 
    
    for(var user of this.users){ // loop through list of users 
  
      if(user.email === this.accountForm.get('email')?.value){    // check email match
        check = true // email match
      }
      else{
        check = false //email does not match
      }
    }
    return check // return true or false
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
    
    // verify email before registration
    if(this.emailVerification() === true){
      this.showErrorMessage = true
      // set timeout
      setTimeout(() => {
        // hide error message
        this.showErrorMessage = false
      }, 5000);
    }
    else {
      // register new user
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
      this.showSuccessMessage = true
  
      // set timeout to hide message
      setTimeout(() => {
        // hide success message
        this.showSuccessMessage = false
        setTimeout(() => {
          //redirect user to sign-in page
          this.router.navigate(['signin'])
        }, 1000);
      }, 2500);
        
      }, 3000);

    }  

  }
  
}
