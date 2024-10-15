import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  // declare all properties
  todoForm: FormGroup
  tasks: ITask[] = []
  usertasks: any[]= []
  showMessage : boolean = false; overdueMessage: boolean = true
  userID : any

  /**
   * @param router 
   * @param taskService 
   * @param formBuilder 
   */
  constructor(private  router:Router,private formBuilder:FormBuilder, private taskService:TasksService,private activatedRoute: ActivatedRoute){
    //initialize todo form
    this.todoForm = this.formBuilder.group({
      // declare all properties
      taskName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      category: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    })

  }

  /**
   *  Load all tasks and display tasks for current user
   */
  ngOnInit(): void{

      // get user ID
      this.userID = this.activatedRoute.snapshot.paramMap.get('id')

      this.taskService.getTasks().subscribe((data => {
        // load tasks from data to user
        this.tasks = data
        
        // loop through the list of tasks
        for(var list of this.tasks){
          // match of tasks with user ID
          if(list.userID === this.userID){
  
            // Check Overdue date
            if(new Date() > new Date(list.date)){
              // show overdue Message
              this.overdueMessage = false
            }
  
            // push them to new array
            this.usertasks.push(list)
          }
        }
  
      }))
  }


   /**
    *  helper function that will help with creation of new task 
   */
   createTask(){
    // create new todo task
    const newTask = {taskName: this.todoForm.get('taskName')?.value, priority: this.todoForm.get('priority')?.value,
      category: this.todoForm.get('category')?.value, status: "To-Do", date: this.todoForm.get('date')?.value, creationdate: Date(),
      description: this.todoForm.get('description')?.value, userID: this.userID}
    
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
