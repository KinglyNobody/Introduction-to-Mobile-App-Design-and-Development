import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'mail',
        loadChildren: () =>
          import('../mail/mail.module').then((m) => m.MailPageModule),
      },
      {
        path: 'meet',
        loadChildren: () =>
          import('../meet/meet.module').then((m) => m.MeetPageModule),
      },
      {
        path: 'details',
        loadChildren: () =>
          import('../details/details.module').then((m) => m.DetailsPageModule),
      },
      {
        path: '',
        redirectTo: 'mail',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
