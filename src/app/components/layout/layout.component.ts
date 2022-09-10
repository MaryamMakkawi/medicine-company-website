import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private auth: AuthService, private fb: FormBuilder) {}
  ngOnInit(): void {
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

  onSave() {
    this.auth
      .saveUserInfo(
        this.userInfoForm.value.userImage,
        this.userInfoForm.value.regionId,
        this.userInfoForm.value.cityId,
        this.userInfoForm.value.countryId,
        this.userInfoForm.value.region,
        this.userInfoForm.value.city,
        this.userInfoForm.value.country,
        this.userInfoForm.value.role,
        this.userInfoForm.value.specialMark,
        this.userInfoForm.value.Contacts,
        this.userInfoForm.value.email
      )
      .subscribe((updateUser: any) => {
        console.log(updateUser);
        if (updateUser.status == 'ok') {
          this.auth.autoLogin(
            this.userInfoForm.value.email,
            this.userInfoForm.value.password
          );
        }
      });
  }

  onLogOut() {
    this.auth.logout();
  }
}
