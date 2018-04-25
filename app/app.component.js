"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ns_angular2_token_service_1 = require("./shared/ns-angular2-token-master/ns-angular2-token.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(tokenService) {
        this.tokenService = tokenService;
        this.tokenService.init({
            apiBase: "http://10.0.2.2:3000",
            globalOptions: {
                headers: {
                    "Accept": "application/vnd.taskmanager.v2",
                    "Content-Type": "application/json",
                },
            },
        });
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html",
        }),
        __metadata("design:paramtypes", [ns_angular2_token_service_1.NSAngular2TokenService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMseUdBQXFHO0FBT3JHO0lBQ0Usc0JBQTJCLFlBQW9DO1FBQXBDLGlCQUFZLEdBQVosWUFBWSxDQUF3QjtRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLGFBQWEsRUFBRTtnQkFDYixPQUFPLEVBQUU7b0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsY0FBYyxFQUFFLGtCQUFrQjtpQkFDbkM7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFYVSxZQUFZO1FBTHhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUM7eUNBR3lDLGtEQUFzQjtPQURwRCxZQUFZLENBWXhCO0lBQUQsbUJBQUM7Q0FBQSxBQVpELElBWUM7QUFaWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOU0FuZ3VsYXIyVG9rZW5TZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL25zLWFuZ3VsYXIyLXRva2VuLW1hc3Rlci9ucy1hbmd1bGFyMi10b2tlbi5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHRva2VuU2VydmljZTogTlNBbmd1bGFyMlRva2VuU2VydmljZSkge1xuICAgIHRoaXMudG9rZW5TZXJ2aWNlLmluaXQoe1xuICAgICAgYXBpQmFzZTogXCJodHRwOi8vMTAuMC4yLjI6MzAwMFwiLFxuICAgICAgZ2xvYmFsT3B0aW9uczoge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi92bmQudGFza21hbmFnZXIudjJcIixcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==