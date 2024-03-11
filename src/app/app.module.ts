import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {HomeComponent} from './components/home/home.component';
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {IConfig, NgxMaskModule} from "ngx-mask";
import {MatNativeDateModule} from "@angular/material/core";
import {registerLocaleData} from "@angular/common";
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr)

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatNativeDateModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-PT' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
