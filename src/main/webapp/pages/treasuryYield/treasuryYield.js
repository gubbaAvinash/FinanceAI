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


}

Partial.getTreasuryInfoonSuccess = function (variable, data) {
    if (data && data.yieldCurve) {
        Partial.yieldChart = Highcharts.chart('yieldCurve', {
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: Partial.Variables.getTreasuryInfo.dataSet.yieldCurve.map(item => item.maturity),
                title: { text: null }
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    format: '{value:.1f}%'
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: true,
                        radius: 4
                    },
                    lineWidth: 3
                }
            },
            series: [{
                name: 'Yield',
                data: Partial.Variables.getTreasuryInfo.dataSet.yieldCurve.map(item => item.yield), // Sample values
                color: '#e74c3c' // Red line
            }]
        });

        $(".highcharts-credits").css("display", "none")
        $(".highcharts-contextbutton").css("display", "none")

        const wrapper = document.getElementById('containerSector');

        const observer = new ResizeObserver(() => {
            Partial.yieldChart.reflow();
        });

        observer.observe(wrapper);
    }
};
Partial.fullScreenButtonClick = function ($event, widget) {
    Partial.yieldChart.fullscreen.toggle();
    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")
};
