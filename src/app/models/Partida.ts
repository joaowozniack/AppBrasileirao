import { TimeListar } from "./Time";

export interface PartidaListar{
    id?: number;
    rodada: number;
    status: string;
    timeCasa: TimeListar;
    escudoTimeCasa: TimeListar;
    timeVisitante: TimeListar;
    escudoTimeVisitante: TimeListar;
    golsTimeCasa: number;
    golsTimeVisitante: number;
    palcar: string;
    data: Date;
    estadio: string;
}