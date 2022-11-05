import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getValue().subscribe((value) => {
      this.isAuthenticated = value;
    });
  }

}
