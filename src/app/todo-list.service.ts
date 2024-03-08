import { Injectable, Signal, computed, signal } from '@angular/core';
import { TodolistServiceInterface } from './data/todo-list.interface';
import { TodoList, TodoItem, initialTDL, appendItems, deleteItems } from './data/todolist';
import { NonEmptyList } from './data/utils';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodoListService implements TodolistServiceInterface {
  //effet -> affiche la todo lista
  private _sigTDL = signal<TodoList>(initialTDL);  
  readonly sigTDL: Signal<TodoList>;

  constructor() {
    this.sigTDL = computed<TodoList>( ( ) => this._sigTDL());
  }

  appendItems(labels: NonEmptyList<string>): this {
    this._sigTDL.set(appendItems(this.sigTDL(),labels));
    localStorage.setItem("tdl",JSON.stringify(this.sigTDL()));    
    return this;
  }
  updateItems(up: Partial<TodoItem>, items: NonEmptyList<TodoItem>): this {
    
    return this;
  }
  deleteItems(list: NonEmptyList<TodoItem>): this {
    this._sigTDL.set(deleteItems(this.sigTDL(),list));
    localStorage.clear;
    localStorage.setItem("tdl",JSON.stringify(this.sigTDL())); 

    return this ;
  }
}
