"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var token_service_1 = require("./token.service");
var AuthService = /** @class */ (function () {
    function AuthService(tokenService) {
        this.tokenService = tokenService;
    }
    AuthService.prototype.signUp = function (user) {
        return this.tokenService.registerAccount(user)
            .catch(this.handleErrors);
    };
    AuthService.prototype.singIn = function (uid, password) {
        var signInData = { email: uid, password: password };
        return this.tokenService.signIn(signInData)
            .catch(this.handleErrors);
    };
    AuthService.prototype.signOut = function () {
        return this.tokenService.signOut()
            .catch(this.handleErrors);
    };
    AuthService.prototype.userSignedIn = function () {
        return this.tokenService.userSignedIn();
    };
    AuthService.prototype.handleErrors = function (error) {
        console.log("SALVANDO O ERRO EM UM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
        return Observable_1.Observable.throw(error);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [token_service_1.TokenService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRzNDLDhDQUE2QztBQUM3QyxpREFBK0M7QUFNL0M7SUFDRSxxQkFBMkIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBRyxDQUFDO0lBRWxELDRCQUFNLEdBQWIsVUFBYyxJQUFVO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFXLENBQUM7YUFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sNEJBQU0sR0FBYixVQUFjLEdBQVcsRUFBRSxRQUFnQjtRQUN6QyxJQUFNLFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxVQUFBLEVBQUUsQ0FBQztRQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO2FBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLDZCQUFPLEdBQWQ7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7YUFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sa0NBQVksR0FBbkI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRU8sa0NBQVksR0FBcEIsVUFBcUIsS0FBZTtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLDZEQUE2RCxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBM0JVLFdBQVc7UUFGdkIsaUJBQVUsRUFBRTt5Q0FHOEIsNEJBQVk7T0FEMUMsV0FBVyxDQTRCdkI7SUFBRCxrQkFBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBUb2tlblNlcnZpY2UgfSBmcm9tIFwiLi90b2tlbi5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi91c2VyLm1vZGVsXCI7XG5cbkBJbmplY3RhYmxlKClcblxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9rZW5TZXJ2aWNlOiBUb2tlblNlcnZpY2UpIHt9XG5cbiAgcHVibGljIHNpZ25VcCh1c2VyOiBVc2VyKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnRva2VuU2VydmljZS5yZWdpc3RlckFjY291bnQodXNlciBhcyBhbnkpXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICB9XG5cbiAgcHVibGljIHNpbmdJbih1aWQ6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICBjb25zdCBzaWduSW5EYXRhID0geyBlbWFpbDogdWlkLCBwYXNzd29yZCB9O1xuXG4gICAgcmV0dXJuIHRoaXMudG9rZW5TZXJ2aWNlLnNpZ25JbihzaWduSW5EYXRhKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuXG4gIHB1YmxpYyBzaWduT3V0KCk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy50b2tlblNlcnZpY2Uuc2lnbk91dCgpXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICB9XG5cbiAgcHVibGljIHVzZXJTaWduZWRJbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50b2tlblNlcnZpY2UudXNlclNpZ25lZEluKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNBTFZBTkRPIE8gRVJSTyBFTSBVTSBBUlFVSVZPIERFIExPRyAtIERFVEFMSEVTIERPIEVSUk8gPT4gXCIsIGVycm9yKTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cbn1cbiJdfQ==