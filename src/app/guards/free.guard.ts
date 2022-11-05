import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FreeGuard implements CanActivate {
  constructor(
    public router: Router,
    private storageService: StorageService
  ) {}

  async canActivate() {
    let token = await this.storageService.get('token')
    if(token == null || token == undefined) return true
    else {
      this.router.navigateByUrl('/dashboard')
      return false
    }
	}
  
}
