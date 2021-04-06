// Initialization
const localPath = "/wp-content/themes/charles-child/";
const html = document.querySelector("html");
const archives = document.getElementById("archives");
const inputSearch = document.getElementById("inputSearch");
const container = document.querySelector(".container");
const ajaxWindow = document.querySelector(".ajaxWindow");
const btnNavigation = document.getElementById('btnNavigation');
const selectMonth = document.getElementById("selectMonthArchive");
const search = document.getElementById("search");
let message = "";

//JS check for navigation placement
if (html.className.indexOf("no-js") > -1) {
    html.removeAttribute("class");
}

//Open navigation in moble/tablet space
btnNavigation.addEventListener("click", (event) => {
    event.preventDefault();
    openNavigation(event);
});

//Open navigation in desktop space
/*navFind.addEventListener("click", () => {
    //openNavigation();
});*/

//Open navigation functionality
function openNavigation(event) {
    event.preventDefault();
    container.classList.toggle("jsNavOpen");
};



//Find/Search Tab Functionality
if (document.querySelector(".navFind") != null) {

    const tabList = document.querySelector(".navFind");
    const tabButtons = tabList.querySelectorAll("[role='tab']");
    const tabPanels = tabList.querySelectorAll("[role='tabpanel']");

    tabButtons.forEach(a => a.addEventListener("click", tabOpen));

    function tabOpen(event) {
        event.preventDefault();
        tabPanels.forEach(panel => {
            panel.hidden = true;
        });
        tabButtons.forEach(link => {
            link.setAttribute("aria-selected","false");
        })
        event.currentTarget.setAttribute("aria-selected","true");

        const newTarget = tabList.querySelector(event.currentTarget.hash);
        newTarget.hidden = false;
    }


    //Select Month validation
    selectMonth.addEventListener("click", (event) => {
        if (archives.value === "Select Month/Year") {
            event.preventDefault();
            if (document.querySelector("#archivesForm span") === null) {
                message = `<span class="error" id="archivesError" aria-live="polite">Please select a date.</span>`;
                archives.setAttribute("aria-describedby", "archivesError");
                archives.insertAdjacentHTML('beforebegin', message);
                archives.classList.add("errorField");
                archives.focus();
            }
        }
    });

    //Search form validation
    search.addEventListener("click", (event) => {
        if (inputSearch.value.trim() === "") {
            event.preventDefault();
            if (document.querySelector("#searchForm span") === null) {
                message = `<span class="error" id="searchError" aria-live="polite">Please type some text.</span>`;
                inputSearch.setAttribute("aria-describedby", "searchError");
                inputSearch.insertAdjacentHTML('beforebegin', message);
                inputSearch.classList.add("errorField");
                inputSearch.focus();
            }
        }
    });

}

