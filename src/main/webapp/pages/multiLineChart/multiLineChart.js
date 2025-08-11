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
    Partial.appleData = App.Variables.stvAIDashData.dataSet.chartData.Apple.data.map(entry => {
        // const [year, month] = entry.timestamp.split("-").map(Number);
        return [
            // Date.UTC(year, month - 1, 1, 9, 30),
            entry.timestamp,
            entry.value
        ];
    });
    Partial.nasdaqData = App.Variables.stvAIDashData.dataSet.chartData.NASDAQ.data.map(entry => {
        // const [year, month] = entry.timestamp.split("-").map(Number);
        return [
            // Date.UTC(year, month - 1, 1, 9, 30),
            entry.timestamp,
            entry.value
        ];
    });
    Partial.dowData = App.Variables.stvAIDashData.dataSet.chartData['Dow Jones'].data.map(entry => {
        // const [year, month] = entry.timestamp.split("-").map(Number);
        return [
            // Date.UTC(year, month - 1, 1, 9, 30),
            entry.timestamp,
            entry.value
        ];
    });

    Partial.snpdata = App.Variables.stvAIDashData.dataSet.chartData['S&P 500'].data.map(entry => {
        // const [year, month] = entry.timestamp.split("-").map(Number);
        return [
            // Date.UTC(year, month - 1, 1, 9, 30),
            entry.timestamp,
            entry.value
        ];
    });
    Partial.raw = {
        "AAPL": Partial.appleData, "Dow Jones": Partial.dowData, "S&P 500": Partial.snpdata, "NASDAQ": Partial.nasdaqData
    }

    Partial.renderChart();
};

Partial.renderChart = function () {
    // 2. Convert ["YYYY-MM", price] to Series
    function toSeries(data) {
        return data
            .map(d => {
                const [y, m] = d[0].split('-').map(Number);
                return [Date.UTC(y, m - 1, 1), d[1]];
            })
            .filter(d => d[1] != null);
    }

    // 3. Convert price series to % change vs first point
    function withPercent(series) {
        const base = series[0][1];
        return series.map(([ts, val]) => [ts, ((val / base) - 1) * 100]);
    }

    // 4. Prepare Highcharts series data
    const hcSeries = Object.entries(Partial.raw).map(([name, data]) => ({
        name,
        data: withPercent(toSeries(data)),
        tooltip: { valueDecimals: 2, valueSuffix: '%' }
    }));

    // 5. Build Highcharts Stock chart
    Highcharts.stockChart('container', {
        chart: {
            zooming: {
                type: null,        // disables drag-to-zoom
                pinchType: null,   // disables pinch zoom on touch devices
                mouseWheel: {
                    enabled: false   // disables mouse wheel zoom
                }
            }
        },
        rangeSelector: {
            enabled: false
        },
        navigator: {
            enabled: false  // ❌ No bottom scroll mini-chart
        },
        scrollbar: {
            enabled: false  // ❌ No scroll bar either
        },
        title: {
            text: ''
        },
        yAxis: {
            labels: { format: '{value}%' }
        },
        tooltip: { shared: true },
        plotOptions: {
            series: {
                showInNavigator: true
            }
        },
        series: hcSeries
    });

    $(".highcharts-credits").css("display", "none");
    $(".highcharts-exporting-group").css("display", "none");
}
