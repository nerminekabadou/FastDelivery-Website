import { Component, Input, OnInit  } from '@angular/core';

@Component({
  selector: 'app-empty-search',
  templateUrl: './empty-search.component.html',
  styleUrls: ['./empty-search.component.css'],
  standalone:false
})
export class EmptySearchComponent implements OnInit {
  @Input()
  visible = false;
  @Input()
  notFoundMessage = "Votre recherche est introuvable";  
  @Input()
  resetLinkText = "Retour";
  @Input()
  resetLinkRoute = "/";

  ngOnInit(): void {
  }

}
