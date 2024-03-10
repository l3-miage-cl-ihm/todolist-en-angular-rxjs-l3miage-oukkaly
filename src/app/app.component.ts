import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { TodoItem, TodoList, initialTDL } from './data/todolist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  readonly sigTodoList = signal<TodoList>(this.todoListService.sigTDL());

  constructor(private todoListService: TodoListService){
    // todoListService.appendItems(["yacine"]);
  }

  addNewTask(task : string) {
    this.todoListService.appendItems([task]);
  }
  
  updateTaskCheck(task : TodoItem , state : boolean){
    this.todoListService.updateItems({done: state} , [task]);
  }

  updateTaskLabel(task : TodoItem , newLabel : string){
    this.todoListService.updateItems({label: newLabel} , [task]);
  }

  deleteTask(task : TodoItem): void{
    this.todoListService.deleteItems([task]);
  }
  // setSigTodoList(){

  // }
}
