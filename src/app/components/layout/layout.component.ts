import { HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  currentYear?: number;
  windowScrolled: boolean = false;
  user!: User;
  userInfoForm: FormGroup = new FormGroup({});
  roles: string[] = [
    'Doctor',
    'Pharmacist',
    'Sales Representative',
    'Scientific representative',
    'Agent',
    'Company manager',
  ];

  userDetails?: any;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private api: ApiService
  ) {}
  ngOnInit(): void {
    this.userDetails = this.auth.user$.getValue();
    this.currentYear = new Date().getFullYear();
    this.user = JSON.parse(localStorage.getItem('userData') || '{}');
    // !Form user
    this.userInfoForm = this.fb.group({
      userImage: [null],
      firstName: [
        this.user.firstName,
        [Validators.required, Validators.maxLength(20)],
      ],
      lastName: [
        this.user.lastName,
        [Validators.required, Validators.maxLength(20)],
      ],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'
          ),
        ],
      ],
      region: [this.user.region],
      city: [this.user.city],
      country: [this.user.country],
      role: [this.user.role],
      specialMark: [this.user.specialMark],
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.pageYOffset > 300) {
      this.windowScrolled = true;
    } else this.windowScrolled = false;
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  get userInfoF() {
    return this.userInfoForm.controls;
  }

  onUpdateUser() {
    const formData: any = new FormData();
    formData.append('id', this.user.id);
    formData.append('role', this.userInfoForm.value.role);
    formData.append('userImage', this.file);
    formData.append('updateUser', this.userInfoForm.value);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    };
    //TODO update user
    this.api
      .post(environment.base + '/site/update-user-info', formData, {
        httpOptions,
      })
      .subscribe((res:any) => {
          if (res.status=='ok') {
            this.auth.handleAuth(
              this.userDetails.getToken(),
              this.userInfoForm.value.email,
              this.userInfoForm.value.password,
              this.userInfoForm.value.firstName,
              this.userInfoForm.value.lastName,
              this.user.id,
              this.userInfoForm.value.userImage,
              this.userInfoForm.value.regionId,
              this.userInfoForm.value.cityId,
              this.userInfoForm.value.countryId,
              this.userInfoForm.value.region,
              this.userInfoForm.value.city,
              this.userInfoForm.value.country,
              this.userInfoForm.value.role,
              this.userInfoForm.value.specialMark,
              this.userInfoForm.value.contacts
            );
            console.log(this.user);
            console.log(this.userDetails);
          }
      });

  }

  processFile(event: any) {
    console.log(event);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.upload(file);
    }
  }
  file!: File;
  upload(fileTest: File) {
    // this.saveUserInfoForm.patchValue({
    //   img: file,
    // });
    // this.saveUserInfoForm.get('img')?.updateValueAndValidity();
    this.file = fileTest;
  }

  onLogOut() {
    this.auth.logout();
  }
}
