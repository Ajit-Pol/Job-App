import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterData: any[]): any {

    if (value && value?.length > 0 && filterData?.length > 0) {
      let modifiedValue = value;

      if (filterData[0]?.selectedValue) {
        let currentDate = new Date();
        let oldDate = new Date(currentDate?.getTime() - Number(filterData[0]?.selectedValue) * 24 * 60 * 60 * 1000);
        modifiedValue = value?.filter((ele) => {
          return new Date(ele[filterData[0]?.key]) >= oldDate;
        })
      }

      if (filterData[1]?.selectedValue?.length > 0) {
        modifiedValue = modifiedValue?.filter((ele) => {
          return filterData[1]?.selectedValue?.includes(ele[filterData[1]?.key]);
        })
      }

      if (filterData[2]?.selectedValue?.length > 0) {
        modifiedValue = modifiedValue?.filter((ele) => {
          return filterData[2]?.selectedValue[1] >= ele[filterData[2]?.key] && filterData[2]?.selectedValue[0] <= ele[filterData[2]?.key] ;
        })
      }
      return modifiedValue;
    }

    return value;
  }

}
