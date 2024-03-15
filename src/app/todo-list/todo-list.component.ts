import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, WritableSignal, computed, signal } from '@angular/core';
import { TdlState, TodoItem, TodoList, initialTDL } from '../data/todolist';
import { NonEmptyList } from '../data/utils';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {  
  private _sigTdl : WritableSignal<TodoList> = signal<TodoList>(initialTDL);

  @Input({required: true})
  get tdl(): TodoList{ return this._sigTdl()}
  set tdl(tdl: TodoList){
    this._sigTdl.set(tdl);
  }
  
  @Output() appenditems = new EventEmitter<NonEmptyList<string>>();

  @Output() deleteItems = new EventEmitter<NonEmptyList<TodoItem>>();

  @Output() updateItems = new EventEmitter<readonly [Partial<TodoItem>, NonEmptyList<TodoItem>]>();

  private readonly _sigTdlState = signal<TdlState>({
    tdl: this.tdl,
    nbItemsLeft: this.nbItemsLeft(),
    isAllDone: this.isAllDone(),
    currentFilter: null,
    filteredItems: []
  });
  readonly sigTdlState = computed<TdlState>( () => this._sigTdlState());
  
  constructor(){

  }
  
  emitAppendItems(input: string){

    this.appenditems.emit([input]);
  }

  isAllDone(){
    return true ;
    return this.tdl.items.filter((item) => !item.done).length === 0 ;
    
  }

  nbItemsLeft(){
    return 0;
    return this.tdl.items.length ;
  }


}


