import { Component } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
export var MessageInputComponent = (function () {
    function MessageInputComponent(messageService) {
        this.messageService = messageService;
    }
    MessageInputComponent.prototype.onSubmit = function (form) {
        if (this.message) {
            //Edit. Not null message
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(function (result) { return console.log(result); });
            this.message = null;
        }
        else {
            var message = new Message(form.value.content, 'Rahul');
            this.messageService.addMessage(message)
                .subscribe((function (data) { return console.log(data); },
                function (error) { return console.log(error); }));
        }
        form.resetForm();
    };
    MessageInputComponent.prototype.onClear = function (form) {
        this.message = null;
        form.resetForm();
    };
    MessageInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.messageIsEdited.subscribe(function (message) {
            _this.message = message;
        });
    };
    MessageInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-message-input',
                    templateUrl: './message-input.component.html'
                },] },
    ];
    /** @nocollapse */
    MessageInputComponent.ctorParameters = [
        { type: MessageService, },
    ];
    return MessageInputComponent;
}());
//# sourceMappingURL=message-input.component.js.map