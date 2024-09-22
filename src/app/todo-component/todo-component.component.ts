import { Component, EventEmitter, Input, Output } from '@angular/core';
import { todoList } from '../utils/types';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-todo-component',
  templateUrl: './todo-component.component.html',
  styleUrl: './todo-component.component.css'
})
export class TodoComponentComponent {


  @Input() todoList: todoList = {id: 0, title: "", todos: []};

  @Output() _deleteEvent = new EventEmitter<number>(); 


  constructor(private localStorage: LocalStorageService) {}


  deleteTodoList() {
    this.localStorage.deleteTodoList(this.todoList.id);
    this._deleteEvent.emit(this.todoList.id);
  }

  addTodo() {
    const todo = {
      id: -1,
      title: 'Edit task title',
      description: '',
      created_date: new Date(),
      completed_date: null,
      is_completed: false,
    };
    const todoId = this.localStorage.setTodo(todo, this.todoList.id);
    this.todoList.todos.push({
      ...todo,
      id: todoId,
    });
  }

  deleteTodo(todoId: number) {
    this.localStorage.deleteTodo(this.todoList.id, todoId);
    this.todoList.todos = this.todoList.todos.filter(el => el.id !== todoId);
  }

}
