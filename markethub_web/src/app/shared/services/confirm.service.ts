import { Injectable, signal } from '@angular/core';

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private _open = signal(false);
  private _opts = signal<ConfirmOptions | null>(null);
  private resolver?: (v: boolean)=>void;

  isOpen = this._open.asReadonly();
  options = this._opts.asReadonly();

  ask(opts: ConfirmOptions): Promise<boolean> {
    this._opts.set({ confirmText: 'Confirmar', cancelText: 'Cancelar', title: 'Confirmação', danger: false, ...opts });
    this._open.set(true);
    return new Promise(res=> { this.resolver = res; });
  }

  confirm(){ if(this.resolver) this.resolver(true); this.close(); }
  cancel(){ if(this.resolver) this.resolver(false); this.close(); }
  private close(){ this._open.set(false); this._opts.set(null); this.resolver = undefined; }
}
