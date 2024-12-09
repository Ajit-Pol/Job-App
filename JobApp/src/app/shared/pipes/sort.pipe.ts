import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(value: any, sortFieldName: any): any {
    if (value && value?.length > 0 && sortFieldName != '') {
      let modifiedValue = [];
      if (sortFieldName == 'updatedAt') {
        modifiedValue = value?.sort((a, b) => {
          return new Date(a[sortFieldName]).getTime() - new Date(b[sortFieldName]).getTime();
        });
      } else if (sortFieldName == 'type') {
        let sortOrder = ['Full-time', 'Part-time', 'Remote', 'Internship', 'Freelance'];
        modifiedValue = value.sort((a, b) => {
          return sortOrder.indexOf(a[sortFieldName]) - sortOrder.indexOf(b[sortFieldName]);
        })
      }
      return modifiedValue;
    }
    return value;
  }
}
