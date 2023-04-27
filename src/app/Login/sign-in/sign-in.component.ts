import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../user';
import ValidateForm from 'src/app/helper/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  singInForm!: FormGroup;
  user = new User();
  username: any;

  constructor(private loginService: LoginService, private authService: AuthService,
    private fb: FormBuilder, private router: Router, private toast: NgToastService ){}

  ngOnInit(): void {
    this.singInForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit(){
    if (this.singInForm.valid) {
      console.log(this.singInForm.value)
      this.authService.login(this.singInForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.title)
          this.singInForm.reset();
          this.authService.storeToken(res.token);
          this.toast.success({detail: "SUCCESS", summary: res.message, duration: 5000})
          this.router.navigate(['navbar']);
        },
        error:(err)=>{
          alert(err?.error.message)
          this.toast.success({detail: "Error", summary: "Somthing when wrong!", duration: 5000})
        }
      })
    }
    else{
      ValidateForm.validateAllFormFilds(this.singInForm)
    }
  }
}
