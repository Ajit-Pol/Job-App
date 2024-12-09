import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { ToasterType } from '../../shared.model';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent {

  show: boolean = false;
  toaster = null;
  toasterType = ToasterType;
  constructor(private toasterService: ToasterService) {
    this.toasterService.getToaster().subscribe(data => {
      this.toaster = data;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    })
  }

}
