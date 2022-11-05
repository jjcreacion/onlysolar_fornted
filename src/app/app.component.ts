import { Component, isDevMode, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
}
