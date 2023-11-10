import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/ui/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proximity';
}
