import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './deshboard-layout.component.html',
  styles: ``
})
export class DeshboardLayoutComponent {

    private authService = inject( AuthService );
    public user = computed(() => this.authService.currentUser());

    public logout = () => {
        this.authService.logout();
    }


}
