import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { PopupManagementService } from 'src/app/services/popup-management.service';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'warning';
  message: string;
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(110%)' }),
        animate('300ms cubic-bezier(.25,.46,.45,.94)',
          style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in',
          style({ opacity: 0, transform: 'translateX(110%)' }))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit, OnDestroy {

  toasts: Toast[] = [];

  private nextId = 0;
  private subs: Subscription[] = [];
  private timers = new Map<number, ReturnType<typeof setTimeout>>();

  constructor(private popup: PopupManagementService) {}

  ngOnInit(): void {
    this.subs.push(
      this.popup.popupSuccesEmit.subscribe(msg  => this.add('success', msg)),
      this.popup.popupErrorEmit.subscribe(msg   => this.add('error',   msg)),
      this.popup.popupWarningEmit.subscribe(msg => this.add('warning', msg))
    );
  }

  add(type: Toast['type'], message: string): void {
    const id = this.nextId++;
    this.toasts.push({ id, type, message });
    this.timers.set(id, setTimeout(() => this.remove(id), 5000));
  }

  remove(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
    const t = this.timers.get(id);
    if (t) { clearTimeout(t); this.timers.delete(id); }
  }

  trackById(_: number, toast: Toast): number { return toast.id; }

  label(type: Toast['type']): string {
    return { success: 'Sukces', error: 'Błąd', warning: 'Ostrzeżenie' }[type];
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    this.timers.forEach(t => clearTimeout(t));
  }
}
