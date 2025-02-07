import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  isSubmitted = false;

  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      adresse: ['', [Validators.required, Validators.minLength(2)]]
    },{
      validators: this.passwordsMatchValidator('password','confirmPassword')
    });

    this.returnUrl= this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    console.log('Form submit triggered');
    console.log('Form validity:', this.registerForm.valid);
    console.log(this.registerForm.value);
  
    this.isSubmitted = true;
  
    if (this.registerForm.invalid) {
      console.error('Form errors:', this.registerForm.errors);
  
      // Log individual field errors
      Object.keys(this.registerForm.controls).forEach(field => {
        const controlErrors = this.registerForm.get(field)?.errors;
        console.error(`Field '${field}' errors:`, controlErrors);
      });
  
      return;
    }
  
    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      adresse: fv.adresse,
    };
  
    console.log('Submitting registration:', user);
  
    this.userService.register(user).subscribe(
      () => {
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error("Registration error:", error);
        alert('Erreur lors de l\'inscription.');
      }
    );
  }
  
  private passwordsMatchValidator(passwordControlName: string, confirmPasswordControlName: string) {
    return (form: AbstractControl) => {
      const passwordControl = form.get(passwordControlName);
      const confirmPasswordControl = form.get(confirmPasswordControlName);

      if (!passwordControl || !confirmPasswordControl) return;

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ notMatch: true });
      } else {
        const errors = confirmPasswordControl.errors;
        if (!errors) return;

        delete errors['notMatch'];
        confirmPasswordControl.setErrors(errors);
      }
    };
  }
  

}