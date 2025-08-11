/*
 * Use App.getDependency for Dependency Injection
 * eg: var DialogService = App.getDependency('DialogService');
 */

/* perform any action on widgets/variables within this block */
Partial.onReady = function () {
    /*
     * variables can be accessed through 'Partial.Variables' property here
     * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
     * Partial.Variables.loggedInUser.getData()
     *
     * widgets can be accessed through 'Partial.Widgets' property here
     * e.g. to get value of text widget named 'username' use following script
     * 'Partial.Widgets.username.datavalue'
     */
    Partial.appleProducts();
};


Partial.toggle1Click = function ($event, widget) {
    debugger
    // Partial.dynamic();
    Partial.appleProducts();
};
Partial.appleProducts = function () {
    const showDonutChart = !Partial.Widgets.toggle1.datavalue; // Toggle this to false to hide donut chart

    const categories = ['iPhone', 'Mac', 'iPad', 'Services', 'Wearables'];
    const data2021 = [191, 35, 31, 68, 38];
    const data2022 = [205, 40, 29, 78, 41];
    const data2023 = [211, 42, 28, 85, 44];
    const average = categories.map((_, i) => (
        (data2021[i] + data2022[i] + data2023[i]) / 3
    ));

    const total2021 = data2021.reduce((a, b) => a + b, 0);
    const total2022 = data2022.reduce((a, b) => a + b, 0);
    const total2023 = data2023.reduce((a, b) => a + b, 0);

    const chartOptions = {
        chart: {
            renderTo: 'container',
            zooming: {
                type: null,        // disables drag-to-zoom
                pinchType: null,   // disables pinch zoom on touch devices
                mouseWheel: {
                    enabled: false   // disables mouse wheel zoom
                }
            }
        },
        title: {
            text: 'Apple Revenue by Product Category (FY2021–FY2023)'
        },
        xAxis: {
            categories: categories
        },
        yAxis: [{
            title: {
                text: 'Revenue (Billion USD)'
            }
        }],
        legend: {
            align: 'center',
            verticalAlign: 'bottom'
        },
        tooltip: {
            shared: true
        },
        series: [
            {
                type: 'column',
                name: 'FY2021',
                data: data2021,
                color: '#2f7ed8'
            },
            {
                type: 'column',
                name: 'FY2022',
                data: data2022,
                color: '#8bbc21'
            },
            {
                type: 'column',
                name: 'FY2023',
                data: data2023,
                color: '#f28f43'
            },
            {
                type: 'line',
                name: 'Average',
                data: average,
                color: 'orange',
                marker: {
                    lineWidth: 2,
                    lineColor: 'orange',
                    fillColor: 'white'
                }
            }
        ]
    };

    if (showDonutChart) {
        chartOptions.series.push({
            type: 'pie',
            name: 'Total Revenue',
            data: [
                { name: 'FY2021', y: total2021, color: '#2f7ed8' },
                { name: 'FY2022', y: total2022, color: '#8bbc21' },
                { name: 'FY2023', y: total2023, color: '#f28f43' }
            ],
            center: ['90%', '20%'],
            size: 100,
            innerSize: '70%',
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y:.0f}B'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}B</b>'
            },
            showInLegend: false
        });
    }

    Highcharts.chart(chartOptions);
}
