Partial.buttonDarkClick = function ($event, widget) {
    App.isDarkThemeEnabled = true;
    document.documentElement.setAttribute("color", "dark")
    App.toogleThemeIcon();
    //document.querySelectorAll('[name="buttonDark"]').forEach(btn => btn.classList.add('btn-primary'));
    //document.querySelectorAll('[name="buttonLight"]').forEach(btn => btn.classList.remove('btn-primary'));
};

Partial.buttonLightClick = function ($event, widget) {
    App.isDarkThemeEnabled = false;
    document.documentElement.setAttribute("color", "light")
    App.toogleThemeIcon();
    //document.querySelectorAll('[name="buttonLight"]').forEach(btn => btn.classList.add('btn-primary'));
    //document.querySelectorAll('[name="buttonDark"]').forEach(btn => btn.classList.remove('btn-primary'));
};

Partial.onReady = function () {

    var moment = App.importModule("moment");
    App.toogleThemeIcon();
    Partial.formattedDate = moment().subtract(1, 'day').format('Do MMMM, YYYY');
    Partial.greeting = Partial.getGreeting();

}
Partial.anchor1Click = function ($event, widget) {
    Partial.Widgets.anchor1.badgevalue = ''
};


Partial.getGreeting = function () {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
        return "Good Morning";
    } else if (hour >= 12 && hour < 15) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
}
