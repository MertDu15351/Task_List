import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {TaskService} from '../services/TaskService';
import {Task} from '../Models/task';
import {DatePipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { App } from '../app';

@Component({
  selector: 'task-block',
  imports: [
    NgForOf,
    DatePipe,
    NgStyle,
    NgIf,
    FormsModule
  ],
  templateUrl: './task-block.html',
  styleUrls: ['./task-block.css']
})
export class TaskBlock implements OnInit{

  colors = [
    '#f28b82', // soft red
    '#fbbc04', // soft orange
    '#fff475', // light yellow
    '#ccff90', // light green
    '#a7ffeb', // aqua green
    '#cbf0f8', // sky blue
    '#aecbfa', // pastel blue
    '#d7aefb', // light purple
    '#fdcfe8', // light pink
    '#e6c9a8', // sand
    '#e8eaed', // light gray
    '#caffbf', // mint green
    '#ffd6a5', // peach
    '#ffadad', // blush red
    '#cafffb', // icy blue
    '#bdb2ff', // lavender
    '#ffc6ff', // soft magenta
  ];

  tasks: Task[]=[];
  showForm: boolean = false;
  enableDeleteMode: boolean = false;
  newTask:Partial<Task> = { title: '',description: ''};
  tempTasks: Task [] = [];

  constructor(private taskService: TaskService) {

  }

  getColorForTask(): string {
      return this.colors[Math.floor((Math.random()*16415531653)%this.colors.length)]
  }

  showAddForm(){
    this.showForm=true;
  }

  hideForm(){
    this.showForm=false;
    this.newTask = { title: '', description: ''};
  }

  ngOnInit(){
    this.refreshTasks();
  }

  submitTask(){
    this.newTask.color=this.getColorForTask();
    this.taskService.addTask(this.newTask).subscribe(() => {
      this.showForm=false;
      this.refreshTasks();
      this.newTask = { title: '', description: '', color: ''};
    });
  }

  @Output() onDeleteComplete = new EventEmitter<void>();

  deleteTask(id:number){
    this.taskService.deleteTask(id).subscribe(()=> {
      this.enableDeleteMode = false;
      this.refreshTasks();

      this.onDeleteComplete.emit();
    });
  }

  enableDelete(){
    this.enableDeleteMode=true;
  }

  disableDelete(){
    this.enableDeleteMode=false;
  }


  searchTask(search:string){

    if(!search){
      this.tasks=this.tempTasks;
    }
    else{
      this.tasks=this.tempTasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }

  }

  refreshTasks(){
    this.taskService.getTasks().subscribe(tasks => {
      this.tempTasks = tasks;
      this.tasks = tasks;
    });
  }



  deleteAllTasks(){
    if(window.confirm("Are you sure you want to delete all tasks?")) {
      this.taskService.deleteAllTasks().subscribe(() => {
        this.enableDeleteMode = false;
        this.refreshTasks();

        this.onDeleteComplete.emit();
      });
    }
  }
}
