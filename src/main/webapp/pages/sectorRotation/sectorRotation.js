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


    Partial.Variables.sectorRotation.invoke();

};

Partial.sectorRotationonSuccess = function (variable, data) {

    const categories = Object.keys(data[0].change).sort();

    const formattedCategories = categories.map(date => {
        const [month, day] = date.split('-').slice(0, 2);
        return `${month}-${day}`;
    });

    const baseColors = Highcharts.getOptions().colors;
    const chartData = data.map((sector, index) => {
        const data = categories.map(date => sector.change[date] ?? 0);
        return {
            name: sector.name,
            data,
            color: baseColors[index % baseColors.length]
        };
    });

    // Dummy filler for missing values
    function getEstimatedValue() {
        return 0; // Or interpolate if needed
    }

    Partial.rotationChart = Highcharts.chart('containerSectorRoatation', {
        chart: {
            backgroundColor: '#ffffff',
            type: 'line'
        },
        title: {
            text: "",
            style: {
                color: '#000000'
            }
        },
        xAxis: {
            categories: formattedCategories,
            labels: { style: { color: '#000000' }, rotation: -45 },
            gridLineColor: '#e0e0e0',
            title: { text: 'Date', style: { color: '#000000' } }
        },
        yAxis: {
            title: {
                text: 'Cumulative Net Prems',
                style: { color: '#000000' }
            },
            labels: {
                style: { color: '#000000' },
                gridLineColor: '#e0e0e0'
            }
        },
        legend: {
            itemStyle: {
                color: '#000000'
            },
            itemHoverStyle: {
                color: '#555555'
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    radius: 4, // optional: adjust size
                    symbol: 'circle' // optional: shape
                }
            }
        },
        series: chartData.map(d => ({ ...d })),
        credits: { enabled: false }
    });

    // Dynamically create checkboxes
    const filterContainer = document.getElementById('sector-filters');
    chartData.forEach((sector, i) => {
        const label = document.createElement('label');
        label.innerHTML = `
    <input type="checkbox" data-index="${i}" checked> 
    <span style="background:${sector.color};width:12px;height:12px;display:inline-block;border-radius:2px;"></span> 
    ${sector.name}
  `;
        filterContainer.appendChild(label);
    });

    // Checkbox logic
    filterContainer.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const index = +e.target.dataset.index;
            Partial.rotationChart.series[index].setVisible(e.target.checked, false);
            Partial.rotationChart.redraw();
        }
    });

    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")

    const wrapper = document.getElementById('containerSector');

    const observer = new ResizeObserver(() => {
        Partial.rotationChart.reflow();
    });

    observer.observe(wrapper);

};
Partial.fullScreenButtonClick = function ($event, widget) {
    Partial.rotationChart.fullscreen.toggle();
    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")
};
