import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  isExpanded: boolean = true;
  isExpanded1: boolean = false;
  name:any;
  constructor(private authservice: AuthService,public router:Router) {
    this.name =localStorage.getItem("username")
   }

  ngOnInit(): void {

  }

}
