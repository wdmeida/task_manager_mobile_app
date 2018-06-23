"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("../shared/auth.service");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.userSignedIn()) {
            return true;
        }
        else {
            this.router.navigate(["/sign-in"]);
            return false;
        }
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGguZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsMENBQXNEO0FBRXRELHVEQUFxRDtBQUlyRDtJQUVFLG1CQUNVLFdBQXdCLEVBQ3hCLE1BQWM7UUFEZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3JCLENBQUM7SUFFRywrQkFBVyxHQUFsQjtRQUNDLEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDRixDQUFDO0lBZFUsU0FBUztRQUZyQixpQkFBVSxFQUFFO3lDQUtZLDBCQUFXO1lBQ2hCLGVBQU07T0FKYixTQUFTLENBZXJCO0lBQUQsZ0JBQUM7Q0FBQSxBQWZELElBZUM7QUFmWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvYXV0aC5zZXJ2aWNlXCI7XG5cbkBJbmplY3RhYmxlKClcblxuZXhwb3J0IGNsYXNzIEF1dGhHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgKSB7fVxuXG4gIHB1YmxpYyBjYW5BY3RpdmF0ZSgpIHtcbiAgIGlmICggdGhpcy5hdXRoU2VydmljZS51c2VyU2lnbmVkSW4oKSApIHtcbiAgICAgcmV0dXJuIHRydWU7XG4gICB9IGVsc2Uge1xuICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2lnbi1pblwiXSk7XG4gICAgIHJldHVybiBmYWxzZTtcbiAgIH1cbiAgfVxufVxuIl19