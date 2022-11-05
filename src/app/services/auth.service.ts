import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);

  constructor(
    private storage: StorageService,
    private platform: Platform,
    private apiService: ApiService
  ) { 
  }

  ifLoggedIn() {
    this.storage.get('token').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
