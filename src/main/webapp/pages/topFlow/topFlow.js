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
    Partial.Variables.topGainersLosersVar.invoke();

}

Partial.radioset1Change = function ($event, widget, newVal, oldVal) {
    updateChart(newVal);
};
Partial.topGainersLosersVaronSuccess = function (variable, data) {

    const categories = data.map(item => item.scriptName);
    Partial.dailyData = data.map(item => parseFloat(item.dailyChange));
    Partial.weeklyData = data.map(item => parseFloat(item.weeklyChange));

    Partial.topChart = Highcharts.chart('containerTopFlow', {
        chart: {
            type: 'bar',
            backgroundColor: '#ffffff'
        },
        title: {
            text: '',
            style: {
                color: '#000000'
            }
        },
        xAxis: {
            categories: categories,
            reversed: true,
            labels: {
                style: {
                    color: '#000000'
                }
            }
        },
        yAxis: {
            title: {
                text: 'Net Premiums (Millions)',
                style: { color: '#000000' }
            },
            labels: {
                style: {
                    color: '#000000'
                }
            },
            formatter: function () {
                return this.value + '%';  // 👈 Add '%' on Y axis
            },
            gridLineColor: '#e0e0e0'
        },
        legend: { enabled: false },
        plotOptions: {
            series: {
                colorByPoint: false
            }
        },
        series: [{
            name: 'Net Premiums',
            data: Partial.dailyData.map(val => ({
                y: val,
                color: val >= 0 ? '#00ff88' : '#ff4d4d'
            }))
        }],
        credits: { enabled: false }
    }); const wrapper = document.getElementById('containerSector');

    const observer = new ResizeObserver(() => {
        Partial.topChart.reflow();
    });

    observer.observe(wrapper);
    $(".highcharts-contextbutton").css("display", "none")



};

function updateChart(data) {
    Partial.topChart.series[0].setData(
        Partial[data].map(val => ({
            y: val,
            color: val >= 0 ? '#00ff88' : '#ff4d4d'
        }))
    );
}
Partial.fullScreenButtonClick = function ($event, widget) {
    Partial.topChart.fullscreen.toggle();
    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")
};
