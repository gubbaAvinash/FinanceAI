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
    Partial.generateBarRace();
};


Partial.generateBarRace = function () {

    const startYear = 2000,
        endYear = 2025,
        btn = document.getElementById('play-pause-button'),
        input = document.getElementById('play-range'),
        nbr = 25;

    let dataset, chart;


    /*
     * Animate dataLabels functionality
     */
    (function (H) {
        const FLOAT = /^-?\d+\.?\d*$/;

        // Add animated textSetter, just like fill/strokeSetters
        H.Fx.prototype.textSetter = function () {
            const chart = H.charts[this.elem.renderer.chartIndex];

            let thousandsSep = chart.numberFormatter('1000.0')[1];

            if (/[0-9]/.test(thousandsSep)) {
                thousandsSep = ' ';
            }

            const replaceRegEx = new RegExp(thousandsSep, 'g');

            let startValue = this.start.replace(replaceRegEx, ''),
                endValue = this.end.replace(replaceRegEx, ''),
                currentValue = this.end.replace(replaceRegEx, '');

            if ((startValue || '').match(FLOAT)) {
                startValue = parseInt(startValue, 10);
                endValue = parseInt(endValue, 10);

                // No support for float
                currentValue = chart.numberFormatter(
                    Math.round(startValue + (endValue - startValue) * this.pos),
                    0
                );
            }

            this.elem.endText = this.end;

            this.elem.attr(this.prop, currentValue, null, true);
        };

        // Add textGetter, not supported at all at this moment:
        H.SVGElement.prototype.textGetter = function () {
            const ct = this.text.element.textContent || '';
            return this.endText ? this.endText : ct.substring(0, ct.length / 2);
        };

        // Temporary change label.attr() with label.animate():
        // In core it's simple change attr(...) => animate(...) for text prop
        H.wrap(H.Series.prototype, 'drawDataLabels', function (proceed) {
            const attr = H.SVGElement.prototype.attr,
                chart = this.chart;

            if (chart.sequenceTimer) {
                this.points.forEach(point =>
                    (point.dataLabels || []).forEach(
                        label =>
                        (label.attr = function (hash) {
                            if (
                                hash &&
                                hash.text !== undefined &&
                                chart.isResizing === 0
                            ) {
                                const text = hash.text;

                                delete hash.text;

                                return this
                                    .attr(hash)
                                    .animate({ text });
                            }
                            return attr.apply(this, arguments);

                        })
                    )
                );
            }

            const ret = proceed.apply(
                this,
                Array.prototype.slice.call(arguments, 1)
            );

            this.points.forEach(p =>
                (p.dataLabels || []).forEach(d => (d.attr = attr))
            );

            return ret;
        });
    }(Highcharts));


    function getData(year) {
        const output = Object.entries(dataset)
            .map(country => {
                const [countryName, countryData] = country;
                return [countryName, Number(countryData[year])];
            })
            .sort((a, b) => b[1] - a[1]);
        return [output[0], output.slice(1, nbr)];
    }

    function getSubtitle() {
        const population = (getData(input.value)[0][1] / 1000000000).toFixed(2);
        return `<span style="font-size: 80px">${input.value}</span>`
        // <br>
        // <span style="font-size: 22px">
        //     Total: <b>: ${population}</b> billion
        // </span>;
    }

    (async () => {

        dataset = {
            "NVIDIA": {
                "2000": "57.8",
                "2001": "60.6",
                "2002": "67.8",
                "2003": "69.8",
                "2004": "74.7",
                "2005": "84.3",
                "2006": "88.4",
                "2007": "86.4",
                "2008": "92.4",
                "2009": "97.6",
                "2010": "104.1",
                "2011": "112.7",
                "2012": "113.6",
                "2013": "117.4",
                "2014": "129.2",
                "2015": "132.9",
                "2016": "137.3",
                "2017": "137.4",
                "2018": "145.9",
                "2019": "146.2",
                "2020": "154.2",
                "2021": "158.0",
                "2022": "165.9",
                "2023": "168.7",
                "2024": "176.7",
                "2025": "178.7",
                "Script Code": "NVDA"
            },
            "Microsoft": {
                "2000": "57.8",
                "2001": "55.9",
                "2002": "67.4",
                "2003": "67.6",
                "2004": "79.5",
                "2005": "84.2",
                "2006": "84.8",
                "2007": "85.2",
                "2008": "96.9",
                "2009": "99.4",
                "2010": "108.9",
                "2011": "108.7",
                "2012": "118.9",
                "2013": "122.5",
                "2014": "124.2",
                "2015": "128.9",
                "2016": "133.9",
                "2017": "140.5",
                "2018": "141.1",
                "2019": "153.2",
                "2020": "159.0",
                "2021": "161.8",
                "2022": "161.4",
                "2023": "169.0",
                "2024": "179.7",
                "2025": "181.5",
                "Script Code": "MSFT"
            },
            "Apple": {
                "2000": "52.7",
                "2001": "58.0",
                "2002": "61.1",
                "2003": "66.0",
                "2004": "78.8",
                "2005": "83.9",
                "2006": "88.4",
                "2007": "92.2",
                "2008": "97.7",
                "2009": "95.3",
                "2010": "102.5",
                "2011": "110.6",
                "2012": "115.6",
                "2013": "118.0",
                "2014": "122.7",
                "2015": "125.4",
                "2016": "134.6",
                "2017": "144.6",
                "2018": "141.3",
                "2019": "148.8",
                "2020": "151.3",
                "2021": "163.0",
                "2022": "162.3",
                "2023": "170.7",
                "2024": "175.7",
                "2025": "180.5",
                "Script Code": "AAPL"
            },
            "Amazon.com": {
                "2000": "58.9",
                "2001": "64.0",
                "2002": "65.4",
                "2003": "71.1",
                "2004": "76.5",
                "2005": "82.7",
                "2006": "85.8",
                "2007": "91.7",
                "2008": "92.5",
                "2009": "99.9",
                "2010": "107.2",
                "2011": "109.0",
                "2012": "110.1",
                "2013": "121.3",
                "2014": "120.6",
                "2015": "132.0",
                "2016": "132.5",
                "2017": "140.6",
                "2018": "144.0",
                "2019": "154.9",
                "2020": "159.5",
                "2021": "155.0",
                "2022": "161.5",
                "2023": "167.0",
                "2024": "174.9",
                "2025": "176.3",
                "Script Code": "AMZN"
            },
            "Alphabet": {
                "2000": "59.3",
                "2001": "61.3",
                "2002": "61.1",
                "2003": "71.5",
                "2004": "79.2",
                "2005": "80.3",
                "2006": "85.5",
                "2007": "90.0",
                "2008": "90.8",
                "2009": "103.1",
                "2010": "104.3",
                "2011": "110.3",
                "2012": "111.3",
                "2013": "116.1",
                "2014": "120.7",
                "2015": "132.6",
                "2016": "132.8",
                "2017": "142.8",
                "2018": "143.8",
                "2019": "153.6",
                "2020": "155.4",
                "2021": "163.5",
                "2022": "163.3",
                "2023": "171.7",
                "2024": "177.9",
                "2025": "180.6",
                "Script Code": "GOOGL"
            },
            "Meta Platforms": {
                "2000": "57.2",
                "2001": "58.8",
                "2002": "65.3",
                "2003": "73.7",
                "2004": "70.9",
                "2005": "80.8",
                "2006": "81.5",
                "2007": "92.3",
                "2008": "97.0",
                "2009": "101.9",
                "2010": "105.0",
                "2011": "105.6",
                "2012": "114.5",
                "2013": "124.4",
                "2014": "129.6",
                "2015": "129.4",
                "2016": "132.1",
                "2017": "135.6",
                "2018": "146.0",
                "2019": "153.5",
                "2020": "150.5",
                "2021": "158.6",
                "2022": "169.1",
                "2023": "174.8",
                "2024": "174.8",
                "2025": "182.2",
                "Script Code": "META"
            },
            "Broadcom": {
                "2000": "54.4",
                "2001": "62.7",
                "2002": "64.9",
                "2003": "72.5",
                "2004": "71.8",
                "2005": "81.7",
                "2006": "85.5",
                "2007": "87.2",
                "2008": "90.8",
                "2009": "95.3",
                "2010": "103.3",
                "2011": "107.9",
                "2012": "119.1",
                "2013": "121.3",
                "2014": "128.8",
                "2015": "130.4",
                "2016": "131.9",
                "2017": "142.5",
                "2018": "147.6",
                "2019": "154.9",
                "2020": "157.7",
                "2021": "162.9",
                "2022": "166.7",
                "2023": "173.5",
                "2024": "177.9",
                "2025": "184.3",
                "Script Code": "AVGO"
            },
            "Tesla": {
                "2000": "54.0",
                "2001": "63.7",
                "2002": "66.0",
                "2003": "71.6",
                "2004": "71.3",
                "2005": "83.4",
                "2006": "82.7",
                "2007": "85.2",
                "2008": "93.9",
                "2009": "96.5",
                "2010": "104.3",
                "2011": "114.1",
                "2012": "114.6",
                "2013": "118.5",
                "2014": "121.7",
                "2015": "129.1",
                "2016": "135.5",
                "2017": "135.9",
                "2018": "145.0",
                "2019": "153.0",
                "2020": "150.0",
                "2021": "156.0",
                "2022": "168.5",
                "2023": "170.4",
                "2024": "178.5",
                "2025": "175.8",
                "Script Code": "TSLA"
            },
            "Berkshire Hathaway": {
                "2000": "51.0",
                "2001": "63.2",
                "2002": "63.7",
                "2003": "71.4",
                "2004": "70.4",
                "2005": "77.0",
                "2006": "85.9",
                "2007": "89.3",
                "2008": "92.3",
                "2009": "104.1",
                "2010": "109.2",
                "2011": "107.7",
                "2012": "117.0",
                "2013": "119.2",
                "2014": "128.0",
                "2015": "126.8",
                "2016": "135.5",
                "2017": "137.8",
                "2018": "148.7",
                "2019": "149.3",
                "2020": "156.1",
                "2021": "155.9",
                "2022": "161.4",
                "2023": "167.3",
                "2024": "170.2",
                "2025": "179.4",
                "Script Code": "BRK.A"
            },
            "JPMorgan Chase": {
                "2000": "56.1",
                "2001": "56.3",
                "2002": "62.3",
                "2003": "65.9",
                "2004": "73.1",
                "2005": "76.5",
                "2006": "87.5",
                "2007": "93.1",
                "2008": "93.0",
                "2009": "98.9",
                "2010": "104.9",
                "2011": "113.1",
                "2012": "115.0",
                "2013": "122.9",
                "2014": "120.0",
                "2015": "127.7",
                "2016": "130.7",
                "2017": "136.0",
                "2018": "148.7",
                "2019": "146.8",
                "2020": "155.8",
                "2021": "155.3",
                "2022": "165.3",
                "2023": "173.0",
                "2024": "174.8",
                "2025": "179.9",
                "Script Code": "JPM"
            },
            "Walmart": {
                "2000": "55.8",
                "2001": "59.2",
                "2002": "64.4",
                "2003": "67.7",
                "2004": "76.7",
                "2005": "78.9",
                "2006": "87.3",
                "2007": "85.0",
                "2008": "92.9",
                "2009": "99.0",
                "2010": "102.6",
                "2011": "106.1",
                "2012": "110.2",
                "2013": "116.1",
                "2014": "122.2",
                "2015": "127.1",
                "2016": "134.2",
                "2017": "144.0",
                "2018": "141.2",
                "2019": "145.7",
                "2020": "151.3",
                "2021": "164.9",
                "2022": "160.3",
                "2023": "172.0",
                "2024": "177.8",
                "2025": "183.9",
                "Script Code": "WMT"
            },
            "Oracle": {
                "2000": "51.7",
                "2001": "61.1",
                "2002": "63.0",
                "2003": "65.8",
                "2004": "75.1",
                "2005": "78.9",
                "2006": "87.3",
                "2007": "89.4",
                "2008": "94.9",
                "2009": "101.3",
                "2010": "108.3",
                "2011": "106.7",
                "2012": "118.5",
                "2013": "123.8",
                "2014": "128.7",
                "2015": "133.3",
                "2016": "130.8",
                "2017": "137.0",
                "2018": "147.0",
                "2019": "146.9",
                "2020": "156.3",
                "2021": "164.5",
                "2022": "163.4",
                "2023": "171.3",
                "2024": "179.8",
                "2025": "176.6",
                "Script Code": "ORCL"
            },
            "Eli Lilly": {
                "2000": "50.2",
                "2001": "59.2",
                "2002": "66.3",
                "2003": "73.5",
                "2004": "74.3",
                "2005": "83.7",
                "2006": "81.7",
                "2007": "92.3",
                "2008": "99.5",
                "2009": "99.6",
                "2010": "101.8",
                "2011": "112.0",
                "2012": "117.7",
                "2013": "123.6",
                "2014": "125.2",
                "2015": "126.2",
                "2016": "137.7",
                "2017": "135.3",
                "2018": "141.6",
                "2019": "153.9",
                "2020": "154.1",
                "2021": "155.2",
                "2022": "160.4",
                "2023": "165.8",
                "2024": "172.0",
                "2025": "180.1",
                "Script Code": "LLY"
            },
            "Visa": {
                "2000": "54.0",
                "2001": "60.7",
                "2002": "63.4",
                "2003": "70.2",
                "2004": "78.9",
                "2005": "84.4",
                "2006": "87.0",
                "2007": "91.0",
                "2008": "97.3",
                "2009": "102.8",
                "2010": "106.4",
                "2011": "110.4",
                "2012": "117.5",
                "2013": "124.3",
                "2014": "123.3",
                "2015": "131.5",
                "2016": "139.1",
                "2017": "144.4",
                "2018": "143.6",
                "2019": "147.4",
                "2020": "158.4",
                "2021": "163.4",
                "2022": "160.1",
                "2023": "166.1",
                "2024": "173.6",
                "2025": "181.8",
                "Script Code": "V"
            },
            "Netflix": {
                "2000": "57.6",
                "2001": "58.4",
                "2002": "64.8",
                "2003": "71.8",
                "2004": "73.5",
                "2005": "83.4",
                "2006": "86.7",
                "2007": "90.8",
                "2008": "98.9",
                "2009": "95.8",
                "2010": "107.8",
                "2011": "105.6",
                "2012": "112.9",
                "2013": "123.2",
                "2014": "127.7",
                "2015": "133.8",
                "2016": "134.7",
                "2017": "137.0",
                "2018": "149.1",
                "2019": "146.1",
                "2020": "151.1",
                "2021": "156.1",
                "2022": "164.5",
                "2023": "170.4",
                "2024": "170.9",
                "2025": "177.2",
                "Script Code": "NFLX"
            }
        }


        chart = Highcharts.chart('container', {
            chart: {
                animation: {
                    duration: 500
                },
                marginRight: 50
            },
            title: {
                text: 'Stock performance over timeline',
                align: 'left'
            },
            subtitle: {
                text: getSubtitle(),
                floating: true,
                align: 'right',
                verticalAlign: 'middle',
                useHTML: true,
                y: -80,
                x: -100
            },

            legend: {
                enabled: false
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                opposite: true,
                tickPixelInterval: 150,
                title: {
                    text: null
                }
            },
            plotOptions: {
                series: {
                    animation: false,
                    groupPadding: 0,
                    pointPadding: 0.1,
                    borderWidth: 0,
                    colorByPoint: true,
                    dataSorting: {
                        enabled: true,
                        matchByName: true
                    },
                    type: 'bar',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    name: startYear,
                    data: getData(startYear)[1]
                }
            ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 550
                    },
                    chartOptions: {
                        xAxis: {
                            visible: false
                        },
                        subtitle: {
                            x: 0
                        },
                        plotOptions: {
                            series: {
                                dataLabels: [{
                                    enabled: true,
                                    y: 8
                                }, {
                                    enabled: true,
                                    format: '{point.name}',
                                    y: -8,
                                    style: {
                                        fontWeight: 'normal',
                                        opacity: 0.7
                                    }
                                }]
                            }
                        }
                    }
                }]
            }
        });
    })();

    /*
     * Pause the timeline, either when the range is ended, or when clicking the
     * pause button. Pausing stops the timer and resets the button to play mode.
     */
    function pause(button) {
        button.title = 'play';
        button.className = 'fa fa-play';
        clearTimeout(chart.sequenceTimer);
        chart.sequenceTimer = undefined;
    }

    /*
     * Update the chart. This happens either on updating (moving) the range input,
     * or from a timer when the timeline is playing.
     */
    function update(increment) {
        if (increment) {
            input.value = parseInt(input.value, 10) + increment;
        }
        if (input.value >= endYear) {
            // Auto-pause
            // pause(btn);
            debugger;

            setTimeout(function () {
                input.value = 2000
            }, 2500)
        }

        chart.update(
            {
                subtitle: {
                    text: getSubtitle()
                }
            },
            false,
            false,
            false,
            false
        );

        chart.series[0].update({
            name: input.value,
            data: getData(input.value)[1]
        });
    }

    /*
     * Play the timeline.
     */
    function play(button) {
        button.title = 'pause';
        button.className = 'fa fa-pause';
        chart.sequenceTimer = setInterval(function () {
            update(1);
        }, 500);
    }

    btn.addEventListener('click', function () {
        if (chart.sequenceTimer) {
            pause(this);
        } else {
            play(this);
        }
    });
    /*
     * Trigger the update on the range bar click.
     */
    input.addEventListener('click', function () {
        update();
    });

    $(".highcharts-credits").css("display", "none")
    $(".highcharts-contextbutton").css("display", "none")
}
