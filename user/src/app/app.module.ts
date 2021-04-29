import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { AdminComponent } from './admin/admin.component';
import { GenericComponent } from './generic/generic.component';
import { ViewMapComponent } from './generic/view-map/view-map.component';
import { POIListComponent } from './generic/poilist/poilist.component';
import { PersonalAccountComponent } from './generic/personal-account/personal-account.component';
import { ManageMapComponent } from './admin/manage-map/manage-map.component';
import {MenuModule} from 'primeng/menu';
import {PasswordModule} from 'primeng/password';
import {AccordionModule} from 'primeng/accordion';
import { TaskListsComponent } from './manager/task-lists/task-lists.component';
import {OrderListModule} from 'primeng/orderlist';
import {ListboxModule} from 'primeng/listbox';
import { RegistrationManagerComponent } from './admin/registration-manager/registration-manager.component';
import { ViewListManagerComponent } from './admin/view-list-manager/view-list-manager.component';
import { ListUnitComponent } from './admin/list-unit/list-unit.component';
import { ManageTaskComponent } from './manager/manage-task/manage-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerComponent,
    AdminComponent,
    GenericComponent,
    ViewMapComponent,
    POIListComponent,
    PersonalAccountComponent,
    ManageMapComponent,
    TaskListsComponent,
    RegistrationManagerComponent,
    ViewListManagerComponent,
    ListUnitComponent,
    ManageTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MenuModule,
    PasswordModule,
    AccordionModule,
    OrderListModule,
    ListboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
