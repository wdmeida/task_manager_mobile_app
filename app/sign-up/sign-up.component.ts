import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";
import { User } from "../shared/user.model";

@Component({
  moduleId: module.id,
  selector: "sign-up",
  templateUrl: "./sign-up.component.html",
})

export class SignUpComponent {
  public form: FormGroup;
  public submitted: boolean;
  public formErrors: Array<string>;

  public constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.setupForm();

    this.submitted = false;
    this.formErrors = null;
  }

  public signUpUser() {
    this.submitted = true;

    this.authService.signUp(this.form.value as User)
      .subscribe(
        () => {
          alert("Parabéns, sua conta foi criada com sucesso!");
          this.router.navigate(["/home"]);
          this.formErrors = null;
        },
        (error) => {
          this.submitted = false;

          if ( error.status === 422 ) {
            this.formErrors = error._body.errors.full_messages;
          } else {
            this.formErrors = ["Não foi possível processar a solicitação. Por favor, tente mais tarde."];
          }
        },
      );
  }

  public passwordConfirmationValidator(form: FormGroup) {
    if (form.get("password").dirty && form.get("password").value === form.get("passwordConfirmation").value) {
      form.get("passwordConfirmation").setErrors(null);
    } else {
      form.get("passwordConfirmation").setErrors({ mismatch: true });
    }
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ] ],
      name: [null, [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ] ],
      password: [null, [ Validators.required, Validators.minLength(8) ] ],
      passwordConfirmation: [null, [ Validators.required ] ],
    }, { validator: this.passwordConfirmationValidator });
  }
}
