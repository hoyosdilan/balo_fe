import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import { ChartData, LineData } from 'src/utils/chartData';
import { DataScraperService } from '../data-scraper/data-scraper.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent {
  private svg: any;
  private margin = 50;
  private width = 1000 - this.margin * 2;
  private height = 400 - this.margin * 2;
  private dataScraperService: DataScraperService;
  public chartName: string = '';

  constructor() {
    this.dataScraperService = new DataScraperService();
  }

  async ngOnInit(): Promise<void> {
    let data = await this.dataScraperService.quantityResultsTraditional();
    this.showBarCharts(data, 'Cantidad de veces que ha salido cada número en Baloto', 'quantityResultTraditional', '#C06C84');

    data = await this.dataScraperService.quantityResultsRevancha();
    this.showBarCharts(data, 'Cantidad de veces que ha salido cada número en Revancha', 'quantityResultRevancha', '#C06C84');

    data = await this.dataScraperService.quantityBalotaTraditional();
    this.showBarCharts(data, 'Cantidad de veces que ha salido cada número en Baloto (superbalota)', 'quantityBalotaTraditional', '#C06C84');

    data = await this.dataScraperService.quantityBalotaRevancha();
    this.showBarCharts(data, 'Cantidad de veces que ha salido cada número en Revancha (superbalota)', 'quantityBalotaRevancha', '#C06C84');

    data = await this.dataScraperService.sinceLastResultsTraditional();
    this.showBarCharts(data, 'Cantidad de dias que no ha salido en Baloto', 'sinceLastResultsTraditional', '#6C5B7B');

    data = await this.dataScraperService.sinceLastResultsRevancha();
    this.showBarCharts(data, 'Cantidad de dias que no ha salido en Revancha', 'sinceLastResultsRevancha', '#6C5B7B');

    data = await this.dataScraperService.sinceLastBalotaTraditional();
    this.showBarCharts(data, 'Cantidad de dias que no ha salido en Baloto (superbalota)', 'sinceLastBalotaTraditional', '#6C5B7B');

    data = await this.dataScraperService.sinceLastBalotaRevancha();
    this.showBarCharts(
      data,
      'Cantidad de dias que no ha salido en Revancha (superbalota)',
      'sinceLastBalotaRevancha',
      '#6C5B7B'
    );

    data =
      await this.dataScraperService.averageOfNotShowingUpResultsTraditional();
    this.showBarCharts(
      data,
      'Promedio de dias que sale en Baloto',
      'averageOfNotShowingUpResultsTraditional',
      '#35477D'
    );

    data = await this.dataScraperService.averageOfNotShowingUpResultsRevancha();
    this.showBarCharts(
      data,
      'Promedio de dias que sale en Revancha',
      'averageOfNotShowingUpResultsRevancha',
      '#35477D'
    );

    data =
      await this.dataScraperService.averageOfNotShowingUpBalotaTraditional();
    this.showBarCharts(
      data,
      'Promedio de dias que sale en Baloto (superbalota)',
      'averageOfNotShowingUpBalotaTraditional',
      '#35477D'
    );

    data = await this.dataScraperService.averageOfNotShowingUpBalotaRevancha();
    this.showBarCharts(
      data,
      'Promedio de dias que sale en Revancha (superbalota)',
      'averageOfNotShowingUpBalotaRevancha',
      '#35477D',
    );
  }

  private showBarCharts(data: ChartData, text: string, idChart: string, color: string): void {
    this.createSvg(idChart);
    this.drawBars(data, text, color);
  }

  private createSvg(idChart: string): void {
    this.svg = d3
      .select(`figure#${idChart}`)
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')')
      .style('fill', 'black');
  }

  private drawBars(data: ChartData, text: string, color: string): void {
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
      .style('text-anchor', 'end')
      .style('color', 'black')
      .style('fill', 'black');

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, data.yrange]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y)).selectAll('text').style('fill', 'black');

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
      .attr('fill', color)

      // Get the y axis value on top
    this.svg
      .selectAll("text.bar")
      .data(data.lineData)
      .enter()
      .append("text")
      .attr("class", "yAxis-label")
      .attr("text-anchor", "middle")
      .attr("fill", "#70747a")
      .attr("x", (d: LineData) => x(d.label))
      .attr("y", (d: LineData) => y(d.value) - 5)
      .text((d: LineData) => d.value)
      .attr('transform', 'translate(7,0)')
      .style('font-size', '10px');

    this.svg
      .append('text')
      .attr('x', (this.width / 2))
      .attr('y', 0 - (this.margin / 4))
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('text-decoration', 'bold')
      .text(text);
  }
}
