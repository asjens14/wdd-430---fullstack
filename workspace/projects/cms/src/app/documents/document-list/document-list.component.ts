import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
    @Output() selectedDocumentEvent = new EventEmitter<Document>();
    documents:Document[] = [
        new Document(1, 'Document 1', 'test doc 1', 'url', 'child'),
        new Document(1, 'Document 2', 'test doc 2', 'url', 'child'),
        new Document(1, 'Document 3', 'test doc 3', 'url', 'child')
    ];

    onSelectedDocument(document:Document) {
        this.selectedDocumentEvent.emit(document);
    }
}
