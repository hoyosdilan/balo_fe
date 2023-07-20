import { Component } from '@angular/core';
import { ChartData } from 'src/utils/chartData';
import { DataScraperService } from './data-scraper/data-scraper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'balo_fe';
}
