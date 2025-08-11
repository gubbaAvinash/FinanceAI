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
};

Partial.svHeatMaponSuccess = function (variable, data) {
    Partial.chartData = data;
    Partial.renderHeatMap();
};

Partial.renderHeatMap = function () {

    Partial.heatChart = Highcharts.chart('containerHeatMap', {
        chart: { backgroundColor: '#ffffff' },
        title: { text: '', style: { color: '#333' } },
        colorAxis: {
            minColor: '#c97c7c',  // Soft Crimson — conveys caution or lower values
            maxColor: '#4f9d8d',  // Deep Teal — suggests growth, stability




            labels: { style: { color: '#333' } }
        },
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            data: Partial.chartData,
            dataLabels: {
                enabled: true,
                style: { color: 'contrast', textOutline: 'none' },
                formatter: function () {
                    return this.point.name + '<br>' +
                        (this.point.colorValue >= 0 ? '+' : '') +
                        Highcharts.numberFormat(this.point.colorValue, 2) + '%';
                }
            },
            levels: [{
                level: 1,
                dataLabels: { enabled: true },
                borderWidth: 3
            }],
            allowTraversingTree: false
        }],
        legend: { enabled: false }
    });
    // Highcharts.chart('container', {
    //     chart: { backgroundColor: '#1c1c1e' },
    //     title: { text: 'Market Heatmap', style: { color: '#fff' } },
    //     colorAxis: {
    //         minColor: '#8b0000',
    //         maxColor: '#006400',
    //         labels: { style: { color: '#fff' } }
    //     },
    //     series: [{
    //         type: 'treemap',
    //         layoutAlgorithm: 'squarified',
    //         data: Partial.chartData,
    //         dataLabels: {
    //             enabled: true,
    //             style: { color: '#fff', textOutline: false },
    //             formatter: function () {
    //                 return this.point.name + '<br>' + (this.point.colorValue >= 0 ? '+' : '') +
    //                     Highcharts.numberFormat(this.point.colorValue, 2) + '%';
    //             }
    //         },
    //         levels: [{
    //             level: 1,
    //             dataLabels: { enabled: true },
    //             borderWidth: 3
    //         }],
    //         allowTraversingTree: false
    //     }],
    //     legend: { enabled: false }
    // });
    $(".highcharts-credits").css("display", "none");
    $(".highcharts-contextbutton").css("display", "none");

    const wrapper = document.getElementById('containerSector');

    const observer = new ResizeObserver(() => {
        Partial.heatChart.reflow();
    });

    observer.observe(wrapper);

}
Partial.fullScreenButtonClick = function ($event, widget) {
    Partial.heatChart.fullscreen.toggle();
    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")
};
