import {
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
import { NativeScriptHttpModule } from "nativescript-angular/http";

//  import pages
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

import { NSAngular2TokenService } from "./shared/ns-angular2-token-master/ns-angular2-token.service";

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    NativeScriptHttpModule,
    NativeScriptModule,
    AppRoutingModule,
  ],
  providers: [
    NSAngular2TokenService,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
