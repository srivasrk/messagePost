import {Message} from "./message.model";
import {Http, Response, Headers} from "@angular/http";
import {Injectable, EventEmitter} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {ErrorService} from "../errors/error.service";

@Injectable()
export class MessageService{
    private messages: Message[] = [];
    messageIsEdited = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService){}//also include HttpModule in app module. Also, need to have decorator: Injectable

    addMessage(message: Message){
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token='+localStorage.getItem('token')
            : '';
        // return this.http.post('https://srivasrk-messenger.herokuapp.com/message' + token, body, {headers: headers})//only sets the observable. does not send the request// return this.http.post('https://srivasrk-messenger.herokuapp.com/message' + token, body, {headers: headers})//only sets the observable. does not send the request
        return this.http.post('https://localhost:3000/message' + token, body, {headers: headers})//only sets the observable. does not send the request
            .map((response: Response) => {
                const result = response.json();
                const message =  new Message(
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id
                );
                this.messages.push(message);
                return message;
            })//observable 3rd party lib: rxjs/Rx.
            //used response.json to get the object from the backend-message.js at status 201 in the callback.
            .catch((error: Response) => { //another chained function
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getMessage(){
        // return this.http.get('https://srivasrk-messenger.herokuapp.com/message')
        return this.http.get('https://localhost:3000/message')
            .map((response: Response) => {
                const messages = response.json().obj;//different fields in msgs in back-end & front-end
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(
                        message.content,
                        message.user.firstName,
                        message._id,
                        message.user._id)
                    );
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => { //another chained function
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editMessage(message: Message){
        this.messageIsEdited.emit(message);
    }

    updateMessage(message: Message){
        //http update
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token='+localStorage.getItem('token')
            : '';
        // return this.http.patch('https://srivasrk-messenger.herokuapp.com/message/' + message.messageId + token, body, {headers: headers})
        return this.http.patch('https://localhost:3000/message/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => { //another chained function
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);const token = localStorage.getItem('token')
            ? '?token='+localStorage.getItem('token')
            : '';
        // return this.http.delete('https://srivasrk-messenger.herokuapp.com/message/' + message.messageId + token)
        return this.http.delete('https://localhost:3000/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => { //another chained function
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}