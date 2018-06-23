"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var token_service_1 = require("./shared/token.service");
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
        __metadata("design:paramtypes", [token_service_1.TokenService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsd0RBQXNEO0FBT3REO0lBQ0Usc0JBQTJCLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsYUFBYSxFQUFFO2dCQUNiLE9BQU8sRUFBRTtvQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO29CQUMxQyxjQUFjLEVBQUUsa0JBQWtCO2lCQUNuQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQVhVLFlBQVk7UUFMeEIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDbEMsQ0FBQzt5Q0FHeUMsNEJBQVk7T0FEMUMsWUFBWSxDQVl4QjtJQUFELG1CQUFDO0NBQUEsQUFaRCxJQVlDO0FBWlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL3Rva2VuLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5cbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSB0b2tlblNlcnZpY2U6IFRva2VuU2VydmljZSkge1xuICAgIHRoaXMudG9rZW5TZXJ2aWNlLmluaXQoe1xuICAgICAgYXBpQmFzZTogXCJodHRwOi8vMTAuMC4yLjI6MzAwMFwiLFxuICAgICAgZ2xvYmFsT3B0aW9uczoge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi92bmQudGFza21hbmFnZXIudjJcIixcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==