// ===============================
// src/app/guards/form-submitted.guard.ts
// ===============================
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({ providedIn: 'root' })
export class FormSubmittedGuard implements CanActivate {
  constructor(private dataService: DataService, private router: Router) {}

  /**
   * Allow navigation to /bot only if form was submitted
   */
  canActivate(): boolean {
    if (this.dataService.isFormSubmitted()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
