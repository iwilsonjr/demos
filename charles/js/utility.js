// Initialization
var localPath = "/wp-content/themes/charles-child/";
var html = document.querySelector("html");
var archives = document.getElementById("archives");
var inputSearch = document.getElementById("inputSearch");
var container = document.querySelector(".container");
var ajaxWindow = document.querySelector(".ajaxWindow");
var btnNavigation = document.getElementById('btnNavigation');
var selectMonth = document.getElementById("selectMonthArchive");
var search = document.getElementById("search");
var message = ""; //JS check for navigation placement

if (html.className.indexOf("no-js") > -1) {
  html.removeAttribute("class");
} //Open navigation in moble/tablet space


btnNavigation.addEventListener("click", function (event) {
  event.preventDefault();
  openNavigation(event);
}); //Open navigation in desktop space

/*navFind.addEventListener("click", () => {
    //openNavigation();
});*/
//Open navigation functionality

function openNavigation(event) {
  event.preventDefault();
  container.classList.toggle("jsNavOpen");
}

; //Find/Search Tab Functionality

if (document.querySelector(".navFind") != null) {
  var tabOpen = function tabOpen(event) {
    event.preventDefault();
    tabPanels.forEach(function (panel) {
      panel.hidden = true;
    });
    tabButtons.forEach(function (link) {
      link.setAttribute("aria-selected", "false");
    });
    event.currentTarget.setAttribute("aria-selected", "true");
    var newTarget = tabList.querySelector(event.currentTarget.hash);
    newTarget.hidden = false;
  }; //Select Month validation


  var tabList = document.querySelector(".navFind");
  var tabButtons = tabList.querySelectorAll("[role='tab']");
  var tabPanels = tabList.querySelectorAll("[role='tabpanel']");
  tabButtons.forEach(function (a) {
    return a.addEventListener("click", tabOpen);
  });
  selectMonth.addEventListener("click", function (event) {
    if (archives.value === "Select Month/Year") {
      event.preventDefault();

      if (document.querySelector("#archivesForm span") === null) {
        message = "<span class=\"error\" id=\"archivesError\" aria-live=\"polite\">Please select a date.</span>";
        archives.setAttribute("aria-describedby", "archivesError");
        archives.insertAdjacentHTML('beforebegin', message);
        archives.classList.add("errorField");
        archives.focus();
      }
    }
  }); //Search form validation

  search.addEventListener("click", function (event) {
    if (inputSearch.value.trim() === "") {
      event.preventDefault();

      if (document.querySelector("#searchForm span") === null) {
        message = "<span class=\"error\" id=\"searchError\" aria-live=\"polite\">Please type some text.</span>";
        inputSearch.setAttribute("aria-describedby", "searchError");
        inputSearch.insertAdjacentHTML('beforebegin', message);
        inputSearch.classList.add("errorField");
        inputSearch.focus();
      }
    }
  });
}
//# sourceMappingURL=utility.js.map
