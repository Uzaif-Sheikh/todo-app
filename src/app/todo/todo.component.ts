import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { todo } from '../utils/types';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  textDecoration = 'none';
  readonly panelOpenState = signal(false);

  @Input() todo: todo = {
    id: -1,
    title: '',
    description: '',
    created_date: new Date(),
    completed_date: null,
    is_completed: false,
  };

  @Input() todoListId: number;

  @Output() _deleteTodoEvent = new EventEmitter<number>();

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    if(this.todo.is_completed) {
      this.textDecoration = "line-through";
    }
  }

  editTodo() {
    this.localStorage.editTodo(this.todo.title, this.todo.description, this.todoListId, this.todo.id);
  }

  deleteTodo() {
    this.localStorage.deleteTodo(this.todoListId, this.todo.id);
    this._deleteTodoEvent.emit(this.todo.id);
  }

  doneTodo() {
    this.todo.completed_date = new Date();
    this.todo.is_completed = true;
    this.localStorage.doneTodo(this.todo.id, this.todoListId);
    this.textDecoration = "line-through";
  }

}
