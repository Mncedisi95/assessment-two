import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  // declare all variables
  todoForm: FormGroup
  /**
   * @param router 
   */
  constructor(private  router:Router,private formBuilder:FormBuilder){
    //initialize todo form
    this.todoForm = this.formBuilder.group({
      // declare all variables
      taskName: ['', [Validators.required]]
    })

  }

  /**
   * Helper function that redirect user to task detail page
   */
  redirectToTaskDetail(){
    // redirect user 
    this.router.navigate(['tododetail'])
  }

  // helper function that will help with creation of new task
  createTask(){
  }

}
