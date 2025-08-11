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

    const trades = [
        { x: 0, y: 34, z: 60, symbol: 'SPX', direction: 'CALL', strike: 6400, expiry: '9/19/2025', bidask: 210.00 },
        { x: 1, y: 24, z: 25, symbol: 'SPX', direction: 'CALL', strike: 6350, expiry: '10/18/2025', bidask: 180.00 },
        { x: 2, y: 19, z: 20, symbol: 'TSM', direction: 'PUT', strike: 110, expiry: '8/16/2025', bidask: 6.00 },
        { x: 3, y: 17, z: 18, symbol: 'SPX', direction: 'CALL', strike: 6300, expiry: '11/15/2025', bidask: 165.00 },
        { x: 4, y: 13, z: 30, symbol: 'PLTR', direction: 'PUT', strike: 20, expiry: '7/31/2025', bidask: 3.00 },
        { x: 5, y: 12, z: 12, symbol: 'SPY', direction: 'PUT', strike: 520, expiry: '8/2/2025', bidask: 7.00 },
        { x: 6, y: 6, z: 10, symbol: 'COIN', direction: 'CALL', strike: 250, expiry: '8/16/2025', bidask: 12.00 },
        { x: 7, y: 5, z: 14, symbol: 'TSLA', direction: 'CALL', strike: 800, expiry: '9/20/2025', bidask: 19.00 },
        { x: 8, y: 4.5, z: 16, symbol: 'ADBE', direction: 'PUT', strike: 580, expiry: '10/18/2025', bidask: 8.50 },
        { x: 9, y: 4, z: 13, symbol: 'COIN', direction: 'CALL', strike: 260, expiry: '8/30/2025', bidask: 13.00 },
        { x: 10, y: 3.8, z: 15, symbol: 'MSTR', direction: 'PUT', strike: 1400, expiry: '8/9/2025', bidask: 100.00 },
        { x: 11, y: 3.5, z: 11, symbol: 'VIX', direction: 'CALL', strike: 15, expiry: '9/6/2025', bidask: 1.50 },
        { x: 12, y: 3.2, z: 8, symbol: 'IWM', direction: 'PUT', strike: 190, expiry: '10/4/2025', bidask: 5.00 }
    ]

    // Map direction to color
    const directionColors = {
        'CALL': '#42f57b', // neon green
        'PUT': '#ff4d4d'   // bright red
    };

    // Add color dynamically
    const bubbleData = trades.map(trade => ({
        ...trade,
        color: directionColors[trade.direction.toUpperCase()]
    }));

    Highcharts.chart('container', {
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            backgroundColor: '#ffffff', // Light background
        },
        title: {
            text: '',
            style: { color: '#000000' }
        },
        xAxis: {
            categories: trades.map(t => t.symbol),
            labels: { style: { color: '#000000' } }
        },
        yAxis: {
            title: {
                text: 'Premiums (M)',
                style: { color: '#000000' }
            },
            labels: { style: { color: '#000000' } }
        },
        tooltip: {
            useHTML: true,
            backgroundColor: '#ffffff',
            borderColor: '#ccc',
            style: { color: '#000000' },
            formatter: function () {
                return `
        <span style="color:${this.point.color}">\u25A0</span> 
        <b>${this.point.symbol} ${this.point.direction}</b><br/>
        @ ${this.point.strike}, ${this.point.expiry}<br/>
        Bid/Ask: $${this.point.bidask}
      `;
            }
        },
        plotOptions: {
            bubble: {
                minSize: 10,
                maxSize: 60
            },
            series: {
                marker: {
                    fillOpacity: 1,  // <-- fully opaque bubbles
                    states: {
                        hover: {
                            radiusPlus: -10
                        }
                    }
                }
            }
        },
        series: [{
            data: bubbleData
        }],
        credits: { enabled: false }
    });

    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")

}
