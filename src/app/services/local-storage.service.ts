import { Injectable } from '@angular/core';
import { appData, todo, todoList } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public getAppData(): appData | null {
    const data = localStorage.getItem('app_data');
    if (data !== null) {
      return JSON.parse(String(data));
    }
    return data;
  }

  private getTodoListIndex(id: number): number {
    const appData: appData | null = this.getAppData();
    if (appData !== null) {
      return appData.todoList.findIndex(el => el.id === id);
    }
    return -1;
  }

  private getTodoIndex(id: number, todoslist: todo[]): number {
    return todoslist.findIndex(el => el.id === id);
  }

  public setTodo(data: todo, todoListId: number): number {
    const appData: appData | null = this.getAppData();
    if (appData !== null) {
      appData.global_id += 1;
      const todolistInd = this.getTodoListIndex(todoListId);
      appData.todoList[todolistInd].todos.push({
        ...data,
        completed_date: null,
        is_completed: false,
        id: appData.global_id,
      });
      this.setAppData(appData);
      return appData.global_id;
    }
    return -1
  }

  public editTodo(title: string, description: string, todoListId: number, todoId: number) {
    const appData: appData | null = this.getAppData();
    if (appData !== null) {
      const todolistInd = this.getTodoListIndex(todoListId);
      const todoInd = this.getTodoIndex(todoId, appData.todoList[todolistInd].todos);
      appData.todoList[todolistInd].todos[todoInd].title = title;
      appData.todoList[todolistInd].todos[todoInd].description = description;
      this.setAppData(appData);
    }
  }

  public deleteTodo(todoListId: number, todoId: number): void {
    const appData: appData | null = this.getAppData();
    if (appData !== null) {
      const todolistInd = this.getTodoListIndex(todoListId);
      appData.todoList[todolistInd].todos = appData.todoList[
        todolistInd
      ].todos.filter((el) => (el.id !== todoId));
      this.setAppData(appData);
    }
  }

  public doneTodo(todoId: number, todoListId: number): void {
    const appData: appData | null = this.getAppData();
    if (appData !== null) {
      const todolistInd = this.getTodoListIndex(todoListId);
      const todoInd = this.getTodoIndex(todoId, appData.todoList[todolistInd].todos);
      appData.todoList[todolistInd].todos[todoInd].completed_date = new Date();
      appData.todoList[todolistInd].todos[todoInd].is_completed = true;
      this.setAppData(appData);
    }
  }

  public setTodoList(TodoList: todoList): number {
    const appData: appData | null = this.getAppData();
    if (appData !== null) {
      appData.global_id += 1;
      appData.todoList.push({
        ...TodoList,
        id: appData.global_id,
        todos: []
      });
      this.setAppData(appData);
      return appData.global_id;
    }
    return -1;
  }

  public deleteTodoList(todoListId: number): void {
    const appData: appData | null = this.getAppData();
    if (appData !== null) {
      appData.todoList = appData.todoList.filter(el => el.id !== todoListId);
      this.setAppData(appData);
    }
  }

  public setAppData(data: appData): void {
    localStorage.setItem('app_data', JSON.stringify(data));
  }

  public clearData(): void {
    localStorage.clear();
  }
}
