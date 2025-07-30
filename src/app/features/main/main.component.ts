import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-main',
  imports: [
    MatSidenavModule,
    MatListModule,
    HeaderComponent,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
