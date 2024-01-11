import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

    private fb =inject(FormBuilder);
    private authService =inject(AuthService);
    private router =inject(Router);

    public myForm:FormGroup = this.fb.group({
        email    : ['lmxiap@gmail.com', [Validators.required, Validators.email]],
        password : ['abc123', [Validators.required, Validators.minLength(6)]],
    })


    login(){
        
        const {email, password} = this.myForm.value;
        this.authService.login(email, password)
            .subscribe({
                next: (_)=> this.router.navigateByUrl('/dashboard'),
                error: (errorMessage) => {
                    Swal.fire({
                        title: 'Atention',
                        text: errorMessage,
                        icon: 'error'
                    })
                }
            });
    }


}
