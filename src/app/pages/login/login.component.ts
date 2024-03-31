import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReservationService } from 'src/app/reservation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  posts:any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService,
    private reservationService: ReservationService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
    this.reservationService.getOrder()
    .subscribe(response => {
      this.posts = response;
      console.log("order",this.posts)
    });
  }
  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/reserved-table-date']);
          this.message.success('Login successful!', {
            nzDuration: 3000,
          });
        },
        (error) => {
          this.message.error('An error occurred. Please try again.', {
            nzDuration: 3000,
          });
          console.error('Login error:', error);
        }
      );
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
