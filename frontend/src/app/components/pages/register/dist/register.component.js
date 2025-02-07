"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var password_match_validator_1 = require("./password_match_validator");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, userService, activatedRoute, router) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.isSubmitted = false;
        this.returnUrl = '';
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            confirmPassword: ['', forms_1.Validators.required],
            adresse: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]]
        }, {
            validators: password_match_validator_1.PasswordsMatchValidator('password', 'confirmPassword')
        });
        this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    };
    Object.defineProperty(RegisterComponent.prototype, "fc", {
        get: function () {
            return this.registerForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    RegisterComponent.prototype.submit = function () {
        var _this = this;
        console.log('Form submit triggered');
        console.log('Form validity:', this.registerForm.valid);
        console.log(this.registerForm.value);
        this.isSubmitted = true;
        if (this.registerForm.invalid) {
            console.error('Form errors:', this.registerForm.errors);
            // Log individual field errors
            Object.keys(this.registerForm.controls).forEach(function (field) {
                var _a;
                var controlErrors = (_a = _this.registerForm.get(field)) === null || _a === void 0 ? void 0 : _a.errors;
                console.error("Field '" + field + "' errors:", controlErrors);
            });
            return;
        }
        var fv = this.registerForm.value;
        var user = {
            name: fv.name,
            email: fv.email,
            password: fv.password,
            confirmPassword: fv.confirmPassword,
            adresse: fv.adresse
        };
        console.log('Submitting registration:', user);
        this.userService.register(user).subscribe(function () {
            _this.router.navigateByUrl('/login');
        }, function (error) {
            console.error("Registration error:", error);
            alert('Erreur lors de l\'inscription.');
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
