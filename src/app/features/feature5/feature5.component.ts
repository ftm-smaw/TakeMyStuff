import { Component } from '@angular/core';
import { MRainspotComponent } from '../../m-framework/m-rainspot/m-rainspot.component';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
@Component({
  selector: 'app-feature5',
  standalone: true,
  imports: [MRainspotComponent,MContainerComponent,MCardComponent],
  templateUrl: './feature5.component.html',
  styleUrl: './feature5.component.css'
})
export class Feature5Component {
 
}
