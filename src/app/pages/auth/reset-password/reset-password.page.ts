import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;

  username: string = null;

  constructor(
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public storageService: StorageService 
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      username: ['', [Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
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
  async login(){
    const body = {
      username: this.username,
      
    }
    try {
      const { accessToken } = await this.apiService.postRequest('/auth/reset-password',body)
      if(accessToken != null && accessToken != undefined) this.storageService.set('token',accessToken);
    } catch (error) {
      if(error.status == 401){
        alert("credentials incorrect")
      }else{
        alert("error server please contact support@onlysolargc.com")
      }
    }
  }

}
