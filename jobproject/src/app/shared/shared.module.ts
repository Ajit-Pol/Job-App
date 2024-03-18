import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToasterComponent } from './toaster/toaster.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ToasterComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    ToasterComponent
  ]
})
export class SharedModule { }
