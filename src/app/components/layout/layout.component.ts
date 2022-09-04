import { Component, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
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
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.user = JSON.parse(localStorage.getItem('userData') || '{}');
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
  onLogOut() {
    this.auth.logOutAuth();
  }
}
