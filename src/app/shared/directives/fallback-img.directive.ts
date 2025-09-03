import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appFallbackImg]'
})
export class FallbackImgDirective {
  @Input() appFallbackImg = 'assets/default-avatar.png'; // fallback principal
  private triedFallback = false; // já tentou o fallback principal
  private triedDefault = false;  // já tentou fallback absoluto (opcional)

  @HostListener('error', ['$event'])
  onError(event: Event) {
    const img = event.target as HTMLImageElement;

    // 1º: tenta o fallback definido pelo usuário
    if (!this.triedFallback) {
      img.src = this.appFallbackImg;
      this.triedFallback = true;
      return;
    }

    // 2º: tenta fallback absoluto do projeto (opcional)
    if (!this.triedDefault) {
      img.src = 'assets/default-avatar.png';
      this.triedDefault = true;
      return;
    }

    // 3º: desativa o loop se nada funcionar
    img.onerror = null;
  }
}
