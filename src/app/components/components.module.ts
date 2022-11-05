import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SlidesComponent } from './views/home/slides/slides.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [HeaderComponent,NavbarComponent,SlidesComponent],
  exports: [HeaderComponent,NavbarComponent,SlidesComponent],
  imports: [
    IonicModule,
    CommonModule,
    SwiperModule
  ]
})
export class ComponentsModule { }
