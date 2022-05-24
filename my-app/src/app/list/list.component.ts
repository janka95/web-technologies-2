import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {

  Book: any = [];
  user = new User();
  username!: string;

  constructor(private router: Router,
              private appService: AppService)
  {
    this.getBook();
    this.getUser();
  }

  ngOnInit(): void {
  }

  getBook() {
    this.appService.getBook().subscribe((data) => {
      this.Book = data;
    });
  }

  getUser(){

    if (this.appService.getLoggedInUser().userName == null)
    {
      this.router.navigate(['/login']);
    }

    this.user = this.appService.getLoggedInUser();
    this.username = JSON.stringify(this.user.userName);
  }

  logout(){
    this.user = new User();
    this.appService.setLoggedInUser(this.user);
    this.router.navigate(['/login']);
  }
  back(){
    this.router.navigate(['/add']);
  }
}
