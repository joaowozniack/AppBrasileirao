import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/Response';
import { Observable } from 'rxjs';
import { PartidaListar } from '../models/Partida';

@Injectable({
	providedIn: 'root'
})
export class PartidaService {
	rodada = 1;
	ApiUrl = environment.UrlApi + "Partida/" + this.rodada;

	constructor(private http : HttpClient) { }

	GetPartidas(): Observable<Response<PartidaListar[]>> {
		return this.http.get<Response<PartidaListar[]>>(this.ApiUrl);
	}

	GetPartidasPorRodada(rodada: number): Observable<Response<PartidaListar[]>> {
		this.ApiUrl = environment.UrlApi + "Partida/" + rodada;
		return this.http.get<Response<PartidaListar[]>>(this.ApiUrl);
	}

	AtualizarPartidaComPlacar(idPartida: number, golsTimeCasa: number, golsTimeVisitante: number): Observable<Response<any>> {
        const url = environment.UrlApi + "Partida/" + idPartida;
        return this.http.put<Response<any>>(url, { golsTimeCasa, golsTimeVisitante });
    }
}
