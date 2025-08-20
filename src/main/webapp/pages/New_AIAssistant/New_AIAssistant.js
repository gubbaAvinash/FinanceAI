/*
 * Use App.getDependency for Dependency Injection
 * eg: var DialogService = App.getDependency('DialogService');
 */
Page.defaultTableCaption = "";
Page.dataTableCaption = "";
Page.cleanedDataTableArr = [];
Page.nestedDataTableArr = [];
Page.cleanedDefaultTableArr = [];
Page.nestedDefaultTableArr = [];
/* perform any action on widgets/variables within this block */
Page.onReady = function () {
    Page.chatInitiated = false;
    /*
     * variables can be accessed through 'Page.Variables' property here
     * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
     * Page.Variables.loggedInUser.getData()
     *
     * widgets can be accessed through 'Page.Widgets' property here
     * e.g. to get value of text widget named 'username' use following script
     * 'Page.Widgets.username.datavalue'
     */
};
Page.promptFormBeforesubmit = function ($event, widget, $data) {

    debugger
    if ($data.prompt == "Is 3M a capital-intensive business based on FY2022 data?") {
        if ($data.prompt) {
            Page.chatInitiated = true;
            Page.Variables.stvPrompt.dataSet.push({
                "promptBy": "User",
                "dataValue": $data.prompt
            })
            Page.Variables.stvPrompt.dataSet.push({
                "promptBy": 'AI',
                "dataValue": '',
                "status": 'typing'
            });
            // Page.Variables.stvData.dataSet = Page.Variables.stvPrompt.dataSet
            Page.Widgets.conversationList.dataset = Page.Variables.stvPrompt.dataSet

            const container = document.getElementById("data");
            container.scrollTop = container.scrollHeight;

            Page.getResult($data.prompt);
        }
    }
};
Page.buttonSendClick = function ($event, widget) {
    $('#buttonSend').removeClass('hightlight-sendbtn');
    Page.Widgets.promptForm.submit();
};
Page.getResult = function (userInput) {

    Page.showLoader();
    Page.Widgets.prompt.datavalue = '';
    Page.Widgets.prompt_formWidget.datavalue = '';
    Page.Widgets.promptForm.reset();
    var categoryResponse = App.categorizePrompt(userInput);
    Page.Variables.stvGetPromptResponse.dataBinding.RequestBody = null;
    // Page.Variables.stvGetPromptResponse.setInput('scriptName', categoryResponse.pathParam);
    // if (categoryResponse.requestId) {
    //     Page.Variables.stvGetPromptResponse.dataBinding.RequestBody = { "requestId": categoryResponse.requestId }
    // }
    Page.clearDataTableConfig();
    Page.Widgets.label10.caption = "Generating your results...";
    Page.Widgets.loadingContainer.show = true;
    Page.Widgets.aiDashboardContainer.show = false;

    Page.Variables.wsPromptResp.invoke();
}

Page.showLoader = function () {
    const text = 'Generating response.......'
    const typewriterElement = document.getElementById('typewriter');
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typewriterElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50); // Adjust speed here (lower = faster)
        }
    }
    typeWriter();
}

Page.clearLoader = function () {
    const typewriterElement = document.getElementById('typewriter');
    typewriterElement.innerHTML = '';
}

Page.filterTableData = function (data, type) {
    if (data) {
        if (type === 'defaultTable' && data.resultTitle) {
            Page.defaultTableCaption = data.resultTitle;
        } else {
            Page.dataTableCaption = "Time Series Tool Statements";
        }
        let arr = data;

        const keysToRemove = ["int", "Chunk"];

        function formatDateIfISO(value) {
            // Check if value is a valid date string
            if (typeof value === "string" && !isNaN(Date.parse(value))) {
                const date = new Date(value);
                return date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                });
            }
            return value; // Return unchanged if not a date
        }

        const newArr = data.map(obj => {
            const newObj = {};

            Object.entries(obj).forEach(([key, value]) => {
                if (!keysToRemove.includes(key)) {
                    newObj[key] = formatDateIfISO(value);
                }
            });

            return newObj;
        });


        // const keysToRemove = ["int", "Text", "Chunk"];

        // const newArr = data.map(obj => {
        //     const newObj = { ...obj };
        //     keysToRemove.forEach(key => delete newObj[key]);
        //     return newObj;
        // });
        newArr.forEach(item => {
            let flatItem = {};
            let nestedFields = {};

            for (let key in item) {
                if (typeof item[key] === 'object' && item[key] !== null) {
                    nestedFields[key] = item[key];
                } else {
                    flatItem[key] = item[key];
                }
            }

            type === 'defaultTable' ? Page.cleanedDefaultTableArr.push(flatItem) : Page.cleanedDataTableArr.push(flatItem);

            if (Object.keys(nestedFields).length > 0) {
                let details = nestedFields?.Details;


                if (!Array.isArray(details)) {
                    details = [details];
                }
                let nestedObj = {
                    reference: flatItem.Category || flatItem.TopHolder || 'Unknown',
                    nested: details
                }
                type === 'defaultTable' ? Page.nestedDefaultTableArr.push(nestedObj) : Page.nestedDataTableArr.push(nestedObj);
            }
        });
    }
}

