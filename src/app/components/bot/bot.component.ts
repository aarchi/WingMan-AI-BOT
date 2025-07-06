// ===============================
// src/app/components/bot/bot.component.ts
// ===============================
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { GptService } from '../../services/gpt.service';
import { TextToSpeechService } from '../../services/text-to-speech.service';

interface ChatMessage {
  who: 'user' | 'bot';
  text: string;
  audioUrl?: string;
}

@Component({
  selector: 'app-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit, OnDestroy {
  // Raw prompt data from landing page
  receivedData = '';

  // Subscriptions & loading flags
  private dataSub!: Subscription;
  isLoading = false;
  isLoading2 = false;

  // Main audio/video controls
  @ViewChild('avatarVideo', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  private mainAudio = new Audio();
  private mainBlobUrl: string | null = null;
  currentTime = 0;
  duration = 0;

  // Chat history & controls
  @ViewChildren('audioPlayers') audioPlayers!: QueryList<ElementRef<HTMLAudioElement>>;
  chatHistory: ChatMessage[] = [];
  userMessage = '';
  playingIndex: number | null = null;

  constructor(
    private dataService: DataService,
    private gpt: GptService,
    private tts: TextToSpeechService,
    private router: Router
  ) {}

  /**
   * Initialize video loop and subscribe to prompt stream
   */
  ngOnInit(): void {
    this.setupVideo();
    this.subscribeToPrompt();
  }

  /**
   * Clean up subscriptions and revoke resources
   */
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
    this.mainAudio.pause();
    if (this.mainBlobUrl) {
      URL.revokeObjectURL(this.mainBlobUrl);
    }
  }

  /** Navigate back to landing page with confirmation */
  onBack(event: MouseEvent): void {
    event.preventDefault();
    if (confirm('Going back will lose your current session. Proceed?')) {
      this.router.navigate(['/']);
    }
  }

/** Handle user sending a chat message */
onSend(): void {
  const question = this.userMessage.trim();
  if (!question) return;

  this.pauseMainPlayback();
  // Show user text instantly
  this.chatHistory.push({ who: 'user', text: question });
  this.userMessage = '';
  this.isLoading2 = true;

  // Append instruction for short, clear, and precise reply
  const instruction = "Please reply short, clear, and precise.";
  const prompt = `${this.receivedData}\n${question} ${instruction}`.trim();

  this.gpt.getGptResponse(prompt).pipe(
    finalize(() => (this.isLoading2 = false))
  ).subscribe(async reply => {
    // Add placeholder then attach TTS audio URL
    this.chatHistory.push({ who: 'bot', text: 'Wingman response' });
    const idx = this.chatHistory.length - 1;
    try {
      const blob = await this.tts.getAudioBlob(reply);
      this.chatHistory[idx].audioUrl = URL.createObjectURL(blob);
    } catch (err) {
      console.error('TTS error:', err);
    }
  });
}


  /** Primary play button for main video & audio */
  async play(): Promise<void> {
    if (this.isLoading) return;
    this.pauseAllChatAudio();
    this.videoRef.nativeElement.play();
    if (!this.receivedData) return;

    if (this.mainBlobUrl) {
      this.mainAudio.play();
    } else {
      this.isLoading = true;
      try {
        const blob = await this.tts.getAudioBlob(this.receivedData);
        this.mainBlobUrl = URL.createObjectURL(blob);
        this.mainAudio.src = this.mainBlobUrl;
        await this.mainAudio.play();
      } finally {
        this.isLoading = false;
      }
    }
  }

  /** Pause both video and main audio */
  pause(): void {
    if (this.isLoading) return;
    this.videoRef.nativeElement.pause();
    this.mainAudio.pause();
  }

  /** Reset video and audio to start */
  reset(): void {
    if (this.isLoading) return;
    const v = this.videoRef.nativeElement;
    v.pause(); v.currentTime = 0;
    this.mainAudio.pause(); this.mainAudio.currentTime = 0;
  }

  /** Sync seek bar between video and audio */
  onSeek(event: Event): void {
    const val = +(event.target as HTMLInputElement).value;
    this.mainAudio.currentTime = val;
    this.videoRef.nativeElement.currentTime = val;
  }

  /** Format seconds to MM:SS */
  formatTime(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = String(Math.floor(sec % 60)).padStart(2, '0');
    return `${m}:${s}`;
  }

  /** Play audio clip from chatHistory */
  togglePlay(idx: number): void {
    // Stop main media first
    this.pauseMainPlayback();

    const player = this.audioPlayers.toArray()[idx].nativeElement;
    if (this.playingIndex === idx) {
      player.paused ? player.play() : player.pause();
      return;
    }

    // Reset previous chat clip
    if (this.playingIndex !== null) {
      const prev = this.audioPlayers.toArray()[this.playingIndex].nativeElement;
      prev.pause(); prev.currentTime = 0;
    }

    // Start new clip
    player.currentTime = 0;
    player.play();
    this.playingIndex = idx;
    player.onended = () => { player.currentTime = 0; this.playingIndex = null; };
  }

  /** Play any raw URL audio */
  playUrl(url: string): void {
    const a = new Audio(url);
    a.play().catch(err => console.error('Playback error', err));
  }

  // === Private utilities ===

  /** Initialize looping avatar video and setup audio events */
  private setupVideo(): void {
    const video = this.videoRef.nativeElement;
    video.loop = true;
    video.muted = true;
    video.preload = 'auto';

    this.mainAudio.addEventListener('loadedmetadata', () => {
      this.duration = this.mainAudio.duration;
    });
    this.mainAudio.addEventListener('timeupdate', () => {
      this.currentTime = this.mainAudio.currentTime;
    });
  }

  /** Subscribe to prompt data and fetch initial GPT+TTS */
  private subscribeToPrompt(): void {
    this.dataSub = this.dataService.currentData.subscribe(input => {
      this.receivedData = input;
      this.resetMainMedia();
      this.isLoading = true;
      this.gpt.getGptResponse(input).pipe(
        finalize(() => (this.isLoading = false))
      ).subscribe(async reply => {
        try {
          const blob = await this.tts.getAudioBlob(reply);
          this.mainBlobUrl = URL.createObjectURL(blob);
          this.mainAudio.src = this.mainBlobUrl;
          this.mainAudio.onended = () => {
            URL.revokeObjectURL(this.mainBlobUrl!);
            this.videoRef.nativeElement.pause();
            this.videoRef.nativeElement.currentTime = 0;
          };
        } catch (err) {
          console.error('TTS error:', err);
        }
      });
    });
  }

  /** Pause & reset video + main audio */
  private pauseMainPlayback(): void {
    this.videoRef.nativeElement.pause();
    this.mainAudio.pause();
  }

  /** Pause & reset all chat audio clips */
  private pauseAllChatAudio(): void {
    this.audioPlayers.forEach(ref => {
      const a = ref.nativeElement;
      a.pause(); a.currentTime = 0;
    });
    this.playingIndex = null;
  }

  /** Reset video + audio when receiving new prompt */
  private resetMainMedia(): void {
    if (this.mainBlobUrl) {
      URL.revokeObjectURL(this.mainBlobUrl);
      this.mainBlobUrl = null;
    }
    this.mainAudio.src = '';
    const v = this.videoRef.nativeElement;
    v.pause(); v.currentTime = 0;
    this.currentTime = 0; this.duration = 0;
  }
}
