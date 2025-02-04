import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone: true,
  imports: [FormsModule] // ✅ Add FormsModule to support ngModel
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';

  @Output() login = new EventEmitter<{ email: string; password: string }>();

  onSubmit(event: Event) {
    event.preventDefault(); // ✅ Prevent default form submission
    this.login.emit({ email: this.email, password: this.password }); // ✅ Emit as expected type
  }
}
