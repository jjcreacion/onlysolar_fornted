import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DashboardUser } from '../../interfaces/dashboarduser';
import { copyClipboard } from '../../utils/clipboard.js';
import { ToastService } from '../../services/toast.service';
import { environment } from 'src/environments/environment';
import { LevelInterface } from '../../interfaces/level';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  base_url: String = environment.base_url

  user: DashboardUser = {
    id:           null,
    username:     '',
    hostcode:     '',
    referredcode: '',
    name:         '',
    lastname:     '',
    phone:        '',
    profession:   ''
  }

  level01: LevelInterface[]
  level02: LevelInterface[] 
  level03: LevelInterface[] 
  level04: LevelInterface[] 
  level05: LevelInterface[] 

  constructor(
    private api: ApiService,
    private toast: ToastService
  ) {}

  async ngOnInit() {
    this.user = await this.api.getRequest('/auth/user')
    
    const data = await this.api.getRequest('/workline/mylevels')
    
    this.level01 = data.filter(d => d.level == 1)
    this.level02 = data.filter(d => d.level == 2)
    this.level03 = data.filter(d => d.level == 3)
    this.level04 = data.filter(d => d.level == 4)
    this.level05 = data.filter(d => d.level == 5)

    console.log(this.level01)
    console.log(this.level02)
    console.log(this.level03)
    console.log(this.level04)
    console.log(this.level05)
  }

  copyCode(){
    copyClipboard(`${this.base_url}/auth/register?code=${this.user.referredcode}`);
    this.toast.presentToast("copied your referred code!")
  }

}
