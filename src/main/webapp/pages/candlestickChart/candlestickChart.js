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


    const converted = App.Variables.stvAIDashData.dataSet.candlestickChart.data.map(entry => {
        const [year, month] = entry.date.split("-").map(Number);
        return [
            Date.UTC(year, month - 1, 1, 9, 30),
            entry.open,
            entry.high,
            entry.low,
            entry.close
        ];
    });

    Partial.test = Highcharts.stockChart('vwapChart', {
        navigator: {
            enabled: false
        },
        scrollbar: {
            enabled: false
        },
        chart: {
            // zoomType: '',
            panning: false,
            zooming: {
                type: null,        // disables drag-to-zoom
                pinchType: null,   // disables pinch zoom on touch devices
                mouseWheel: {
                    enabled: false   // disables mouse wheel zoom
                }
            }
        },
        title: {
            text: ""
        },
        rangeSelector: {
            selected: 1,
            enabled: false
        },
        yAxis: [{
            title: {
                text: 'Price'
            }
        }],
        tooltip: {
            split: true
        },
        plotOptions: {
            candlestick: {
                color: 'red',
                upColor: 'green',
                lineColor: 'red',
                upLineColor: 'green'
            }
        },
        series: [
            {
                type: 'candlestick',
                name: 'BAC Price',
                id: 'bacPrice',
                data: converted
            },
            {
                type: 'column',
                name: 'Volume',
                id: 'volume',
                data: [
                    [Date.UTC(2025, 6, 21, 9, 30), 1200],
                    [Date.UTC(2025, 6, 21, 9, 35), 1600],
                    [Date.UTC(2025, 6, 21, 9, 40), 1500],
                    [Date.UTC(2025, 6, 21, 9, 45), 1700],
                    [Date.UTC(2025, 6, 21, 9, 50), 1400],
                    [Date.UTC(2025, 6, 21, 9, 55), 1550],
                    [Date.UTC(2025, 6, 21, 10, 0), 1800],
                    [Date.UTC(2025, 6, 21, 10, 5), 2000],
                    [Date.UTC(2025, 6, 21, 10, 10), 2200],
                    [Date.UTC(2025, 6, 21, 10, 15), 1900],
                    [Date.UTC(2025, 6, 21, 10, 20), 1750],
                    [Date.UTC(2025, 6, 21, 10, 25), 1600],
                    [Date.UTC(2025, 6, 21, 10, 30), 1500],
                    [Date.UTC(2025, 6, 21, 10, 35), 1700],
                    [Date.UTC(2025, 6, 21, 10, 40), 1600],
                    [Date.UTC(2025, 6, 21, 10, 45), 1650],
                    [Date.UTC(2025, 6, 21, 10, 50), 1800],
                    [Date.UTC(2025, 6, 21, 10, 55), 2000]
                ],
                visible: false,
                showInLegend: false
            },
            {
                type: 'vwap',
                linkedTo: 'bacPrice',
                params: {
                    volumeSeriesID: 'volume'
                },
                color: 'blue',
                name: 'VWAP',
                visible: false,
                "id": "vwapLine"
            },
            {
                type: 'ema',
                linkedTo: 'bacPrice',
                params: {
                    period: 5   // You can adjust this
                },
                color: 'orange',
                name: 'EMA (5)',
                visible: false,
                "id": "emaLine"
            }
        ]
    });

    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")
};

Partial.toggle3Change = function ($event, widget, newVal, oldVal) {

    var series = Partial.test.get('vwapLine');
    series.setVisible(!series.visible, newVal);
    Partial.test.redraw();
};

Partial.toggle4Change = function ($event, widget, newVal, oldVal) {
    var series = Partial.test.get('emaLine');
    series.setVisible(!series.visible, !newVal);
    Partial.test.redraw();
};
