import { Routes } from '@angular/router';
import { MembersService } from './data-access/members.service';

export default [
  {
    path: '',
    providers: [MembersService],
    children: [
      {
        path: 'members',
        loadComponent: () =>
          import('./list-members/list-members.component').then(
            (m) => m.ListMembersComponent
          ),
      },
    ],
  },
] as Routes;
