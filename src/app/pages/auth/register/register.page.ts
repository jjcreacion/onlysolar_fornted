import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from '../../../services/api.service';
import { StorageService } from '../../../services/storage.service';
import { IUser } from '../../../interfaces/user';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  show = 0;
  showPassword = false;
  passwordToggleIcon = 'eye';
  emailToggleIcon = 'mail-outline';
  iconClass = 'icon-error';
  emailClass = 'icon-yellow';
  verified = false;
  showPassword2 = false;
  passwordToggleIcon2 = 'eye';
  passwordToggleIcon3 = 'close-circle-outline';

  user: IUser = {
    email: null,
    password: null,
    password2: null,
    name: null,
    lastname: null,
    middlename: null,
    document: null,
    numberss: null,
    numberid: null,
    numberid2: null,
    numbertax: null,
    phone: null,
    hostcode: null,
    profession: null,
    desiredsalary: null,
    convicted: false,
    residence: {
      address: null,
      state: null,
      city: null,
      zipcode: null
    },
    contact: {
      fullname: null,
      relationship: null,
      address: null,
      phone: null
    },
    bankaccount: {
      namebank: null,
      rounting: null,
      account: null,
      percentage: '100%',
      imgcheck: null
    },
    previousemployment: {
      company: null,
      phone: null,
      address: null,
      supervisor: null,
      jobtitle: null,
      starsalary: null,
      endsalary: null,
      startDate: null,
      endDate: null,
      responsabilities: null,
      reasonleaving: null,
      contactsupervisor: null
    }
  };


  isModalOpen = false;
  referred: string;

  ionicForm: FormGroup;
  isSubmitted = false;

  idfile: any;
  ssfile: any;
  checkfile: any;
  taxfile: any; 

  constructor(
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public storageService: StorageService,
    public toastController: ToastController,
    public router: Router,
    private route: ActivatedRoute,
  ) { 
    this.route.queryParams.subscribe(params => {
      if(params.code) this.referred = params.code
    })
  }
  patternNum = /[0-9]/;
  patternLett = /[A-Za-z ÑñáéíóúÁÉÍÓÚ]/;
  patternNumLett = /[0-9A-Za-z ÑñáéíóúÁÉÍÓÚ.]/; 
  patternEmail = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  patternPassword = '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,14}';

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      referred: [null],
      email: [null, [Validators.required, Validators.pattern(this.patternEmail)]],
      name: [null, [Validators.required,Validators.minLength(3),Validators.pattern(this.patternLett)]],
      middlename: [null, [Validators.pattern(this.patternLett)]],
      password: [null, [Validators.required,Validators.pattern(this.patternPassword)]],
      password2: [null, [Validators.required,Validators.pattern(this.patternPassword)]],
      document: [null, [Validators.required]],
      lastname: [null, [Validators.required,Validators.minLength(3),Validators.pattern(this.patternLett)]],
      numberid: [null],
      numberid2: [null],
      numberss: [null],
      numbertax: [null],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.pattern(this.patternNum)]],
      residenceAddress: [null, [Validators.required,Validators.minLength(5), Validators.pattern(this.patternNumLett)]],
      residenceState: [null, [Validators.required,Validators.minLength(4), Validators.pattern(this.patternLett)]],
      residenceCity: [null, [Validators.required,Validators.minLength(4), Validators.pattern(this.patternLett)]],
      residenceZipCode: [null, [Validators.required,Validators.minLength(4), Validators.pattern(this.patternNum)]],
      contactFullName: [null, [Validators.required,Validators.minLength(5),Validators.pattern(this.patternLett)]],
      contactRelationship: [null, [Validators.required,Validators.minLength(3),Validators.pattern(this.patternLett)]],
      contactAddress: [null, [Validators.minLength(5), Validators.pattern(this.patternNumLett)]],
      contactPhone: [null, [Validators.required, Validators.minLength(10), Validators.pattern(this.patternNum)]],
      bankaccountNamebank: [null, [Validators.required,Validators.minLength(5),Validators.pattern(this.patternLett)]],
      bankaccountRouting: [null, [Validators.required,Validators.minLength(9),Validators.pattern(this.patternNum)]],
      bankaccountAccount: [null, [Validators.required,Validators.minLength(9),Validators.pattern(this.patternNum)]],
      bankaccountPercentage: [null, [Validators.required]],
      previousemploymentCompany: [null, [Validators.required, Validators.minLength(3), Validators.pattern(this.patternNumLett)]],
      previousemploymentResponsabilities: [null, [Validators.required,Validators.minLength(5), Validators.pattern(this.patternNumLett)]],
      previousemploymentReasonleaving: [null, [Validators.required,Validators.minLength(5), Validators.pattern(this.patternNumLett)]],
      previousemploymentAddress: [null, [Validators.pattern(this.patternNumLett)]],
      previousemploymentSupervisor: [null, [Validators.pattern(this.patternLett)]],
      previousemploymentPhone: [null, [Validators.pattern(this.patternNum)]],
      previousemploymentStarsalary: [null, [Validators.pattern(this.patternNum)]],
      previousemploymentEndsalary: [null, [Validators.pattern(this.patternNum)]],
      previousemploymentContactsupervisor: [null,[Validators.pattern(this.patternNum)]],
    })
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    }
    else {
      this.passwordToggleIcon = 'eye';
    }
  }

  togglePassword2(): void {
    this.showPassword2 = !this.showPassword2;

    if (this.passwordToggleIcon2 == 'eye') {
      this.passwordToggleIcon2 = 'eye-off';
    }
    else {
      this.passwordToggleIcon2 = 'eye';
    }
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      await this.registerUser()
    }
  }

  loadImageFromDevice(e,tipo) {
    switch(tipo){
     case 1:this.idfile = e.target.files[0]
     break
     case 2:this.ssfile = e.target.files[0]
     break
     case 3:this.taxfile = e.target.files[0]
     break
     case 4:this.checkfile = e.target.files[0]
     break 
   }
 }

  verifiPassword() {

    if (this.user.password == this.user.password2) {
      this.passwordToggleIcon3 = "checkmark-circle-outline";
      this.verified = true;
      this.iconClass = 'icon-check';
    }
    else {
      this.passwordToggleIcon3 = "close-circle-outline";
      this.verified = false;
      this.iconClass = 'icon-error';
    }
  }

  verifiEmail() {
    this.emailToggleIcon = 'close-circle-outline';
    this.emailClass = 'icon-error';

    if (this.user.email.match('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')) {
      this.emailToggleIcon = 'checkmark-circle-outline';
      this.emailClass = 'icon-check';
    }

  }

  showEvent(value) {
    this.show = value;
  }

  async registerUser() {

    this.user.bankaccount.percentage = 100.00
    this.user.previousemployment.startDate = `${this.user.previousemployment.startDate} 00:00:00`
    this.user.previousemployment.endDate = `${this.user.previousemployment.endDate} 00:00:00`

    let temp = {
      hostcode: this.referred || null,
      username : this.user.email,
      password: this.user.password,
      name: this.user.name,
      lastname: this.user.lastname,
      numberid: this.show == 1 ? this.user.numberid : this.user.numberid2,
      numberss : this.user.numberss ,
      numbertax : this.user.numbertax ,
      phone: this.user.phone,
      residence: this.user.residence,
      contact: this.user.contact,
      bankaccount: this.user.bankaccount,
      previusemployment: this.user.previousemployment
    }

    console.log(temp)

    try {
      const formData = new FormData();
      formData.append('file',this.idfile)
      formData.append('request', new Blob([JSON.stringify(temp)], {type: 'application/json'}))

      const data = await this.apiService.registerRequest('/auth/register', formData)
      if(data.code){
        this.presentToast(`Thank you. We send email confirmation to ${temp.username}`)
        this.router.navigateByUrl('/auth/login')
      }else{
        this.presentToast('error register. Please contact support: support@onlysolargc.com')

      }
    } catch (error) {
      console.log(error)
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3500,
      position: 'bottom'
    });

    await toast.present();
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  addressOnlyValidation(event: any) {
    const pattern = /[0-9A-Za-z ÑñáéíóúÁÉÍÓÚ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  
  validation(event:any, pattern){
  let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
