import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-success',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        CardModule
    ],
    templateUrl: './success.component.html',
    styleUrl: './success.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent { }
