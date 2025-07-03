import {Component, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskBlock} from './task-block/task-block';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskBlock, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'tasklist-frontend';
  protected readonly TaskBlock = TaskBlock;

  enableDelete: boolean  = false;
  search:string='';

  @ViewChild(TaskBlock) taskBlockComponent!: TaskBlock;
}
