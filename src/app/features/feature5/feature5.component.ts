import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DataPoint } from '../../data/DataPoint';
import { RegressionService } from '../../services/regression.service';

@Component({
  selector: 'app-feature5',
  standalone: true,
  imports: [MContainerComponent, CommonModule,FormsModule,CanvasJSAngularChartsModule],
  templateUrl: './feature5.component.html',
  styleUrl: './feature5.component.css'
})
export class Feature5Component {
  x: string;
  y: string;
  chart: any; 
  chartOptions:any;

  dataList: DataPoint[];
  polyno: DataPoint[];
  linear: DataPoint[];

  constructor(private regressionService: RegressionService){
    this.x = "";
    this.y = "";
    this.dataList = [];
    this.polyno = [];
    this.linear = [];
    this.chartOptions = {
      theme:'light2',
      title:{text:""},
      axisX:{title:"x"},
      axisY:{title:"y"},
      data: [
        {type: "scatter", dataPoints: this.dataList, showInLegend: true, legendText: "Original Data"},
        {type: "line"   , dataPoints: this.polyno,   showInLegend: true, legendText: "Polynomial Regression", markerType: "none"},
        {type: "line"   , dataPoints: this.linear,   showInLegend: true, legendText: "Linear Regression"    , markerType: "none"}
      ]
    }
    
  }
  addData(){
    let newPoint: DataPoint = new DataPoint(+this.x, +this.y);
    this.dataList.push(newPoint);
    this.polyno.push(newPoint);
    this.linear.push(newPoint);

    this.regressionService.fun1();

    this.chartOptions.data= [
        {type: "scatter", dataPoints: this.dataList, showInLegend: true, legendText: "Original Data"},
        {type: "line"   , dataPoints: this.polyno,   showInLegend: true, legendText: "Polynomial Regression", markerType: "none"},
        {type: "line"   , dataPoints: this.linear,   showInLegend: true, legendText: "Linear Regression"    , markerType: "none"}
      ]
    

    this.chart.render();
    this.x = "";
    this.y = "";
  }
  getChartInstance(chart: object){
    this.chart = chart; 
  }

}
