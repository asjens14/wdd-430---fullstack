import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
    @ViewChild('subject') subjectInputRef:ElementRef;
    @ViewChild('msgText') msgTextInputRef:ElementRef;
    @Output() addMessageEvent = new EventEmitter<Message>();

    currentSender = "Jensen"

    onSendMessage(){
        const subject = this.subjectInputRef.nativeElement.value;
        const text = this.msgTextInputRef.nativeElement.value;
        const newMessage = new Message(0,subject,text,this.currentSender);
        this.addMessageEvent.emit(newMessage);
    }

    onClear() {
        this.subjectInputRef.nativeElement.value = '';
        this.msgTextInputRef.nativeElement.value = '';
    }
}
