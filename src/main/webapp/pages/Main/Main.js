/*
* Use App.getDependency for Dependency Injection
* eg: var DialogService = App.getDependency('DialogService');
*/

/* perform any action on widgets/variables within this block */
Page.onReady = function () {
    Page.defaultCharts = localStorage.selectedCharts
    Page.loadDashboard();
};

Page.loadDashboard = function () {
    Page.defaultCharts = localStorage.selectedCharts
    if (Page.defaultCharts) {
        Page.defaultCharts = atob(Page.defaultCharts)
        Page.defaultCharts = Page.defaultCharts.split(',').map(s => s.trim());
    }
    else {
        Page.Variables.stvTempSelectedCharts.dataSet = Page.Variables.stvAllCharts.dataSet;
        Page.defaultCharts = ["heatMapChart", "sectorRotation", "topFlow"];
        localStorage.selectedCharts = btoa(Page.defaultCharts.join(','));
    }

    Page.Variables.stvAllCharts.dataSet.forEach(obj => {
        var object = Page.defaultCharts.includes(obj.pageName);
        object ? Page.Variables.stvSelectedCharts.dataSet.push(obj) : Page.Variables.stvUnselectedCharts.dataSet.push(obj);
    });
    Page.dialogConfigureClose();
}

Page.getIndicesInfoonSuccess = function (variable, data) {
    Page.Variables.stvIndicesInfo.dataSet = data;
};

Page.buttonRemoveClick = function ($event, widget, item, currentItemWidgets) {

    Page.Variables.stvTempSelectedCharts.dataSet = Page.Variables.stvTempSelectedCharts.dataSet.filter(a => a.displayName != item.displayName)
    Page.Variables.stvTempUnselectedCharts.dataSet.push(item)
};

Page.buttonAddClick = function ($event, widget, item, currentItemWidgets) {

    Page.Variables.stvTempUnselectedCharts.dataSet = Page.Variables.stvTempUnselectedCharts.dataSet.filter(a => a.displayName != item.displayName)
    Page.Variables.stvTempSelectedCharts.dataSet.push(item)
};

Page.buttonSaveClick = function ($event, widget) {

    Page.Variables.stvSelectedCharts.dataSet = _.cloneDeep(Page.Variables.stvTempSelectedCharts.dataSet);
    Page.Variables.stvUnselectedCharts.dataSet = _.cloneDeep(Page.Variables.stvTempUnselectedCharts.dataSet);
    var arr = []
    Page.Variables.stvSelectedCharts.dataSet.forEach(obj => {
        arr.push(obj.pageName)
    });
    localStorage.selectedCharts = btoa(arr.join(','));
};

Page.dialogConfigureClose = function ($event, widget) {

    Page.Variables.stvTempSelectedCharts.dataSet = _.cloneDeep(Page.Variables.stvSelectedCharts.dataSet);
    Page.Variables.stvTempUnselectedCharts.dataSet = _.cloneDeep(Page.Variables.stvUnselectedCharts.dataSet);
};
Page.stvSelectedChartsListReorder = function ($event, $data, $changedItem) {

};
Page.collapseButtonClick = function ($event, widget) {
    Page.Widgets.rightSideDashContainer.show = false;
    $('#content_container-642175709').addClass('grid-layout-show-hide');
    Page.Widgets.expandButton.show = true;
    Page.Widgets.collapseButton.show = false;
};
Page.expandButtonClick = function ($event, widget) {
    Page.Widgets.rightSideDashContainer.show = true;
    $('#content_container-642175709').removeClass('grid-layout-show-hide');
    Page.Widgets.expandButton.show = false;
    Page.Widgets.collapseButton.show = true;
};


Page.getRandomDate = function () {
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 3);
    const endDate = currentDate;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    const randomTime = start + Math.random() * (end - start);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(randomTime).toLocaleDateString("en-US", options);
}

// Format to readable format (e.g., Apr 12, 2024)
Page.stvNewDetailsList1Beforedatarender = function (widget, $data) {
    $data.forEach(item => {
        if (!item.date) {
            item.date = Page.getRandomDate();
        }
    });
};

Page.getQuaterAndYear = function () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0 = January, 11 = December

    const quarter = Math.floor(month / 3) + 1;

    return "Q" + quarter + " " + year;
}
Page.stvResultsDataList1Beforedatarender = function (widget, $data) {
    debugger;

    $data.forEach(item => {
        if (!item.quarter) {
            item.quarter = Page.getQuaterAndYear();
        }
    });
};
