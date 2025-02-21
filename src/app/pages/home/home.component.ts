import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../services/time.service';
import { TimeListar } from '../../models/Time';
import { PartidaListar } from '../../models/Partida';
import { PartidaService } from '../../services/partida.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    times: TimeListar[] = [];
    timesGeral: TimeListar[] = [];
    partidas: PartidaListar[] = [];
    partidasGeral: PartidaListar[] = [];
    rodadaAtual: number = 1;
    partidaAleatoria: any;

    constructor(
        private serviceTime: TimeService, 
        private servicePartida: PartidaService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.serviceTime.GetUsuarios().subscribe(response => {
            this.times = response.dados;
            this.timesGeral = response.dados;
        })
        this.carregarPartidas(this.rodadaAtual);
    }

    listarTimePorId() {
        this.times = this.timesGeral;
    }

    listarPartidasPorRodada() {
        this.partidas = this.partidasGeral;
    }

    irParaPartidas() {
        this.router.navigate(['/partidas']);
    }

    proximaRodada() {
        if (this.rodadaAtual < 38) {
            this.rodadaAtual++;
            this.carregarPartidas(this.rodadaAtual);
        }        
    }

    rodadaAnterior() {
        if (this.rodadaAtual > 1) {
            this.rodadaAtual--;
            this.carregarPartidas(this.rodadaAtual);
        }
    }

    carregarPartidas(rodada: number) {
        this.servicePartida.GetPartidasPorRodada(rodada).subscribe(response => {
            this.partidas = response.dados;
        });
    }

    formatarData(data: Date): string {
        const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const diaDaSemana = diasDaSemana[new Date(data).getDay()];
        const dataFormatada = new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
        });
        const horarioFormatado = new Date(data).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        return `${dataFormatada} - ${diaDaSemana} - ${horarioFormatado}`;
    }
}
