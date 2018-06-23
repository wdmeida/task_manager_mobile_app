"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var auth_service_1 = require("../shared/auth.service");
var SignInComponent = /** @class */ (function () {
    function SignInComponent(authService, formBuilder, router) {
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.setupForm();
        this.submitted = false;
        this.formErrors = null;
    }
    SignInComponent.prototype.signInUser = function () {
        var _this = this;
        this.submitted = true;
        this.authService.singIn(this.form.get("email").value, this.form.get("password").value)
            .subscribe(function () {
            _this.router.navigate(["/home"]);
            _this.formErrors = null;
        }, function (error) {
            _this.submitted = false;
            if (error.status === 401) {
                _this.formErrors = error._body.errors;
            }
            else {
                _this.formErrors = ["Não foi possível processar a solicitação. Por favor, tente mais tarde."];
            }
        });
    };
    SignInComponent.prototype.setupForm = function () {
        this.form = this.formBuilder.group({
            email: [null, [forms_1.Validators.required, forms_1.Validators.email]],
            password: [null, forms_1.Validators.required],
        });
    };
    SignInComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "sign-in",
            styleUrls: ["./sign-in.component.css"],
            templateUrl: "./sign-in.component.html",
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            forms_1.FormBuilder,
            router_1.Router])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWduLWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyx3Q0FBaUY7QUFDakYsMENBQXlDO0FBRXpDLHVEQUFxRDtBQVNyRDtJQUtFLHlCQUNVLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLE1BQWM7UUFGZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXRCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRU0sb0NBQVUsR0FBakI7UUFBQSxpQkFtQkM7UUFsQkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUNuRixTQUFTLENBQ1I7WUFDRSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBRXZCLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUN2QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7WUFDL0YsQ0FBQztRQUNILENBQUMsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVPLG1DQUFTLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNqQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxrQkFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLEtBQUssQ0FBRSxDQUFFO1lBQ3pELFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztTQUN0QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBekNVLGVBQWU7UUFQM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztZQUN0QyxXQUFXLEVBQUUsMEJBQTBCO1NBQ3hDLENBQUM7eUNBUXVCLDBCQUFXO1lBQ1gsbUJBQVc7WUFDaEIsZUFBTTtPQVJiLGVBQWUsQ0EwQzNCO0lBQUQsc0JBQUM7Q0FBQSxBQTFDRCxJQTBDQztBQTFDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvYXV0aC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogXCJzaWduLWluXCIsXG4gIHN0eWxlVXJsczogW1wiLi9zaWduLWluLmNvbXBvbmVudC5jc3NcIl0sXG4gIHRlbXBsYXRlVXJsOiBcIi4vc2lnbi1pbi5jb21wb25lbnQuaHRtbFwiLFxufSlcblxuZXhwb3J0IGNsYXNzIFNpZ25JbkNvbXBvbmVudCB7XG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG4gIHB1YmxpYyBzdWJtaXR0ZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBmb3JtRXJyb3JzOiBBcnJheTxzdHJpbmc+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICApIHtcbiAgICB0aGlzLnNldHVwRm9ybSgpO1xuICAgIHRoaXMuc3VibWl0dGVkID0gZmFsc2U7XG4gICAgdGhpcy5mb3JtRXJyb3JzID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzaWduSW5Vc2VyKCkge1xuICAgIHRoaXMuc3VibWl0dGVkID0gdHJ1ZTtcblxuICAgIHRoaXMuYXV0aFNlcnZpY2Uuc2luZ0luKHRoaXMuZm9ybS5nZXQoXCJlbWFpbFwiKS52YWx1ZSwgdGhpcy5mb3JtLmdldChcInBhc3N3b3JkXCIpLnZhbHVlKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9ob21lXCJdKTtcbiAgICAgICAgICB0aGlzLmZvcm1FcnJvcnMgPSBudWxsO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLnN1Ym1pdHRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgaWYgKCBlcnJvci5zdGF0dXMgPT09IDQwMSApIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUVycm9ycyA9IGVycm9yLl9ib2R5LmVycm9ycztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtRXJyb3JzID0gW1wiTsOjbyBmb2kgcG9zc8OtdmVsIHByb2Nlc3NhciBhIHNvbGljaXRhw6fDo28uIFBvciBmYXZvciwgdGVudGUgbWFpcyB0YXJkZS5cIl07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBGb3JtKCkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgZW1haWw6IFtudWxsLCBbIFZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMuZW1haWwgXSBdLFxuICAgICAgcGFzc3dvcmQ6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICB9KTtcbiAgfVxufVxuIl19