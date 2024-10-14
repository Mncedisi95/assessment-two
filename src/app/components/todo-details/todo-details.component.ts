import { Component } from '@angular/core';
import { ITask } from '../../../Model/ITask';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { DatePipe, NgIf } from '@angular/common';
import { response } from 'express';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [FormsModule,NgIf,DatePipe],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export class TodoDetailsComponent {

  //declare all propeties
  task : ITask | undefined
  removeMessage: boolean = false; scheduleMessage : boolean = false ; updateMessage : boolean = false
  status: string = ""; 
  date: any 
  
  /**
   * @param route 
   * @param taskService 
   * @param router 
   */
  constructor(private activatedRoute:ActivatedRoute, private taskService: TasksService,private router:Router){

  }

  ngOnInit(): void {
    // first get task id
    const taskId = this.activatedRoute.snapshot.paramMap.get('id')

    // match avaliable task in json server with the current task id
    if(taskId){
      // get all tasks 
      this.taskService.getTasks().subscribe((tasks:ITask[]) => {
        // get matching id
        this.task = tasks.find(task => task.id === +taskId)
      })
    }
  }

  /**
   * Helper function that update task 
   */
  updateTask(){
    // first get task id
    const taskId = this.activatedRoute.snapshot.paramMap.get('id')

    const updateStatus = {status: this.status}

    if(taskId){
      // fetch task in json server
      fetch('http://localhost:3000/tasks/' + taskId, {
        // Send HTTP method with header and body(update)
        method: 'PATCH',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(updateStatus),
      })
      .then(response => response.json())

      // show message 
      this.updateMessage = true
      // set timeout 
      setTimeout(() => {
        // hide message
        this.updateMessage = false
      }, 3000);
    }
  }

  /**
   * Helper Function to remove task from the database --> Json server --> database.json
   */
  removeTask(){
    // first get task id
    const taskId = this.activatedRoute.snapshot.paramMap.get('id')

    if(taskId){
      // fetch  task in the json server
      fetch('http://localhost:3000/tasks/' + taskId , {
        // Send HTTP Method 
        method: 'DELETE',
      })
      .then(response => response.json())
      // show message
      this.removeMessage = true

      //set timeout
      setTimeout(() => {
        // hide message
        this.router.navigate(['/todolist'])
      }, 1500);
    }
  }

  /**
   * Helper function to reschedule task
   */
  rescheduleTask(){
    // first get task id
    const taskId = this.activatedRoute.snapshot.paramMap.get('id')

    // get new date
    const updatedate = {date: this.date}

    if(taskId){
      // fetch task in json server
      fetch('http://localhost:3000/tasks/' + taskId, {
        // Send HTTP method with header and body(update)
        method: 'PATCH',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(updatedate),
      })
      .then(response => response.json())

      // show message 
      this.scheduleMessage = true
      // set timeout 
      setTimeout(() => {
        // hide message
        this.scheduleMessage = false
        
      }, 3000);
    }

  }

  /**
   * Helper that return user to that task page
   */
  returnTasksPage(){
    // return to task page
    this.router.navigate(['/todolist'])
  }
}
