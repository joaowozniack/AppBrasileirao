import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PartidasComponent } from './pages/partidas/partidas.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'partidas', component: PartidasComponent },
    // outras rotas
];
