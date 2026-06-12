import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements OnInit, OnDestroy {
  @Input() appCountUp = 0;
  @Input() countSuffix = '';
  @Input() countDuration = 1800;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animate();
          this.observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private animate(): void {
    const target = this.appCountUp;
    const suffix = this.countSuffix;
    const duration = this.countDuration;
    const t0 = performance.now();

    const tick = (now: number): void => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.el.nativeElement.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
