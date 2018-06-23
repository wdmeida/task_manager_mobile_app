"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var auth_service_1 = require("../shared/auth.service");
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(authService, formBuilder, router) {
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.setupForm();
        this.submitted = false;
        this.formErrors = null;
    }
    SignUpComponent.prototype.signUpUser = function () {
        var _this = this;
        this.submitted = true;
        this.authService.signUp(this.form.value)
            .subscribe(function () {
            alert("Parabéns, sua conta foi criada com sucesso!");
            _this.router.navigate(["/home"]);
            _this.formErrors = null;
        }, function (error) {
            _this.submitted = false;
            if (error.status === 422) {
                _this.formErrors = error._body.errors.full_messages;
            }
            else {
                _this.formErrors = ["Não foi possível processar a solicitação. Por favor, tente mais tarde."];
            }
        });
    };
    SignUpComponent.prototype.passwordConfirmationValidator = function (form) {
        if (form.get("password").dirty && form.get("password").value === form.get("passwordConfirmation").value) {
            form.get("passwordConfirmation").setErrors(null);
        }
        else {
            form.get("passwordConfirmation").setErrors({ mismatch: true });
        }
    };
    SignUpComponent.prototype.setupForm = function () {
        this.form = this.formBuilder.group({
            email: [null, [forms_1.Validators.required, forms_1.Validators.email]],
            name: [null, [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(100)]],
            password: [null, [forms_1.Validators.required, forms_1.Validators.minLength(8)]],
            passwordConfirmation: [null, [forms_1.Validators.required]],
        }, { validator: this.passwordConfirmationValidator });
    };
    SignUpComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "sign-up",
            templateUrl: "./sign-up.component.html",
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            forms_1.FormBuilder,
            router_1.Router])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWduLXVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyx3Q0FBaUY7QUFDakYsMENBQXlDO0FBRXpDLHVEQUFxRDtBQVNyRDtJQUtFLHlCQUNVLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLE1BQWM7UUFGZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXRCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRU0sb0NBQVUsR0FBakI7UUFBQSxpQkFvQkM7UUFuQkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFhLENBQUM7YUFDN0MsU0FBUyxDQUNSO1lBQ0UsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFDckQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDSixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUV2QixFQUFFLENBQUMsQ0FBRSxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1lBQ3JELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsd0VBQXdFLENBQUMsQ0FBQztZQUMvRixDQUFDO1FBQ0gsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRU0sdURBQTZCLEdBQXBDLFVBQXFDLElBQWU7UUFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakUsQ0FBQztJQUNILENBQUM7SUFFTyxtQ0FBUyxHQUFqQjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDakMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUUsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsa0JBQVUsQ0FBQyxLQUFLLENBQUUsQ0FBRTtZQUN6RCxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxrQkFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFFO1lBQzFGLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFFLGtCQUFVLENBQUMsUUFBUSxFQUFFLGtCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUU7WUFDbkUsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBRSxDQUFFO1NBQ3ZELEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBckRVLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsMEJBQTBCO1NBQ3hDLENBQUM7eUNBUXVCLDBCQUFXO1lBQ1gsbUJBQVc7WUFDaEIsZUFBTTtPQVJiLGVBQWUsQ0FzRDNCO0lBQUQsc0JBQUM7Q0FBQSxBQXRERCxJQXNEQztBQXREWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL3NoYXJlZC91c2VyLm1vZGVsXCI7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogXCJzaWduLXVwXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vc2lnbi11cC5jb21wb25lbnQuaHRtbFwiLFxufSlcblxuZXhwb3J0IGNsYXNzIFNpZ25VcENvbXBvbmVudCB7XG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG4gIHB1YmxpYyBzdWJtaXR0ZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBmb3JtRXJyb3JzOiBBcnJheTxzdHJpbmc+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICApIHtcbiAgICB0aGlzLnNldHVwRm9ybSgpO1xuXG4gICAgdGhpcy5zdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZvcm1FcnJvcnMgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIHNpZ25VcFVzZXIoKSB7XG4gICAgdGhpcy5zdWJtaXR0ZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5hdXRoU2VydmljZS5zaWduVXAodGhpcy5mb3JtLnZhbHVlIGFzIFVzZXIpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgYWxlcnQoXCJQYXJhYsOpbnMsIHN1YSBjb250YSBmb2kgY3JpYWRhIGNvbSBzdWNlc3NvIVwiKTtcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7XG4gICAgICAgICAgdGhpcy5mb3JtRXJyb3JzID0gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdWJtaXR0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgIGlmICggZXJyb3Iuc3RhdHVzID09PSA0MjIgKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1FcnJvcnMgPSBlcnJvci5fYm9keS5lcnJvcnMuZnVsbF9tZXNzYWdlcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtRXJyb3JzID0gW1wiTsOjbyBmb2kgcG9zc8OtdmVsIHByb2Nlc3NhciBhIHNvbGljaXRhw6fDo28uIFBvciBmYXZvciwgdGVudGUgbWFpcyB0YXJkZS5cIl07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXNzd29yZENvbmZpcm1hdGlvblZhbGlkYXRvcihmb3JtOiBGb3JtR3JvdXApIHtcbiAgICBpZiAoZm9ybS5nZXQoXCJwYXNzd29yZFwiKS5kaXJ0eSAmJiBmb3JtLmdldChcInBhc3N3b3JkXCIpLnZhbHVlID09PSBmb3JtLmdldChcInBhc3N3b3JkQ29uZmlybWF0aW9uXCIpLnZhbHVlKSB7XG4gICAgICBmb3JtLmdldChcInBhc3N3b3JkQ29uZmlybWF0aW9uXCIpLnNldEVycm9ycyhudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybS5nZXQoXCJwYXNzd29yZENvbmZpcm1hdGlvblwiKS5zZXRFcnJvcnMoeyBtaXNtYXRjaDogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwRm9ybSgpIHtcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGVtYWlsOiBbbnVsbCwgWyBWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLmVtYWlsIF0gXSxcbiAgICAgIG5hbWU6IFtudWxsLCBbIFZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMubWluTGVuZ3RoKDUpLCBWYWxpZGF0b3JzLm1heExlbmd0aCgxMDApIF0gXSxcbiAgICAgIHBhc3N3b3JkOiBbbnVsbCwgWyBWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLm1pbkxlbmd0aCg4KSBdIF0sXG4gICAgICBwYXNzd29yZENvbmZpcm1hdGlvbjogW251bGwsIFsgVmFsaWRhdG9ycy5yZXF1aXJlZCBdIF0sXG4gICAgfSwgeyB2YWxpZGF0b3I6IHRoaXMucGFzc3dvcmRDb25maXJtYXRpb25WYWxpZGF0b3IgfSk7XG4gIH1cbn1cbiJdfQ==