import { Injectable, OnInit } from '@angular/core';

import PocketBase from 'pocketbase';
import { MemberModel } from './member.model';
import { RoleModel } from './role.model';

@Injectable({ providedIn: 'root' })
export class MembersService implements OnInit {
  private pocketBase: PocketBase = new PocketBase('http://localhost:8080');

  constructor() {}

  ngOnInit(): void {
    // this.pocketBase.autoCancellation(false);
  }

  async getMembers(): Promise<MemberModel[]> {
    this.pocketBase.autoCancellation(false);
    let pMembers = await this.pocketBase
      .collection('members')
      .getFullList<MemberModel>({
        sort: 'lastname',
      });

    pMembers.forEach(async (member) => {
      member.rolesData = [];
      if (member.roles) {
        for (let role of member.roles) {
          let roleString: RoleModel;
          roleString = (await this.pocketBase
            .collection('roles')
            .getOne(role)) as RoleModel;
          member.rolesData.push(roleString);
        }
      }
    });
    return pMembers;
  }

  async getAllRoles(): Promise<string[]> {
    let pRoles = await this.pocketBase
      .collection('roles')
      .getFullList<RoleModel>({
        sort: 'name',
      });
    // console.log(pRoles);
    let roles: string[] = [];
    pRoles.forEach((role) => {
      // console.log(role.name);
      roles.push(role.name);
    });

    return roles;
  }

  async deleteMember(id: string) {
    return await this.pocketBase.collection('members').delete(id);
  }
}
