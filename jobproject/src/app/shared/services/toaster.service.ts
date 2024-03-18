import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toaster } from '../shared.model';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private toasterSubject:Subject<Toaster> = new Subject<Toaster>();
  
  constructor() { }

  showToaster(type:string,message:string){
    let toast:Toaster = {
      type : type,
      message : message
    }

    this.toasterSubject.next(toast);
  }

  getToaster(){
    return this.toasterSubject.asObservable();
  }
}
