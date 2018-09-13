import { Component } from '@angular/core';
import { GetlistService } from './services/getlist.service';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public list;
  public todos=[];

  constructor(private getService: GetlistService){}


  ngOnInit(){

  this.getService.getListofItems().subscribe(function(response){
    this.todos = (response.data);
    console.log(this.todos);
    
  },error=>{
    console.log(error);
    return false;
  });
}

}



