import { Component, OnInit } from '@angular/core';
import { GetlistService } from '../../services/getlist.service';

@Component({
  selector: 'app-todoview',
  templateUrl: './todoview.component.html',
  styleUrls: ['./todoview.component.css']
})
export class TodoviewComponent implements OnInit {
  public todos=[];
  public isChecked;
  public asas = "asd";
  public checkSelected=true;
  // public itemToRemove;
  constructor(private getService: GetlistService) { }

  ngOnInit() {

    this.getListOfTodoItems();
    
  }

  addTodoItems(todoitem,duedate){
    console.log(todoitem.value,duedate.value);
    this.getService.addTodoItem(todoitem,duedate).subscribe((response)=>{
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
      // todoslist.forEach(element => {
        // console.log(this.todos);
      //   // this.todos.push(element);
        
      // });
      // console.log(this.todos[0].status);
      // console.log(this.sdf);
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
