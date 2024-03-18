import { Pipe, PipeTransform } from '@angular/core';
import { JobDetails } from '../main.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: JobDetails[], searchKey:string): any {
    if(value?.length > 0 && searchKey){
     let seachResult = value.filter(job=>{
        return job.position.toLowerCase().includes(searchKey.toLowerCase());
      })
    
      return seachResult;
    }
    return value;
  }

}
