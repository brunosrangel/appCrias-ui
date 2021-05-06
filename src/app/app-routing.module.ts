import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { NotFoundComponent } from './NotFound/NotFound.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '404', component: NotFoundComponent },

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'contacts',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/contacts/contacts.module').then(
            (m) => m.ContactsModule
          ),
      },
      {
        path: 'product-mode',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/product-mode/product-mode.module').then(
            (m) => m.ProductModeModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
