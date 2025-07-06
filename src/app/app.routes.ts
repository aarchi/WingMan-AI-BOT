import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BotComponent }        from './components/bot/bot.component';
import { FormSubmittedGuard } from './util/form-submitted.guard';


export const routes: Routes = [
  { path: '',    component: LandingPageComponent },
  {
    path: 'bot',
    component: BotComponent,
    canActivate: [FormSubmittedGuard]
  },
  { path: '**',  redirectTo: '' }
];
