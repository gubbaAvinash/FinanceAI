
/*
* Use App.getDependency for Dependency Injection
* eg: var DialogService = App.getDependency('DialogService');
*/

/* perform any action on the variables within this block(on-page-load) */
App.onAppVariablesReady = function () {

    /*
     * variables can be accessed through 'App.Variables' property here
     * e.g. App.Variables.staticVariable1.getData()
     */
};

/* perform any action on session timeout here, e.g clearing some data, etc */
App.onSessionTimeout = function () {
    /*
     * NOTE:
     * On re-login after session timeout:
     * if the same user logs in(through login dialog), app will retain its state
     * if a different user logs in, app will be reloaded and user is redirected to respective landing page configured in Security.
     */
};

/*
 * This application level callback function will be invoked after the invocation of PAGE level onPageReady function.
 * Use this function to write common logic across the pages in the application.
 * activePageName : name of the page
 * activePageScope: scope of the page
 * $activePageEl  : page jQuery element
 */
App.onPageReady = function (activePageName, activePageScope, $activePageEl) {


    function removeClearfix() {
        Array.from(document.getElementsByClassName("clearfix")).forEach((el) => {
            el.classList.remove("clearfix");
        });
    }
    $(document).ready(setTimeout(removeClearfix, 1000));
    //App.categorizePrompt("I wanted to look for Musk's company shareholding pattern"))
};

/*
 * This application level callback function will be invoked after a Variable receives an error from the target service.
 * Use this function to write common error handling logic across the application.
 * errorMsg:    The error message returned by the target service. This message will be displayed through appNotification variable
 *              You can change this though App.Variables.appNotification.setMessage(YOUR_CUSTOM_MESSAGE)
 * xhrObj:      The xhrObject used to make the service call
 *              This object contains useful information like statusCode, url, request/response body.
 */
App.onServiceError = function (errorMsg, xhrObj) {

};

App.categorizePrompt = function (prompt) {
    const lower = prompt.toLowerCase();

    const appleKeywords = [
        "apple", "aapl", "mac", "iphone", "ipad", "airpods", "apple watch",
        "ios", "macbook", "imac", "safari", "facetime", "icloud", "app store",
        "tim cook"
    ];

    const msftKeywords = [
        "msft", "microsoft", "windows", "office", "azure", "bing", "teams",
        "outlook", "xbox", "skype", "visual studio", "microsoft 365", "power bi",
        "satya", "nadella", "satya nadella"
    ];

    const teslaKeywords = [
        "tsla", "tesla", "model s", "model 3", "model x", "model y", "cybertruck",
        "elon musk", "musk"
    ];

    const indexSynonyms = [
        "s&p", "nasdaq", "dow", "index", "indices", "benchmark", "etf",
        "stock market", "market average", "sp500", "djia", "composite", "nyse"
    ];

    const covidSynonyms = [
        "covid", "pandemic", "coronavirus", "lockdown", "quarantine",
        "covid-19", "2020 crash", "virus impact"
    ];

    const shareHolderSynonyms = [
        "stockholder",
        "investor",
        "stakeholder",
        "equity holder",
        "shareowner",
        "capitalist",
        "owner",
        "bondholder",
        "participant",
        "partner",
        "contributor",
        "shareholder",
        "holder"
    ]
    App.appleIndices = false;
    App.applePandemic = false;
    App.tesla = false;
    const mentionsApple = appleKeywords.some(k => lower.includes(k));
    const mentionsMSFT = msftKeywords.some(k => lower.includes(k));
    const mentionsTesla = teslaKeywords.some(k => lower.includes(k));
    const mentionsIndices = indexSynonyms.some(k => lower.includes(k));
    const mentionsCovid = covidSynonyms.some(k => lower.includes(k));
    const mentionsShareHolder = shareHolderSynonyms.some(k => lower.includes(k));
    const appleCovid = mentionsApple && mentionsCovid;

    if (appleCovid) {
        App.applePandemic = true;
        return {
            pathParam: "AAPL", "requestId": "CovidPerformance"
        };
    }
    if (mentionsApple && mentionsIndices) {
        App.appleIndices = true;
        return { pathParam: "AAPL", "requestId": "CompareWithIndices" };
    }
    if (mentionsMSFT) return { pathParam: "MSFT", "requestId": "" };
    if (mentionsTesla && mentionsShareHolder) return { pathParam: "TSLA", "requestId": "" };
    if (mentionsTesla) {
        App.tesla = true;
        return { pathParam: "TSLA", "requestId": "withAnnotations" };
    }
    if (mentionsApple) return { pathParam: "AAPL", "requestId": "" };

    return { pathParam: "AAPL", "requestId": "" };
}


App.toogleThemeIcon = function () {
    if (App.isDarkThemeEnabled == undefined || App.isDarkThemeEnabled == null) {
        App.isDarkThemeEnabled = true;
        document.querySelectorAll('[name="buttonDark"]').forEach(btn => btn.classList.add('btn-primary'));
    } else if (App.isDarkThemeEnabled) {
        document.querySelectorAll('[name="buttonDark"]').forEach(btn => btn.classList.add('btn-primary'));
        document.querySelectorAll('[name="buttonLight"]').forEach(btn => btn.classList.remove('btn-primary'));
    } else {
        document.querySelectorAll('[name="buttonLight"]').forEach(btn => btn.classList.add('btn-primary'));
        document.querySelectorAll('[name="buttonDark"]').forEach(btn => btn.classList.remove('btn-primary'));
    }
}
