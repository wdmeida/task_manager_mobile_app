"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Angular imports
var core_1 = require("@angular/core");
// NativeScript imports
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
var http_1 = require("nativescript-angular/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
// App core imports
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
// Components imports
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
                sign_in_component_1.SignInComponent,
                sign_up_component_1.SignUpComponent,
            ],
            imports: [
                http_1.NativeScriptHttpModule,
                nativescript_module_1.NativeScriptModule,
                app_routing_1.AppRoutingModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBa0I7QUFDbEIsc0NBQTJEO0FBRTNELHVCQUF1QjtBQUN2Qix3RUFBd0U7QUFDeEUsa0RBQW1FO0FBQ25FLGdGQUE4RTtBQUU5RSxtQkFBbUI7QUFDbkIsaURBQStDO0FBQy9DLDZDQUFpRDtBQUVqRCxxQkFBcUI7QUFDckIsaUVBQThEO0FBQzlELGlFQUE4RDtBQUU5RCxrQkFBa0I7QUFDbEIsa0RBQWdEO0FBQ2hELHNEQUFvRDtBQUNwRCx3REFBc0Q7QUFFdEQsaUJBQWlCO0FBQ2pCLG1DQUFpQztBQUNqQywwQ0FBd0M7QUFDeEMsa0RBQWdEO0FBQ2hELGlDQUErQjtBQUMvQix1Q0FBcUM7QUFFckMsa0JBQWtCO0FBQ2xCLGtDQUFnQztBQUNoQyxxQ0FBbUM7QUE0Qm5DO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQTFCckIsZUFBUSxDQUFDO1lBQ1IsU0FBUyxFQUFFO2dCQUNULDRCQUFZO2FBQ2I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osNEJBQVk7Z0JBQ1osbUNBQWU7Z0JBQ2YsbUNBQWU7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsNkJBQXNCO2dCQUN0Qix3Q0FBa0I7Z0JBQ2xCLDhCQUFnQjthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDVCxzQkFBUztnQkFDVCwwQkFBVztnQkFDWCw0QkFBWTthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHVCQUFnQjthQUNqQjtTQUNGLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFuZ3VsYXIgaW1wb3J0c1xuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG4vLyBOYXRpdmVTY3JpcHQgaW1wb3J0c1xuLy8gaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcblxuLy8gQXBwIGNvcmUgaW1wb3J0c1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5cbi8vIENvbXBvbmVudHMgaW1wb3J0c1xuaW1wb3J0IHsgU2lnbkluQ29tcG9uZW50IH0gZnJvbSBcIi4vc2lnbi1pbi9zaWduLWluLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2lnblVwQ29tcG9uZW50IH0gZnJvbSBcIi4vc2lnbi11cC9zaWduLXVwLmNvbXBvbmVudFwiO1xuXG4vLyBTZXJ2aWNlIGltcG9ydHNcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gXCIuL2d1YXJkcy9hdXRoLmd1YXJkXCI7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRva2VuU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC90b2tlbi5zZXJ2aWNlXCI7XG5cbi8vIHJ4anMgb3BlcmF0b3JzXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9jYXRjaFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZGVib3VuY2VUaW1lXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kaXN0aW5jdFVudGlsQ2hhbmdlZFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9zd2l0Y2hNYXBcIjtcblxuLy8gcnhqcyBleHRlbnNpb25zXG5pbXBvcnQgXCJyeGpzL2FkZC9vYnNlcnZhYmxlL29mXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93XCI7XG5cbkBOZ01vZHVsZSh7XG4gIGJvb3RzdHJhcDogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXBwQ29tcG9uZW50LFxuICAgIFNpZ25JbkNvbXBvbmVudCxcbiAgICBTaWduVXBDb21wb25lbnQsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBdXRoR3VhcmQsXG4gICAgQXV0aFNlcnZpY2UsXG4gICAgVG9rZW5TZXJ2aWNlLFxuICBdLFxuICBzY2hlbWFzOiBbXG4gICAgTk9fRVJST1JTX1NDSEVNQSxcbiAgXSxcbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=