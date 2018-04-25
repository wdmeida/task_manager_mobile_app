import { Component } from "@angular/core";
import { NSAngular2TokenService } from "./shared/ns-angular2-token-master/ns-angular2-token.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
  public constructor(private tokenService: NSAngular2TokenService) {
    this.tokenService.init({
      apiBase: "http://urldapi",
      globalOptions: {
        headers: {
          "Accept": "application/vnd.taskmanager.v2",
          "Content-Type": "application/json",
        },
      },
    });
  }
}
