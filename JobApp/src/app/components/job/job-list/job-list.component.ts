import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as _lodash from 'lodash'
import { JobService } from '../job.service';
import { JobDetails } from '../job.model';
import { CommonModule, DatePipe } from '@angular/common';
import { SortPipe } from '../../../shared/pipes/sort.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [DatePipe, FormsModule, CommonModule],
  providers: [SortPipe, SearchPipe, FilterPipe],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  filterJobTypes = [{ actualValue: 'Full-time', displayValue: 'Full Time' }, { actualValue: 'Part-time', displayValue: 'Part Time' }, { actualValue: 'Remote', displayValue: 'Remote' }, { actualValue: 'Internship', displayValue: 'Internship' }, { actualValue: 'Freelance', displayValue: 'Freelance' }];
  filterExprience = [{ actualValue: [1, 2], displayValue: '1-2 Years' }, { actualValue: [3, 5], displayValue: '3-5 Years' }, { actualValue: [6, 8], displayValue: '6-8 Years' }, { actualValue: [9, 99], displayValue: '9-more..' }];
  jobsList: JobDetails[] = [];
  jobsListCopy: JobDetails[] = [];
  currentJobList: JobDetails[] = [];
  userRole: string = null;
  searchKey: string = null;
  recPerPage: number = 4;
  pagesArr: number[] = [];
  currentPageNum: number = 0;
  sortByField: string = "";
  jobLodash = _lodash.noConflict();
  freshness: string = "";
  selectedJobType = [];
  selectedExprience = [];


  constructor(private jobService: JobService, private router: Router,
    private spinner: NgxSpinnerService, private sortPipe: SortPipe,
    private searchPipe: SearchPipe, private filterPipe: FilterPipe) {
  }

  ngOnInit() {
    this.getAllJobs()
  }

  getAllJobs() {
    this.spinner.show();
    this.jobService.getAllJobs().subscribe((res: { jobs: JobDetails[] }) => {
      if (res?.jobs) {
        this.jobsList = res?.jobs || [];
        this.jobsListCopy = this.jobLodash.cloneDeep(this.jobsList);
        this.currentJobList = this.jobLodash.cloneDeep(this.jobsList);
        this.setUpPagination();
      }
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    })
  }

  setUpPagination() {
    this.pagesArr = [];
    this.currentPageNum = 0;
    let count = this.jobsList?.length / this.recPerPage;
    for (let i = 1; i <= Math.ceil(count); i++) {
      this.pagesArr.push(i);
    }
  }

  nextPage() {
    if (this.currentPageNum != this.pagesArr?.length) {
      this.currentPageNum++;
    }
  }

  prevPage() {
    if (this.currentPageNum != 0) {
      this.currentPageNum--;
    }
  }

  specificPage(num) {
    if (num != this.currentPageNum)
      this.currentPageNum = num;
  }

  setSortBy(option) {
    if (option == 'type') {
      this.sortByField = 'type';
    } else if (option == 'date') {
      this.sortByField = 'createdAt';
    } else {
      this.sortByField = "";
    }
    this.sortData();
  }

  sortData() {
    this.jobsList = this.sortPipe.transform(this.jobLodash.cloneDeep(this.jobsList), this.sortByField);
  }

  searchJobs() {
    this.jobsList = this.searchPipe.transform(this.jobLodash.cloneDeep(this.jobsListCopy), 'position', this.searchKey);
    this.currentJobList = this.jobLodash.cloneDeep(this.jobsList);
    this.clearAllFilters();
    this.setUpPagination();
  }

  clearSearch() {
    if (!this.searchKey) {
      this.jobsList = this.jobLodash.cloneDeep(this.jobsListCopy);
      this.currentJobList = this.jobLodash.cloneDeep(this.jobsList);
      this.setUpPagination();
    }
  }

  filterJobs() {
    let filterDetails = [
      {
        key: 'updatedAt',
        selectedValue: this.freshness
      },
      {
        key: 'type',
        selectedValue: this.selectedJobType
      },
      {
        key: 'exprience',
        selectedValue: this.selectedExprience
      }
    ]
    this.jobsList = this.filterPipe.transform(this.jobLodash.cloneDeep(this.currentJobList), filterDetails);
    this.sortByField && this.sortData();
    this.setUpPagination();
  }

  onSelectJobType() {
    this.selectedJobType = [];
    let elements = document.getElementsByName('filterJobType');
    elements?.forEach((ele: any) => {
      if (ele?.checked) {
        this.selectedJobType.push(ele?.value);
      }
    })
    this.filterJobs();

    // let index = this.selectedJobType?.indexOf(value);
    // if (index > -1) {
    //   this.selectedJobType?.splice(index, 1)
    // } else {
    //   this.selectedJobType.push(value);
    // }
    // this.filterJobs();
  }

  clearAllFilters(fromClearAllBtn: boolean = false) {
    this.freshness = "";
    this.selectedExprience = [];
    this.selectedJobType = [];
    let elements = document.getElementsByName('filterJobType');
    elements?.forEach((ele: any) => {
      ele.checked = false;
    })

    if (fromClearAllBtn) {
      this.filterJobs();
    } else {
      this.sortByField = "";
    }
  }

  navigateTOJobDetails(jobId: string) {
    jobId && this.router.navigateByUrl(`/detail-job/${jobId}`);
  }
}
