import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'error' | 'warning' | 'info';
export interface AlertMessage {
  id: number;
  type: AlertType;
  text: string;
  timeout?: number;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private _alerts = signal<AlertMessage[]>([]);
  alerts = this._alerts.asReadonly();
  private counter = 0;

  push(type: AlertType, text: string, timeout = 4000) {
    const id = ++this.counter;
    const msg: AlertMessage = { id, type, text, timeout };
    this._alerts.update(list => [...list, msg]);
    if (timeout > 0) {
      setTimeout(() => this.close(id), timeout);
    }
  }

  success(text: string, timeout?: number){ this.push('success', text, timeout); }
  error(text: string, timeout?: number){ this.push('error', text, timeout); }
  warning(text: string, timeout?: number){ this.push('warning', text, timeout); }
  info(text: string, timeout?: number){ this.push('info', text, timeout); }

  close(id: number){
    this._alerts.update(list => list.filter(a => a.id !== id));
  }
  clear(){ this._alerts.set([]); }
}
