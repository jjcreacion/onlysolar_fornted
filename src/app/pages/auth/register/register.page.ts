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

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      referred: [null],
      email: [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password2: [null, [Validators.required]],
      document: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      numberid: [null],
      numberid2: [null],
      numberss: [null],
      numbertax: [null],
      phone: [null, [Validators.required]],
      residenceAddress: [null, [Validators.required]],
      residenceState: [null, [Validators.required]],
      residenceCity: [null, [Validators.required]],
      contactFullName: [null, [Validators.required]],
      contactRelationship: [null, [Validators.required]],
      contactAddress: [null, [Validators.required]],
      contactPhone: [null, [Validators.required]],
      bankaccountNamebank: [null, [Validators.required]],
      bankaccountRouting: [null, [Validators.required]],
      bankaccountAccount: [null, [Validators.required]],
      bankaccountPercentage: [null, [Validators.required]],
      previousemploymentCompany: [null, [Validators.required]],
      previousemploymentResponsabilities: [null, [Validators.required]],
      previousemploymentReasonleaving: [null, [Validators.required]],
      previousemploymentAddress: [null, [Validators.required]],
      previousemploymentSupervisor: [null, [Validators.required]],
      previousemploymentPhone: [null, [Validators.required]],
      previousemploymentStarsalary: [null, [Validators.required]],
      previousemploymentStartDate: [null, [Validators.required]],
      previousemploymentEndDate: [null, [Validators.required]],
      previousemploymentEndsalary: [null, [Validators.required]],
      previousemploymentContactsupervisor: [null, [Validators.required]],
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

  loadImageFromDevice(e) {
    this.idfile = e.target.files[0]
    console.log(this.idfile)
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
  lettersOnlyValidation(event: any) {
    const pattern = /[A-Za-z ÑñáéíóúÁÉÍÓÚ]/;
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
}
