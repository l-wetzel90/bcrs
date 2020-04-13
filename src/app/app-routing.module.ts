import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersConfigComponent } from './admin/users-config/users-config.component';
import { SecurityQuestionsConfigComponent } from './admin/security-questions-config/security-questions-config.component';
import { CreateUserComponent } from './admin/users-config/create-user/create-user.component';
import { ListUsersComponent } from './admin/users-config/list-users/list-users.component';
import { CreateSecurityQuestionComponent } from './admin/security-questions-config/create-security-question/create-security-question.component';
import { ListSecurityQuestionsComponent } from './admin/security-questions-config/list-security-questions/list-security-questions.component';

import { AuthLoginGuard } from './Services/auth/auth-guard-login.service';
import { AuthAdminGuard } from './Services/auth/auth-guard-admin.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: HomeComponent, canActivate: [AuthLoginGuard] },
  { path: 'about', component: AboutComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UsersConfigComponent,
        canActivate: [AuthAdminGuard],
        children: [
          {
            path: 'create-user',
            component: CreateUserComponent,
            canActivate: [AuthAdminGuard],
          },
          {
            path: 'list-users',
            component: ListUsersComponent,
            canActivate: [AuthAdminGuard],
          },
        ],
      },
      {
        path: 'security',
        component: SecurityQuestionsConfigComponent,
        canActivate: [AuthAdminGuard],
        children: [
          {
            path: 'create-security',
            component: CreateSecurityQuestionComponent,
            canActivate: [AuthAdminGuard],
          },
          {
            path: 'list-security',
            component: ListSecurityQuestionsComponent,
            canActivate: [AuthAdminGuard],
          },
        ],
      },
    ],
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
