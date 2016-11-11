import { Component } from "@angular/core";
export var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-header',
                    template: "\n        <header class=\"row\">\n            <div class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-pills\">\n                    <li routerLinkActive=\"active\"><a [routerLink]=\"['/messages']\">Messenger</a></li>\n                    <li routerLinkActive=\"active\"><a [routerLink]=\"['/auth']\">Authentication</a></li>        \n                </ul>\n            </div>\n        </header>\n    "
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = [];
    return HeaderComponent;
}());
//# sourceMappingURL=header.component.js.map