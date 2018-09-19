import { Component, OnInit } from '@angular/core';
import { GetlistService } from '../../services/getlist.service';


@Component({
  selector: 'app-todoview',
  templateUrl: './todoview.component.html',
  styleUrls: ['./todoview.component.css']
})
export class TodoviewComponent implements OnInit {
  public todos=[];
  public todosdone=[];
  public todosplanned=[];
  public todospending=[];
  public isChecked;
  public asas = "asd";
  public checkSelected=true;
  public editnotEnabled=true;
  public cssvisibility = 'hidden'
 

  
  // public itemToRemove;
  constructor(private getService: GetlistService) { }

  ngOnInit() {

    this.getListOfTodoItems();

  }


  disableElement(todo,dueDate,status){
    todo.style.visibility='hidden';
    dueDate.style.visibility='hidden';
    status.style.visibility='hidden'

    
    
  }

  enableEdit(todo,dueDate,status,editb,updateb){
    todo.style.visibility= 'visible';
    dueDate.style.visibility='visible';
    status.style.visibility='visible';
    editb.style.visibility = 'hidden';
    updateb.style.visibility = 'visible'
  }

  addTodoItems(todoitem,duedate){
    console.log(todoitem.value,duedate.value);
    this.getService.addTodoItem(todoitem.value,duedate.value).subscribe((response)=>{
      console.log(response);
    },(error)=>{
      console.log(error);

    });
    this.getListOfTodoItems();
  }

  getListOfTodoItems(){
    this.getService.getListofItems().subscribe((response)=>{
      this.todos = response.data;
      // this.list = response.data;
      // console.log(todoslist[0]);
      // this.todos.push(response.json())
      this.todos.forEach(element => {
        if(element.status=='done'){
          this.todosdone.push(element);
        }else if(element.status=='planned') {
          this.todosplanned.push(element);
        }
        else{
          this.todospending.push(element);
        }
      });
      
      //   // this.todos.push(element);

      // });
      // console.log(this.todos[0].status);
      // console.log(this.todosdone);
      // console.log(this.todosplanned);

      // return true;
      // console.log(this.todos);
    },error=>{
      console.log(error);
      return false;
    });
  }


  striketheTodoItem(checkValue,event){
    if(event.currentTarget.checked){
      checkValue.style.textDecoration='line-through'
    }
    else{
      checkValue.style.textDecoration='None'
    }

  }

  removeElement(itemToRemove){
    this.getService.removeTodoItem(itemToRemove).subscribe((response)=>{
      console.log(response);
      this.getListOfTodoItems();

    },(error)=>{
      console.log(error);

    });
  }

}
