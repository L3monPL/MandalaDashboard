import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[appReveal]' })
export class RevealDirective implements OnInit, OnDestroy {
  @Input() appReveal: 'up' | 'left' | 'right' | '' = 'up';
  @Input() revealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const el: HTMLElement = this.el.nativeElement;
    const direction = this.appReveal || 'up';
    this.renderer.addClass(el, `reveal-${direction}`);
    if (this.revealDelay > 0) {
      el.style.transitionDelay = `${this.revealDelay}ms`;
    }

    if (!isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(el, 'reveal-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(el, 'reveal-visible');
          this.observer?.disconnect();
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
