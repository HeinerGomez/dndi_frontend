import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NgSelectModule } from '@ng-select/ng-select';
import { SettingsRoutingModule } from './settings-routing.module';
import { LayoutModule } from '@layout/layout.module';

import { MyInfoComponent } from './my-info/my-info.component';

@NgModule({
  declarations: [MyInfoComponent],
  imports: [
    CommonModule,
		FormsModule,
		ReactiveFormsModule,
		LaddaModule,
		NgBootstrapFormValidationModule,
		NgSelectModule,
    SettingsRoutingModule,
		LayoutModule
  ]
})
export class SettingsModule { }
