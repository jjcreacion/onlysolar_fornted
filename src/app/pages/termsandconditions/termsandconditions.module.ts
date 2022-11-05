import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsandconditionsPageRoutingModule } from './termsandconditions-routing.module';

import { TermsandconditionsPage } from './termsandconditions.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsandconditionsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TermsandconditionsPage]
})
export class TermsandconditionsPageModule {}
