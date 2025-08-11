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

    //Partial.Widgets.chartsContainer.content = App.Variables.stvAIDashData.dataSet.chartName;
};
Partial.button1Click = function ($event, widget) {
    Partial.Widgets.button2.show = true;
    Partial.Widgets.button1.show = false;
    App.Variables.stvAIDashData.dataSet.chartName = "candlestickChart";
};
Partial.button2Click = function ($event, widget) {
    if (App.Variables.stvAIDashData.dataSet.isChartShowDefault) {
        Partial.Widgets.button1.show = true;
        Partial.Widgets.button2.show = false;
        App.Variables.stvAIDashData.dataSet.chartName = App.Variables.stvAIDashData.dataSet.isChartShowDefault ? App.chartName : "";
    }
};

Partial.buttonPrintClick = function ($event, widget) {
    const section = document.getElementById('dashboard_container-642176024');
    printClone(section);
};

function printClone(element) {
    if (!element) return;

    // Remove existing printSection if present
    const old = document.getElementById('printSection');
    if (old) old.remove();

    // Create new print container
    const printSection = document.createElement('div');
    printSection.id = 'printSection';

    // Clone the element deeply (with all children)
    const clone = element.cloneNode(true);

    // Optionally copy inline styles or classes needed
    printSection.appendChild(clone);
    document.body.appendChild(printSection);

    // Call print, then remove the printSection after
    window.print();

    window.onafterprint = () => {
        // document.body.removeChild(printSection)
        printSection.remove();
    };
}

Partial.downloadPDF = function () {
    const target = document.getElementById("dashboard_container-642176024");
    const clone = target.cloneNode(true);

    // Apply 110% zoom only to the clone
    clone.style.transform = "scale(0.7)";
    clone.style.transformOrigin = "top";

    // Inline root variable styles
    inlineCSSVariables(clone);

    // Inline computed styles without color() or var()
    inlineSafeStyles(clone);

    const wrapper = document.createElement("div");
    // wrapper.style.position = "fixed";
    // wrapper.style.top = "-10000px";
    // wrapper.style.left = "-10000px";
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    const options = {
        margin: 0.5,
        filename: App.Variables.stvAIDashData.dataSet.companyName + '_insights.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            ignoreElements: el => {
                // Ignore any node with unresolved color() usage
                try {
                    const style = window.getComputedStyle(el);
                    return style && (
                        style.color.includes("color(") ||
                        style.backgroundColor.includes("color(")
                    );
                } catch {
                    return false;
                }
            }
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(clone).save().then(() => {
        document.body.removeChild(wrapper);
    }, (err) => {
        console.error("PDF generation error:", err);
        debugger;
    });
};

function inlineCSSVariables(rootEl) {
    const style = getComputedStyle(document.documentElement);
    const varMap = {};

    for (const prop of style) {
        if (prop.startsWith('--')) {
            varMap[prop] = style.getPropertyValue(prop).trim();
        }
    }

    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_ELEMENT, null, false);

    while (walker.nextNode()) {
        const el = walker.currentNode;
        for (const s of window.getComputedStyle(el)) {
            let val = window.getComputedStyle(el).getPropertyValue(s);
            if (val.includes('var(')) {
                val = val.replace(/var\((--[a-zA-Z0-9-_]+)\)/g, (_, name) => varMap[name] || '');
            }
            if (!val.includes("color(")) {
                el.style.setProperty(s, val);
            }
        }
    }
}

function inlineSafeStyles(el) {
    const all = el.querySelectorAll("*");
    for (const node of all) {
        const styles = window.getComputedStyle(node);
        for (const prop of styles) {
            const val = styles.getPropertyValue(prop);
            if (!val.includes("color(") && !val.includes("var(")) {
                node.style.setProperty(prop, val);
            }
        }
    }
}

Partial.buttonDownloadClick = function ($event, widget) {
    Partial.downloadPDF();
};
