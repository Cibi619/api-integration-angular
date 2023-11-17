import { Component, OnInit } from '@angular/core';
import { Responses } from 'src/app/interfaces/response.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    response: Responses;
    isResponse: boolean = false;
    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getUsers(15).subscribe(
          (results:any) => {
            console.log(results);
            if (results) {
              this.response = results;
              this.isResponse = true;
              console.log(this.response,"---res");
            }
          }
        );
    }
}
