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

  // declare all variables
  loginForm: FormGroup
  users : IUser[] = []

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

  ngOnInit(): void{
      // Get Request
    this.userService.getUsers().subscribe((data => {
      // get all users from the database 
      this.users = data
      console.log(this.users);
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

    //clear form 
    this.loginForm.reset()
  }
  // match user with the email and password entered by user

  // redirect to task page using user id.
}
