import { Component, OnInit } from '@angular/core';
import { TimeService } from '../../services/time.service';
import { TimeListar } from '../../models/Time';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    times: TimeListar[] = [];
    timesGeral: TimeListar[] = [];

    constructor(private serviceTime:TimeService) { }

    ngOnInit(): void {
        this.serviceTime.GetUsuarios().subscribe(response => {
            this.times = response.dados;
            this.timesGeral = response.dados;
        })
    }


    listarTimePorId() {
        this.times = this.timesGeral;
    }
}
