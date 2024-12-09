import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], searchBy, searchKey): any {
    if(value?.length > 0 && searchKey){
      let seachResult = value.filter(job=>{
         return job[searchBy].toLowerCase().includes(searchKey.toLowerCase());
       })
     
       return seachResult;
     }
    return value;
  }

}
