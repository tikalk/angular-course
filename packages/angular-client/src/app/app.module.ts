import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {FrameComponent} from './frame/frame.component';
import {RegistraionFormComponent} from './registration-form/registraion-form.component';
import {UserNameComponent} from './user-name/user-name.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginFormComponent } from './login-form/login-form.component';
import { CurrentUserComponent } from './current-user/current-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FrameComponent,
    RegistraionFormComponent,
    UserNameComponent,
    LoginFormComponent,
    CurrentUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
