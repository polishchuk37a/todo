import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TodoService} from "../services/todo.service";
import {Observable} from "rxjs";
import {Todo} from "../interfaces/todo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  todos$: Observable<Todo[]> = new Observable<Todo[]>();
  myForm: FormGroup;

  constructor(private readonly todoService: TodoService, private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
        id: [''],
        value: [''],
      }
    )
  }

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
  }

  addTask() {
    this.todoService.addTask(this.myForm.value);
    this.myForm.reset();
  }

  removeTask(todoId: number) {
    this.todoService.removeTask(todoId);
  }

  doneTask(id: number){
    this.todoService.doneTask(id);
  }

  showAllTasks(){
    this.todoService.showAllTasks();
  }

  showDoneTask(){
    this.todoService.showDoneTask();
  }

  showTaskInProcess(){
    this.todoService.showTaskInProcess();
  }
}
