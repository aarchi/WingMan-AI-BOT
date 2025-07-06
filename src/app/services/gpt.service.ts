// ===============================
// src/app/services/gpt.service.ts
// ===============================
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface OpenAIChoice { message: { role: string; content: string }; }
interface OpenAIResponse { choices: OpenAIChoice[]; }

@Injectable({ providedIn: 'root' })
export class GptService {

  private apiUrl = environment.gptUrl;
  private apiKey = environment.gptApiKey;
  constructor(private http: HttpClient) {}

  /**
   * Send prompt to OpenAI and return assistant reply text
   */
  getGptResponse(prompt: string): Observable<string> {
    const payload = { model: 'gpt-4', messages: [{ role: 'user', content: prompt }] };
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' });
    return this.http.post<OpenAIResponse>(this.apiUrl, payload, { headers }).pipe(
      map(res => res.choices[0]?.message.content.trim() || ''),
      catchError((err: HttpErrorResponse) => throwError(() => new Error(
        err.status === 429 ? 'Rate limit exceeded' : 'Error communicating with OpenAI'
      )))
    );
  }
}
