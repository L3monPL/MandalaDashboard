import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({ selector: '[appReveal]' })
export class RevealDirective implements OnInit, OnDestroy {
  @Input() appReveal: 'up' | 'left' | 'right' | '' = 'up';
  @Input() revealDelay = 0;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const el: HTMLElement = this.el.nativeElement;
    const direction = this.appReveal || 'up';
    this.renderer.addClass(el, `reveal-${direction}`);
    if (this.revealDelay > 0) {
      el.style.transitionDelay = `${this.revealDelay}ms`;
    }
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(el, 'reveal-visible');
          this.observer.disconnect();
        }
      },
      { threshold: 0.13 }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
