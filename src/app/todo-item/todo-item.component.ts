import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { ItemState, TodoItem, initialTodoItem } from '../data/todolist';
import { Statement } from '@angular/compiler';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {

  
  private readonly _sigItem = signal<TodoItem>(initialTodoItem);

  @Input({required: true})
  get item(): TodoItem  {
    return this._sigItem();
  }
  set item(item: TodoItem){
    this._sigItem.set(item);
  }

  @Output() update = new EventEmitter<Partial<TodoItem>>();
  @Output() delete = new EventEmitter<TodoItem>();

  private readonly _sigEditing = signal<boolean>(false);
  protected readonly sigEditing = computed<boolean>(() => this._sigEditing());


  private readonly _sigItemState = computed<ItemState>( () => ({
    item: this.item,
    editing: this.sigEditing()
  })
  )
  readonly sigItemState = computed<ItemState>(() => this._sigItemState());


  protected setSigEditing(status : boolean){
    this._sigEditing.set(status);
  }
  updateItem(label: string){
    this.update.emit({...this.item,label})
  }
  destroy(){
    this.delete.emit(this.sigItemState().item);
  }

  toggleCheckBox(doneStatus: boolean) {
    this.update.emit({...this.item,done:doneStatus});
  }
}
