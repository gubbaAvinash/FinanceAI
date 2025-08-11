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
    debugger;
    Highcharts.chart('container', {
        chart: {
            // zoomType: 'x',
            events: {
                load: function () {
                    // this.renderer.image(
                    //     'https://www.highcharts.com/samples/graphics/highcharts-gantt-logo.svg', // Replace or remove
                    //     30, 30, 100, 100
                    // ).add();
                }
            },
            zooming: {
                type: null,        // disables drag-to-zoom
                pinchType: null,   // disables pinch zoom on touch devices
                mouseWheel: {
                    enabled: false   // disables mouse wheel zoom
                }
            }
        },

        title: {
            text: ''
        },

        subtitle: {
            text: '',
            floating: true,
            align: 'left',
            verticalAlign: 'middle',
            x: "",
            y: "",
            useHTML: true,
            style: {
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#0071A7'
            }
        },

        xAxis: {
            type: 'datetime',
            plotBands: [{
                from: Date.UTC(2009, 0, 1),
                to: Date.UTC(2025, 12, 31),
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: App.Variables.stvAIDashData.dataSet.companyName,
                    style: { fontStyle: 'italic' }
                }
            }]
        },

        yAxis: [{
            title: {
                text: null
            }
        }, {
            opposite: true,
            title: {
                text: 'Apple Stock Price'
            },
            max: ""
        }],

        tooltip: {
            shared: true
        },

        series: [
            {
                name: 'COVID-19 Cases"',
                type: 'area',
                step: 'left',
                data: App.Variables.stvAIDashData.dataSet.chartData.find(item => item.name === "COVID-19 Cases").data,
                yAxis: 0,
                color: '#4472C4',
                fillOpacity: 0.5
            },
            {
                name: 'Apple Stock Price',
                type: 'line',
                data: App.Variables.stvAIDashData.dataSet.chartData.find(item => item.name === "Apple Stock Price").data,
                yAxis: 1,
                color: '#00A2E8',
                lineWidth: 2
            },
            // {
            //     type: 'flags',
            //     name: 'Cloud',
            //     shape: 'squarepin',
            //     y: -80,
            //     data: [
            //         {
            //             x: '2014-05-01',
            //             text: 'Highcharts Cloud Beta',
            //             title: 'Cloud',
            //             shape: 'squarepin',
            //         },
            //     ],
            //     showInLegend: false,
            // },
            // {
            //     type: 'flags',
            //     name: 'Highmaps',
            //     shape: 'squarepin',
            //     y: -55,
            //     data: [
            //         {
            //             x: '2014-06-13',
            //             text: 'Highmaps version 1.0 released',
            //             title: 'Maps',
            //         },
            //     ],
            //     showInLegend: false,
            // },
            // {
            //     type: 'flags',
            //     name: 'Gantt',
            //     shape: 'squarepin',
            //     y: -55,
            //     data: [
            //         {
            //             x: '2018-10-17',
            //             text: 'Highcharts Gantt version 1.0 released',
            //             title: 'Gantt',
            //         },
            //     ],
            //     showInLegend: false,
            // },
            // {
            //     type: 'flags',
            //     name: 'Highcharts',
            //     shape: 'circlepin',
            //     data: [
            //         {
            //             x: '2009-11-27',
            //             text: 'Highcharts version 1.0 released',
            //             title: '1.0',
            //         },
            //         {
            //             x: '2010-07-13',
            //             text: 'Ported from canvas to SVG rendering',
            //             title: '2.0',
            //         },
            //         {
            //             x: '2010-11-23',
            //             text: 'Dynamically resize and scale to text labels',
            //             title: '2.1',
            //         },
            //         {
            //             x: '2011-10-18',
            //             text: 'Highcharts Stock version 1.0 released',
            //             title: 'Stock',
            //             shape: 'squarepin',
            //         },
            //         {
            //             x: '2012-08-24',
            //             text: 'Gauges, polar charts and range series',
            //             title: '2.3',
            //         },
            //         {
            //             x: '2013-03-22',
            //             text: 'Multitouch support, more series types',
            //             title: '3.0',
            //         },
            //         {
            //             x: '2014-04-22',
            //             text: '3D charts, heatmaps',
            //             title: '4.0',
            //         },
            //         {
            //             x: '2016-09-29',
            //             text:
            //                 'Styled mode, responsive options, accessibility, ' + 'chart.update',
            //             title: '5.0',
            //         },
            //         {
            //             x: '2017-10-04',
            //             text: 'Annotations, Boost, Series labels, new series types',
            //             title: '6.0',
            //         },
            //         {
            //             x: '2018-12-11',
            //             text: 'Sonification, TypeScript (beta), new series types',
            //             title: '7.0',
            //         },
            //         {
            //             x: '2019-12-10',
            //             text: 'Accessibility, data sorting, marker clusters',
            //             title: '8.0',
            //         },
            //         {
            //             x: '2021-02-02',
            //             text:
            //                 'Improved security, accessibility options, zoom by ' +
            //                 'single touch',
            //             title: '9.0',
            //         },
            //         {
            //             x: '2022-03-07',
            //             text:
            //                 'Bread crumbs, improved Boost pixel ratio, ' +
            //                 'threshold alignment in charts with multiple axes',
            //             title: '10.0',
            //         },
            //         {
            //             x: '2023-04-27',
            //             text:
            //                 'Design upgrade, Faster codebase, Flow maps, ' +
            //                 'Pictorial charts, Treegraphs, Geographical heatmaps,' +
            //                 ' Audio charts',
            //             title: '11.0',
            //         },
            //     ],
            //     showInLegend: false,
            // },
            // {
            //     type: 'flags',
            //     name: 'Events',
            //     data: [
            //         {
            //             x: '2012-11-01',
            //             text:
            //                 'Highsoft won "Entrepeneur of the Year" in Sogn og ' +
            //                 'Fjordane, Norway',
            //             title: 'Award',
            //         },
            //         {
            //             x: '2012-12-25',
            //             text:
            //                 'Packt Publishing published <em>Learning ' +
            //                 'Highcharts by Example</em>. Since then, many other ' +
            //                 'books are written about Highcharts.',
            //             title: 'First book',
            //         },
            //         {
            //             x: '2013-05-25',
            //             text: 'Highsoft nominated Norway`s Startup of the Year',
            //             title: 'Award',
            //         },
            //         {
            //             x: '2014-05-25',
            //             text: 'Highsoft nominated Best Startup in Nordic Startup ' + 'Awards',
            //             title: 'Award',
            //         },
            //         {
            //             x: '2018-12-13',
            //             text: 'Highsoft nominated Best Startup in Nordic Startup ' + 'Awards',
            //             title: 'Award',
            //         },
            //         {
            //             x: '2017-10-20',
            //             text: 'Highsoft nominated Best Startup in Nordic Startup ' + 'Awards',
            //             title: 'Award',
            //         },
            //     ],
            //     onSeries: 'revenue',
            //     showInLegend: false,
            // }
        ]

    });

    $(".highcharts-credits").css("display", "none")
    $(".highcharts-legend-item").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")
};
