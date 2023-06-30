/**
 * Fichero de rutas de la aplicacion Angular
 */
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Imports de componentes
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { CategoryNewComponent } from "./components/category-new/category-new.component";
import { JobOfferNewComponent } from "./components/job-offer-new/job-offer-new.component";
import { JobOfferDetailComponent } from "./components/job-offer-detail/job-offer-detail.component";
import { JobOfferEditComponent } from "./components/job-offer-edit/job-offer-edit.component";
import { JobOfferCheckApplicantsComponent } from "./components/job-offer-check-applicants/job-offer-check-applicants.component";
import { CategoryDetailComponent } from "./components/category-detail/category-detail.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { CurriculumDetailComponent } from './components/curriculum-detail/curriculum-detail.component';
import { ErrorComponent } from "./components/error/error.component";

import { IdentityGuard } from "./services/identity.guard";

// Routas
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inicio', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent },
    {path: 'registro', component: RegisterComponent},
    {path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard]},
    {path: 'category-new', component: CategoryNewComponent, canActivate: [IdentityGuard]},
    {path: 'job-offer-new', component: JobOfferNewComponent, canActivate: [IdentityGuard]},
    {path: 'job-offer-detail/:id', component: JobOfferDetailComponent},
    {path: 'job-offer-edit/:id', component: JobOfferEditComponent, canActivate: [IdentityGuard]},
    {path: 'job-offer-check/:id', component: JobOfferCheckApplicantsComponent, canActivate: [IdentityGuard]},
    {path: 'category-detail/:id', component: CategoryDetailComponent},
    {path: 'profile/:id', component: ProfileComponent, canActivate: [IdentityGuard]},
    {path: 'curriculum/:id/:jobOffer_id', component: CurriculumDetailComponent, canActivate: [IdentityGuard]},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