Page.stvGetPromptResponseonSuccess = function (variable, data) {

    Page.prepareAIDashboardDetails(data);
    // if (data.defaultTable) {
    //     Page.filterTableData(data[data.defaultTable], 'defaultTable');
    // }
    // if (data['data-table'])
    //     Page.filterTableData(data['data-table'], 'data-table');
    setTimeout(function () {
        Page.clearLoader();
        const aiResponseText = data['long-answer'] || data['short-answer'] || "No response received.";

        const currentStvData = Page.Variables.stvPrompt.dataSet;
        const lastAiEntryIndex = currentStvData.findIndex(item => item.promptBy === 'AI' && item.status === 'typing');
        const typewriterRunner = document.getElementsByClassName('typing');

        // If a typing placeholder is found, start the typewriting effect.
        if (lastAiEntryIndex !== -1) {
            let charIndex = 0;
            const speed = 10; // Adjust typing speed (milliseconds per character)

            // Define the typeWriter function.
            function typeWriter() {
                // If there are still characters to type.
                if (charIndex < aiResponseText.length) {
                    // Append the next character to the dataValue of the AI entry.
                    currentStvData[lastAiEntryIndex].dataValue += aiResponseText.charAt(charIndex);
                    document.getElementsByClassName('typing')[0].textContent = document.getElementsByClassName('typing');
                    typewriterRunner[0].textContent = currentStvData[lastAiEntryIndex].dataValue
                    Page.Variables.stvPrompt.setData([...currentStvData]);

                    charIndex++;
                    // Call typeWriter again after a short delay.
                    setTimeout(typeWriter, speed);
                    const container = document.getElementById("data");
                    container.scrollTop = container.scrollHeight;
                } else {
                    // Typing is complete, update the status of the AI entry.
                    currentStvData[lastAiEntryIndex].status = 'completed';
                    // Perform a final update to ensure the status change is reflected.
                    Page.Variables.stvPrompt.setData([...currentStvData]);
                    const container = document.getElementById("data");
                    container.scrollTop = container.scrollHeight;
                }
            }
            // Start the typewriting animation.
            typeWriter();
            Page.Widgets.loadingContainer.show = false;
            Page.Widgets.aiDashboardContainer.show = true;

        }
    }, 2000)
};
Page.clearDataTableConfig = function () {
    Page.defaultTableCaption = "";
    Page.dataTableCaption = "";
    Page.cleanedDataTableArr = [];
    Page.nestedDataTableArr = [];
    Page.cleanedDefaultTableArr = [];
    Page.nestedDefaultTableArr = [];
}
Page.prepareAIDashboardDetails = function (data) {
    debugger;
    App.Variables.stvAIDashData.dataSet.keyword = data.keyword.split("-").join(" ")
    App.Variables.stvAIDashData.dataSet.symbols = data.symbols[0]
    App.Variables.stvAIDashData.dataSet.types = data.types[0]
    App.Variables.stvAIDashData.dataSet.longanswer = data.long_answer
    App.Variables.stvAIDashData.dataSet.dateRange = data.date_range
    const capitalized = data.keyword.split("-").map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    App.Variables.stvAIDashData.dataSet.displayedItems = [
        {
            "name": "KEY WORD",
            "value": capitalized.join(" ")
        },
        {
            "name": "SYMBOLS",
            "value": data.symbols[0]
        },
        {
            "name": "TYPES",
            "value": data.types[0]
        },
        {
            "name": "DATE RANGE",
            "value": formatDateRange(data.date_range)
        }
    ]


    App.Variables.stvAIDashData.dataSet.chartName = "lineChart"
    App.chartName = "lineChart";
    App.Variables.stvAIDashData.dataSet.isChartShowDefault = "lineChart" ? true : false;
    App.Variables.stvAIDashData.dataSet.chartData = App.Variables.stvAIDashData.dataSet.isChartShowDefault ? data.lineChart : [];
    // App.Variables.stvAIDashData.dataSet.candlestickChart = data.candlestickChart;
    // App.Variables.stvAIDashData.dataSet.annotations = data.annotations;
}
Page.btnDeleteClick = function ($event, widget) {
    Page.Variables.stvPrompt.dataSet = [];
    Page.chatInitiated = false;
    Page.Widgets.loadingContainer.show = true;
    Page.Widgets.aiDashboardContainer.show = false;
};
function toCamelCase(str) {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
}
function formatDateRange(dates) {
    // Convert to Date objects
    const fromDate = new Date(dates[0]);
    const toDate = new Date(dates[1]);

    // Format options (short day + short month)
    const options = { day: 'numeric', month: 'short' };

    const fromFormatted = fromDate.toLocaleDateString('en-GB', options);
    const toFormatted = toDate.toLocaleDateString('en-GB', options);

    return `${fromFormatted} - ${toFormatted}`;
}
Page.promptKeydown = function ($event, widget) {
    if ($event.key === "Enter" && !$event.shiftKey && widget.dataval) {
        Page.promptVal = "";
        $event.preventDefault();
        $('#buttonSend').removeClass('hightlight-sendbtn');
        Page.Widgets.promptForm.submit();
    }
};
Page.container9Click = function ($event, widget) {
    Page.chatInitiated = true;
    Page.Variables.stvPrompt.dataSet.push({
        "promptBy": "User",
        "dataValue": 'Apple stock compared against indices'
    })
    Page.Variables.stvPrompt.dataSet.push({
        "promptBy": 'AI',
        "dataValue": '',
        "status": 'typing'
    });
    Page.Widgets.conversationList.dataset = Page.Variables.stvPrompt.dataSet

    const container = document.getElementById("data");
    container.scrollTop = container.scrollHeight;


    Page.Variables.stvGetPromptResponse.dataBinding.RequestBody = null;
    Page.Variables.stvGetPromptResponse.setInput('scriptName', 'AAPL');
    Page.Variables.stvGetPromptResponse.dataBinding.RequestBody = { "requestId": 'CompareWithIndices' };
    Page.clearDataTableConfig();
    Page.Widgets.label10.caption = "Generating your results...";
    Page.Widgets.loadingContainer.show = true;
    Page.Widgets.aiDashboardContainer.show = false;
    Page.Variables.stvGetPromptResponse.invoke();
};
Page.promptChange = function ($event, widget, newVal, oldVal) {
    if (newVal) {
        $('#buttonSend').addClass('hightlight-sendbtn');

    } else {
        $('#buttonSend').removeClass('hightlight-sendbtn');
    }
};
Page.label9Click = function ($event, widget) {
    App.activePageName = "Dashboard";
    setTimeout(function () {
        App.toogleThemeIcon();
    }, 500);
};
Page.container12Click = function ($event, widget) {
    Page.chatInitiated = true;
    Page.Variables.stvPrompt.dataSet.push({
        "promptBy": "User",
        "dataValue": 'Get insights on Apple’s trends'
    })
    Page.Variables.stvPrompt.dataSet.push({
        "promptBy": 'AI',
        "dataValue": '',
        "status": 'typing'
    });
    Page.Widgets.conversationList.dataset = Page.Variables.stvPrompt.dataSet

    const container = document.getElementById("data");
    container.scrollTop = container.scrollHeight;


    Page.Variables.stvGetPromptResponse.dataBinding.RequestBody = null;
    Page.Variables.stvGetPromptResponse.setInput('scriptName', 'AAPL');
    Page.Variables.stvGetPromptResponse.dataBinding.RequestBody = { "requestId": '' };
    Page.clearDataTableConfig();
    Page.Widgets.label10.caption = "Generating your results...";
    Page.Widgets.loadingContainer.show = true;
    Page.Widgets.aiDashboardContainer.show = false;
    Page.Variables.stvGetPromptResponse.invoke();

};
Page.container10Click = function ($event, widget) {
    Page.chatInitiated = true;
    Page.Variables.stvPrompt.dataSet.push({
        "promptBy": "User",
        "dataValue": 'Explore Microsoft’s latest financial data'
    })
    Page.Variables.stvPrompt.dataSet.push({
        "promptBy": 'AI',
        "dataValue": '',
        "status": 'typing'
    });
    Page.Widgets.conversationList.dataset = Page.Variables.stvPrompt.dataSet

    const container = document.getElementById("data");
    container.scrollTop = container.scrollHeight;


    Page.Variables.stvGetPromptResponse.dataBinding.RequestBody = null;
    Page.Variables.stvGetPromptResponse.setInput('scriptName', 'MSFT');
    Page.Variables.stvGetPromptResponse.dataBinding.RequestBody = { "requestId": '' };
    Page.clearDataTableConfig();
    Page.Widgets.label10.caption = "Generating your results...";
    Page.Widgets.loadingContainer.show = true;
    Page.Widgets.aiDashboardContainer.show = false;
    Page.Variables.stvGetPromptResponse.invoke();

};
Page.container13Click = function ($event, widget) {
    Page.chatInitiated = true;
    Page.Variables.stvPrompt.dataSet.push({
        "promptBy": "User",
        "dataValue": 'Tesla’s recent market activity'
    })
    Page.Variables.stvPrompt.dataSet.push({
        "promptBy": 'AI',
        "dataValue": '',
        "status": 'typing'
    });
    Page.Widgets.conversationList.dataset = Page.Variables.stvPrompt.dataSet

    const container = document.getElementById("data");
    container.scrollTop = container.scrollHeight;


    Page.Variables.stvGetPromptResponse.dataBinding.RequestBody = null;
    Page.Variables.stvGetPromptResponse.setInput('scriptName', 'TSLA');
    Page.Variables.stvGetPromptResponse.dataBinding.RequestBody = { "requestId": '' };
    Page.clearDataTableConfig();
    Page.Widgets.label10.caption = "Generating your results...";
    Page.Widgets.loadingContainer.show = true;
    Page.Widgets.aiDashboardContainer.show = false;
    Page.Variables.stvGetPromptResponse.invoke();
};

