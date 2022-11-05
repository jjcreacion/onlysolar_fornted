import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from '../../../services/api.service';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;

  username: string = null;
  password: string = null;

  constructor(
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.login()
    }
  }

  async login() {
    const body = {
      username: this.username,
      password: this.password
    }
    try {
      const { accessToken } = await this.apiService.postRequest('/auth/login', body)
      if (accessToken != null && accessToken != undefined) {
        this.storageService.set('token', accessToken)
        localStorage.setItem('token',accessToken)
        this.apiService.setValue(true);
        this.router.navigate(['/dashboard'])
      } else {
        this.apiService.setValue(false);
      }
    } catch (error) {
      this.apiService.setValue(false);
      if (error.status == 401) {
        console.log()
        alert("credentials incorrect")
      } else {
        alert("error server please contact support@onlysolargc.com")
      }
    }
  }

}
