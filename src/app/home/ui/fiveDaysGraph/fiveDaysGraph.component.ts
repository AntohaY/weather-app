import { Component, input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ContainerComponent } from '../container/container.component';
import { HourlyForecast } from '../../interfaces/weather';
import addHoursToTimepoint from '../../utils/timeConverter';

@Component({
    standalone: true,
    selector: 'app-five-days-graph',
    template: `
        <div>
            <p-chart type="bar" [data]="basicData" [options]="basicOptions" />
        </div> 
    `,
    imports: [ContainerComponent, ChartModule]
})

export class FiveDaysGraphComponent implements OnInit {
    graphData = input.required<HourlyForecast[]>();
    initTimePoint = input.required<string>();

    basicData: any;

    basicOptions: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        function getGradient(ctx: any, chartArea: any) {
            let width, height, gradient;

            const chartWidth = chartArea.right - chartArea.left;
            const chartHeight = chartArea.bottom - chartArea.top;
            if (!gradient || width !== chartWidth || height !== chartHeight) {
                // Create the gradient because this is either the first render
                // or the size of the chart has changed
                width = chartWidth;
                height = chartHeight;
                gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, 'rgb(54, 162, 235)');
                gradient.addColorStop(0.5, 'rgb(255, 205, 86)');
                gradient.addColorStop(1, 'rgb(255, 99, 132)');
            }

            return gradient;
        }

        this.basicData = {
            labels: addHoursToTimepoint(this.initTimePoint(), this.graphData().map((hf) => parseInt(hf.timepoint))),
            datasets: [
                {
                    label: 'Temperature',
                    data: this.graphData().map((hf) => hf.temp2m),
                    backgroundColor: (context: { chart: any; }) => {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                
                        if (!chartArea) {
                          // This case happens on initial chart load
                          return;
                        }
                        return getGradient(ctx, chartArea);
                      },
                    borderWidth: 1
                }
            ]
        };

        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}