import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router'
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit{
    // @Input() document:Document;
    document: Document;
    id: number;

    constructor(
        private documentService:DocumentService,
        private route: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit(){
        this.route.params.subscribe((params: Params) =>{
            this.id = +params['id'];
            this.document = this.documentService.getDocument(this.id.toString());
            console.log(this.id);
        })
    }
}
