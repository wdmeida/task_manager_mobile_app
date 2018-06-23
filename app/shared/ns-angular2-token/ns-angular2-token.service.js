"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/share");
require("rxjs/add/observable/interval");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/pluck");
require("rxjs/add/operator/filter");
var application_settings_1 = require("application-settings");
var NSAngular2TokenService = /** @class */ (function () {
    function NSAngular2TokenService(http, activatedRoute, router) {
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.router = router;
    }
    Object.defineProperty(NSAngular2TokenService.prototype, "currentUserType", {
        get: function () {
            if (this.atCurrentUserType != null)
                return this.atCurrentUserType.name;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSAngular2TokenService.prototype, "currentUserData", {
        get: function () {
            return this.atCurrentUserData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSAngular2TokenService.prototype, "currentAuthData", {
        get: function () {
            return this.atCurrentAuthData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSAngular2TokenService.prototype, "currentAuthHeaders", {
        get: function () {
            if (this.atCurrentAuthData != null) {
                return new http_1.Headers({
                    'access-token': this.atCurrentAuthData.accessToken,
                    'client': this.atCurrentAuthData.client,
                    'expiry': this.atCurrentAuthData.expiry,
                    'token-type': this.atCurrentAuthData.tokenType,
                    'uid': this.atCurrentAuthData.uid
                });
            }
            return new http_1.Headers;
        },
        enumerable: true,
        configurable: true
    });
    NSAngular2TokenService.prototype.userSignedIn = function () {
        return !!this.atCurrentAuthData;
    };
    NSAngular2TokenService.prototype.canActivate = function () {
        if (this.userSignedIn())
            return true;
        else {
            // Redirect user to sign in if signInRedirect is set
            if (this.router && this.atOptions.signInRedirect)
                this.router.navigate([this.atOptions.signInRedirect]);
            return false;
        }
    };
    // Inital configuration
    NSAngular2TokenService.prototype.init = function (options) {
        var defaultOptions = {
            apiPath: null,
            apiBase: null,
            signInPath: 'auth/sign_in',
            signInRedirect: null,
            signInStoredUrlStorageKey: null,
            signOutPath: 'auth/sign_out',
            validateTokenPath: 'auth/validate_token',
            signOutFailedValidate: false,
            registerAccountPath: 'auth',
            deleteAccountPath: 'auth',
            registerAccountCallback: "",
            updatePasswordPath: 'auth',
            resetPasswordPath: 'auth/password',
            resetPasswordCallback: "",
            userTypes: null,
            globalOptions: {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        };
        this.atOptions = Object.assign(defaultOptions, options);
        this.tryLoadAuthData();
    };
    /**
     *
     * Actions
     *
     */
    // Register request
    NSAngular2TokenService.prototype.registerAccount = function (registerData) {
        if (registerData.userType == null)
            this.atCurrentUserType = null;
        else {
            this.atCurrentUserType = this.getUserTypeByName(registerData.userType);
            delete registerData.userType;
        }
        registerData.password_confirmation = registerData.passwordConfirmation;
        delete registerData.passwordConfirmation;
        registerData.confirm_success_url = this.atOptions.registerAccountCallback;
        return this.post(this.getUserPath() + this.atOptions.registerAccountPath, JSON.stringify(registerData));
    };
    // Delete Account
    NSAngular2TokenService.prototype.deleteAccount = function () {
        return this.delete(this.getUserPath() + this.atOptions.deleteAccountPath);
    };
    // Sign in request and set storage
    NSAngular2TokenService.prototype.signIn = function (signInData) {
        var _this = this;
        if (signInData.userType == null)
            this.atCurrentUserType = null;
        else
            this.atCurrentUserType = this.getUserTypeByName(signInData.userType);
        var body = JSON.stringify({
            email: signInData.email,
            password: signInData.password
        });
        var observ = this.post(this.getUserPath() + this.atOptions.signInPath, body);
        observ.subscribe(function (res) { return _this.atCurrentUserData = res.json().data; }, function (_error) { return null; });
        return observ;
    };
    NSAngular2TokenService.prototype.processOAuthCallback = function () {
        this.getAuthDataFromParams();
    };
    // Sign out request and delete storage
    NSAngular2TokenService.prototype.signOut = function () {
        var observ = this.delete(this.getUserPath() + this.atOptions.signOutPath);
        application_settings_1.remove('accessToken');
        application_settings_1.remove('client');
        application_settings_1.remove('expiry');
        application_settings_1.remove('tokenType');
        application_settings_1.remove('uid');
        this.atCurrentAuthData = null;
        this.atCurrentUserType = null;
        this.atCurrentUserData = null;
        return observ;
    };
    // Validate token request
    NSAngular2TokenService.prototype.validateToken = function () {
        var _this = this;
        var observ = this.get(this.getUserPath() + this.atOptions.validateTokenPath);
        observ.subscribe(function (res) { return _this.atCurrentUserData = res.json().data; }, function (error) {
            if (error.status === 401 && _this.atOptions.signOutFailedValidate) {
                _this.signOut();
            }
        });
        return observ;
    };
    // Update password request
    NSAngular2TokenService.prototype.updatePassword = function (updatePasswordData) {
        if (updatePasswordData.userType != null)
            this.atCurrentUserType = this.getUserTypeByName(updatePasswordData.userType);
        var args;
        if (updatePasswordData.passwordCurrent == null) {
            args = {
                password: updatePasswordData.password,
                password_confirmation: updatePasswordData.passwordConfirmation
            };
        }
        else {
            args = {
                current_password: updatePasswordData.passwordCurrent,
                password: updatePasswordData.password,
                password_confirmation: updatePasswordData.passwordConfirmation
            };
        }
        if (updatePasswordData.resetPasswordToken) {
            args.reset_password_token = updatePasswordData.resetPasswordToken;
        }
        var body = JSON.stringify(args);
        return this.put(this.getUserPath() + this.atOptions.updatePasswordPath, body);
    };
    // Reset password request
    NSAngular2TokenService.prototype.resetPassword = function (resetPasswordData) {
        if (resetPasswordData.userType == null)
            this.atCurrentUserType = null;
        else
            this.atCurrentUserType = this.getUserTypeByName(resetPasswordData.userType);
        var body = JSON.stringify({
            email: resetPasswordData.email,
            redirect_url: this.atOptions.resetPasswordCallback
        });
        return this.post(this.getUserPath() + this.atOptions.resetPasswordPath, body);
    };
    /**
     *
     * HTTP Wrappers
     *
     */
    NSAngular2TokenService.prototype.get = function (url, options) {
        return this.request(this.mergeRequestOptionsArgs({
            url: this.getApiPath() + url,
            method: http_1.RequestMethod.Get
        }, options));
    };
    NSAngular2TokenService.prototype.post = function (url, body, options) {
        return this.request(this.mergeRequestOptionsArgs({
            url: this.getApiPath() + url,
            method: http_1.RequestMethod.Post,
            body: body
        }, options));
    };
    NSAngular2TokenService.prototype.put = function (url, body, options) {
        return this.request(this.mergeRequestOptionsArgs({
            url: this.getApiPath() + url,
            method: http_1.RequestMethod.Put,
            body: body
        }, options));
    };
    NSAngular2TokenService.prototype.delete = function (url, options) {
        return this.request(this.mergeRequestOptionsArgs({
            url: this.getApiPath() + url,
            method: http_1.RequestMethod.Delete
        }, options));
    };
    NSAngular2TokenService.prototype.patch = function (url, body, options) {
        return this.request(this.mergeRequestOptionsArgs({
            url: this.getApiPath() + url,
            method: http_1.RequestMethod.Patch,
            body: body
        }, options));
    };
    NSAngular2TokenService.prototype.head = function (path, options) {
        return this.request({
            method: http_1.RequestMethod.Head,
            url: this.getApiPath() + path
        });
    };
    NSAngular2TokenService.prototype.options = function (url, options) {
        return this.request(this.mergeRequestOptionsArgs({
            url: this.getApiPath() + url,
            method: http_1.RequestMethod.Options
        }, options));
    };
    // Construct and send Http request
    NSAngular2TokenService.prototype.request = function (options) {
        var baseRequestOptions;
        var baseHeaders = this.atOptions.globalOptions.headers;
        // Get auth data from local storage
        this.getAuthDataFromStorage();
        // Merge auth headers to request if set
        if (this.atCurrentAuthData != null) {
            Object.assign(baseHeaders, {
                'access-token': this.atCurrentAuthData.accessToken,
                'client': this.atCurrentAuthData.client,
                'expiry': this.atCurrentAuthData.expiry,
                'token-type': this.atCurrentAuthData.tokenType,
                'uid': this.atCurrentAuthData.uid
            });
        }
        baseRequestOptions = new http_1.RequestOptions({
            headers: new http_1.Headers(baseHeaders)
        });
        // Merge standard and custom RequestOptions
        baseRequestOptions = baseRequestOptions.merge(options);
        var response = this.http.request(new http_1.Request(baseRequestOptions)).share();
        this.handleResponse(response);
        return response;
    };
    NSAngular2TokenService.prototype.mergeRequestOptionsArgs = function (options, addOptions) {
        var returnOptions = options;
        if (options)
            Object.assign(returnOptions, addOptions);
        return returnOptions;
    };
    // Check if response is complete and newer, then update storage
    NSAngular2TokenService.prototype.handleResponse = function (response) {
        var _this = this;
        response.subscribe(function (res) {
            _this.getAuthHeadersFromResponse(res);
        }, function (error) {
            _this.getAuthHeadersFromResponse(error);
        });
    };
    /**
     *
     * Get Auth Data
     *
     */
    // Try to load auth data
    NSAngular2TokenService.prototype.tryLoadAuthData = function () {
        var userType = this.getUserTypeByName(application_settings_1.getString('userType'));
        if (userType)
            this.atCurrentUserType = userType;
        this.getAuthDataFromStorage();
        if (this.activatedRoute)
            this.getAuthDataFromParams();
        if (this.atCurrentAuthData)
            this.validateToken();
    };
    // Parse Auth data from response
    NSAngular2TokenService.prototype.getAuthHeadersFromResponse = function (data) {
        var headers = data.headers;
        var authData = {
            accessToken: headers.get('access-token'),
            client: headers.get('client'),
            expiry: headers.get('expiry'),
            tokenType: headers.get('token-type'),
            uid: headers.get('uid')
        };
        this.setAuthData(authData);
    };
    // Parse Auth data from post message
    NSAngular2TokenService.prototype.getAuthDataFromPostMessage = function (data) {
        var authData = {
            accessToken: data['auth_token'],
            client: data['client_id'],
            expiry: data['expiry'],
            tokenType: 'Bearer',
            uid: data['uid']
        };
        this.setAuthData(authData);
    };
    // Try to get auth data from storage.
    NSAngular2TokenService.prototype.getAuthDataFromStorage = function () {
        var authData = {
            accessToken: application_settings_1.getString('accessToken'),
            client: application_settings_1.getString('client'),
            expiry: application_settings_1.getString('expiry'),
            tokenType: application_settings_1.getString('tokenType'),
            uid: application_settings_1.getString('uid')
        };
        if (this.checkAuthData(authData))
            this.atCurrentAuthData = authData;
    };
    // Try to get auth data from url parameters.
    NSAngular2TokenService.prototype.getAuthDataFromParams = function () {
        var _this = this;
        if (this.activatedRoute.queryParams)
            this.activatedRoute.queryParams.subscribe(function (queryParams) {
                var authData = {
                    accessToken: queryParams['token'] || queryParams['auth_token'],
                    client: queryParams['client_id'],
                    expiry: queryParams['expiry'],
                    tokenType: 'Bearer',
                    uid: queryParams['uid']
                };
                if (_this.checkAuthData(authData))
                    _this.atCurrentAuthData = authData;
            });
    };
    /**
     *
     * Set Auth Data
     *
     */
    // Write auth data to storage
    NSAngular2TokenService.prototype.setAuthData = function (authData) {
        if (this.checkAuthData(authData)) {
            this.atCurrentAuthData = authData;
            application_settings_1.setString('accessToken', authData.accessToken);
            application_settings_1.setString('client', authData.client);
            application_settings_1.setString('expiry', authData.expiry);
            application_settings_1.setString('tokenType', authData.tokenType);
            application_settings_1.setString('uid', authData.uid);
            if (this.atCurrentUserType != null)
                application_settings_1.setString('userType', this.atCurrentUserType.name);
        }
    };
    /**
     *
     * Validate Auth Data
     *
     */
    // Check if auth data complete and if response token is newer
    NSAngular2TokenService.prototype.checkAuthData = function (authData) {
        if (authData.accessToken != null &&
            authData.client != null &&
            authData.expiry != null &&
            authData.tokenType != null &&
            authData.uid != null) {
            if (this.atCurrentAuthData != null)
                return authData.expiry >= this.atCurrentAuthData.expiry;
            else
                return true;
        }
        else {
            return false;
        }
    };
    /**
     *
     * Construct Paths / Urls
     *
     */
    NSAngular2TokenService.prototype.getUserPath = function () {
        if (this.atCurrentUserType == null)
            return '';
        else
            return this.atCurrentUserType.path + '/';
    };
    NSAngular2TokenService.prototype.getApiPath = function () {
        var constructedPath = '';
        if (this.atOptions.apiBase != null)
            constructedPath += this.atOptions.apiBase + '/';
        if (this.atOptions.apiPath != null)
            constructedPath += this.atOptions.apiPath + '/';
        return constructedPath;
    };
    NSAngular2TokenService.prototype.getOAuthPath = function (oAuthType) {
        var oAuthPath;
        oAuthPath = this.atOptions.oAuthPaths[oAuthType];
        if (oAuthPath == null)
            oAuthPath = "/auth/" + oAuthType;
        return oAuthPath;
    };
    NSAngular2TokenService.prototype.getOAuthUrl = function (oAuthPath, callbackUrl, windowType) {
        var url;
        url = this.atOptions.oAuthBase + "/" + oAuthPath;
        url += "?omniauth_window_type=" + windowType;
        url += "&auth_origin_url=" + encodeURIComponent(callbackUrl);
        if (this.atCurrentUserType != null)
            url += "&resource_class=" + this.atCurrentUserType.name;
        return url;
    };
    /**
     *
     * OAuth
     *
     */
    NSAngular2TokenService.prototype.requestCredentialsViaPostMessage = function (authWindow) {
        var pollerObserv = Observable_1.Observable.interval(500);
        var responseObserv = Observable_1.Observable.fromEvent(window, 'message').pluck('data')
            .filter(this.oAuthWindowResponseFilter);
        var responseSubscription = responseObserv.subscribe(this.getAuthDataFromPostMessage.bind(this));
        var pollerSubscription = pollerObserv.subscribe(function () {
            if (authWindow.closed)
                pollerSubscription.unsubscribe();
            else
                authWindow.postMessage('requestCredentials', '*');
        });
        return responseObserv;
    };
    NSAngular2TokenService.prototype.oAuthWindowResponseFilter = function (data) {
        if (data.message == 'deliverCredentials' || data.message == 'authFailure')
            return data;
    };
    /**
     *
     * Utilities
     *
     */
    // Match user config by user config name
    NSAngular2TokenService.prototype.getUserTypeByName = function (name) {
        if (name == null || this.atOptions.userTypes == null)
            return null;
        return this.atOptions.userTypes.find(function (userType) { return userType.name === name; });
    };
    NSAngular2TokenService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()),
        __param(2, core_1.Optional()),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.ActivatedRoute,
            router_1.Router])
    ], NSAngular2TokenService);
    return NSAngular2TokenService;
}());
exports.NSAngular2TokenService = NSAngular2TokenService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnMtYW5ndWxhcjItdG9rZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5zLWFuZ3VsYXIyLXRva2VuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUQ7QUFDckQsMENBQXNFO0FBQ3RFLHNDQVF1QjtBQUV2Qiw4Q0FBNkM7QUFDN0MsbUNBQWlDO0FBQ2pDLHdDQUFzQztBQUN0Qyx5Q0FBdUM7QUFDdkMsbUNBQWlDO0FBQ2pDLG9DQUFrQztBQWVsQyw2REFBb0U7QUFHcEU7SUFvQ0ksZ0NBQ1ksSUFBVSxFQUNFLGNBQThCLEVBQzlCLE1BQWM7UUFGMUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNFLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ2xDLENBQUM7SUF0Q0wsc0JBQUksbURBQWU7YUFBbkI7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDO2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztZQUN2QyxJQUFJO2dCQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxtREFBZTthQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxtREFBZTthQUFuQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxzREFBa0I7YUFBdEI7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDLElBQUksY0FBTyxDQUFDO29CQUNmLGNBQWMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVztvQkFD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RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRWhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ2hDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQXRCLENBQXNCLENBQ3JDLENBQUM7SUFDTixDQUFDO0lBdGpCUSxzQkFBc0I7UUFEbEMsaUJBQVUsRUFBRTtRQXVDSixXQUFBLGVBQVEsRUFBRSxDQUFBO1FBQ1YsV0FBQSxlQUFRLEVBQUUsQ0FBQTt5Q0FGRyxXQUFJO1lBQ2tCLHVCQUFjO1lBQ3RCLGVBQU07T0F2QzdCLHNCQUFzQixDQXVqQmxDO0lBQUQsNkJBQUM7Q0FBQSxBQXZqQkQsSUF1akJDO0FBdmpCWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgQ2FuQWN0aXZhdGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgICBIdHRwLFxuICAgIFJlc3BvbnNlLFxuICAgIEhlYWRlcnMsXG4gICAgUmVxdWVzdCxcbiAgICBSZXF1ZXN0TWV0aG9kLFxuICAgIFJlcXVlc3RPcHRpb25zLFxuICAgIFJlcXVlc3RPcHRpb25zQXJnc1xufSBmcm9tICdAYW5ndWxhci9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3NoYXJlJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9pbnRlcnZhbCc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvcGx1Y2snO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9maWx0ZXInO1xuXG5pbXBvcnQge1xuICAgIFNpZ25JbkRhdGEsXG4gICAgUmVnaXN0ZXJEYXRhLFxuICAgIFVwZGF0ZVBhc3N3b3JkRGF0YSxcbiAgICBSZXNldFBhc3N3b3JkRGF0YSxcblxuICAgIFVzZXJUeXBlLFxuICAgIFVzZXJEYXRhLFxuICAgIEF1dGhEYXRhLFxuXG4gICAgQW5ndWxhcjJUb2tlbk9wdGlvbnNcbn0gZnJvbSAnLi9ucy1hbmd1bGFyMi10b2tlbi5tb2RlbCc7XG5cbmltcG9ydCB7IGdldFN0cmluZywgc2V0U3RyaW5nLCByZW1vdmUgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5TQW5ndWxhcjJUb2tlblNlcnZpY2UgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG5cbiAgICBnZXQgY3VycmVudFVzZXJUeXBlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmF0Q3VycmVudFVzZXJUeXBlICE9IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdEN1cnJlbnRVc2VyVHlwZS5uYW1lO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudFVzZXJEYXRhKCk6IFVzZXJEYXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXRDdXJyZW50VXNlckRhdGE7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRBdXRoRGF0YSgpOiBBdXRoRGF0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0Q3VycmVudEF1dGhEYXRhO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50QXV0aEhlYWRlcnMoKTogSGVhZGVycyB7XG4gICAgICAgIGlmICh0aGlzLmF0Q3VycmVudEF1dGhEYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgJ2FjY2Vzcy10b2tlbic6IHRoaXMuYXRDdXJyZW50QXV0aERhdGEuYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICAgICAgJ2NsaWVudCc6ICAgICAgIHRoaXMuYXRDdXJyZW50QXV0aERhdGEuY2xpZW50LFxuICAgICAgICAgICAgICAgICdleHBpcnknOiAgICAgICB0aGlzLmF0Q3VycmVudEF1dGhEYXRhLmV4cGlyeSxcbiAgICAgICAgICAgICAgICAndG9rZW4tdHlwZSc6ICAgdGhpcy5hdEN1cnJlbnRBdXRoRGF0YS50b2tlblR5cGUsXG4gICAgICAgICAgICAgICAgJ3VpZCc6ICAgICAgICAgIHRoaXMuYXRDdXJyZW50QXV0aERhdGEudWlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgSGVhZGVycztcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0T3B0aW9uczogQW5ndWxhcjJUb2tlbk9wdGlvbnM7XG4gICAgcHJpdmF0ZSBhdEN1cnJlbnRVc2VyVHlwZTogVXNlclR5cGU7XG4gICAgcHJpdmF0ZSBhdEN1cnJlbnRBdXRoRGF0YTogQXV0aERhdGE7XG4gICAgcHJpdmF0ZSBhdEN1cnJlbnRVc2VyRGF0YTogVXNlckRhdGE7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICAgICkgeyB9XG5cbiAgICB1c2VyU2lnbmVkSW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuYXRDdXJyZW50QXV0aERhdGE7XG4gICAgfVxuXG4gICAgY2FuQWN0aXZhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJTaWduZWRJbigpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBSZWRpcmVjdCB1c2VyIHRvIHNpZ24gaW4gaWYgc2lnbkluUmVkaXJlY3QgaXMgc2V0XG4gICAgICAgICAgICBpZih0aGlzLnJvdXRlciAmJiB0aGlzLmF0T3B0aW9ucy5zaWduSW5SZWRpcmVjdClcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5hdE9wdGlvbnMuc2lnbkluUmVkaXJlY3RdKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5pdGFsIGNvbmZpZ3VyYXRpb25cbiAgICBpbml0KG9wdGlvbnM/OiBBbmd1bGFyMlRva2VuT3B0aW9ucykge1xuXG4gICAgICAgIGxldCBkZWZhdWx0T3B0aW9uczogQW5ndWxhcjJUb2tlbk9wdGlvbnMgPSB7XG4gICAgICAgICAgICBhcGlQYXRoOiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIGFwaUJhc2U6ICAgICAgICAgICAgICAgICAgICBudWxsLFxuXG4gICAgICAgICAgICBzaWduSW5QYXRoOiAgICAgICAgICAgICAgICAgJ2F1dGgvc2lnbl9pbicsXG4gICAgICAgICAgICBzaWduSW5SZWRpcmVjdDogICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIHNpZ25JblN0b3JlZFVybFN0b3JhZ2VLZXk6ICBudWxsLFxuXG4gICAgICAgICAgICBzaWduT3V0UGF0aDogICAgICAgICAgICAgICAgJ2F1dGgvc2lnbl9vdXQnLFxuICAgICAgICAgICAgdmFsaWRhdGVUb2tlblBhdGg6ICAgICAgICAgICdhdXRoL3ZhbGlkYXRlX3Rva2VuJyxcbiAgICAgICAgICAgIHNpZ25PdXRGYWlsZWRWYWxpZGF0ZTogICAgICBmYWxzZSxcblxuICAgICAgICAgICAgcmVnaXN0ZXJBY2NvdW50UGF0aDogICAgICAgICdhdXRoJyxcbiAgICAgICAgICAgIGRlbGV0ZUFjY291bnRQYXRoOiAgICAgICAgICAnYXV0aCcsXG4gICAgICAgICAgICByZWdpc3RlckFjY291bnRDYWxsYmFjazogICAgXCJcIixcblxuICAgICAgICAgICAgdXBkYXRlUGFzc3dvcmRQYXRoOiAgICAgICAgICdhdXRoJyxcblxuICAgICAgICAgICAgcmVzZXRQYXNzd29yZFBhdGg6ICAgICAgICAgICdhdXRoL3Bhc3N3b3JkJyxcbiAgICAgICAgICAgIHJlc2V0UGFzc3dvcmRDYWxsYmFjazogICAgICBcIlwiLFxuXG4gICAgICAgICAgICB1c2VyVHlwZXM6ICAgICAgICAgICAgICAgICAgbnVsbCxcblxuICAgICAgICAgICAgZ2xvYmFsT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICAgICAgICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmF0T3B0aW9ucyA9ICg8YW55Pk9iamVjdCkuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLnRyeUxvYWRBdXRoRGF0YSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQWN0aW9uc1xuICAgICAqXG4gICAgICovXG5cbiAgICAvLyBSZWdpc3RlciByZXF1ZXN0XG4gICAgcmVnaXN0ZXJBY2NvdW50KHJlZ2lzdGVyRGF0YTogUmVnaXN0ZXJEYXRhKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuXG4gICAgICAgIGlmIChyZWdpc3RlckRhdGEudXNlclR5cGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuYXRDdXJyZW50VXNlclR5cGUgPSBudWxsO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXRDdXJyZW50VXNlclR5cGUgPSB0aGlzLmdldFVzZXJUeXBlQnlOYW1lKHJlZ2lzdGVyRGF0YS51c2VyVHlwZSk7XG4gICAgICAgICAgICBkZWxldGUgcmVnaXN0ZXJEYXRhLnVzZXJUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJEYXRhLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiAgPSByZWdpc3RlckRhdGEucGFzc3dvcmRDb25maXJtYXRpb247XG4gICAgICAgIGRlbGV0ZSByZWdpc3RlckRhdGEucGFzc3dvcmRDb25maXJtYXRpb247XG5cbiAgICAgICAgcmVnaXN0ZXJEYXRhLmNvbmZpcm1fc3VjY2Vzc191cmwgICAgPSB0aGlzLmF0T3B0aW9ucy5yZWdpc3RlckFjY291bnRDYWxsYmFjaztcblxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KHRoaXMuZ2V0VXNlclBhdGgoKSArIHRoaXMuYXRPcHRpb25zLnJlZ2lzdGVyQWNjb3VudFBhdGgsIEpTT04uc3RyaW5naWZ5KHJlZ2lzdGVyRGF0YSkpO1xuICAgIH1cblxuICAgIC8vIERlbGV0ZSBBY2NvdW50XG4gICAgZGVsZXRlQWNjb3VudCgpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZSh0aGlzLmdldFVzZXJQYXRoKCkgKyB0aGlzLmF0T3B0aW9ucy5kZWxldGVBY2NvdW50UGF0aCk7XG4gICAgfVxuXG4gICAgLy8gU2lnbiBpbiByZXF1ZXN0IGFuZCBzZXQgc3RvcmFnZVxuICAgIHNpZ25JbihzaWduSW5EYXRhOiBTaWduSW5EYXRhKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuXG4gICAgICAgIGlmIChzaWduSW5EYXRhLnVzZXJUeXBlID09IG51bGwpXG4gICAgICAgICAgICB0aGlzLmF0Q3VycmVudFVzZXJUeXBlID0gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5hdEN1cnJlbnRVc2VyVHlwZSA9IHRoaXMuZ2V0VXNlclR5cGVCeU5hbWUoc2lnbkluRGF0YS51c2VyVHlwZSk7XG5cbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBlbWFpbDogICAgICBzaWduSW5EYXRhLmVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICAgc2lnbkluRGF0YS5wYXNzd29yZFxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgb2JzZXJ2ID0gdGhpcy5wb3N0KHRoaXMuZ2V0VXNlclBhdGgoKSArIHRoaXMuYXRPcHRpb25zLnNpZ25JblBhdGgsIGJvZHkpO1xuXG4gICAgICAgIG9ic2Vydi5zdWJzY3JpYmUocmVzID0+IHRoaXMuYXRDdXJyZW50VXNlckRhdGEgPSByZXMuanNvbigpLmRhdGEsIF9lcnJvciA9PiBudWxsKTtcblxuICAgICAgICByZXR1cm4gb2JzZXJ2O1xuICAgIH1cblxuXG4gICAgcHJvY2Vzc09BdXRoQ2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0QXV0aERhdGFGcm9tUGFyYW1zKCk7XG4gICAgfVxuXG4gICAgLy8gU2lnbiBvdXQgcmVxdWVzdCBhbmQgZGVsZXRlIHN0b3JhZ2VcbiAgICBzaWduT3V0KCk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICAgICAgbGV0IG9ic2VydiA9IHRoaXMuZGVsZXRlKHRoaXMuZ2V0VXNlclBhdGgoKSArIHRoaXMuYXRPcHRpb25zLnNpZ25PdXRQYXRoKTtcblxuICAgICAgICByZW1vdmUoJ2FjY2Vzc1Rva2VuJyk7XG4gICAgICAgIHJlbW92ZSgnY2xpZW50Jyk7XG4gICAgICAgIHJlbW92ZSgnZXhwaXJ5Jyk7XG4gICAgICAgIHJlbW92ZSgndG9rZW5UeXBlJyk7XG4gICAgICAgIHJlbW92ZSgndWlkJyk7XG5cbiAgICAgICAgdGhpcy5hdEN1cnJlbnRBdXRoRGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuYXRDdXJyZW50VXNlclR5cGUgPSBudWxsO1xuICAgICAgICB0aGlzLmF0Q3VycmVudFVzZXJEYXRhID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gb2JzZXJ2O1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIHRva2VuIHJlcXVlc3RcbiAgICB2YWxpZGF0ZVRva2VuKCk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICAgICAgbGV0IG9ic2VydiA9IHRoaXMuZ2V0KHRoaXMuZ2V0VXNlclBhdGgoKSArIHRoaXMuYXRPcHRpb25zLnZhbGlkYXRlVG9rZW5QYXRoKTtcblxuICAgICAgICBvYnNlcnYuc3Vic2NyaWJlKFxuICAgICAgICAgICAgcmVzID0+IHRoaXMuYXRDdXJyZW50VXNlckRhdGEgPSByZXMuanNvbigpLmRhdGEsXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDAxICYmIHRoaXMuYXRPcHRpb25zLnNpZ25PdXRGYWlsZWRWYWxpZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpZ25PdXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JzZXJ2O1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBwYXNzd29yZCByZXF1ZXN0XG4gICAgdXBkYXRlUGFzc3dvcmQodXBkYXRlUGFzc3dvcmREYXRhOiBVcGRhdGVQYXNzd29yZERhdGEpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG5cbiAgICAgICAgaWYgKHVwZGF0ZVBhc3N3b3JkRGF0YS51c2VyVHlwZSAhPSBudWxsKVxuICAgICAgICAgICAgdGhpcy5hdEN1cnJlbnRVc2VyVHlwZSA9IHRoaXMuZ2V0VXNlclR5cGVCeU5hbWUodXBkYXRlUGFzc3dvcmREYXRhLnVzZXJUeXBlKTtcblxuICAgICAgICBsZXQgYXJnczogYW55O1xuXG4gICAgICAgIGlmICh1cGRhdGVQYXNzd29yZERhdGEucGFzc3dvcmRDdXJyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGFyZ3MgPSB7XG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICAgICAgICAgICAgICAgdXBkYXRlUGFzc3dvcmREYXRhLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkX2NvbmZpcm1hdGlvbjogIHVwZGF0ZVBhc3N3b3JkRGF0YS5wYXNzd29yZENvbmZpcm1hdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJncyA9IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50X3Bhc3N3b3JkOiAgICAgICB1cGRhdGVQYXNzd29yZERhdGEucGFzc3dvcmRDdXJyZW50LFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAgICAgICAgICAgICAgIHVwZGF0ZVBhc3N3b3JkRGF0YS5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZF9jb25maXJtYXRpb246ICB1cGRhdGVQYXNzd29yZERhdGEucGFzc3dvcmRDb25maXJtYXRpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXBkYXRlUGFzc3dvcmREYXRhLnJlc2V0UGFzc3dvcmRUb2tlbikge1xuICAgICAgICAgICAgYXJncy5yZXNldF9wYXNzd29yZF90b2tlbiA9IHVwZGF0ZVBhc3N3b3JkRGF0YS5yZXNldFBhc3N3b3JkVG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KGFyZ3MpO1xuICAgICAgICByZXR1cm4gdGhpcy5wdXQodGhpcy5nZXRVc2VyUGF0aCgpICsgdGhpcy5hdE9wdGlvbnMudXBkYXRlUGFzc3dvcmRQYXRoLCBib2R5KTtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBwYXNzd29yZCByZXF1ZXN0XG4gICAgcmVzZXRQYXNzd29yZChyZXNldFBhc3N3b3JkRGF0YTogUmVzZXRQYXNzd29yZERhdGEpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG5cbiAgICAgICAgaWYgKHJlc2V0UGFzc3dvcmREYXRhLnVzZXJUeXBlID09IG51bGwpXG4gICAgICAgICAgICB0aGlzLmF0Q3VycmVudFVzZXJUeXBlID0gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5hdEN1cnJlbnRVc2VyVHlwZSA9IHRoaXMuZ2V0VXNlclR5cGVCeU5hbWUocmVzZXRQYXNzd29yZERhdGEudXNlclR5cGUpO1xuXG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZW1haWw6ICAgICAgICAgIHJlc2V0UGFzc3dvcmREYXRhLmVtYWlsLFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJsOiAgIHRoaXMuYXRPcHRpb25zLnJlc2V0UGFzc3dvcmRDYWxsYmFja1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KHRoaXMuZ2V0VXNlclBhdGgoKSArIHRoaXMuYXRPcHRpb25zLnJlc2V0UGFzc3dvcmRQYXRoLCBib2R5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEhUVFAgV3JhcHBlcnNcbiAgICAgKlxuICAgICAqL1xuXG4gICAgZ2V0KHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHRoaXMubWVyZ2VSZXF1ZXN0T3B0aW9uc0FyZ3Moe1xuICAgICAgICAgICAgdXJsOiAgICB0aGlzLmdldEFwaVBhdGgoKSArIHVybCxcbiAgICAgICAgICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZC5HZXRcbiAgICAgICAgfSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIHBvc3QodXJsOiBzdHJpbmcsIGJvZHk6IGFueSwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCh0aGlzLm1lcmdlUmVxdWVzdE9wdGlvbnNBcmdzKHtcbiAgICAgICAgICAgIHVybDogICAgdGhpcy5nZXRBcGlQYXRoKCkgKyB1cmwsXG4gICAgICAgICAgICBtZXRob2Q6IFJlcXVlc3RNZXRob2QuUG9zdCxcbiAgICAgICAgICAgIGJvZHk6ICAgYm9keVxuICAgICAgICB9LCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgcHV0KHVybDogc3RyaW5nLCBib2R5OiBhbnksIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QodGhpcy5tZXJnZVJlcXVlc3RPcHRpb25zQXJncyh7XG4gICAgICAgICAgICB1cmw6ICAgIHRoaXMuZ2V0QXBpUGF0aCgpICsgdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kLlB1dCxcbiAgICAgICAgICAgIGJvZHk6ICAgYm9keVxuICAgICAgICB9LCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHRoaXMubWVyZ2VSZXF1ZXN0T3B0aW9uc0FyZ3Moe1xuICAgICAgICAgICAgdXJsOiAgICB0aGlzLmdldEFwaVBhdGgoKSArIHVybCxcbiAgICAgICAgICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZC5EZWxldGVcbiAgICAgICAgfSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIHBhdGNoKHVybDogc3RyaW5nLCBib2R5OiBhbnksIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QodGhpcy5tZXJnZVJlcXVlc3RPcHRpb25zQXJncyh7XG4gICAgICAgICAgICB1cmw6ICAgIHRoaXMuZ2V0QXBpUGF0aCgpICsgdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kLlBhdGNoLFxuICAgICAgICAgICAgYm9keTogICBib2R5XG4gICAgICAgIH0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICBoZWFkKHBhdGg6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFJlcXVlc3RNZXRob2QuSGVhZCxcbiAgICAgICAgICAgIHVybDogICAgdGhpcy5nZXRBcGlQYXRoKCkgKyBwYXRoXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9wdGlvbnModXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QodGhpcy5tZXJnZVJlcXVlc3RPcHRpb25zQXJncyh7XG4gICAgICAgICAgICB1cmw6ICAgIHRoaXMuZ2V0QXBpUGF0aCgpICsgdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kLk9wdGlvbnNcbiAgICAgICAgfSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8vIENvbnN0cnVjdCBhbmQgc2VuZCBIdHRwIHJlcXVlc3RcbiAgICByZXF1ZXN0KG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcblxuICAgICAgICBsZXQgYmFzZVJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0T3B0aW9ucztcbiAgICAgICAgbGV0IGJhc2VIZWFkZXJzOiAgICAgICAgeyBba2V5OnN0cmluZ106IHN0cmluZzsgfSA9IHRoaXMuYXRPcHRpb25zLmdsb2JhbE9wdGlvbnMuaGVhZGVycztcblxuICAgICAgICAvLyBHZXQgYXV0aCBkYXRhIGZyb20gbG9jYWwgc3RvcmFnZVxuICAgICAgICB0aGlzLmdldEF1dGhEYXRhRnJvbVN0b3JhZ2UoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIE1lcmdlIGF1dGggaGVhZGVycyB0byByZXF1ZXN0IGlmIHNldFxuICAgICAgICBpZiAodGhpcy5hdEN1cnJlbnRBdXRoRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAoPGFueT5PYmplY3QpLmFzc2lnbihiYXNlSGVhZGVycywge1xuICAgICAgICAgICAgICAgICdhY2Nlc3MtdG9rZW4nOiB0aGlzLmF0Q3VycmVudEF1dGhEYXRhLmFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgICdjbGllbnQnOiAgICAgICB0aGlzLmF0Q3VycmVudEF1dGhEYXRhLmNsaWVudCxcbiAgICAgICAgICAgICAgICAnZXhwaXJ5JzogICAgICAgdGhpcy5hdEN1cnJlbnRBdXRoRGF0YS5leHBpcnksXG4gICAgICAgICAgICAgICAgJ3Rva2VuLXR5cGUnOiAgIHRoaXMuYXRDdXJyZW50QXV0aERhdGEudG9rZW5UeXBlLFxuICAgICAgICAgICAgICAgICd1aWQnOiAgICAgICAgICB0aGlzLmF0Q3VycmVudEF1dGhEYXRhLnVpZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBiYXNlUmVxdWVzdE9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoe1xuICAgICAgICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoYmFzZUhlYWRlcnMpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1lcmdlIHN0YW5kYXJkIGFuZCBjdXN0b20gUmVxdWVzdE9wdGlvbnNcbiAgICAgICAgYmFzZVJlcXVlc3RPcHRpb25zID0gYmFzZVJlcXVlc3RPcHRpb25zLm1lcmdlKG9wdGlvbnMpO1xuXG4gICAgICAgIGxldCByZXNwb25zZSA9IHRoaXMuaHR0cC5yZXF1ZXN0KG5ldyBSZXF1ZXN0KGJhc2VSZXF1ZXN0T3B0aW9ucykpLnNoYXJlKCk7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzcG9uc2UocmVzcG9uc2UpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1lcmdlUmVxdWVzdE9wdGlvbnNBcmdzKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zQXJncywgYWRkT3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IFJlcXVlc3RPcHRpb25zQXJncyB7XG5cbiAgICAgICAgbGV0IHJldHVybk9wdGlvbnM6IFJlcXVlc3RPcHRpb25zQXJncyA9IG9wdGlvbnM7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMpXG4gICAgICAgICAgICAoPGFueT5PYmplY3QpLmFzc2lnbihyZXR1cm5PcHRpb25zLCBhZGRPcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gcmV0dXJuT3B0aW9ucztcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiByZXNwb25zZSBpcyBjb21wbGV0ZSBhbmQgbmV3ZXIsIHRoZW4gdXBkYXRlIHN0b3JhZ2VcbiAgICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPik6IHZvaWQge1xuICAgICAgICByZXNwb25zZS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0QXV0aEhlYWRlcnNGcm9tUmVzcG9uc2UoPGFueT5yZXMpO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldEF1dGhIZWFkZXJzRnJvbVJlc3BvbnNlKDxhbnk+ZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEdldCBBdXRoIERhdGFcbiAgICAgKlxuICAgICAqL1xuXG4gICAgLy8gVHJ5IHRvIGxvYWQgYXV0aCBkYXRhXG4gICAgcHJpdmF0ZSB0cnlMb2FkQXV0aERhdGEoKTogdm9pZCB7XG5cbiAgICAgICAgbGV0IHVzZXJUeXBlID0gdGhpcy5nZXRVc2VyVHlwZUJ5TmFtZShnZXRTdHJpbmcoJ3VzZXJUeXBlJykpO1xuXG4gICAgICAgIGlmICh1c2VyVHlwZSlcbiAgICAgICAgICAgIHRoaXMuYXRDdXJyZW50VXNlclR5cGUgPSB1c2VyVHlwZTtcblxuICAgICAgICB0aGlzLmdldEF1dGhEYXRhRnJvbVN0b3JhZ2UoKTtcblxuICAgICAgICBpZih0aGlzLmFjdGl2YXRlZFJvdXRlKVxuICAgICAgICAgICAgdGhpcy5nZXRBdXRoRGF0YUZyb21QYXJhbXMoKTtcblxuICAgICAgICBpZiAodGhpcy5hdEN1cnJlbnRBdXRoRGF0YSlcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVUb2tlbigpO1xuICAgIH1cblxuICAgIC8vIFBhcnNlIEF1dGggZGF0YSBmcm9tIHJlc3BvbnNlXG4gICAgcHJpdmF0ZSBnZXRBdXRoSGVhZGVyc0Zyb21SZXNwb25zZShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBkYXRhLmhlYWRlcnM7XG5cbiAgICAgICAgbGV0IGF1dGhEYXRhOiBBdXRoRGF0YSA9IHtcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiAgICBoZWFkZXJzLmdldCgnYWNjZXNzLXRva2VuJyksXG4gICAgICAgICAgICBjbGllbnQ6ICAgICAgICAgaGVhZGVycy5nZXQoJ2NsaWVudCcpLFxuICAgICAgICAgICAgZXhwaXJ5OiAgICAgICAgIGhlYWRlcnMuZ2V0KCdleHBpcnknKSxcbiAgICAgICAgICAgIHRva2VuVHlwZTogICAgICBoZWFkZXJzLmdldCgndG9rZW4tdHlwZScpLFxuICAgICAgICAgICAgdWlkOiAgICAgICAgICAgIGhlYWRlcnMuZ2V0KCd1aWQnKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2V0QXV0aERhdGEoYXV0aERhdGEpO1xuICAgIH1cblxuICAgIC8vIFBhcnNlIEF1dGggZGF0YSBmcm9tIHBvc3QgbWVzc2FnZVxuICAgIHByaXZhdGUgZ2V0QXV0aERhdGFGcm9tUG9zdE1lc3NhZ2UoZGF0YTogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBhdXRoRGF0YTogQXV0aERhdGEgPSB7XG4gICAgICAgICAgICBhY2Nlc3NUb2tlbjogICAgZGF0YVsnYXV0aF90b2tlbiddLFxuICAgICAgICAgICAgY2xpZW50OiAgICAgICAgIGRhdGFbJ2NsaWVudF9pZCddLFxuICAgICAgICAgICAgZXhwaXJ5OiAgICAgICAgIGRhdGFbJ2V4cGlyeSddLFxuICAgICAgICAgICAgdG9rZW5UeXBlOiAgICAgICdCZWFyZXInLFxuICAgICAgICAgICAgdWlkOiAgICAgICAgICAgIGRhdGFbJ3VpZCddXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXRBdXRoRGF0YShhdXRoRGF0YSk7XG4gICAgfVxuXG4gICAgLy8gVHJ5IHRvIGdldCBhdXRoIGRhdGEgZnJvbSBzdG9yYWdlLlxuICAgIHByaXZhdGUgZ2V0QXV0aERhdGFGcm9tU3RvcmFnZSgpOiB2b2lkIHtcblxuICAgICAgICBsZXQgYXV0aERhdGE6IEF1dGhEYXRhID0ge1xuICAgICAgICAgICAgYWNjZXNzVG9rZW46ICAgIGdldFN0cmluZygnYWNjZXNzVG9rZW4nKSxcbiAgICAgICAgICAgIGNsaWVudDogICAgICAgICBnZXRTdHJpbmcoJ2NsaWVudCcpLFxuICAgICAgICAgICAgZXhwaXJ5OiAgICAgICAgIGdldFN0cmluZygnZXhwaXJ5JyksXG4gICAgICAgICAgICB0b2tlblR5cGU6ICAgICAgZ2V0U3RyaW5nKCd0b2tlblR5cGUnKSxcbiAgICAgICAgICAgIHVpZDogICAgICAgICAgICBnZXRTdHJpbmcoJ3VpZCcpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tBdXRoRGF0YShhdXRoRGF0YSkpXG4gICAgICAgICAgICB0aGlzLmF0Q3VycmVudEF1dGhEYXRhID0gYXV0aERhdGE7XG4gICAgfVxuXG4gICAgLy8gVHJ5IHRvIGdldCBhdXRoIGRhdGEgZnJvbSB1cmwgcGFyYW1ldGVycy5cbiAgICBwcml2YXRlIGdldEF1dGhEYXRhRnJvbVBhcmFtcygpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5hY3RpdmF0ZWRSb3V0ZS5xdWVyeVBhcmFtcykgLy8gRml4IGZvciBUZXN0aW5nLCBuZWVkcyB0byBiZSByZW1vdmVkIGxhdGVyXG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShxdWVyeVBhcmFtcyA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGF1dGhEYXRhOiBBdXRoRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46ICAgIHF1ZXJ5UGFyYW1zWyd0b2tlbiddIHx8IHF1ZXJ5UGFyYW1zWydhdXRoX3Rva2VuJ10sXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudDogICAgICAgICBxdWVyeVBhcmFtc1snY2xpZW50X2lkJ10sXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyeTogICAgICAgICBxdWVyeVBhcmFtc1snZXhwaXJ5J10sXG4gICAgICAgICAgICAgICAgICAgIHRva2VuVHlwZTogICAgICAnQmVhcmVyJyxcbiAgICAgICAgICAgICAgICAgICAgdWlkOiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWyd1aWQnXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0F1dGhEYXRhKGF1dGhEYXRhKSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdEN1cnJlbnRBdXRoRGF0YSA9IGF1dGhEYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZXQgQXV0aCBEYXRhXG4gICAgICpcbiAgICAgKi9cblxuICAgIC8vIFdyaXRlIGF1dGggZGF0YSB0byBzdG9yYWdlXG4gICAgcHJpdmF0ZSBzZXRBdXRoRGF0YShhdXRoRGF0YTogQXV0aERhdGEpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5jaGVja0F1dGhEYXRhKGF1dGhEYXRhKSkge1xuXG4gICAgICAgICAgICB0aGlzLmF0Q3VycmVudEF1dGhEYXRhID0gYXV0aERhdGE7XG5cbiAgICAgICAgICAgIHNldFN0cmluZygnYWNjZXNzVG9rZW4nLCBhdXRoRGF0YS5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICBzZXRTdHJpbmcoJ2NsaWVudCcsIGF1dGhEYXRhLmNsaWVudCk7XG4gICAgICAgICAgICBzZXRTdHJpbmcoJ2V4cGlyeScsIGF1dGhEYXRhLmV4cGlyeSk7XG4gICAgICAgICAgICBzZXRTdHJpbmcoJ3Rva2VuVHlwZScsIGF1dGhEYXRhLnRva2VuVHlwZSk7XG4gICAgICAgICAgICBzZXRTdHJpbmcoJ3VpZCcsIGF1dGhEYXRhLnVpZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmF0Q3VycmVudFVzZXJUeXBlICE9IG51bGwpXG4gICAgICAgICAgICAgICAgc2V0U3RyaW5nKCd1c2VyVHlwZScsIHRoaXMuYXRDdXJyZW50VXNlclR5cGUubmFtZSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVmFsaWRhdGUgQXV0aCBEYXRhXG4gICAgICpcbiAgICAgKi9cblxuICAgIC8vIENoZWNrIGlmIGF1dGggZGF0YSBjb21wbGV0ZSBhbmQgaWYgcmVzcG9uc2UgdG9rZW4gaXMgbmV3ZXJcbiAgICBwcml2YXRlIGNoZWNrQXV0aERhdGEoYXV0aERhdGE6IEF1dGhEYXRhKTogYm9vbGVhbiB7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYXV0aERhdGEuYWNjZXNzVG9rZW4gIT0gbnVsbCAmJlxuICAgICAgICAgICAgYXV0aERhdGEuY2xpZW50ICE9IG51bGwgJiZcbiAgICAgICAgICAgIGF1dGhEYXRhLmV4cGlyeSAhPSBudWxsICYmXG4gICAgICAgICAgICBhdXRoRGF0YS50b2tlblR5cGUgIT0gbnVsbCAmJlxuICAgICAgICAgICAgYXV0aERhdGEudWlkICE9IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdEN1cnJlbnRBdXRoRGF0YSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBhdXRoRGF0YS5leHBpcnkgPj0gdGhpcy5hdEN1cnJlbnRBdXRoRGF0YS5leHBpcnk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENvbnN0cnVjdCBQYXRocyAvIFVybHNcbiAgICAgKlxuICAgICAqL1xuXG4gICAgcHJpdmF0ZSBnZXRVc2VyUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5hdEN1cnJlbnRVc2VyVHlwZSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdEN1cnJlbnRVc2VyVHlwZS5wYXRoICsgJy8nO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QXBpUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY29uc3RydWN0ZWRQYXRoID0gJyc7XG5cbiAgICAgICAgaWYgKHRoaXMuYXRPcHRpb25zLmFwaUJhc2UgIT0gbnVsbClcbiAgICAgICAgICAgIGNvbnN0cnVjdGVkUGF0aCArPSB0aGlzLmF0T3B0aW9ucy5hcGlCYXNlICsgJy8nO1xuXG4gICAgICAgIGlmICh0aGlzLmF0T3B0aW9ucy5hcGlQYXRoICE9IG51bGwpXG4gICAgICAgICAgICBjb25zdHJ1Y3RlZFBhdGggKz0gdGhpcy5hdE9wdGlvbnMuYXBpUGF0aCArICcvJztcblxuICAgICAgICByZXR1cm4gY29uc3RydWN0ZWRQYXRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T0F1dGhQYXRoKG9BdXRoVHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IG9BdXRoUGF0aDogc3RyaW5nO1xuXG4gICAgICAgIG9BdXRoUGF0aCA9IHRoaXMuYXRPcHRpb25zLm9BdXRoUGF0aHNbb0F1dGhUeXBlXTtcblxuICAgICAgICBpZiAob0F1dGhQYXRoID09IG51bGwpXG4gICAgICAgICAgICBvQXV0aFBhdGggPSBgL2F1dGgvJHtvQXV0aFR5cGV9YDtcblxuICAgICAgICByZXR1cm4gb0F1dGhQYXRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T0F1dGhVcmwob0F1dGhQYXRoOiBzdHJpbmcsIGNhbGxiYWNrVXJsOiBzdHJpbmcsIHdpbmRvd1R5cGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCB1cmw6IHN0cmluZztcblxuICAgICAgICB1cmwgPSAgIGAke3RoaXMuYXRPcHRpb25zLm9BdXRoQmFzZX0vJHtvQXV0aFBhdGh9YDtcbiAgICAgICAgdXJsICs9ICBgP29tbmlhdXRoX3dpbmRvd190eXBlPSR7d2luZG93VHlwZX1gO1xuICAgICAgICB1cmwgKz0gIGAmYXV0aF9vcmlnaW5fdXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhbGxiYWNrVXJsKX1gO1xuXG4gICAgICAgIGlmICh0aGlzLmF0Q3VycmVudFVzZXJUeXBlICE9IG51bGwpXG4gICAgICAgICAgICB1cmwgKz0gYCZyZXNvdXJjZV9jbGFzcz0ke3RoaXMuYXRDdXJyZW50VXNlclR5cGUubmFtZX1gO1xuXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBPQXV0aFxuICAgICAqXG4gICAgICovXG5cbiAgICBwcml2YXRlIHJlcXVlc3RDcmVkZW50aWFsc1ZpYVBvc3RNZXNzYWdlKGF1dGhXaW5kb3c6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGxldCBwb2xsZXJPYnNlcnYgPSBPYnNlcnZhYmxlLmludGVydmFsKDUwMCk7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlT2JzZXJ2ID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQod2luZG93LCAnbWVzc2FnZScpLnBsdWNrKCdkYXRhJylcbiAgICAgICAgICAgIC5maWx0ZXIodGhpcy5vQXV0aFdpbmRvd1Jlc3BvbnNlRmlsdGVyKTtcblxuICAgICAgICBsZXQgcmVzcG9uc2VTdWJzY3JpcHRpb24gPSByZXNwb25zZU9ic2Vydi5zdWJzY3JpYmUoXG4gICAgICAgICAgICB0aGlzLmdldEF1dGhEYXRhRnJvbVBvc3RNZXNzYWdlLmJpbmQodGhpcylcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgcG9sbGVyU3Vic2NyaXB0aW9uID0gcG9sbGVyT2JzZXJ2LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoYXV0aFdpbmRvdy5jbG9zZWQpXG4gICAgICAgICAgICAgICAgcG9sbGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYXV0aFdpbmRvdy5wb3N0TWVzc2FnZSgncmVxdWVzdENyZWRlbnRpYWxzJywgJyonKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlT2JzZXJ2O1xuICAgIH1cblxuICAgIHByaXZhdGUgb0F1dGhXaW5kb3dSZXNwb25zZUZpbHRlcihkYXRhOiBhbnkpOiBhbnkge1xuICAgICAgICBpZihkYXRhLm1lc3NhZ2UgPT0gJ2RlbGl2ZXJDcmVkZW50aWFscycgfHwgZGF0YS5tZXNzYWdlID09ICdhdXRoRmFpbHVyZScpXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFV0aWxpdGllc1xuICAgICAqXG4gICAgICovXG5cbiAgICAvLyBNYXRjaCB1c2VyIGNvbmZpZyBieSB1c2VyIGNvbmZpZyBuYW1lXG4gICAgcHJpdmF0ZSBnZXRVc2VyVHlwZUJ5TmFtZShuYW1lOiBzdHJpbmcpOiBVc2VyVHlwZSB7XG4gICAgICAgIGlmIChuYW1lID09IG51bGwgfHwgdGhpcy5hdE9wdGlvbnMudXNlclR5cGVzID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcy5hdE9wdGlvbnMudXNlclR5cGVzLmZpbmQoXG4gICAgICAgICAgICB1c2VyVHlwZSA9PiB1c2VyVHlwZS5uYW1lID09PSBuYW1lXG4gICAgICAgICk7XG4gICAgfVxufSJdfQ==