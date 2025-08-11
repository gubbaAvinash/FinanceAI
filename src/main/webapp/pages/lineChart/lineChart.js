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
    // Build flat [timestamp, close] array
    const allData = [];

    // Handle daily/monthly data with "date"
    ["1Month", "3Month", "6Month", "YTD", "1Year", "3Year"].forEach(range => {
        App.Variables.stvAIDashData.dataSet.chartData[range].forEach(d => {
            allData.push([dateToUTC(d.date), d.close]);
        });
    });

    // Handle yearly data with "year"
    ["5Year", "10Year"].forEach(range => {
        App.Variables.stvAIDashData.dataSet.chartData[range].forEach(d => {
            allData.push([Date.UTC(parseInt(d.year), 0, 1), d.averageClose]);
        });
    });

    // Sort by timestamp
    allData.sort((a, b) => a[0] - b[0]);

    Highcharts.setOptions({
        lang: {
            rangeSelectorZoom: ''
        }
    });

    Highcharts.stockChart('lineChartContainer', {
        navigator: {
            enabled: false
        },
        chart: {
            zooming: {
                type: null,        // disables drag-to-zoom
                pinchType: null,   // disables pinch zoom on touch devices
                mouseWheel: {
                    enabled: false   // disables mouse wheel zoom
                }
            }
        },
        scrollbar: {
            enabled: false
        },
        rangeSelector: {
            selected: 'all',
            buttonPosition: {
                align: 'right'
            },
            buttons: [{
                type: 'month',
                count: 1,
                text: '1M'
            }, {
                type: 'month',
                count: 6,
                text: '6M'
            }, {
                type: 'ytd',
                text: 'YTD'
            }, {
                type: 'year',
                count: 1,
                text: '1Y'
            }, {
                type: 'year',
                count: 3,
                text: '3Y'
            }, {
                type: 'year',
                count: 5,
                text: '5Y'
            }, {
                type: 'all',
                text: 'MAX'
            }]
        }, buttonPosition: {
            align: 'right'
        },


        title: {
            text: ""
        },

        yAxis: {
            title: {
                text: 'Price'
            },
            min: "",
            max: ""
        },
        xAxis: {
            min: null,  // or set explicitly
            max: null,
            minRange: null, // no forced zoom range
            scrollbar: {
                enabled: false
            }
        },
        tooltip: {
            shared: true,
            useHTML: true,
            formatter: function () {
                return `
                <b>${Highcharts.dateFormat('%A, %b %e, %Y', this.x)}</b><br/>
                <span style="color:#00a65a;">Price:</span> <b>₹${this.y.toFixed(2)}</b><br/>
            `;
            }
        },

        series: [{
            name: Partial.Variables.staticVariable1.dataSet.companyName,
            type: 'area',
            data: allData,
            fillColor: {
                linearGradient: [0, 0, 0, 200],
                stops: [
                    [0, 'rgba(0, 169, 79, 0.3)'],  // Light green at top
                    [1, 'rgba(0, 169, 79, 0)']    // Transparent at bottom
                ]
            }
        }],

        plotOptions: {
            area: {
                marker: {
                    radius: 4,
                    symbol: 'circle',
                    fillColor: '#00a94f'
                },
                lineColor: '#00a94f',
                lineWidth: 2,
                fillColor: {
                    linearGradient: [0, 0, 0, 200],
                    stops: [
                        [0, 'rgba(0, 169, 79, 0.3)'],  // Light green at top
                        [1, 'rgba(0, 169, 79, 0)']    // Transparent at bottom
                    ]
                }
            }
        }, lang: {
            rangeSelectorZoom: ''
        },
        rangeSelector: {
            inputEnabled: false
        },
        xAxis: {
            labels: {
                enabled: true
            }
        }
    });

    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")
};

function dateToUTC(dateStr) {
    const parts = dateStr.split("-");
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parts.length > 2 ? parseInt(parts[2]) : 1;
    return Date.UTC(year, month, day);
}
