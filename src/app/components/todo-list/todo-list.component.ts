import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITask } from '../../../Model/ITask';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor,NgClass],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  // declare all variables
  todoForm: FormGroup
  tasks: ITask[] = [];
  showMessage : boolean = false

  /**
   * @param router 
   * @param taskService 
   * @param formBuilder 
   */
  constructor(private  router:Router,private formBuilder:FormBuilder, private taskService:TasksService){
    //initialize todo form
    this.todoForm = this.formBuilder.group({
      // declare all variables
      taskName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      category: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    })

  }

  ngOnInit(): void{

    this.taskService.getTasks().subscribe((data => {
      this.tasks = data
      console.log(this.tasks);
    }))
  }

   /**
    *  helper function that will help with creation of new task 
   */
   createTask(){
    // create new todo task
    const newTask = {taskName: this.todoForm.get('taskName')?.value, priority: this.todoForm.get('priority')?.value,
      category: this.todoForm.get('category')?.value, status: "To-Do", date: this.todoForm.get('date')?.value, creationdate: Date(),
      description: this.todoForm.get('description')?.value}
    
      // fetch or get from Json server
      fetch('http://localhost:3000/tasks', {
        
        method: 'POST', // Http Request
        headers: {'Content-Type': 'application/json'}, // header
        body: JSON.stringify(newTask), // Body
      })
      .then(response => response.json)
      .then(tasks => console.log(tasks));

      this.showMessage = false

      // set timeout of the form, success message 
      setTimeout(() => {
          // reset form
      this.todoForm.reset()
      //display success message
      this.showMessage = true  

      // hide success after 2 second
      setTimeout(() => {
        this.showMessage = false
      }, 2500);

      }, 1500);
   }
   
  /**
   * Helper function that redirect user to task detail page
   */
  redirectToTaskDetail(task: ITask){
    // redirect user to view task details
    this.router.navigate(['/tododetail', task.id])
  }



}
