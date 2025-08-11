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
    Partial.renderChart();
};

Partial.renderChart = function () {

    const data = [
        { date: '2025‑06‑23', spy: 600.15, dex: -0.2, avg5: 0.1 },
        { date: '2025‑06‑24', spy: 606.78, dex: 0.1, avg5: 0.2 },
        { date: '2025‑06‑25', spy: 607.12, dex: -0.4, avg5: 0.0 },
        { date: '2025‑06‑26', spy: 611.87, dex: 0.6, avg5: 0.1 },
        { date: '2025‑06‑27', spy: 614.91, dex: 0.9, avg5: 0.3 },
        { date: '2025‑06‑30', spy: 617.85, dex: 1.2, avg5: 0.5 },
        { date: '2025‑07‑01', spy: 617.65, dex: 0.5, avg5: 0.6 },
        { date: '2025‑07‑02', spy: 620.45, dex: -0.1, avg5: 0.4 },
        { date: '2025‑07‑03', spy: 625.34, dex: 0.8, avg5: 0.5 },
        { date: '2025‑07‑07', spy: 620.68, dex: -1.3, avg5: 0.0 },
        { date: '2025‑07‑08', spy: 620.34, dex: -0.7, avg5: -0.2 },
        { date: '2025‑07‑09', spy: 624.06, dex: 0.2, avg5: 0.1 },
        { date: '2025‑07‑10', spy: 625.82, dex: 1.0, avg5: 0.6 },
        { date: '2025‑07‑11', spy: 623.62, dex: -0.5, avg5: 0.3 },
        { date: '2025‑07‑14', spy: 624.81, dex: -0.2, avg5: 0.1 },
        { date: '2025‑07‑15', spy: 622.14, dex: -1.0, avg5: -0.4 },
        { date: '2025‑07‑16', spy: 624.22, dex: 0.4, avg5: 0.2 },
        { date: '2025‑07‑17', spy: 628.04, dex: 0.7, avg5: 0.3 },
        { date: '2025‑07‑18', spy: 627.58, dex: 0.3, avg5: 0.4 },
        { date: '2025‑07‑21', spy: 628.77, dex: -0.4, avg5: 0.1 },
        { date: '2025‑07‑22', spy: 628.86, dex: 0.2, avg5: 0.2 },
        { date: '2025‑07‑23', spy: 634.21, dex: 1.1, avg5: 0.7 },
        { date: '2025‑07‑24', spy: 634.42, dex: 0.5, avg5: 0.6 },
        { date: '2025‑07‑25', spy: 637.10, dex: 0.8, avg5: 0.65 },
        { date: '2025‑07‑28', spy: 636.94, dex: -0.2, avg5: 0.5 },
        { date: '2025‑07‑29', spy: 635.26, dex: -1.0, avg5: 0.3 },
        { date: '2025‑07‑30', spy: 634.46, dex: 1.1, avg5: 0.4 },
        { date: '2025‑07‑31', spy: 634.00, dex: 0.9, avg5: 0.6 }
    ];

    const timeParse = d => Date.parse(d.replace(/‑/g, '-'));
    const seriesDex = data.map(r => [timeParse(r.date), r.dex]);
    const seriesAvg = data.map(r => [timeParse(r.date), r.avg5]);
    const seriesSpy = data.map(r => [timeParse(r.date), r.spy]);

    Highcharts.chart('container', {
        chart: { zoomType: 'x', backgroundColor: '#ffffff' },
        title: { text: 'Market DEX', style: { color: '#333' } },
        xAxis: {
            type: 'datetime',
            labels: { style: { color: '#333' } }
        },
        yAxis: [{
            title: { text: 'SPY Stock Price', style: { color: '#F7C42C' } },
            opposite: false,
            labels: { style: { color: '#F7C42C' } }
        }, {
            title: { text: 'Deltas (Billions)', style: { color: '#555' } },
            opposite: true,
            labels: { style: { color: '#555' } }
        }],
        tooltip: { shared: true, valueDecimals: 2 },
        plotOptions: {
            column: { grouping: false },
            series: { animation: false }
        },
        series: [
            {
                name: 'DEX',
                type: 'column',
                yAxis: 1,
                data: seriesDex,
                color: '#00a65a',
                negativeColor: '#dd4b39'
            },
            {
                name: 'DEX Moving Average 5D',
                type: 'column',
                yAxis: 1,
                data: seriesAvg,
                color: '#7f8c8d'
            },
            {
                name: 'SPY Price',
                type: 'spline',
                yAxis: 0,
                data: seriesSpy,
                color: '#F7C42C',
                tooltip: { valuePrefix: '$' },
                marker: { enabled: false },
                lineWidth: 2
            }
        ],
        legend: {
            itemStyle: { color: '#333' },
            itemHoverStyle: { color: '#000' }
        }
    });

    // Highcharts.chart('container', {
    //     chart: { zoomType: 'x', backgroundColor: '#1c1c1e' },
    //     title: { text: 'Market DEX', style: { color: '#fff' } },
    //     xAxis: {
    //         type: 'datetime',
    //         labels: { style: { color: '#fff' } }
    //     },
    //     yAxis: [{
    //         title: { text: 'SPY Stock Price', style: { color: '#F7C42C' } },
    //         opposite: false,
    //         labels: { style: { color: '#F7C42C' } }
    //     }, {
    //         title: { text: 'Deltas (Billions)', style: { color: '#aaa' } },
    //         opposite: true,
    //         labels: { style: { color: '#aaa' } }
    //     }],
    //     tooltip: { shared: true, valueDecimals: 2 },
    //     plotOptions: {
    //         column: { grouping: false },
    //         series: { animation: false }
    //     },
    //     series: [
    //         {
    //             name: 'DEX',
    //             type: 'column',
    //             yAxis: 1,
    //             data: seriesDex,
    //             color: '#00a65a',
    //             negativeColor: '#dd4b39'
    //         },
    //         {
    //             name: 'DEX Moving Average 5D',
    //             type: 'column',
    //             yAxis: 1,
    //             data: seriesAvg,
    //             color: '#7f8c8d'
    //         },
    //         {
    //             name: 'SPY Price',
    //             type: 'spline',
    //             yAxis: 0,
    //             data: seriesSpy,
    //             color: '#F7C42C',
    //             tooltip: { valuePrefix: '$' },
    //             marker: { enabled: false },
    //             lineWidth: 2
    //         }
    //     ],
    //     legend: {
    //         itemStyle: { color: '#fff' },
    //         itemHoverStyle: { color: '#ddd' }
    //     }
    // });
    $(".highcharts-credits").css("display", "none");
    $(".highcharts-contextbutton").css("display", "none");
    $(".highcharts-legend-item").css("display", "none");


}
