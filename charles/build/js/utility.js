// Initialization
const localPath = "/wp-content/themes/charles-child/";
const html = document.querySelector("html");
const body = document.querySelector("body");
const archives = document.getElementById("archives");
const inputSearch = document.getElementById("inputSearch");
const container = document.querySelector(".container");
const btnNavigation = document.getElementById('btnNavigation');
const navFind = document.querySelector("[href='#find']");
const navContact = document.querySelector("[href*='contact/']");
const selectMonth = document.getElementById("selectMonthArchive");
const search = document.getElementById("search");

let message = "";

//JS check for navigation placement
if (html.className.indexOf("no-js") > -1) {
    html.removeAttribute("class");
}

//Open navigation in moble/tablet space
btnNavigation.addEventListener("click", function() {
    openNavigation();
});

//Open navigation in desktop space
navFind.addEventListener("click", function() {
    openNavigation();
});

//Open navigation functionality
function openNavigation() {
    container.classList.toggle("jsNavOpen");
    navContact.parentElement.classList.remove("selected");
    navFind.parentElement.classList.toggle("selected");
    event.preventDefault();
};

//Select Month validation
selectMonth.addEventListener("click", function() {
    if (archives.value === "Select Month/Year") {
        event.preventDefault();
        if (document.querySelector("#archivesForm span") === null) {
            message = `<span class="error" id="archivesError" aria-live="polite">Please select a date.</span>`;
            archives.setAttribute("aria-describedby", "archivesError");
            archives.insertAdjacentHTML('beforebegin', message);
            archives.classList.add("errorField");
            archives.focus();
        };
    };
});

//Search form validation
search.addEventListener("click", function() {
    if (inputSearch.value.trim() === "") {
        event.preventDefault();
        if (document.querySelector("#searchForm span") === null) {
            message = `<span class="error" id="searchError" aria-live="polite">Please type some text.</span>`;
            inputSearch.setAttribute("aria-describedby", "searchError");
            inputSearch.insertAdjacentHTML('beforebegin', message);
            inputSearch.classList.add("errorField");
            inputSearch.focus();
        };
    };
});

//Contact Window
navContact.addEventListener("click", function() {

    event.preventDefault();
    const ajaxWindow = document.getElementById("ajaxWindow");

    if (ajaxWindow.className.indexOf("hide") > -1) {

        const loading = `<div class="loading"><img src="${localPath}images/content/loading.png" width="163" height="163" alt="Loading..." /></div>`;
        const closeWindow = '<button type="button" class="closeWindow">[X] Close</button>';
        const emailConfirmMessage = `<p class="thanks"><strong>Thanks!</strong> Your email was successfully sent. Should be in touch ASAP.</p>`;

        ajaxWindow.setAttribute("aria-live", "polite");
        ajaxWindow.classList.remove("hide");
        ajaxWindow.innerHTML = loading;

        const contactLink = navContact.parentElement;

        if (!contactLink.classList.contains("selected")) {

            if (container.classList.contains("jsNavOpen")) {
                container.classList.remove("jsNavOpen");
                navFind.parentElement.classList.toggle("selected");
            }

        }

        axios.get('contact/').then(function(response) {

            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(response.data, 'text/html');
            const contact = htmlDoc.querySelector("#contactForm");
            const loadingNode = document.querySelector(".loading");

            loadingNode.remove();
            ajaxWindow.appendChild(contact);
            ajaxWindow.insertAdjacentHTML('afterbegin', closeWindow);

            const sendEmail = document.querySelector("[name='sendemail']");
            const closeWindowBtn = document.querySelector(".closeWindow");

            closeWindowBtn.addEventListener("click", function() {
                closeContact();
                event.preventDefault();
            });

            sendEmail.addEventListener("click", function() {

                event.preventDefault();

                let hasError = false;
                const requiredField = document.querySelectorAll(".requiredField");

                requiredField.forEach(function(element) {

                    if (element.previousElementSibling.tagName === "SPAN") {
                        element.previousElementSibling.remove();
                    }

                    if (element.value.trim() === '') {

                        let labelText = element.previousElementSibling.textContent.toLocaleLowerCase();
                        element.insertAdjacentHTML('beforebegin', `<span class="error">You forgot to enter your ${labelText}</span>`);
                        hasError = true;

                    } else if (element.classList.contains('email')) {

                        let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                        if (!emailReg.test(element.value.trim())) {
                            let labelText = element.previousElementSibling.textContent.toLocaleLowerCase();
                            element.insertAdjacentHTML('beforebegin', `<span class="error">You forgot to enter your ${labelText}</span>`);
                            hasError = true;
                        }

                    } else {

                    }

                });

                if (!hasError) {

                    const contactName = document.getElementById("contactName");
                    const email = document.getElementById("email");
                    const comments = document.getElementById("commentsText");

                    //ajaxWindow.innerHTML = loading;

                    let sendData = new FormData();
                    sendData.append('contactName', contactName.value);
                    sendData.append('email', email.value);
                    sendData.append('comments', comments.value);
                    sendData.append('submitted', 'true');
                    sendData.append('sendemail', "SEND EMAIL");

                    axios.post(contact.action, sendData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(response => {
                        console.log(response.data);
                        loading.remove();
                        ajaxWindow.innerHTML = emailConfirmMessage;
                    });
                }

            });


        });

    } else {

        closeContact();

    };

    function closeContact() {
        ajaxWindow.classList.add("hide");
        ajaxWindow.textContent = '';
        ajaxWindow.removeAttribute("aria-live");
    }

});