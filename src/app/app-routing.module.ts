import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Login/sign-in/sign-in.component';
import { SignUpComponent } from './Login/sign-up/sign-up.component';
import { TheNavigationComponent } from './the-navigation/the-navigation.component';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full'},
  { path: 'signin',  component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'navbar', component: TheNavigationComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: '404', pathMatch: 'full'},
  { path: '404', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
