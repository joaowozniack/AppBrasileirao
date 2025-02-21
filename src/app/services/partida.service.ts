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
	private baseUrl = environment.UrlApi + "Partida/";

	constructor(private http : HttpClient) { }

	GetPartidas(): Observable<Response<PartidaListar[]>> {
		return this.http.get<Response<PartidaListar[]>>(this.baseUrl + this.rodada);
	}

	GetPartidasPorRodada(rodada: number): Observable<Response<PartidaListar[]>> {
		const url = `${this.baseUrl}${rodada}`;
		return this.http.get<Response<PartidaListar[]>>(url);
	}

	AtualizarPartidaComPlacar(partida: PartidaListar): Observable<any> {
        const url = `${this.baseUrl}atualizarPartida`;
        return this.http.put<any>(url, partida);
    }

	FinalizarPartida(partida: PartidaListar): Observable<any> {
		const url = `${this.baseUrl}finalizarPartida`;
		return this.http.put<any>(url, partida);
	}
}
