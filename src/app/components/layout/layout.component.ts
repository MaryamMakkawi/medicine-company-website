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
    this.user = JSON.parse(localStorage.getItem('userData') || '{}');

    this.currentYear = new Date().getFullYear();
    this.auth.autoLogin();
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
    formData.append('userImage', this.file);
    formData.append('email', this.userInfoForm.value.email);
    formData.append('firstName', this.userInfoForm.value.firstName);
    formData.append('lastName', this.userInfoForm.value.lastName);
    formData.append('region', this.userInfoForm.value.region);
    formData.append('city', this.userInfoForm.value.city);
    formData.append('country', this.userInfoForm.value.country);
    formData.append('role', this.userInfoForm.value.role);
    formData.append('specialMark', this.userInfoForm.value.specialMark);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    };
    this.api
      .post(environment.base + '/site/update-user-info', formData, {
        httpOptions,
      })
      .subscribe((res: any) => {
        if (res.status == 'ok') {
          this.auth.user$.next(res.user);
          localStorage.setItem('userData', JSON.stringify(res.user));
          this.userDetails = this.auth.user$.getValue();
          this.user.userImage=this.userDetails.img
        } else {
          console.log(res);
        }
      });
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

  onLogOut() {
    this.auth.logout();
  }
}
