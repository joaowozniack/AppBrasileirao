import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from '../../services/partida.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
    selector: 'app-partidas',
    standalone: true,
    imports: [CommonModule, FormsModule], // Adicionar FormsModule
    templateUrl: './partidas.component.html',
    styleUrl: './partidas.component.css'
})
export class PartidasComponent implements OnInit {
    partidas: any[] = [];
    rodadaAtual: number = 1;

    constructor(
        private servicePartida: PartidaService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.servicePartida.GetPartidas().subscribe(response => {
            this.partidas = response.dados;
            if (this.partidas.length > 0) {
                this.rodadaAtual = this.partidas[0].rodada;
            }
        });
    }

    irParaHome() {
        this.router.navigate(['']);
    }

    irParaAtualizarPlacar() {
        this.router.navigate(['atualizar-placar']);
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

    atualizarPlacar(partida: any) {
        this.servicePartida.AtualizarPartidaComPlacar(partida).subscribe(response => {
            if (response.status) {
                alert('Placar atualizado com sucesso!');
            } else {
                alert('Erro ao atualizar placar!');
            }
        }, error => {
            console.error('Erro ao atualizar placar:', error);
            alert('Erro ao atualizar placar!');
        });
    }

    finalizarPartida(partida: any) {
        this.servicePartida.FinalizarPartida(partida).subscribe(response => {
            if (response.status) {
                alert('Partida finalizada com sucesso!');
            } else {
                alert('Erro ao finalizar partida!');
            }
        }, error => {
            console.error('Erro ao finalizar partida:', error);
            alert('Erro ao finalizar partida!');
        });
    }

    aumentarGols(partida: any, time: string) {
        if (time === 'casa') {
            partida.golsTimeCasa++;
        } else if (time === 'visitante') {
            partida.golsTimeVisitante++;
        }
    }

    diminuirGols(partida: any, time: string) {
        if (time === 'casa' && partida.golsTimeCasa > 0) {
            partida.golsTimeCasa--;
        } else if (time === 'visitante' && partida.golsTimeVisitante > 0) {
            partida.golsTimeVisitante--;
        }
    }
}