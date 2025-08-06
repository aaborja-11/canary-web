import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AccountStorageService } from '../../../shared/services/account-storage.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() sidenav!: MatSidenav;

  constructor(
    private accountStorageService: AccountStorageService,
    private router: Router
  ) {}

  logout(): void {
    this.accountStorageService.clearAccount();
    this.router.navigate(['/login']);
  }
}
