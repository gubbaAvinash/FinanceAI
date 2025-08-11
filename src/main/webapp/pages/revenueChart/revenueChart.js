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

    // Month abbreviations
    const monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Convert names to 'Mon‑YY' format
    const formattedNames = App.Variables.stvAIDashData.dataSet.chartData.map(item => {
        const [day, month, year] = item.name.split("-");
        const mon = monthAbbr[parseInt(month) - 1];
        return `${mon}‑${year}`;
    });
    const revenues = App.Variables.stvAIDashData.dataSet.chartData.map(item => parseFloat(item.revenue));
    const stockPrices = App.Variables.stvAIDashData.dataSet.chartData.map(item => item.stockPrice);
    Highcharts.chart('apple-lastyear', {
        // chart: { zoomType: 'xy' },
        chart: {
            zooming: {
                type: null,        // disables drag-to-zoom
                pinchType: null,   // disables pinch zoom on touch devices
                mouseWheel: {
                    enabled: false   // disables mouse wheel zoom
                }
            }
        },
        title: { text: '' },
        subtitle: { text: '', align: 'right', verticalAlign: 'bottom' },
        xAxis: [{ categories: formattedNames, crosshair: true }],
        yAxis: [
            { // Primary: Stock Price
                title: { text: 'Stock Price (USD)' },
                labels: { format: '${value}' }
            },
            { // Secondary: Revenue
                title: { text: 'Revenue (Billion USD)' },
                labels: { format: '{value}B' },
                opposite: true
            }
        ],
        tooltip: { shared: true },
        legend: { layout: 'horizontal', align: 'left', verticalAlign: 'top', floating: true, backgroundColor: '#FFFFFF' },
        series: [
            {
                name: 'Revenue',
                type: 'column',
                yAxis: 1,
                data: revenues,
                tooltip: { valueSuffix: 'B' },
                color: '#7cb5ec'
            },
            {
                name: 'Stock Price',
                type: 'spline',
                data: stockPrices,
                tooltip: { valuePrefix: '$' },
                color: '#434348'
            }
        ]
    });

    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")
    $(".highcharts-legend-box").css("display", "none")
};
