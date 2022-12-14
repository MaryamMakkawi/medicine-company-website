import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { User } from 'src/app/interfaces/user.model';
import { NotifierService } from '../../services/notifier.service';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from '../../helpers/must-match.validator';
import { ApiService } from 'src/app/services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  toggleLoginActive: boolean = true;
  toggleCompleteInfoForm: boolean = false;
  isLoading: boolean = false;
  errorMassage: string = '';
  users: User[] = [];
  userImg: any;
  roles: string[] = [
    'Doctor',
    'Pharmacist',
    'Sales Representative',
    'Scientific representative',
    'Agent',
    'Company manager',
  ];
  loginForm: FormGroup = new FormGroup({});
  signupForm: FormGroup = new FormGroup({});
  saveUserInfoForm: FormGroup = new FormGroup({});
  resetPasswordForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private notify: NotifierService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.getCities();
    // signupForm First
    this.signupForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.maxLength(20)]],
        lastName: ['', [Validators.required, Validators.maxLength(20)]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      } as AbstractControlOptions
    );

    // saveUserInfoForm Second
    this.saveUserInfoForm = this.fb.group({
      regionId: [''],
      cityId: [''],
      countryId: [''],
      role: [''],
      specialMark: [''],
      contactType: this.fb.array([
        this.fb.group({
          type: [''],
          value: [''],
        }),
      ]),
    });

    // loginForm
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });

    // RestPassword
    this.resetPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'
          ),
        ],
      ],
    });
  }

  // Controls Forms
  get signupF() {
    return this.signupForm.controls;
  }
  get userInfoF() {
    return this.saveUserInfoForm.controls;
  }
  get contactType(): FormArray {
    return this.saveUserInfoForm.get('contactType') as FormArray;
  }
  get loginF() {
    return this.loginForm.controls;
  }
  get resetPasswordFormErrors() {
    return (this.resetPasswordForm.get('email') as FormControl).errors;
  }

  // LOGIN
  onLogin(email: string, password: string) {
    if (!this.loginForm.valid) return;
    this.isLoading = true;
    this.auth.login(email, password).subscribe({
      next: (user: any) => {
        if (user.status == 'ok') {
          this.isLoading = false;
          this.auth.handleAuth(
            user.userInfo.accessToken,
            user.userInfo.email,
            user.userInfo.password,
            user.userInfo.firstName,
            user.userInfo.lastName,
            user.userInfo.id,
            user.userInfo.img,
            user.userInfo.regionId,
            user.userInfo.cityId,
            user.userInfo.countryId,
            user.userInfo.region,
            user.userInfo.city,
            user.userInfo.country,
            user.userInfo.role,
            user.userInfo.specialMark,
            user.userInfo.Contacts
          );
        } else {
          this.isLoading = false;
          this.notify.errorNotification(user.details, 'login failed');
        }
      },
    });
  }

  // SIGNUP
  onSignup(signupForm: FormGroup) {
    if (!signupForm.valid) return;
    this.isLoading = true;
    this.auth
      .signup(
        signupForm.value.accessToken,
        signupForm.value.email,
        signupForm.value.password,
        signupForm.value.firstName,
        signupForm.value.lastName,
        signupForm.value.id
      )
      .subscribe({
        next: (user: any) => {
          if (user.status == 'ok') {
            this.isLoading = false;
            this.toggleCompleteInfoForm = true;
          } else {
            this.isLoading = false;
            this.notify.errorNotification(user.details.email, 'Signup failed');
          }
        },
      });
  }

  // Save User Info
  onSaveInfo(emailSign: string, passwordSign: string) {
    const formData: any = new FormData();
    formData.append('email', emailSign);
    formData.append('userImage', this.file);
    formData.append('regionId', this.saveUserInfoForm.value.regionId);
    formData.append('cityId', this.saveUserInfoForm.value.cityId);
    formData.append('countryId', this.saveUserInfoForm.value.countryId);
    formData.append('role', this.saveUserInfoForm.value.role);
    formData.append('specialMark', this.saveUserInfoForm.value.specialMark);

    for (const contact of this.saveUserInfoForm.value.contactType) {
      formData.append('contactType[type]', contact.type);
      formData.append('contactType[value]', contact.value);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    };

    this.isLoading = true;
    this.api
      .post(environment.base + '/site/save-user-info', formData, {
        httpOptions,
      })
      .subscribe({
        next: (userInfo: any) => {
          if (userInfo.status == 'ok') {
            this.isLoading = false;
            this.auth.autoLogin(emailSign, passwordSign);
          } else {
            this.isLoading = false;
            this.notify.errorNotification(userInfo.details, 'Save Info failed');
          }
        },
      });
  }

  // Input Array
  newContactType() {
    this.contactType.push(
      this.fb.group({
        type: [''],
        value: [''],
      })
    );
  }

  processFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.upload(file);
    }
  }
  file!: File;
  upload(fileTest: File) {
    this.file = fileTest;
  }

  // START countries - cities - regions
  countries = { id: '', nameAr: '', nameEn: '' };
  cities: any = [];
  regions: any = [];
  getCountries() {
    this.api
      .get(environment.base + `/area/get-countries`)
      .subscribe((res: any) => {
        if (res.status === 'ok') {
          this.countries = res.countries;
        } else {
          console.log(res);
        }
      });
  }
  getCities() {
    this.api
      .get(environment.base + `/area/get-cities`)
      .subscribe((res: any) => {
        if (res.status === 'ok') {
          this.cities = res.cities;
        } else {
          console.log(res);
        }
      });
  }
  onSelectCity(e: any) {
    this.getRegions(e.target.value);
  }
  getRegions(id: number) {
    this.api
      .get(environment.base + `/area/get-regions?cityId=` + id)
      .subscribe((res: any) => {
        if (res.status === 'ok') {
          this.regions = res.regions;
        } else {
          console.log(res);
        }
      });
  }
  // DONE countries - cities - regions
}
