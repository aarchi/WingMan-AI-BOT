// ===============================
// src/app/app.component.ts
// ===============================
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BotComponent } from './components/bot/bot.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent,
    LandingPageComponent,
    BotComponent,
    RouterModule,
    FooterComponent
  ]
})
export class AppComponent {
  // Flag set after form submission on LandingPageComponent
  isFormSubmitted = false;

  /**
   * Called when the landing page form is submitted
   * Updates the flag to allow navigation to the BotComponent
   */
  onFormSubmitted(): void {
    this.isFormSubmitted = true;
  }
}
