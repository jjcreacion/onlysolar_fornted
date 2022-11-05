import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false

  constructor( 
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router) { }

  async ngOnInit() {
    await this.loadToken();
    this.apiService.getValue().subscribe((value) => {
      this.isAuthenticated = value
    });
  }

  async loadToken() {
		const token = await this.storageService.get('token')
		if (token != null && token != undefined) {
			this.apiService.setValue(true)
		} else {
			this.apiService.setValue(false)
		}
	}

  logout(){
    localStorage.clear()
    this.apiService.setValue(false)
    this.storageService.clear()
    this.router.navigate(['/home'])
  }

}
