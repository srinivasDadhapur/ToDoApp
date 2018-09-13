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
  public data : data;

  constructor(private getService: GetlistService){}


  ngOnInit(){

  this.getService.getListofItems().subscribe(function(response){
    const todos:data = response.data;
    console.log(todos);
    
  },error=>{
    console.log(error);
    return false;
  });
}

}

export interface data{
    todo:String;
    status:String;

}



