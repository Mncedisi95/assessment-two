import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { IUser } from '../../../Model/IUser';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  // declare all propeties
  loginForm: FormGroup
  users : IUser[] = []
  showErrorMessage : boolean = false

  /**
   * Default Constructor 
   * 
   * @param router 
   * @param formBuilder
   */
  constructor(private router:Router,private formBuilder:FormBuilder, private userService:UsersService){
    // initialize login form
    this.loginForm = this.formBuilder.group({
      // declare email and password
      email: ['',[Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8),
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
    })
  }

  /**
   * Load all users 
   */
  ngOnInit(): void{
      // Get Request
    this.userService.getUsers().subscribe((data => {
      // get all users from the database 
      this.users = data
    }))
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

    for(var user of this.users){ // loop through the list of users

     // match user email and password 
     if(user.email === this.loginForm.get('email')?.value && user.password === this.loginForm.get('password')?.value){
      // redirect user to task page.
      this.router.navigate(['todolist'])
     }
     else{
      //set timeout
      setTimeout(() => {
           //clear form 
       this.loginForm.reset()
       // display error message
       this.showErrorMessage = true

       setTimeout(() => {
        // hide error message
        this.showErrorMessage = false

       }, 3000);
      }, 1000);
    
     }

    }

  }

}
