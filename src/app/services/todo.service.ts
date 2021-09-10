import { Injectable } from '@angular/core';
import {Todo} from "../interfaces/todo";
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

const TODO_KEY = 'Todo_List';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private _todo = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this._todo.asObservable();

  private todos: Todo[] = [];
  private nextId = 0;

  constructor(private storageService: LocalStorageService) {
    this.todos = storageService.getData(TODO_KEY);
    this._todo.next(this.todos);
  }

  saveListToLocalStorage(): void {
    this.storageService.setData(TODO_KEY, this.todos);
  }

  addTask(newTask: Todo) {
    newTask.isDone = false;

    if(this.todos === null){
      this.todos = [];
    }

    if (this.todos.length !== 0) {
      this.nextId = this.todos[this.todos.length -1].id;
    }
    newTask.id = ++this.nextId;
    this.todos.push(newTask);
    this._todo.next(this.todos);

    this.saveListToLocalStorage();
  }

  removeTask(id: number){
    this.todos.forEach((task, index) => {
      if (task.id === id) {
        this.todos.splice(index, 1);
      }
      this._todo.next(this.todos);
    });
    this.saveListToLocalStorage();
  }

  doneTask(id: number){
    this.todos.forEach(i =>{
      if(i.id === id){
        if(i.isDone){
          i.isDone = false;
        }else{
          i.isDone = true;
        }
      }
      this._todo.next(this.todos);
    })
    this.saveListToLocalStorage();
  }

  showAllTasks(){
    this._todo.next(this.todos);
  }

  showDoneTask(){
    const completedTasks = this.todos.filter(i => i.isDone);
    this._todo.next(completedTasks);
  }

  showTaskInProcess(){
    const uncompletedTasks = this.todos.filter(i => !i.isDone);
    this._todo.next(uncompletedTasks);
  }

}

