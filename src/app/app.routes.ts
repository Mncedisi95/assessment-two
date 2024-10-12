import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';

export const routes: Routes = [
    
    //Setup all routes
    {path: 'signin', component:SigninComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'todolist', component:TodoListComponent},
    {path: 'tododetail/:id',component:TodoDetailsComponent},
    {path: '', redirectTo:'/signin', pathMatch:'full'}
    
];
