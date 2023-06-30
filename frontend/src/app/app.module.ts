/**
 * Fichero de modulos de Angular, en el se declaran todos los modulos, y servicios
 * utilizados en la API.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { PdfViewerModule } from 'ng2-pdf-viewer';

// Imports componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { JobOfferNewComponent } from './components/job-offer-new/job-offer-new.component';
import { JobOfferDetailComponent } from './components/job-offer-detail/job-offer-detail.component';
import { JobOfferEditComponent } from './components/job-offer-edit/job-offer-edit.component';
import { JobOfferCheckApplicantsComponent } from './components/job-offer-check-applicants/job-offer-check-applicants.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CurriculumDetailComponent } from './components/curriculum-detail/curriculum-detail.component';
import { ErrorComponent } from './components/error/error.component';

import { IdentityGuard } from "./services/identity.guard";
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    CategoryNewComponent,
    JobOfferNewComponent,
    JobOfferDetailComponent,
    JobOfferEditComponent,
    JobOfferCheckApplicantsComponent,
    CategoryDetailComponent,
    ProfileComponent,
    CurriculumDetailComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule,
    PdfViewerModule
  ],
  providers: [
    appRoutingProviders,
    IdentityGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
