//identify important html
const body = document.getElementById("body");
const bodySideBox =document.getElementById("body-side-box");
var modalStatus = false;
//Conduct time check for working business hours
const date = new Date();
const formatter = new Intl.DateTimeFormat('en-US', { 
    timeZone: 'America/New_York', 
    hour: 'numeric',
    hourCycle: "h24"
});
const fullformatter = new Intl.DateTimeFormat('en-US', { 
    timeZone: 'America/New_York', 
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: "h12"
});
const fullformatter24 = new Intl.DateTimeFormat('en-US', { 
    timeZone: 'America/New_York', 
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: "h24"
});
const time = parseInt(formatter.format(date)); 
const currenttime = fullformatter.format(date);
const loginTimeAwareness = document.getElementById("business-hours-converted");
loginTimeAwareness.innerHTML = `Time is ${currenttime} EST`;
const currentESTTime = document.getElementById("current-est-time");
currentESTTime.innerHTML = `Time is ${currenttime} EST`;
const loginTimeAwarenessRemaining = document.getElementById("business-hours-remaining");
const closingTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17, 0, 0); 
const currenttime24 = fullformatter24.format(date);
const currenttime24Int = parseInt(currenttime24.toLocaleString().replace(":",""));
const remainingTime = calculateTimeDifference(currenttime24Int, 1700);
loginTimeAwarenessRemaining.innerHTML = `We are closing in ${remainingTime} hours`;
const currentTimeRemaingBeforeClose = document.getElementById("current-time-left-open");
if(remainingTime>0){
    currentTimeRemaingBeforeClose.innerHTML = `We are closing in ${remainingTime} hours`;
} else {
    currentTimeRemaingBeforeClose.innerHTML = "We are closed";
}
//Update time periodically
runTimeCheckForever();
//Set Theme Changer
const themeMode = document.getElementById("theme-mode");
const themeModeMobile = document.getElementById("theme-mode-mobile");
var savedTheme = localStorage.getItem('theme');
if(savedTheme != undefined && savedTheme != null){
    setTheme(savedTheme);
    themeMode.value = savedTheme;
    themeModeMobile.value = savedTheme;
}
themeMode.addEventListener("change", function() {
    const themeValue = themeMode.value;
    setTheme(themeValue);
});
themeModeMobile.addEventListener("change", function() {
    const themeValue = themeModeMobile.value;
    setTheme(themeValue);
});
//Set mobile menu
const openingHour = 9;
const closingHour = 17;
const menuButton = document.getElementById("menu-button");
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");
const sideMenu = document.getElementById("side-menu");
var menuStatus = false;
menuButton.addEventListener("click", function() {
    if(menuStatus == false){
        menu.style.left = "0";
        sideMenu.style.right = "0";
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-arrow-left");
        const loginButton = document.getElementById("login-button");
        loginButton.style.display = "none";
        menu.style.overflow = "hidden";
        menuStatus = true;
    } else {
        menu.style.left = "-70%"
        sideMenu.style.right = "-30%";
        menuIcon.classList.remove("fa-arrow-left");
        menuIcon.classList.add("fa-bars");
        const loginButton = document.getElementById("login-button");
        loginButton.style.display = "block";
        menu.style.overflow = "auto";
        menuStatus = false;
    }
});
//Check if time is within our operating window.
if(time>openingHour && time<closingHour){
    const loginButton = document.getElementById("login-button");
    const loginMenu = document.getElementById("login-menu");
    const sectionHeader = document.getElementById("header");
    var loginMenuStatus = false;
    loginButton.addEventListener("click", function() {
        if(loginMenuStatus == false){
            loginMenu.style.bottom = "0";
            loginButton.innerHTML = '<i class="fa fa-arrow-down" aria-hidden="true"></i>';
            loginButton.style.height = "auto";
            loginButton.style.backgroundColor = "transparent";
            loginButton.style.border = "none";
            menuButton.style.display = "none";
            menuButton.style.cssText = "display: none !important;";
            loginMenuStatus = true;
        } else {
            loginMenu.style.bottom = "-100%"
            loginButton.innerHTML = "Login";
            if(savedTheme.includes("light-mode")){
                loginButton.style.backgroundColor = "#EEEEEE";
                menuButton.style.backgroundColor = "#EEEEEE";
            } else {
                loginButton.style.backgroundColor = "";
                menuButton.style.backgroundColor = "";
            }
            loginButton.style.height = "";
            loginButton.style.border = "";
            menuButton.style.display = "";
            loginMenuStatus = false;
        }
    })
} else {
    const loginButton = document.getElementById("login-button");
    loginButton.innerText = "Closed"; 
}
//Add learn more modals
const curatedBusinessNotificationsLearnMore = document.getElementById("curated-business-notifications-learn-more");
const curatedAaaSLearnMore = document.getElementById("curated-aaas-learn-more");
const curatedDaaSLearnMore = document.getElementById("curated-daas-learn-more");
const curatedSECaaSLearnMore = document.getElementById("curated-secaas-learn-more");
const curatedSaasLearnMore = document.getElementById("curated-saas-learn-more");
const curatedBusinessLearnMore = document.getElementById("curated-business-learn-more");
const curatedGreenLearnMore = document.getElementById("curated-green-learn-more");
const curatedHealthyLearnMore = document.getElementById("curated-healthy-learn-more");
const curatedOpenSourceLearnMore = document.getElementById("curated-opensource-learn-more");
curatedBusinessNotificationsLearnMore.addEventListener("click", function() {
    makeModal("Notifications", "See what's new with Curated News Business.", `
        <p>We are still working on our product page but we have moved into creating our business portal for current and prospective partners and employees.</p>
        <p>Our business portal will be partially public. We hope to create open dialog with those seeking transparency from our service, while maintaining our intellectual property and security.</p>
        <p>The active portion of our business portal will be closed from 9:00am to 5:00pm EST to ensure down time for all our employees and partners as part of our <b>Curated Green</b> and <b>Curated Healthy</b> programs.</p>
        `);
});
curatedBusinessLearnMore.addEventListener("click", function() {
    makeModal("Curated Business", "Our business website is meant for business. No, really. That's the only thing we do on Curated News Business.", `
        <p>The mission of Curated News Business is to establish business relationships with prospective clients, hire individuals who want to work with us, interact with companies who would like to sponsor us, and collaborate with future partners.</p>
        <p>Our goal is to enhance our product by increasing healthy interactions with our customers so businesses can partner with our users.</p>
        <p>Many companies do not separate their product from their users and their users from their business. They focus on freemium models where the user is both the business and the product. This creates a vicious cycle. These businesses want to increase engagement to catalog user behaviors to sell more advertising space but anytime they increase engagement it causes problems with legitimate activity on their platform, leaving business unable to trust natural user behavior because freemium models make social interactions unnatural.</p>
        `);
});
curatedAaaSLearnMore.addEventListener("click", function() {
    makeModal("Curated AaaS", "Our business uses technical architecture to streamline our services.", `
        <p>The mission of Curated AaaS is to ensure clients can use our platform without worrying about controversy.</p>
        <p>Our goal is to enhance our product by creating technical flow so you know its working without having to see it work.</p>
        <p>Many companies believe web architecture, or 'stacks', are similar use cases with software combinations. We don't. We take steps to implement architecture that scales efficiently. But, we are honest about the fact universal use cases do not exist. Stacked services are a teaching tool but not a serious business model. We take steps to make services seem like they are the same when in reality that are separate processes that flow together to create syncronicity: you know it works without being able to explain why. (Don't worry, we'll explain it for you anyways)</p>
        `);
});
curatedDaaSLearnMore.addEventListener("click", function() {
    makeModal("Curated DaaS", "Our business leverages small data to make efficient calculations faster.", `
        <p>The mission of Curated DaaS is to organize better data so users do more activities and less sifting.</p>
        <p>Our goal is to enhance our product by funneling data instead of gathering all of it to sift through later.</p>
        <p>Many companies waste time and money collecting big data. They collect all the data from sensors (web crawlers), put it in a database, and organize it into tables separately using programming sales or design logic. We think this wastes time and money on an internet ecosystem that is mostly filled with bots and trolls. Instead, we use a special approach to capturing data that is preprocessed without having to comb the entire internet.</p>
        `);
});
curatedSECaaSLearnMore.addEventListener("click", function() {
    makeModal("Curated SECaaS", "Our business takes security so seriously we won't even tell you some things, even if it makes us less transparent.", `
        <p>The mission of Curated SECaaS is to make our architecture and data impossible to game to prevent bad actors from cluttering our ecosystem.</p>
        <p>Our goal is to enhance our product by ensuring it is automated from start to finish. This way we can't accidentally censor users or partners.</p>
        <p>Many companies make security about protection. We make security about our ecosystem. When you defend an ecosystem from the perspective of protection, you focus on external or internal threat models. When you create an ecosystem, the system doesn't need protection because it naturally occurs in such a way that you can't breach it over the long-term, even if you can make some short term gains.</p>
        `);
});
curatedSaasLearnMore.addEventListener("click", function() {
    makeModal("Curated SaaS", "Our business only makes software but serves users a legitimate service.", `
        <p>The mission of Curated SaaS is code that provides value instead of making it artificially.</p>
        <p>Our goal is to enhance our product by developing software that helps users solve a need.</p>
        <p>Many companies upsell services and sellout customers when they monetize their users. Sometimes it feels like the service is not software but software to sell users as a service. We don't do that. Users have needs and even if the world decides users should be the product, software was created to meet those needs and not create more of them.</p>
        `);
});
curatedGreenLearnMore.addEventListener("click", function() {
    makeModal("Curated Green", "Our business is green to reduce our energy footprint.", `
        <p>The mission of Curated Green is to manage our energy consumption in regularized interactions with customers and businesses while maintaining a robust and collaborative community.</p>
        <p>Our goal is to enhance our business by decreasing our reliance on inefficient code. This makes our services faster, less prone to error, and more secure.</p>
        <p>Many companies scale on demand. We scale before demand. We built our business to handle complex needs and conditions so architecture is simple, effective, and efficient. This saves us money, saves everyone time, and gives back to a community transitioning to an economy based on renewable energies.</p>
        `);
});
curatedHealthyLearnMore.addEventListener("click", function() {
    makeModal("Curated Healthy", "Our business fosters the health and welfare of our users and partners.", `
        <p>The mission of Curated Healthy is to ensure a safe ecosystem for our users while giving them the space to participate freely and without limitations.</p>
        <p>Our goal is to enhance our business by setting standards of conduct that are acceptable to all users from many different cultures. For instance, we set business hours for our website so the people who work for us don't burnout. We think of it as a forcing mechanism that also sets boundaries on how and when work gets done, fostering work-life balance.</p>
        <p>Many companies write about their corporate culture. Outside an interview, you'll be hard-pressed to find proof of their corporate culture on display. We believe that's a problem. Our business is upfront about how our business operates so you don't have to ask for an interview for what you see working in real-time.</p>
        `);
});
curatedOpenSourceLearnMore.addEventListener("click", function() {
    makeModal("Curated Open", "Our business believes in transparency because you believe in transparency.", `
        <p>The mission of Curated Open is to add a layer of open source to everything we do. While it would be impossible for a company with intellectual property like ours to be completely transparent, we open a window into as much as we can to assure our users and business partners of our dedication to fair and honest dealings.</p>
        <p>Our goal is to enhance our business by giving researchers, coders, and enthusiasts a method to participate in our services without stealing or attempting to gain personal or business information about our services dishonestly.</p>
        <p>Many companies open source their entire code base, accept push requests to change or modify code, and conduct regular audits. Unfortunately, open source does not mean transparency for regular users who do not know how to code, especially when that code is written in ways that are highly sophisticated or with libraries or frameworks that are not vanilla. We actually believe in vanilla code because its the cleanest and easiest to explain to people who don't have time to become experts. With Curated Open, you can get a glimpse of why you are safe with us so you can get on with living your life.</p>
        `);
});
//Functions
function calculateTimeDifference(time1, time2) {
    var time_start = new Date();
    var time_end = new Date();
    let timeStart = time1.toString();
    let timeStartArray1 = timeStart.slice(0, 2); 
    let timeStartArray2 = timeStart.slice(2, 4);
    var timeStartArray1Var = timeStartArray1[1];
    if(timeStartArray1[1] === undefined){
        timeStartArray1Var = "";
    }
    var timeStartArray2Var = timeStartArray2[1];
    if(timeStartArray2[1] === undefined){
        timeStartArray2Var = "";
    }
    let combinedString1 = parseInt(timeStartArray1[0].toString()+timeStartArray1Var.toString()); 
    let combinedString2 = parseInt(timeStartArray2[0].toString()+timeStartArray2Var.toString()); 
    time_start.setHours(combinedString1, combinedString2, 0, 0)
    let timeEnd = time2.toString();
    let timeEndArray1 = timeEnd.slice(0, 2); 
    let timeEndArray2 = timeEnd.slice(2, 4);
    let combinedString3 = parseInt(timeEndArray1[0].toString()+timeEndArray1[1].toString()); 
    let combinedString4 = parseInt(timeEndArray2[0].toString()+timeEndArray2[1].toString()); 
    time_end.setHours(combinedString3, combinedString4, 0, 0)
    const milliseconds = time_end - time_start;
    return (milliseconds / (1000 * 60 * 60)).toFixed(2);
}
function removeStylesFromString(htmlString){
    const regex = /(style=".+?")/gm;
    return htmlString.replace(regex, "");
}
function makeModal(title, message, html) {
    if(modalStatus == false){
        var modalDiv = document.createElement("div");
        modalDiv.id = "modal";
        modalDiv.innerHTML = `
          <div id="full-page-modal" class="full-page-modal">
            <span id="full-page-modal-close" class="full-page-modal-close"><i class="fa fa-times" aria-hidden="true"></i></span>
            <div class="full-page-modal-inner-container">
                <h1 id="full-page-modal-title" class="full-page-modal-title"><i class="fa fa-hashtag" aria-hidden="true"></i> ${title}</h1>
                <h4>${message}</h4>
                <div>${html}</div>
            </div>
          </div>
        `;
        document.body.appendChild(modalDiv);
        const modalClose = document.getElementById("full-page-modal-close");
        modalClose.addEventListener('click', (event) => {
          modalDiv.remove();
          modalStatus = false;
        });
        modalStatus = true;
        if(savedTheme != undefined && savedTheme != null){
            if(savedTheme.includes("light-mode")){
                const fullPageModal = document.getElementById("full-page-modal");
                fullPageModal.style.backgroundColor = "#fff";
                fullPageModal.style.color = "#000";
            }
        }
    }
  }
  function runTimeCheckForever(){
    setInterval(() => {
        const date = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', { 
            timeZone: 'America/New_York', 
            hour: 'numeric',
            hourCycle: "h24"
        });
        const fullformatter = new Intl.DateTimeFormat('en-US', { 
            timeZone: 'America/New_York', 
            hour: 'numeric',
            minute: 'numeric',
            hourCycle: "h12"
        });
        const fullformatter24 = new Intl.DateTimeFormat('en-US', { 
            timeZone: 'America/New_York', 
            hour: 'numeric',
            minute: 'numeric',
            hourCycle: "h24"
        });
        const time = parseInt(formatter.format(date)); 
        const currenttime = fullformatter.format(date);
        const loginTimeAwareness = document.getElementById("business-hours-converted");
        loginTimeAwareness.innerHTML = `Time is ${currenttime} EST`;
        const currentESTTime = document.getElementById("current-est-time");
        currentESTTime.innerHTML = `Time is ${currenttime} EST`;
        const loginTimeAwarenessRemaining = document.getElementById("business-hours-remaining");
        const closingTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17, 0, 0); 
        const currenttime24 = fullformatter24.format(date);
        const currenttime24Int = parseInt(currenttime24.toLocaleString().replace(":",""));
        const remainingTime = calculateTimeDifference(currenttime24Int, 1700);
        loginTimeAwarenessRemaining.innerHTML = `We are closing in ${remainingTime} hours`;
        const currentTimeRemaingBeforeClose = document.getElementById("current-time-left-open");
        if(remainingTime>0){
            currentTimeRemaingBeforeClose.innerHTML = `We are closing in ${remainingTime} hours`;
        } else {
            currentTimeRemaingBeforeClose.innerHTML = "We are closed";
        }
        savedTheme = localStorage.getItem('theme');
      }, 100);
  }
  function setTheme(themeValue){
    const desktopThemer = document.getElementById("theme-mode");
    const mobileThemer = document.getElementById("theme-mode-mobile");
    const loginButton = document.getElementById("login-button");
    const html = document.getElementById("html");
    const headerActual = document.getElementById("header-actual");
    const sectionHeader = document.getElementById("header");
    const sectionHeaderMobileMenu = document.getElementById("menu-button");
    const sectionHeaderLogoExplainer = document.getElementById("logo-explainer");
    const sectionBody = document.getElementById("body");
    const sectionBodySideBox = document.getElementById("body-side-box");
    const sectionSideBoxInformation = document.getElementById("side-box-information");
    const sectionSideBoxNotifier = document.getElementById("side-box-notifier");
    const sectionSideBoxLearnMore = document.getElementById("curated-business-notifications-learn-more");
    const sectionMobileMenu = document.getElementById("menu");
    const sectionMobileSideMenu = document.getElementById("side-menu");
    const sectionDropdownMenuContainer = document.getElementById("dropdown-menu-container");
    const sectionLoginMenu = document.getElementById("login-menu");
    const sectionLoginForm = document.getElementById("login-form");
    const sectionLoginSideMenuBox = document.getElementById("login-side-menu-box");
    const footerActual = document.getElementById("footer-actual");
    //query classes
    const sectionBodyGridItem = document.querySelectorAll(".body-grid-item:nth-child(even)");
    const documentATags = document.querySelectorAll("a");
    const sectionDropdownMenu = document.querySelectorAll(".dropdown-menu a");
    const sectionMobileMenuEntry = document.querySelectorAll(".menu-entry");
    const sectionMobileMenuLink =document.querySelectorAll(".menu .menu-link");
    const sectionMobileMenuLinkText = document.querySelectorAll(".menu .menu-link::after");
    const sectionMobileMenuSocialItem = document.querySelectorAll(".social-grid-item");
    const sectionLearnMore = document.querySelectorAll(".learn-more");
    if(themeValue.includes("dark-mode")){
        desktopThemer.style.backgroundColor = "";
        desktopThemer.style.color = "";
        mobileThemer.style.backgroundColor = "";
        mobileThemer.style.color = "";
        loginButton.style.backgroundColor = "";
        loginButton.style.color = "";
        html.style.backgroundColor = "";
        html.style.color = "";
        headerActual.style.backgroundColor = "";
        headerActual.style.color = "";
        sectionHeader.style.backgroundColor = "";
        sectionHeader.style.color = "";
        sectionHeaderMobileMenu.style.backgroundColor = "";
        sectionHeaderMobileMenu.style.color = "";
        sectionHeaderLogoExplainer.style.backgroundColor = "";
        sectionHeaderLogoExplainer.style.color = "";
        sectionDropdownMenuContainer.style.backgroundColor = "";
        sectionDropdownMenuContainer.style.color = "";
        sectionBody.style.backgroundColor = "";
        sectionBody.style.color = "";
        sectionBodySideBox.style.backgroundColor = "";
        sectionBodySideBox.style.color = "";
        sectionSideBoxInformation.style.backgroundColor = "";
        sectionSideBoxInformation.style.color = "";
        sectionSideBoxNotifier.style.backgroundColor = "";
        sectionSideBoxNotifier.style.color = "";
        sectionSideBoxLearnMore.style.color = "";
        sectionMobileMenu.style.backgroundColor = "";
        sectionMobileMenu.style.color = "";
        sectionMobileSideMenu.style.backgroundColor = "";
        sectionMobileSideMenu.style.color = "";
        sectionLoginMenu.style.backgroundColor = "";
        sectionLoginMenu.style.color = "";
        sectionLoginForm.style.backgroundColor = "";
        sectionLoginForm.style.color = "";
        sectionLoginSideMenuBox.style.backgroundColor = "";
        sectionLoginSideMenuBox.style.color = "";
        footerActual.style.backgroundColor = "";
        footerActual.style.color = "";
        for (item of sectionBodyGridItem){
            item.style.backgroundColor = "";
            item.style.color = "";
        }
        for (atag of documentATags){
            atag.style.color = "";
        }
        for (dropdownlink of sectionDropdownMenu){
            dropdownlink.style.backgroundColor = "";
            dropdownlink.style.color = "";
        }
        for(entry of sectionMobileMenuEntry){
            entry.style.backgroundColor = "";
            entry.style.color = "";
        }
        for(link of sectionMobileMenuLink){
            link.style.backgroundColor = "";
            link.style.color = "";
        }
        for(text of sectionMobileMenuLinkText){
            text.style.color = "";
        }
        for(social of sectionMobileMenuSocialItem){
            social.style.backgroundColor = "";
            social.style.color = "";
        }
        for(more of sectionLearnMore){
            more.style.color = "";
        }
        localStorage.setItem('theme', themeValue);
    } else if(themeValue.includes("light-mode")){
        desktopThemer.style.backgroundColor = "#EEEEEE";
        desktopThemer.style.color = "#000";
        mobileThemer.style.backgroundColor = "#EEEEEE";
        mobileThemer.style.color = "#000";
        loginButton.style.backgroundColor = "#EEEEEE";
        loginButton.style.color = "#000";
        html.style.backgroundColor = "#EEEEEE";
        html.style.color = "#000";
        headerActual.style.backgroundColor = "#EEEEEE";
        headerActual.style.color = "#000";
        sectionHeader.style.backgroundColor = "#fff";
        sectionHeader.style.color = "#000";
        sectionHeaderMobileMenu.style.backgroundColor = "#EEEEEE";
        sectionHeaderMobileMenu.style.color = "#000";
        sectionHeaderLogoExplainer.style.backgroundColor = "#EEEEEE";
        sectionHeaderLogoExplainer.style.color = "#000";
        sectionDropdownMenuContainer.style.backgroundColor = "#fff";
        sectionDropdownMenuContainer.style.color = "#000";
        sectionBody.style.backgroundColor = "#fff";
        sectionBody.style.color = "#000";
        sectionBodySideBox.style.backgroundColor = "#fff";
        sectionBodySideBox.style.color = "#000";
        sectionSideBoxInformation.style.backgroundColor = "#fff";
        sectionSideBoxInformation.style.color = "#000";
        sectionSideBoxNotifier.style.backgroundColor = "#EEEEEE";
        sectionSideBoxNotifier.style.color = "#000";
        sectionSideBoxLearnMore.style.color = "blue";
        sectionMobileMenu.style.backgroundColor = "#fff";
        sectionMobileMenu.style.color = "#000";
        sectionMobileSideMenu.style.backgroundColor = "#fff";
        sectionMobileSideMenu.style.color = "#000";
        sectionLoginMenu.style.backgroundColor = "#fff";
        sectionLoginMenu.style.color = "#000";
        sectionLoginForm.style.backgroundColor = "#EEEEEE";
        sectionLoginForm.style.color = "#000";
        sectionLoginSideMenuBox.style.backgroundColor = "#EEEEEE";
        sectionLoginSideMenuBox.style.color = "#000";
        footerActual.style.backgroundColor = "#EEEEEE";
        footerActual.style.color = "#000";
        for (item of sectionBodyGridItem){
            item.style.backgroundColor = "#EEEEEE";
            item.style.color = "#000";
        }
        for (atag of documentATags){
            atag.style.color = "#000";
        }
        for (dropdownlink of sectionDropdownMenu){
            dropdownlink.style.backgroundColor = "#EEEEEE";
            dropdownlink.style.color = "#000";
        }
        for(entry of sectionMobileMenuEntry){
            entry.style.backgroundColor = "#EEEEEE";
            entry.style.color = "#000";
        }
        for(link of sectionMobileMenuLink){
            link.style.backgroundColor = "#EEEEEE";
            link.style.color = "#000";
        }
        for(text of sectionMobileMenuLinkText){
            text.style.color = "#000";
        }
        for(social of sectionMobileMenuSocialItem){
            social.style.backgroundColor = "#EEEEEE";
            social.style.color = "#000";
        }
        for(more of sectionLearnMore){
            more.style.color = "blue";
        }
        localStorage.setItem('theme', themeValue);
    }
  }
  setMenuRedirects();
  function setMenuRedirects(){
    //temporarily set to under construction page
    const mobileCareersLink = document.getElementById("mobile-careers-page");
    const mobilePartnersLink = document.getElementById("mobile-partners-page");
    const desktopCareersLink = document.getElementById("desktop-careers-page");
    const desktopPartnersLink = document.getElementById("desktop-partners-page");
    const navigationCareersLink = document.getElementById("navigation-careers-page");
    const navigationPartnersLink = document.getElementById("navigation-partners-page");

    mobileCareersLink.setAttribute("href", "https://curatednewsbusiness.xyz/construction");
    mobilePartnersLink.setAttribute("href", "https://curatednewsbusiness.xyz/construction");
    desktopCareersLink.setAttribute("href", "https://curatednewsbusiness.xyz/construction");
    desktopPartnersLink.setAttribute("href", "https://curatednewsbusiness.xyz/construction");
    navigationCareersLink.setAttribute("href", "https://curatednewsbusiness.xyz/construction");
    navigationPartnersLink.setAttribute("href", "https://curatednewsbusiness.xyz/construction");
  }