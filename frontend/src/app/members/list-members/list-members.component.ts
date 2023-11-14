import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/ui/header/header.component';
import { MembersService } from '../data-access/members.service';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberModel } from '../data-access/member.model';
import { SearchComponent } from 'src/app/shared/ui/search/search.component';

@Component({
  selector: 'app-list-member',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgFor, SearchComponent],
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['term']) {
        this.memberService.getMembers().then((members) => {
          this.members = members.filter((member) => {
            return (
              member.firstname
                .toLowerCase()
                .includes(params['term'].toLowerCase()) ||
              member.lastname
                .toLowerCase()
                .includes(params['term'].toLowerCase()) ||
              member.email.toLowerCase().includes(params['term'].toLowerCase())
            );
          });
        });
       } else if (params['roles']) {
        this.memberService.getAllMembersByRole(params['roles']).then((members) => {
          this.members = members;
        });
       }
       else {
        this.memberService.getMembers().then((members) => {
          this.members = members;
        });
      }
    });
    if (this.roles.length == 0) {
      this.memberService.getAllRoles().then((roles) => {
        this.roles = roles;
        // console.log(roles);
      });
    }
    this.memberService.getMembers().then((members) => {
      this.members = members;
      // console.log(this.members);
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
