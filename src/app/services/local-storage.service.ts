import { Injectable } from '@angular/core';
import {Todo} from "../interfaces/todo";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getData(key: string): Todo[]{
    return JSON.parse(<string>localStorage.getItem(key));
  }

  setData(key: string, data: Todo[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

}
