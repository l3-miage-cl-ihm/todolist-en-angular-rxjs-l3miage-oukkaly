import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, WritableSignal, computed, signal } from '@angular/core';
import { FCT_FILTER, TdlState, TodoItem, TodoList, initialTDL } from '../data/todolist';
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

  readonly hasAtLeastOneDoneItem: Signal<boolean> = computed<boolean>( () => this._sigTdlState().tdl.items.filter((x) => x.done).length > 0 )
  readonly sigTdlState = computed<TdlState>( () => this._sigTdlState());
  
  readonly filterAll: FCT_FILTER = () => true
  readonly filterDone: FCT_FILTER = item => item.done;
  readonly filterUndone: FCT_FILTER = item => !item.done;
  
  constructor(){

  }
  
  emitAppendItems(input: string){

    this.appenditems.emit([input]);
  }

  isAllDone(){
    return this.tdl.items.filter((item) => !item.done).length === 0 ;
    
  }

  nbItemsLeft(){
    return this.tdl.items.length ;
  }


  setFilterAll(){
    this._sigTdlState.update((stl) => ({...stl,currentFilter: this.filterAll}))
  }

  setFilterDone(){
    this._sigTdlState.update((stl) => ({...stl,currentFilter: this.filterDone}))
  }

  setFilterUndone(){
    this._sigTdlState.update((stl) => ({...stl,currentFilter: this.filterUndone}))
  }


}


