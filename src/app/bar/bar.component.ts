import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import { ChartData, LineData } from 'src/utils/chartData';
import { DataScraperService } from '../data-scraper/data-scraper.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.sass']
})
export class BarComponent {
  private data: ChartData = {} as ChartData;
  private data2: ChartData = {} as ChartData;

  private svg: any;
  private margin = 50;
  private width = 900 - this.margin * 2;
  private height = 400 - this.margin * 2;
  private dataScraperService: DataScraperService;
  public chartName: string = '';

  constructor() {
    this.dataScraperService = new DataScraperService();

  }

  async ngOnInit(): Promise<void> {
    let data = await this.dataScraperService.quantityResultsTraditional();
    this.chartName = 'quantityResultsTraditional';
    this.showBarCharts(data, 'Cantidad de veces que ha salido cada número en Baloto', 'quantityResultTraditional');

    data = await this.dataScraperService.quantityResultsRevancha();
    this.chartName = 'quantityResultsRevancha';
    this.showBarCharts(data, 'Cantidad de veces que ha salido cada número en Revancha', 'quantityResultRevancha');

    data = await this.dataScraperService.quantityBalotaTraditional();
    this.chartName = 'quantityBalotaTraditional';
    this.showBarCharts(data, 'Cantidad de veces que ha salido cada número en Baloto (superbalota)', 'quantityBalotaTraditional');

    data = await this.dataScraperService.quantityBalotaRevancha();
    this.chartName = 'quantityBalotaRevancha';
    this.showBarCharts(data, 'Cantidad de veces que ha salido cada número en Revancha (superbalota)', 'quantityBalotaRevancha');

    data = await this.dataScraperService.sinceLastResultsTraditional();
    this.chartName = 'sinceLastResultsTraditional';
    this.showBarCharts(data, 'Cantidad de dias que no ha salido en Baloto', 'sinceLastResultsTraditional');

    data = await this.dataScraperService.sinceLastResultsRevancha();
    this.chartName = 'sinceLastResultsRevancha';
    this.showBarCharts(data, 'Cantidad de dias que no ha salido en Revancha', 'sinceLastResultsRevancha');

    data = await this.dataScraperService.sinceLastBalotaTraditional();
    this.chartName = 'sinceLastBalotaTraditional';
    this.showBarCharts(data, 'Cantidad de dias que no ha salido en Baloto (superbalota)', 'sinceLastBalotaTraditional');

    data = await this.dataScraperService.sinceLastBalotaRevancha();
    this.chartName = 'sinceLastBalotaRevancha';
    this.showBarCharts(data, 'Cantidad de dias que no ha salido en Revancha (superbalota)', 'sinceLastBalotaRevancha');
  }

  private showBarCharts(data: ChartData,text: string, idChart: string): void {
    this.createSvg(idChart);
    this.drawBars(data, text);
  }

  private createSvg(idChart: string): void {
    this.svg = d3
      .select(`figure#${idChart}`)
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: ChartData, text: string): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.lineData.map((d: LineData) => d.label))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, data.yrange]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data.lineData)
      .enter()
      .append('rect')
      .attr('x', (d: LineData) => x(d.label))
      .attr('y', (d: LineData) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.value))
      .attr('fill', '#d04a35');

    this.svg
      .append("text")
      .attr("x", (this.width / 2))
      .attr("y", 0 - (this.margin / 4))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "bold")
      .text(text);
  }
}
