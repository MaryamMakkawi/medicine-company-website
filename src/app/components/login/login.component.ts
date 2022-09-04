import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { User } from 'src/app/interfaces/user.interface';
import { NotifierService } from '../../services/notifier.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  toggleLoginActive: boolean = true;
  isLoading: boolean = false;
  errorMassage: string = '';
  users: User[] = [];
  usersCollection?: AngularFirestoreCollection<any[]>;
  signInForm: FormGroup = new FormGroup({});
  signUpForm: FormGroup = new FormGroup({});
  resetPasswordForm: FormGroup = new FormGroup({});

  constructor(
    public db: AngularFirestore,
    private fb: FormBuilder,
    private auth: AuthService,
    private notify: NotifierService,
    private router: Router
  ) {
    // db.collection('user')
    //   .valueChanges()
    //   .subscribe((users: any) => {
    //     this.users = users;
    //     console.log(users);
    //   });
    this.usersCollection = db.collection('user');
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
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

    this.signInForm = this.fb.group({
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

  get nameErrors() {
    return (this.signUpForm.get('name') as FormControl).errors;
  }
  get emailErrors() {
    return (this.signUpForm.get('email') as FormControl).errors;
  }
  get passwordErrors() {
    return (this.signUpForm.get('password') as FormControl).errors;
  }
  get signinEmailErrors() {
    return (this.signInForm.get('email') as FormControl).errors;
  }
  get signinPasswordErrors() {
    return (this.signInForm.get('password') as FormControl).errors;
  }
  get resetPasswordFormErrors() {
    return (this.resetPasswordForm.get('email') as FormControl).errors;
  }

  onSignin(signinForm: FormGroup) {
    if (!signinForm.valid) return;

    const email = signinForm.value.email;
    const pass = signinForm.value.password;
    this.isLoading = true;
    this.auth.loginAuth(email, pass).subscribe({
      next: (resData) => {
        // console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/layout/home']);
        signinForm.reset();
      },
      error: (resError) => {
        this.isLoading = false;
        this.notify.errorNotification(resError.message, 'login faild');
      },
    });
  }

  onSignup(signupForm: FormGroup) {
    if (!signupForm.valid) return;

    const email = signupForm.value.email;
    const pass = signupForm.value.password;
    this.isLoading = true;
    this.auth.signUpAuth(email, pass).subscribe({
      next: (resData) => {
        // console.log(resData);
        this.usersCollection?.add(signupForm.value);
        this.isLoading = false;
        this.router.navigate(['/layout/home']);
        signupForm.reset();
      },
      error: (resError) => {
        this.isLoading = false;
        this.notify.errorNotification(resError.message, 'signup faild');
      },
    });
  }

  signinGoogle() {
    this.auth
      .signinWithGoogle()
      .catch(() =>
        this.notify.errorNotification(
          'check you network and try again',
          'google login failed'
        )
      );
  }
  signinWithFacbook() {
    this.auth
      .signinWithFacbook()
      .catch(() =>
        this.notify.errorNotification(
          'check you network and try again',
          'facebook login failed'
        )
      );
  }

  onResetPassword(resetPasswordForm: FormGroup) {
    if (!resetPasswordForm.valid) return;

    this.auth.resetPassword(resetPasswordForm.value.email).then(
      () =>
        this.notify.successNotification(
          'Password reset email sent',
          'Reset Password'
        ),
      (error) =>
        this.notify.errorNotification(
          'network connection failed',
          'Reset Password'
        )
    );
  }
  // changeSpecificFieldPassword() {
  //   this.db
  //     .collection('user')
  //     .doc('/' + 'L6UfVtu3akpBdJStTSQw') //id Document
  //     .update({ password: '12345678' }) // key name field :'value'
  //     .then(() => {
  //       console.log('done');
  //     })
  //     .catch(function (error) {
  //       console.error('Error writing document: ', error);
  //     });
  // }
}
