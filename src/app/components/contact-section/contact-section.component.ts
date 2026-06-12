import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements OnDestroy {
  form: FormGroup;
  loading = false;
  success = false;
  errorMsg = '';

  private sub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private rest: RestService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    this.errorMsg = '';

    const { name, email, message } = this.form.value;

    this.sub = this.rest.postContactEmail(name, email, message).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.form.reset();
        setTimeout(() => { this.success = false; }, 4000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message ?? 'Wystąpił błąd. Spróbuj ponownie.';
      }
    });
  }

  openPrivacyPolicy(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/polityka-prywatnosci']);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
