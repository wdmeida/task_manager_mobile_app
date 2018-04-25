"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Angular imports
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// NativeScript imports
var forms_2 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
// App core imports
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
// Components imports
var home_component_1 = require("./home/home.component");
var sign_in_component_1 = require("./sign-in/sign-in.component");
var sign_up_component_1 = require("./sign-up/sign-up.component");
// Service imports
var auth_guard_1 = require("./guards/auth.guard");
var auth_service_1 = require("./shared/auth.service");
var token_service_1 = require("./shared/token.service");
// rxjs operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
// rxjs extensions
require("rxjs/add/observable/of");
require("rxjs/add/observable/throw");
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent,
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                sign_in_component_1.SignInComponent,
                sign_up_component_1.SignUpComponent,
            ],
            imports: [
                app_routing_1.AppRoutingModule,
                forms_2.NativeScriptFormsModule,
                http_1.NativeScriptHttpModule,
                nativescript_module_1.NativeScriptModule,
                forms_1.ReactiveFormsModule,
            ],
            providers: [
                auth_guard_1.AuthGuard,
                auth_service_1.AuthService,
                token_service_1.TokenService,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA,
            ],
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBa0I7QUFDbEIsc0NBQTJEO0FBQzNELHdDQUFxRDtBQUVyRCx1QkFBdUI7QUFDdkIsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFFOUUsbUJBQW1CO0FBQ25CLGlEQUErQztBQUMvQyw2Q0FBaUQ7QUFFakQscUJBQXFCO0FBQ3JCLHdEQUFzRDtBQUN0RCxpRUFBOEQ7QUFDOUQsaUVBQThEO0FBRTlELGtCQUFrQjtBQUNsQixrREFBZ0Q7QUFDaEQsc0RBQW9EO0FBQ3BELHdEQUFzRDtBQUV0RCxpQkFBaUI7QUFDakIsbUNBQWlDO0FBQ2pDLDBDQUF3QztBQUN4QyxrREFBZ0Q7QUFDaEQsaUNBQStCO0FBQy9CLHVDQUFxQztBQUVyQyxrQkFBa0I7QUFDbEIsa0NBQWdDO0FBQ2hDLHFDQUFtQztBQStCbkM7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBN0JyQixlQUFRLENBQUM7WUFDUixTQUFTLEVBQUU7Z0JBQ1QsNEJBQVk7YUFDYjtZQUNELFlBQVksRUFBRTtnQkFDWiw0QkFBWTtnQkFDWiw4QkFBYTtnQkFDYixtQ0FBZTtnQkFDZixtQ0FBZTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDUCw4QkFBZ0I7Z0JBQ2hCLCtCQUF1QjtnQkFDdkIsNkJBQXNCO2dCQUN0Qix3Q0FBa0I7Z0JBQ2xCLDJCQUFtQjthQUNwQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxzQkFBUztnQkFDVCwwQkFBVztnQkFDWCw0QkFBWTthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHVCQUFnQjthQUNqQjtTQUNGLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFuZ3VsYXIgaW1wb3J0c1xuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG4vLyBOYXRpdmVTY3JpcHQgaW1wb3J0c1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcblxuLy8gQXBwIGNvcmUgaW1wb3J0c1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5cbi8vIENvbXBvbmVudHMgaW1wb3J0c1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNpZ25JbkNvbXBvbmVudCB9IGZyb20gXCIuL3NpZ24taW4vc2lnbi1pbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNpZ25VcENvbXBvbmVudCB9IGZyb20gXCIuL3NpZ24tdXAvc2lnbi11cC5jb21wb25lbnRcIjtcblxuLy8gU2VydmljZSBpbXBvcnRzXG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tIFwiLi9ndWFyZHMvYXV0aC5ndWFyZFwiO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvdG9rZW4uc2VydmljZVwiO1xuXG4vLyByeGpzIG9wZXJhdG9yc1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2hcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RlYm91bmNlVGltZVwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZGlzdGluY3RVbnRpbENoYW5nZWRcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwXCI7XG5cbi8vIHJ4anMgZXh0ZW5zaW9uc1xuaW1wb3J0IFwicnhqcy9hZGQvb2JzZXJ2YWJsZS9vZlwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvd1wiO1xuXG5ATmdNb2R1bGUoe1xuICBib290c3RyYXA6IFtcbiAgICBBcHBDb21wb25lbnQsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICBIb21lQ29tcG9uZW50LFxuICAgIFNpZ25JbkNvbXBvbmVudCxcbiAgICBTaWduVXBDb21wb25lbnQsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEF1dGhHdWFyZCxcbiAgICBBdXRoU2VydmljZSxcbiAgICBUb2tlblNlcnZpY2UsXG4gIF0sXG4gIHNjaGVtYXM6IFtcbiAgICBOT19FUlJPUlNfU0NIRU1BLFxuICBdLFxufSlcbi8qXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXG4qL1xuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==