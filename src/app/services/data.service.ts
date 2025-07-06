// ===============================
// src/app/services/data.service.ts
// ===============================
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  // Shared prompt data
  private dataSource = new BehaviorSubject<string>('');
  currentData = this.dataSource.asObservable();

  // Guard flag for form submission
  private formSubmitted = false;

  /** Push new prompt data */
  changeData(data: string): void {
    this.dataSource.next(data);
  }

  /** Mark that landing form has been submitted */
  markFormSubmitted(): void {
    this.formSubmitted = true;
  }

  /** Check if form was submitted */
  isFormSubmitted(): boolean {
    return this.formSubmitted;
  }
}
