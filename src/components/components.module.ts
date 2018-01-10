import { NgModule } from '@angular/core';
import { FiltreComponent } from './filtre/filtre';
import { MapsComponent } from './maps/maps';

@NgModule({
	declarations: [
    FiltreComponent,
    MapsComponent,
    ],
	imports: [],
	exports: [
    FiltreComponent,
    MapsComponent,
    ]
})
export class ComponentsModule {}