Page.wsPromptResponSuccess = function (variable, data) {
    debugger;
    const html = data.refined_prompt.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    document.getElementById("refinedPrompt").innerHTML = html
    data.refined_prompt = html
    Page.prepareAIDashboardDetails(data);
    if (data.defaultTable) {
        Page.filterTableData(data[data.defaultTable], 'defaultTable');
    }
    if (data['docs'])
        Page.filterTableData(data['docs'], 'docs');
    setTimeout(function () {
        Page.clearLoader();
        const aiResponseText = data['short_answer'] || "No response received.";

        const currentStvData = Page.Variables.stvPrompt.dataSet;
        const lastAiEntryIndex = currentStvData.findIndex(item => item.promptBy === 'AI' && item.status === 'typing');
        const typewriterRunner = document.getElementsByClassName('typing');

        // If a typing placeholder is found, start the typewriting effect.
        if (lastAiEntryIndex !== -1) {
            let charIndex = 0;
            const speed = 10; // Adjust typing speed (milliseconds per character)

            // Define the typeWriter function.
            function typeWriter() {
                // If there are still characters to type.
                if (charIndex < aiResponseText.length) {
                    // Append the next character to the dataValue of the AI entry.
                    currentStvData[lastAiEntryIndex].dataValue += aiResponseText.charAt(charIndex);
                    document.getElementsByClassName('typing')[0].textContent = document.getElementsByClassName('typing');
                    typewriterRunner[0].textContent = currentStvData[lastAiEntryIndex].dataValue
                    Page.Variables.stvPrompt.setData([...currentStvData]);

                    charIndex++;
                    // Call typeWriter again after a short delay.
                    setTimeout(typeWriter, speed);
                    const container = document.getElementById("data");
                    container.scrollTop = container.scrollHeight;
                } else {
                    // Typing is complete, update the status of the AI entry.
                    currentStvData[lastAiEntryIndex].status = 'completed';
                    // Perform a final update to ensure the status change is reflected.
                    Page.Variables.stvPrompt.setData([...currentStvData]);
                    const container = document.getElementById("data");
                    container.scrollTop = container.scrollHeight;
                }
            }
            // Start the typewriting animation.
            typeWriter();
            Page.Widgets.loadingContainer.show = false;
            Page.Widgets.aiDashboardContainer.show = true;

        }
    }, 2000)

};
Page.button4Tap = function ($event, widget) {
    debugger;
    Page.Widgets.button5.show = true
    Page.Widgets.button4.show = false
    Page.Widgets.label15.show = true
};
Page.button5Tap = function ($event, widget) {
    Page.Widgets.button5.show = false
    Page.Widgets.button4.show = true
    Page.Widgets.label15.show = false
};
