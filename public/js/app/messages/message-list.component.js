import { Component } from "@angular/core";
import { MessageService } from "./message.service";
export var MessageListComponent = (function () {
    function MessageListComponent(messageService) {
        this.messageService = messageService;
    }
    MessageListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //in JS, arrays are referenced. It means here we are pointing
        //to the same array provided/created in the message service
        this.messageService.getMessage()
            .subscribe(function (messages) {
            _this.messages = messages;
        });
    };
    MessageListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-message-list',
                    template: "\n        <div class=\"col-md-8 col-md-offset-2\">\n            <app-message\n                    [message]=\"message\"\n                    *ngFor=\"let message of messages\">\n            </app-message>    \n        </div>          \n    "
                },] },
    ];
    /** @nocollapse */
    MessageListComponent.ctorParameters = [
        { type: MessageService, },
    ];
    return MessageListComponent;
}());
//# sourceMappingURL=message-list.component.js.map