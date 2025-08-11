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



Partial.radioset1Change = function ($event, widget, newVal, oldVal) {
    const categories = Partial.Variables.getSectorperformance.dataSet.sectorPerformance.map(item => item.name);
    const data = Partial.Variables.getSectorperformance.dataSet.sectorPerformance.map(item => ({
        y: item.performance[newVal],
        name: item.name,
        indexSnapshot: item.indexSnapshot[newVal]
    }));

    Partial.sectorChart.update({
        xAxis: { categories },
        yAxis: {
            min: null, // Reset min
            max: null, // Reset max
        },
        series: [{
            name: '',
            data: data
        }]
    });
    $(".highcharts-legend-item").css("display", "none")
};

Partial.getSectorperformanceonSuccess = function (variable, data) {
    if (data && data.sectorPerformance) {
        Partial.sectorChart = Highcharts.chart('sectorPerformance', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: Partial.Variables.getSectorperformance.dataSet.sectorPerformance.map(item => item.name),
                crosshair: true
            },
            yAxis: {
                min: -2,
                max: 15,
                title: {
                    text: null
                },
                labels: {
                    format: '{value}%'
                }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    const change = this.y;
                    const color = change >= 0 ? 'green' : 'red';
                    const value = this.point.value; // custom value

                    return `
                <div style="padding: 8px; font-size: 14px;">
                    <b>${this.point.name}</b><br/>
                    ${this.point.sector}<br/>
                    Change: <span style="color:${color}; font-weight:bold;">${change > 0 ? '+' : ''}${change.toFixed(2)}%</span><br/>
                    Value: <b>$${this.point.indexSnapshot}</b>
                </div>
            `;
                }
            },
            plotOptions: {
                column: {
                    zones: [{
                        value: 0,    // Below 0 = red
                        color: '#dc3545'
                    }, {
                        color: '#28a745'  // 0 and above = green
                    }],
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: '',
                data: Partial.Variables.getSectorperformance.dataSet.sectorPerformance.map(item => ({
                    y: item.performance.yearToDate,
                    name: item.name,
                    sector: item.sector,
                    indexSnapshot: item.indexSnapshot.yearToDate
                }))
            }]
        });

    }

    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")

    const wrapper = document.getElementById('containerSector');

    const observer = new ResizeObserver(() => {
        Partial.sectorChart.reflow();
    });

    observer.observe(wrapper);

};
Partial.fullScreenButtonClick = function ($event, widget) {
    Partial.sectorChart.fullscreen.toggle();
    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")

};
Partial.closeButtonClick = function ($event, widget) {

};
