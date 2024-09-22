import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { appData } from '../utils/types';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {

  appData: appData | null;

  title: string = "";

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.appData = this.localStorage.getAppData();
    
    if(this.appData === null) {
      this.appData = {
        global_id: -1,
        todoList: []
      }
      this.localStorage.setAppData(this.appData);
    }

  }

  deleteTodoList(todoListId: number) {
    console.log(todoListId);
    if (this.appData !== null) {
      this.appData.todoList = this.appData?.todoList.filter(el => el.id !== todoListId);
    }
  }

  createTodoList() {
    if(this.title.length > 0) {
      const todoListId = this.localStorage.setTodoList({
        title: this.title,
        id: 0,
        todos: []
      });
      this.appData?.todoList.push({
        id: todoListId,
        title: this.title,
        todos: []
      });
      this.title = '';
    }
    
  }

}
