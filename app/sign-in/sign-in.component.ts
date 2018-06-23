import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";

@Component({
  moduleId: module.id,
  selector: "sign-in",
  styleUrls: ["./sign-in.component.css"],
  templateUrl: "./sign-in.component.html",
})

export class SignInComponent {
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

  public signInUser() {
    this.submitted = true;

    this.authService.singIn(this.form.get("email").value, this.form.get("password").value)
      .subscribe(
        () => {
          this.router.navigate(["/home"]);
          this.formErrors = null;
        },
        (error) => {
          this.submitted = false;

          if ( error.status === 401 ) {
            this.formErrors = error._body.errors;
          } else {
            this.formErrors = ["Não foi possível processar a solicitação. Por favor, tente mais tarde."];
          }
        },
      );
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ] ],
      password: [null, Validators.required],
    });
  }
}
