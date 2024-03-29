import { Injectable, Signal, computed, signal } from '@angular/core';
import { TodolistServiceInterface } from './data/todo-list.interface';
import { TodoList, TodoItem, initialTDL, appendItems, deleteItems, updateItems } from './data/todolist';
import { NonEmptyList } from './data/utils';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodoListService implements TodolistServiceInterface {
  //effet -> affiche la todo lista
  private _sigTDL = signal<TodoList>(initialTDL);  
  readonly sigTDL: Signal<TodoList> = computed<TodoList>( ( ) => this._sigTDL());

  constructor() {
  }

  updateLocalStorage(){
    localStorage.clear;
    localStorage.setItem("tdl",JSON.stringify(this.sigTDL()));
  }

  appendItems(labels: NonEmptyList<string>): this {
    this._sigTDL.set(appendItems(this.sigTDL(),labels));
    this.updateLocalStorage();
    return this;
  }
  updateItems(up: Partial<TodoItem>, items: NonEmptyList<TodoItem>): this {
    this._sigTDL.set(updateItems(this.sigTDL(),up,items));
    this.updateLocalStorage();
    return this;
  }
  deleteItems(list: NonEmptyList<TodoItem>): this { 
    this._sigTDL.set(deleteItems(this.sigTDL(),list));
    this.updateLocalStorage();
    return this ;
  }
}
