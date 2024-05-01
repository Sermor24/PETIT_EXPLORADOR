import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { DescargablesComponent } from './views/descargables/descargables.component';
import { PetitexploradorComponent } from './views/petitexplorador/petitexplorador.component';
import { EnlacesComponent } from './views/enlaces/enlaces.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'descargables', component: DescargablesComponent },
    { path: 'petitexplorador', component: PetitexploradorComponent },
    { path: 'enlaces', component: EnlacesComponent }
];
