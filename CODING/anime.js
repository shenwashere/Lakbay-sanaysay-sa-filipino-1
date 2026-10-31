document.addEventListener("DOMContentLoaded", function() {

    // ===== TITLE PAGE <-> TRAVELOGUE =====
    function showTravelogue(targetId) {
        document.body.classList.remove("on-cover");
        window.scrollTo(0, 0);
        if (targetId) {
            var target = document.getElementById(targetId);
            if (target) target.scrollIntoView({ behavior: "smooth" });
        }
    }

    function showCover() {
        closeInfo();
        document.body.classList.add("on-cover");
        window.scrollTo(0, 0);
    }

    // arrow on the title page -> travelogue
    document.getElementById("enterButton").addEventListener("click", function() {
        showTravelogue();
    });

    // DAVAO! -> back to the title page
    document.getElementById("homeLink").addEventListener("click", function(e) {
        e.preventDefault();
        showCover();
    });

    // ===== ABOUT / MIYEMBRO / GALLERY POPUP =====
    var aboutHTML =
        '<p class="info-label">Palaging tandaan:</p>' +
        '<h2 class="info-title">Ang paglalakbay ay alaala ng bawat hakbang.</h2>' +
        '<p class="info-sub">- Group 1</p>';

    var membersHTML =
        '<p class="info-label">Group 1</p>' +
        '<h2 class="info-title">Mga Miyembro</h2>' +
        '<div class="info-members">' +
        '<div class="info-pill"><strong>Boiser</strong><span>member</span></div>' +
        '<div class="info-pill"><strong>Semblante</strong><span>member</span></div>' +
        '<div class="info-pill"><strong>Suico</strong><span>member</span></div>' +
        '<div class="info-pill"><strong>Cabonce</strong><span>member</span></div>' +
        '<div class="info-pill"><strong>Patindol</strong><span>leader</span></div>' +
        '<div class="info-pill"><strong>Vitualla</strong><span>member</span></div>' +
        '</div>';

    var info = document.createElement("div");
    info.id = "infoPopup";
    info.innerHTML =
        '<div class="info-window">' +
        '<button class="info-close" type="button">&times;</button>' +
        '<div class="info-body"></div>' +
        '</div>';
    document.body.appendChild(info);

    function openInfo(html) {
        info.querySelector(".info-body").innerHTML = html;
        info.classList.add("show");
    }

    function closeInfo() {
        info.classList.remove("show");
    }

    info.querySelector(".info-close").addEventListener("click", closeInfo);
    info.addEventListener("click", function(e) {
        if (e.target === info) closeInfo();
    });

    // nav: Start -> journal, Miyembro -> popup, About -> popup
    document.querySelectorAll(".nav-links a").forEach(function(link) {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            if (link.dataset.view === "members") {
                openInfo(membersHTML);
            } else if (link.dataset.target === "about") {
                openInfo(aboutHTML);
            } else {
                closeInfo();
                showTravelogue(link.dataset.target);
            }
        });
    });

    // ===== "TULOY ANG KWENTO" POPUPS =====
    var popup = document.getElementById("imagePopup");
    var popupImg = document.getElementById("popupImg");
    var popupTitle = document.getElementById("popupTitle");
    var popupBody = document.getElementById("popupBody");

    document.querySelectorAll(".readEntry").forEach(function(button) {
        button.addEventListener("click", function() {
            var story = button.closest(".story");
            var fullTitle = story.querySelector(".full-title");
            var fullText = story.querySelector(".full-text");
            var title = fullTitle ? fullTitle.textContent : story.querySelector("h3").textContent;

            // entries with several pictures: open the gallery popup
            if (button.dataset.gallery) {
                var files = button.dataset.gallery.split(",");
                var pics = "";
                files.forEach(function(file, i) {
                    var name = file.trim();
                    pics += '<img src="' + name + '" alt="' + title + ' ' + (i + 1) + '">';
                });
                openInfo('<h2 class="info-title">' + title + '</h2><div class="gallery">' + pics + '</div>');
                return;
            }

            // entries with one picture + text
            popupImg.src = button.dataset.image;
            popupTitle.textContent = title;
            popupBody.innerHTML = fullText ? fullText.innerHTML : "";
            popup.classList.add("show");
        });
    });

    function closePopup() {
        popup.classList.remove("show");
    }

    document.getElementById("closePopup").addEventListener("click", closePopup);
    popup.addEventListener("click", function(e) {
        if (e.target === popup) closePopup();
    });

    // Esc closes whichever popup is open
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            closePopup();
            closeInfo();
        }
    });
});