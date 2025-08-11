/*
 * Use App.getDependency for Dependency Injection
 * eg: var DialogService = App.getDependency('DialogService');
 */

/* perform any action on widgets/variables within this block */
Page.onReady = function () {
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

Page.autoModelMainContainer0Click = function ($event, widget, item, currentItemWidgets) {

    if (item.state === "true") {
        item.state = "false";
    } else {
        item.state = "true";
    }

    let classes = widget.class.split(" ");
    if (item.dataValue) {
        classes = classes.map((item) => {
            if (item === "unselected-border") {
                return "selected";
            }
            return item;
        });
        widget.class = classes.join(" ");
    } else {
        classes = classes.map((item) => {
            if (item === "selected") {
                return "unselected-border";
            }
            return item;
        });
        widget.class = classes.join(" ");
    }
};
Page.select1Change = function ($event, widget, newVal, oldVal) {
    debugger;
    Page.Widgets.container28.content = newVal

};
