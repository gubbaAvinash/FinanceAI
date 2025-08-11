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
        Page.Widgets.conversationList.dataset = Page.Variables.stvPrompt.dataSet

        const container = document.getElementById("data");
        container.scrollTop = container.scrollHeight;

        Page.getResult($data.prompt);
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
    Page.Variables.stvGetPromptResponse.setInput('scriptName', categoryResponse.pathParam);
    if (categoryResponse.requestId) {
        Page.Variables.stvGetPromptResponse.dataBinding.RequestBody = { "requestId": categoryResponse.requestId }
    }
    Page.clearDataTableConfig();
    Page.Widgets.label10.caption = "Generating your results...";
    Page.Widgets.loadingContainer.show = true;
    Page.Widgets.aiDashboardContainer.show = false;

    Page.Variables.stvGetPromptResponse.invoke();
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
            Page.dataTableCaption = data.resultTitle;
        }
        let arr = data.data;

        arr.forEach(item => {
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
    if (data.defaultTable) {
        Page.filterTableData(data[data.defaultTable], 'defaultTable');
    }
    if (data['data-table'])
        Page.filterTableData(data['data-table'], 'data-table');
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
    App.Variables.stvAIDashData.dataSet.cmp = data.metrics.find(item => item.name === "CMP")?.value;
    App.Variables.stvAIDashData.dataSet.change = data.metrics.find(item => item.name === "Change")?.value;
    App.Variables.stvAIDashData.dataSet.displayedItems = data.metrics.filter(item => item.display === true);
    App.Variables.stvAIDashData.dataSet.companyName = data.companyName


    App.Variables.stvAIDashData.dataSet.chartName = data.defaultChart
    App.chartName = data.defaultChart;
    App.Variables.stvAIDashData.dataSet.isChartShowDefault = data.defaultChart ? true : false;
    App.Variables.stvAIDashData.dataSet.chartData = App.Variables.stvAIDashData.dataSet.isChartShowDefault ? data[App.Variables.stvAIDashData.dataSet.chartName] : [];
    App.Variables.stvAIDashData.dataSet.candlestickChart = data.candlestickChart;
    App.Variables.stvAIDashData.dataSet.annotations = data.annotations;
}
Page.btnDeleteClick = function ($event, widget) {
    Page.Variables.stvPrompt.dataSet = [];
    Page.chatInitiated = false;
    Page.Widgets.loadingContainer.show = true;
    Page.Widgets.aiDashboardContainer.show = false;
};
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
