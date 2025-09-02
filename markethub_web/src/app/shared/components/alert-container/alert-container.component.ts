import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports:[CommonModule],
  styleUrls:['./alert-container.component.css'],
  template: `
  <div class="toast-host" *ngIf="alerts.length">
    <div *ngFor="let a of alerts; trackBy: track" class="toast" [class]="'toast '+a.type" (mouseenter)="pause(a.id)" (mouseleave)="resume(a.id)">
      <div class="side-accent"></div>
      <div class="icon" [innerHTML]="icon(a.type)"></div>
      <div class="body">
        <div class="text">{{ a.text }}</div>
      </div>
      <button class="close" (click)="close(a.id)" aria-label="Fechar">×</button>
      <div class="progress" [style.animationDuration]="a.timeout+'ms'"></div>
    </div>
  </div>
  `
})
export class AlertContainerComponent {
  private paused = signal<Set<number>>(new Set());
  constructor(private alertSvc: AlertService){}
  get alerts(){ return this.alertSvc.alerts(); }
  track = (_:number, a:any)=>a.id;

  close(id:number){ this.alertSvc.close(id); }
  icon(t:string){
    switch(t){
      case 'success': return '✅';
      case 'error': return '⛔';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  }
  pause(id:number){ /* espaço para futuramente pausar barra */ }
  resume(id:number){}
}
