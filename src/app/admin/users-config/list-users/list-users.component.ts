import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';

import { AuthService } from '../../../Services/auth/auth.service';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Models/user.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  title = 'Registered Users';
  users: User[] = [];
  isLoading = true;
  displayedColumns = ['username', 'firstName', 'lastName', 'email', 'role', 'actions'];
  dataSource: any;

  // initialize our UserServie methods on component construction
  constructor(public auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    // as soon as the page loads, get our users from the user service http call
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.dataSource = new TableDataSource(this.users);
      },
      (error) => console.log(error),
      () => (this.isLoading = false)
    );
  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.username + '?')) {
      this.userService.deleteUser(user).subscribe(
        (data) => console.log('successful delete'),
        (error) => console.log(error),
        () => this.getUsers()
      );
    }
  }
}

/**
 * Data source to provide what data should be rendered in the table
 */
export class TableDataSource extends DataSource<any> {
  constructor(private data: any) {
    super();
  }
  /**
   * Connect function called by the table to retrieve one stream containing the data to render
   */
  connect(): Observable<User[]> {
    return of(this.data);
  }

  disconnect() {}
}
