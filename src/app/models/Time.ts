export interface TimeListar{
    id?: number;
    nome: string;
    sigla: string;
    escudo: string;
    uf: string;
    anoFundacao: string;

    jogos: number;
    pontos: number;
    vitorias: number;
    empates: number;
    derrotas: number;
    golsPro: number;
    golsContra: number
}