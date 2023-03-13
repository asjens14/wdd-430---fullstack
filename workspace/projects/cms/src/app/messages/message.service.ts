import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messages: Message[] = [];
    messageChangedEvent = new EventEmitter<Message[]>();
    private maxMessageId:number;

    constructor(private http: HttpClient) {
        // this.messages = MOCKMESSAGES;
        this.maxMessageId = this.getMaxId()
    }

    getMessages(): Message[] {
        this.http.get('https://asjcms-a34a0-default-rtdb.firebaseio.com/messages.json')
          .subscribe(
            (messages: Message[]) => {
              this.messages = messages;
              this.maxMessageId = this.getMaxId();
              this.messages.sort((a, b)=> (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
              this.messageChangedEvent.next(this.messages.slice());
            }, 
            (error: any) => {
              console.log(error.message);
            }
        );
        return this.messages.slice();
      }

    getMessage(id: string) {
        for (let message of this.messages) {
            if (message.id == id) {
                return message;
            }
        }
        return null;
    }

    addMessage(message:Message){
        this.messages.push(message);
        // this.messageChangedEvent.emit(this.messages.slice());
        this.storeMessages();
    }

    storeMessages() {
        let json = JSON.stringify(this.messages);
        this.http.put(
          'https://cms-project-7478d-default-rtdb.firebaseio.com/messages.json', json, 
          {
            headers: new HttpHeaders({'Content-Type':'application/json'})
          }
        ). subscribe(() => {
          this.messageChangedEvent.emit(this.messages.slice());
        })
      }

    getMaxId(): number {
        let maxId: number = 0;
      
        for (let message of this.messages) {
          let currentId = +message.id;
          if (currentId > maxId) {
            maxId = currentId;
          }
        
        }
        return maxId;
      }
}
