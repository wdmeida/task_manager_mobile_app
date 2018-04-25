// Angular imports
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

// NativeScript imports
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

// App core imports
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";

// Components imports
import { HomeComponent } from "./home/home.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

// Service imports
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./shared/auth.service";
import { TokenService } from "./shared/token.service";

// rxjs operators
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

// rxjs extensions
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    NativeScriptHttpModule,
    NativeScriptModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    TokenService,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
