import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExamDashboardComponent } from './exam-dashboard/exam-dashboard.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login' ,component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'exam-dashboard',component:ExamDashboardComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
