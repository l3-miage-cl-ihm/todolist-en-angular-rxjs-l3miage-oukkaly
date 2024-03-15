import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { TodoItem, TodoList, initialTDL } from './data/todolist';
import { NonEmptyList } from './data/utils';

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

  addNewTasks(tasks : NonEmptyList<string>) {
    this.todoListService.appendItems(tasks);
  }
  
  updateTaskCheck(task : TodoItem , state : boolean){
    this.todoListService.updateItems({done: state} , [task]);
  }

  updateTaskLabel( task : Readonly<[Partial<TodoItem>, NonEmptyList<TodoItem>]>){
    const tasks : NonEmptyList<TodoItem> = task[1];
    const newLabel : Partial<TodoItem> = task[0];

    this.todoListService.updateItems(newLabel , tasks);
  }

  deleteTasks(tasks : NonEmptyList<TodoItem>): void{
    this.todoListService.deleteItems(tasks);
  }
  // setSigTodoList(){

  // }
}
