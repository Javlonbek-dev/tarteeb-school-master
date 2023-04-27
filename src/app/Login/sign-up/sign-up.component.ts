import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helper/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  singUpForm!: FormGroup;
  teams: any[] = [];

  constructor(private authService: AuthService,private loginService: LoginService,
    private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.loadTeams();
    this.singUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      phoneNumber:['', Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      githubUsername:['',Validators.required],
      telegramUsername:['',Validators.required],
      birthDate:['',Validators.required],
      teamId:['',Validators.required],
      id: [this.generateGuid()]
    });
  }

  onSignup(){
    if (this.singUpForm.valid) {
      const now = new Date();
      const isoDateString = now.toISOString(); // convert to ISO format
      const userObj = {
        firstName: this.singUpForm.value.firstName,
        lastName: this.singUpForm.value.lastName,
        phoneNumber: this.singUpForm.value.phoneNumber,
        email: this.singUpForm.value.email,
        password: this.singUpForm.value.password,
        githubUsername: this.singUpForm.value.githubUsername,
        telegramUsername: this.singUpForm.value.telegramUsername,
        birthDate: this.singUpForm.value.birthDate,
        teamId: this.singUpForm.value.teamId,
        id: this.generateGuid(),
        CreatedDate: isoDateString,
        UpdatedDate: isoDateString
      };
      console.log(userObj);
      this.authService.signUp(userObj)
        .subscribe({
          next:(res=>{
            alert(res.title);
            this.singUpForm.reset();
            this.router.navigate(['/signin']);
          })
          ,error:(err=>{
            alert(err?.error.message)
          })
        })
    }else{
      ValidateForm.validateAllFormFilds(this.singUpForm)
    }
  }

  loadTeams(): void {
    this.authService.getTeam()
      .subscribe(
        (data) => {
          console.log(data)
          this.teams = data;
        },
        (error) => {
        }
      );
  }

  generateGuid() : string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
