import { Component } from '@angular/core';
import { ITask } from '../../../Model/ITask';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [NgIf,DatePipe],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export class TodoDetailsComponent {

  //declare all variables
  task : ITask | undefined

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
   * Helper that return user to that task page
   */
  returnTasksPage(){
    // return to task page
    this.router.navigate(['/'])
  }
}
