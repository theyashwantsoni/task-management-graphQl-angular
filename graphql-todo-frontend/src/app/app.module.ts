import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { KeysPipe } from './keys.pipe';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(
      apollo: Apollo,
      httpLink: HttpLink
    ) {
       apollo.create({
        link: httpLink.create({ uri: 'http://localhost:4000/graphql'}),
        cache: new InMemoryCache()
      });
    }
}
