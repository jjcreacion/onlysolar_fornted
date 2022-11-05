import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALIDATORS, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;

  password: string = null;
  confirmPassword: string =null;

  constructor(
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public storageService: StorageService 
    
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,14}')]],
      confirmPassword: ['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,14}')]]

    },{validator: this.matchingPasswords('password', 'confirmPassword')
     
    })
    
  }
 
     matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
  
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
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
      password: this.password,
      confirmPassword: this.confirmPassword
      
    }
    try {
      const { accessToken } = await this.apiService.postRequest('/auth/login',body)
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
