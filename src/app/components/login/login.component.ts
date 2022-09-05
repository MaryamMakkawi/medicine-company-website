import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { User } from 'src/app/interfaces/user.model';
import { NotifierService } from '../../services/notifier.service';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from '../../helpers/must-match.validator';

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
  loginForm: FormGroup = new FormGroup({});
  signupForm: FormGroup = new FormGroup({});
  saveUserInfoForm: FormGroup = new FormGroup({});
  resetPasswordForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private notify: NotifierService
  ) {}

  ngOnInit(): void {
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
      region: [''],
      city: [''],
      role: [''],
      country: [''],
      specialMark: [''],
      img: [null],
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
        console.log(user);
        if (user.status == 'ok') {
          this.isLoading = false;
          this.auth.handleAuth(
            user.userInfo.accessToken,
            user.userInfo.email,
            user.userInfo.firstName,
            user.userInfo.lastName,
            user.userInfo.id,
            user.userInfo.img,
            user.userInfo.regionId,
            user.userInfo.role,
            user.userInfo.userContacts
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
    this.auth.signup(signupForm.value).subscribe({
      next: (user: any) => {
        if (user.status == 'ok') {
          this.toggleCompleteInfoForm = true;
        } else {
          this.notify.errorNotification(user.details, 'login failed');
        }
      },
    });
  }

  // Save User Info
  onSaveInfo(emailSign: string, passwordSign: string) {
    this.auth.saveUserInfo(this.saveUserInfoForm.value, emailSign).subscribe({
      next: (userInfo: any) => {
        if (userInfo.status == 'ok') {
          console.log(userInfo);
          this.auth.autoLogin(emailSign,passwordSign);
        } else {
          this.notify.errorNotification(userInfo.details, 'login failed');
        }
      },
    });
  }
}
