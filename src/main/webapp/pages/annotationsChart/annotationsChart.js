/*
 * Use App.getDependency for Dependency Injection
 * eg: var DialogService = App.getDependency('DialogService');
 */

/* perform any action on widgets/variables within this block */
Partial.onReady = function () {
    Partial.mapData = App.Variables.stvAIDashData.dataSet.chartData.data.map(entry => {
        return [
            entry.timestamp,
            entry.value
        ];
    });
    Partial.prepareAnnotations();
};

Partial.prepareAnnotations = function () {
    const data = Partial.mapData;
    Highcharts.stockChart('container', {
        chart: {
            type: 'area',
            zooming: {
                type: null,        // disables drag-to-zoom
                pinchType: null,   // disables pinch zoom on touch devices
                mouseWheel: {
                    enabled: false   // disables mouse wheel zoom
                }
            }
        },
        navigator: {
            enabled: false  // Remove the bottom mini-chart navigator :contentReference[oaicite:2]{index=2}
        },
        scrollbar: {
            enabled: false  // Remove scroll bar :contentReference[oaicite:3]{index=3}
        },
        title: { text: '' },
        xAxis: { type: 'datetime' },
        yAxis: {
            title: { text: 'Price (USD)' },
            zoomEnabled: false  // Prevent zoom per axis :contentReference[oaicite:4]{index=4}
        },
        tooltip: { shared: true, valuePrefix: '$', valueDecimals: 2 },
        plotOptions: {
            area: {
                marker: { enabled: false },
                threshold: null,
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#00a94f'],                     // Deep purple at top
                        [1, Highcharts.color('#00a94f').setOpacity(0).get('rgba')]  // Transparent at bottom
                    ]
                },
                lineWidth: 2
            }
        },

        series: [{ name: 'TSLA', data, color: '#00a94f' }],
        annotations: [{
            labels: [
                { point: { xAxis: 0, yAxis: 0, x: Date.UTC(2019, 2, 15), y: 40 }, text: 'Tesla Model Y announced' },
                { point: { xAxis: 0, yAxis: 0, x: Date.UTC(2020, 7, 1), y: 130 }, text: '5‑for‑1 stock split (Aug 2020)' },
                { point: { xAxis: 0, yAxis: 0, x: Date.UTC(2020, 11, 21), y: 150 }, text: 'S&P 500 inclusion (Dec 2020)' },
                { point: { xAxis: 0, yAxis: 0, x: Date.UTC(2021, 0, 1), y: 259.0 }, text: 'Record delivery Q4 2020' },
                { point: { xAxis: 0, yAxis: 0, x: Date.UTC(2021, 9, 1), y: 200 }, text: 'Cybertruck reveal (Nov 2021)' },
                { point: { xAxis: 0, yAxis: 0, x: Date.UTC(2022, 2, 1), y: 123.18 }, text: 'Gigafactory Berlin online (Mar 2022)' },
                { point: { xAxis: 0, yAxis: 0, x: Date.UTC(2023, 8, 1), y: 260 }, text: 'Cybertruck deliveries begin (Sep 2023)' },
                { point: { xAxis: 0, yAxis: 0, x: Date.UTC(2025, 1, 15), y: 305.3 }, text: '“Tesla Takedown” protests start (Feb 2025)' }

            ]
        }]
    });

    $(".highcharts-credits").css("display", "none");
    $(".highcharts-exporting-group").css("display", "none");
    $(".highcharts-input-group").css("display", "none");
    $(".highcharts-range-selector-group").css("display", "none");
}
