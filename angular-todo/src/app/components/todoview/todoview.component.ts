import { Component, OnInit } from '@angular/core';
import { GetlistService } from '../../services/getlist.service';
import { Router } from '@angular/router';


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
  public valiateDate=true;
  public validString=true;
 

  
  // public itemToRemove;
  constructor(private getService: GetlistService) { }

  ngOnInit() {

    this.getListOfTodoItems();

  }


  disableElement(status){
    // dueDate.style.visibility='hidden';
    status.style.visibility='hidden'

    
    
  }

  disableElementUpdate(editStatus,editStatusinput,editButton,upodateButton){
    editStatus.style.visibility = 'visible';
    editStatusinput.style.visibility = 'hidden';
    editButton.style.visibility = 'visible';
    upodateButton.style.visibility = 'hidden';
  }



  updateStatus(todo,status){
    this.getService.updateTodoStatus(todo.textContent,status.value).subscribe((response)=>{
      if(response.success){
        this.getListOfTodoItems()
      }
      
    },(error)=>{
      console.log(error);

    });
    
  }

  enableEdit(editStatus,status,editb,updateb){
    // dueDate.style.visibility='visible';
    editStatus.style.visibility = 'hidden';
    status.style.visibility='visible';
    editb.style.visibility = 'hidden';
    updateb.style.visibility = 'visible'
  }

  addTodoItems(todoitem,duedate){
    console.log(todoitem.value,duedate.value);
    if(todoitem.value=='' || duedate.value==''){
      this.valiateDate = false;
      this.validString = false;
      
    }
    else{
    this.valiateDate = true;
    this.validString = true;
    this.getService.addTodoItem(todoitem.value,duedate.value).subscribe((response)=>{
      if(response.success){
        this.getListOfTodoItems();
      }
    },(error)=>{
      this.valiateDate = false;
      this.validString = false;

    });
  }
    // this.getListOfTodoItems();
  }

  getListOfTodoItems(){
    this.getService.getListofItems().subscribe((response)=>{
      this.todosplanned=[];
      this.todospending = [];
      this.todosdone = [];
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
      if(response.success){
      this.getListOfTodoItems();
    }else{
      console.log(response.msg);
      
    }
    },(error)=>{
      console.log(error);

    });
  }

}
