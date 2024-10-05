import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { todoList, todo } from '../utils/types';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-todo-component',
  templateUrl: './todo-component.component.html',
  styleUrl: './todo-component.component.css'
})
export class TodoComponentComponent implements OnInit {


  @Input() todoList: todoList = {id: 0, title: "", todos: []};

  @Output() _deleteEvent = new EventEmitter<number>(); 

  todoDone: todo[] = [];
  todoNotDone: todo[] = [];


  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
	 this.todoDone = this.todoList.todos.filter(el => el.is_completed); 
	 this.todoNotDone = this.todoList.todos.filter(el => !el.is_completed); 
	 console.log(this.todoDone);
	 console.log(this.todoNotDone);
  }

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
	this.todoNotDone.push({
      ...todo,
      id: todoId,
	});
  }

  todoTaskComplete(todo: todo) {
    this.todoNotDone = this.todoNotDone.filter(el => el.id !== todo.id); 
	if (todo) {
		this.todoDone.push(todo);
	}
  }

  deleteTodo(todoId: number) {
    this.localStorage.deleteTodo(this.todoList.id, todoId);
    this.todoList.todos = this.todoList.todos.filter(el => el.id !== todoId);
    this.todoDone = this.todoDone.filter(el => el.id !== todoId); 
    this.todoNotDone = this.todoNotDone.filter(el => el.id !== todoId); 
  }

}
