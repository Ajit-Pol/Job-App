import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { Toaster, ToasterType } from '../shared.model';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {
  show:boolean = false;
  toaster:Toaster = null;
  toasterType = ToasterType;
  constructor(private toasterService:ToasterService){
    this.toasterService.getToaster().subscribe(data=>{
      this.toaster = data;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    })
  }

  ngOnInit(){}
}
