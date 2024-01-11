import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './register-page.component.html',
    styles: ``
})
export class RegisterPageComponent {

    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    public myForm: FormGroup = this.fb.group({
        email: ['lmxiap@gmail.com', [Validators.required, Validators.email]],
        password: ['abc123', [Validators.required, Validators.minLength(6)]],
        name: ['Miguel Xiap', [Validators.required, Validators.minLength(6)]],
    })


    register() {

        const { email, password, name } = this.myForm.value;
        this.authService.register(email, password, name)
            .subscribe({
                next: (_) => this.router.navigateByUrl('/dashboard'),
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
