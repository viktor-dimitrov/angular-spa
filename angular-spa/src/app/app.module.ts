import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { UserRoutingModule } from './user/user-routing.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { RecordModule } from './records/record.module';

import { AuthInterceptor } from './shared/interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogComponent,

  
  ],
  imports: [
    BrowserModule,
    RecordModule,
    CoreModule,
    HttpClientModule,
    UserModule,
    SharedModule,
    AppRoutingModule,
    UserRoutingModule,
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]

  
})
export class AppModule { }
