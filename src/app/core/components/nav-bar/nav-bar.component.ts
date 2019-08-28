import { Component, OnInit } from '@angular/core';
import { faHome, faFileInvoiceDollar, faFlask, faPiggyBank } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public faHome = faHome;
  public faFileInvoiceDollar = faFileInvoiceDollar;
  public faFlask = faFlask;
  public faPiggyBank = faPiggyBank;
  constructor() { }

  ngOnInit() {
  }

}
