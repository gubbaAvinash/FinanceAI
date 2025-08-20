/*
 * Use App.getDependency for Dependency Injection
 * eg: var DialogService = App.getDependency('DialogService');
 */

/* perform any action on widgets/variables within this block */
Partial.onReady = function () {
    // Wait for table data to load
    setTimeout(() => {
        document.querySelectorAll("td:nth-child(7)").forEach(td => {
            // Save original text safely
            const fullText = td.textContent;

            // Preserve formatting exactly as-is
            td.innerHTML = `<div class="formatted-text">${fullText}</div>`;
        });
    }, 500);


    // const maxLength = 50; // characters to show before 'More'

    // // Wait for table data to load
    // setTimeout(() => {
    //     document.querySelectorAll("td:nth-child(7)").forEach(td => {
    //         // If we already processed this cell, skip
    //         if (!td.dataset.fulltext) {
    //             td.dataset.fulltext = td.textContent.trim();
    //         }

    //         const fullText = td.dataset.fulltext;

    //         if (fullText.length > maxLength) {
    //             const shortText = fullText.substring(0, maxLength);

    //             td.innerHTML = `
    //             <span class="short-text">${shortText}...</span>
    //             <span class="full-text" style="display:none;">${fullText}</span>
    //             <a href="#" class="toggle-link"> More</a>
    //         `;
    //         }
    //     });

    //     // Add click event for all 'More' links
    //     document.querySelectorAll(".toggle-link").forEach(link => {
    //         link.addEventListener("click", function (e) {
    //             e.preventDefault();
    //             const td = this.closest("td");
    //             const shortSpan = td.querySelector(".short-text");
    //             const fullSpan = td.querySelector(".full-text");

    //             if (shortSpan.style.display === "none") {
    //                 shortSpan.style.display = "inline";
    //                 fullSpan.style.display = "none";
    //                 this.textContent = " More";
    //             } else {
    //                 shortSpan.style.display = "none";
    //                 fullSpan.style.display = "inline";
    //                 this.textContent = " Less";
    //             }
    //         });
    //     });
    // }, 500); // wait to ensure table rows are rendered


};


Partial.stvDataTableDatasetTable1_customRowAction = function ($event, row) {
    debugger
};

Partial.getNestedArr = function (currentItemCat) {
    debugger
    return (
        Partial.pageParams.nestedObjData.find(item => item.reference === currentItemCat).nested
    )
}
Partial.stvDataTableDatasetTable1_OnRowexpand = function ($event, widget, row, $data) {

};
