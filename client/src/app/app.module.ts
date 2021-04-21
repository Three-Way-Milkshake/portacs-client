import { ManualDrivingComponent } from './manualdriving/manualdriving.component';
import { StartButtonComponent } from './startbutton/startbutton.component';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { ArrowsComponent } from './arrows/arrows.component';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';
import {ButtonModule} from 'primeng/button';
import {ListboxModule} from 'primeng/listbox';

@NgModule({
  declarations: [
    AppComponent,
    ArrowsComponent,
    MapComponent,
    TasklistComponent,
    StartButtonComponent,
    ManualDrivingComponent,
    AdminNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    ListboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }