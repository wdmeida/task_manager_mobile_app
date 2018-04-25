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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBa0I7QUFDbEIsc0NBQTJEO0FBRTNELHVCQUF1QjtBQUN2Qix3RUFBd0U7QUFDeEUsa0RBQW1FO0FBQ25FLGdGQUE4RTtBQUU5RSxtQkFBbUI7QUFDbkIsaURBQStDO0FBQy9DLDZDQUFpRDtBQUVqRCxxQkFBcUI7QUFDckIsd0RBQXNEO0FBQ3RELGlFQUE4RDtBQUM5RCxpRUFBOEQ7QUFFOUQsa0JBQWtCO0FBQ2xCLGtEQUFnRDtBQUNoRCxzREFBb0Q7QUFDcEQsd0RBQXNEO0FBRXRELGlCQUFpQjtBQUNqQixtQ0FBaUM7QUFDakMsMENBQXdDO0FBQ3hDLGtEQUFnRDtBQUNoRCxpQ0FBK0I7QUFDL0IsdUNBQXFDO0FBRXJDLGtCQUFrQjtBQUNsQixrQ0FBZ0M7QUFDaEMscUNBQW1DO0FBNkJuQztJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUEzQnJCLGVBQVEsQ0FBQztZQUNSLFNBQVMsRUFBRTtnQkFDVCw0QkFBWTthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLDRCQUFZO2dCQUNaLDhCQUFhO2dCQUNiLG1DQUFlO2dCQUNmLG1DQUFlO2FBQ2hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLDZCQUFzQjtnQkFDdEIsd0NBQWtCO2dCQUNsQiw4QkFBZ0I7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Qsc0JBQVM7Z0JBQ1QsMEJBQVc7Z0JBQ1gsNEJBQVk7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDUCx1QkFBZ0I7YUFDakI7U0FDRixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmd1bGFyIGltcG9ydHNcbmltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuLy8gTmF0aXZlU2NyaXB0IGltcG9ydHNcbi8vIGltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5cbi8vIEFwcCBjb3JlIGltcG9ydHNcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuXG4vLyBDb21wb25lbnRzIGltcG9ydHNcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2hvbWUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTaWduSW5Db21wb25lbnQgfSBmcm9tIFwiLi9zaWduLWluL3NpZ24taW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTaWduVXBDb21wb25lbnQgfSBmcm9tIFwiLi9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50XCI7XG5cbi8vIFNlcnZpY2UgaW1wb3J0c1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSBcIi4vZ3VhcmRzL2F1dGguZ3VhcmRcIjtcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL2F1dGguc2VydmljZVwiO1xuaW1wb3J0IHsgVG9rZW5TZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL3Rva2VuLnNlcnZpY2VcIjtcblxuLy8gcnhqcyBvcGVyYXRvcnNcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2NhdGNoXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kZWJvdW5jZVRpbWVcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2Rpc3RpbmN0VW50aWxDaGFuZ2VkXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL3N3aXRjaE1hcFwiO1xuXG4vLyByeGpzIGV4dGVuc2lvbnNcbmltcG9ydCBcInJ4anMvYWRkL29ic2VydmFibGUvb2ZcIjtcbmltcG9ydCBcInJ4anMvYWRkL29ic2VydmFibGUvdGhyb3dcIjtcblxuQE5nTW9kdWxlKHtcbiAgYm9vdHN0cmFwOiBbXG4gICAgQXBwQ29tcG9uZW50LFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBcHBDb21wb25lbnQsXG4gICAgSG9tZUNvbXBvbmVudCxcbiAgICBTaWduSW5Db21wb25lbnQsXG4gICAgU2lnblVwQ29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgQXBwUm91dGluZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQXV0aEd1YXJkLFxuICAgIEF1dGhTZXJ2aWNlLFxuICAgIFRva2VuU2VydmljZSxcbiAgXSxcbiAgc2NoZW1hczogW1xuICAgIE5PX0VSUk9SU19TQ0hFTUEsXG4gIF0sXG59KVxuLypcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcbiovXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19