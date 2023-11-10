import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/ui/header/header.component';
import { MembersService } from '../data-access/members.service';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MemberModel } from '../data-access/member.model';

@Component({
  selector: 'app-list-member',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgFor],
  providers: [MembersService],
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.css'],
})
export class ListMembersComponent implements OnInit {
  members: MemberModel[] = [];
  roles: string[] = [];
  constructor(
    private memberService: MembersService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.roles.length == 0) {
      this.memberService.getAllRoles().then((roles) => {
        this.roles = roles;
        console.log(roles);
      });
    }
    this.memberService.getMembers().then((members) => {
      this.members = members;
      console.log(this.members);
    });
  }

  deleteMember(id: string) {
    this.memberService.deleteMember(id).then(() => {
      this.ngOnInit();
    });
  }

  updateMember(id: string) {
    this.router.navigate([`/members/update/${id}`]);
  }
}
