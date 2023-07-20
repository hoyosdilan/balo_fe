import { Injectable } from '@angular/core';
import { collections } from './utils/collections';
import { ChartData } from 'src/utils/chartData';

@Injectable({
  providedIn: 'root'
})
export class DataScraperService {

  constructor() { }

  public async quantityResultsTraditional(): Promise<ChartData> {
    let data = await this.getChartData(collections.QUANTITY_RESULTS_TRADITIONAL);
    const maxQuantity = Math.floor(Math.max(...data.map((e: any) => e.quantity)) + 1);
    const yrange = maxQuantity + (5 - maxQuantity % 5);
    data = data.map((e: any) => ({value: e.quantity, label: e.key})).sort((a: any, b: any) => a.label - b.label);

    return { lineData: data, yrange: yrange };
  }

  public async quantityResultsRevancha(): Promise<ChartData> {
    let data = await this.getChartData(collections.QUANTITY_RESULTS_REVANCHA);
    const maxQuantity = Math.floor(Math.max(...data.map((e: any) => e.quantity)) + 1);
    const yrange = maxQuantity + (5 - maxQuantity % 5);
    data = data.map((e: any) => ({value: e.quantity, label: e.key})).sort((a: any, b: any) => a.label - b.label);

    return { lineData: data, yrange: yrange };
  }

  public async quantityBalotaTraditional(): Promise<ChartData> {
    let data = await this.getChartData(collections.QUANTITY_BALOTA_TRADITIONAL);
    const maxQuantity = Math.floor(Math.max(...data.map((e: any) => e.quantity)) + 1);
    const yrange = maxQuantity + (5 - maxQuantity % 5);
    data = data.map((e: any) => ({value: e.quantity, label: e.key})).sort((a: any, b: any) => a.label - b.label);

    return { lineData: data, yrange: yrange };
  }

  public async quantityBalotaRevancha(): Promise<ChartData> {
    let data = await this.getChartData(collections.QUANTITY_BALOTA_REVANCHA);
    const maxQuantity = Math.floor(Math.max(...data.map((e: any) => e.quantity)) + 1);
    const yrange = maxQuantity + (5 - maxQuantity % 5);
    data = data.map((e: any) => ({value: e.quantity, label: e.key})).sort((a: any, b: any) => a.label - b.label);

    return { lineData: data, yrange: yrange };
  }

  public async sinceLastResultsTraditional(): Promise<ChartData> {
    let data = await this.getChartData(collections.RESULTS_SINCE_LAST_TRADITIONAL);
    const maxQuantity = Math.floor(Math.max(...data.map((e: any) => e.since)) + 1);
    const yrange = maxQuantity + (5 - maxQuantity % 5);
    data = data.map((e: any) => ({value: e.since, label: e.number})).sort((a: any, b: any) => a.label - b.label);

    return { lineData: data, yrange: yrange };
  }

  public async sinceLastResultsRevancha(): Promise<ChartData> {
    let data = await this.getChartData(collections.RESULTS_SINCE_LAST_REVANCHA);
    const maxQuantity = Math.floor(Math.max(...data.map((e: any) => e.since)) + 1);
    const yrange = maxQuantity + (5 - maxQuantity % 5);
    data = data.map((e: any) => ({value: e.since, label: e.number})).sort((a: any, b: any) => a.label - b.label);

    return { lineData: data, yrange: yrange };
  }

  public async sinceLastBalotaTraditional(): Promise<ChartData> {
    let data = await this.getChartData(collections.BALOTA_SINCE_LAST_TRADITIONAL);
    const maxQuantity = Math.floor(Math.max(...data.map((e: any) => e.since)) + 1);
    const yrange = maxQuantity + (5 - maxQuantity % 5);
    data = data.map((e: any) => ({value: e.since, label: e.number})).sort((a: any, b: any) => a.label - b.label);

    return { lineData: data, yrange: yrange };
  }

  public async sinceLastBalotaRevancha(): Promise<ChartData> {
    let data = await this.getChartData(collections.BALOTA_SINCE_LAST_REVANCHA);
    const maxQuantity = Math.floor(Math.max(...data.map((e: any) => e.since)) + 1);
    const yrange = maxQuantity + (5 - maxQuantity % 5);
    data = data.map((e: any) => ({value: e.since, label: e.number})).sort((a: any, b: any) => a.label - b.label);

    return { lineData: data, yrange: yrange };
  }
  
  // fetch to localhost:3000/quantityResultsTraditional to get the data
  public getChartData(collection: collections): any {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/${collection}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}
