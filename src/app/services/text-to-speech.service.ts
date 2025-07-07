// text-to-speech.service.ts
import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { environment }   from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TextToSpeechService {
  private readonly ttsUrl = `${environment.serverUrl}/tts`;

  constructor(private http: HttpClient) {}

  getAudioBlob(text: string): Promise<Blob> {
    return firstValueFrom(
      this.http.post(this.ttsUrl, { text }, { responseType: 'blob' })
    );
  }
}
