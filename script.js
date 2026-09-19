```javascript
/* =========================================================
   APURBO RAJBONGSHI PORTFOLIO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body = document.body;

    const header = document.getElementById("header");

    const themeToggle = document.getElementById("theme-toggle");

    const menuToggle = document.getElementById("menu-toggle");

    const navMenu = document.getElementById("nav-menu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const revealElements =
        document.querySelectorAll(".reveal");

    const yearElement =
        document.getElementById("year");

    const typingElement =
        document.getElementById("typing-text");

    const contactForm =
        document.getElementById("contact-form");


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       THEME
    ====================================================== */

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        body.classList.add("light");

    }


    function updateThemeIcon() {

        if (!themeToggle) {
            return;
        }

        const icon =
            themeToggle.querySelector("i");

        if (!icon) {
            return;
        }

        if (body.classList.contains("light")) {

            icon.className =
                "fa-solid fa-sun";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        } else {

            icon.className =
                "fa-solid fa-moon";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        }

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                body.classList.toggle("light");

                const currentTheme =
                    body.classList.contains("light")
                        ? "light"
                        : "dark";

                localStorage.setItem(
                    "portfolio-theme",
                    currentTheme
                );

                updateThemeIcon();

            }
        );

    }


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                navMenu.classList.toggle("open");

                body.classList.toggle(
                    "no-scroll",
                    navMenu.classList.contains("open")
                );

                const icon =
                    menuToggle.querySelector("i");

                if (
                    navMenu.classList.contains("open")
                ) {

                    icon.className =
                        "fa-solid fa-xmark";

                    menuToggle.setAttribute(
                        "aria-label",
                        "Close navigation menu"
                    );

                } else {

                    icon.className =
                        "fa-solid fa-bars";

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

            }
        );

    }


    /* Close mobile menu after clicking */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (!navMenu) {
                    return;
                }

                navMenu.classList.remove("open");

                body.classList.remove("no-scroll");

                if (menuToggle) {

                    const icon =
                        menuToggle.querySelector("i");

                    if (icon) {

                        icon.className =
                            "fa-solid fa-bars";

                    }

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

            }
        );

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

    function handleHeaderScroll() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll("main section[id]");


    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 150;

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       TYPING EFFECT
    ====================================================== */

    if (typingElement) {

        const roles = [

            "AI/ML Engineer",
            "Machine Learning Enthusiast",
            "Data Science Enthusiast",
            "Software Developer",
            "Computer Vision Researcher"

        ];

        let roleIndex = 0;

        let characterIndex = 0;

        let deleting = false;


        function typeRole() {

            const currentRole =
                roles[roleIndex];


            if (!deleting) {

                characterIndex++;

                typingElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex ===
                    currentRole.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeRole,
                        1800
                    );

                    return;

                }

            } else {

                characterIndex--;

                typingElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );


                if (characterIndex === 0) {

                    deleting = false;

                    roleIndex =
                        (roleIndex + 1) %
                        roles.length;

                }

            }


            const typingSpeed =
                deleting ? 45 : 80;

            setTimeout(
                typeRole,
                typingSpeed
            );

        }


        typeRole();

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("visible");

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       CONTACT FORM
    ====================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();

                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();

                const subject =
                    document.getElementById(
                        "subject"
                    ).value.trim();

                const message =
                    document.getElementById(
                        "message"
                    ).value.trim();


                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    alert(
                        "Please complete all fields."
                    );

                    return;

                }


                const emailSubject =
                    encodeURIComponent(
                        subject
                    );


                const emailBody =
                    encodeURIComponent(

                        `Hello Apurbo,

Name: ${name}
Email: ${email}

Message:
${message}

Sent from your portfolio website.`

                    );


                window.location.href =
                    `mailto:apucse1296@gmail.com?subject=${emailSubject}&body=${emailBody}`;

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });


    /* =====================================================
       ESC KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navMenu &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove(
                    "open"
                );

                body.classList.remove(
                    "no-scroll"
                );


                if (menuToggle) {

                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );

                    if (icon) {

                        icon.className =
                            "fa-solid fa-bars";

                    }

                }

            }

        }
    );


    /* =====================================================
       IMAGE FALLBACK
    ====================================================== */

    const profileImage =
        document.querySelector(
            ".profile-image"
        );


    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                profileImage.style.display =
                    "none";

                const wrapper =
                    profileImage.parentElement;

                if (wrapper) {

                    wrapper.style.minHeight =
                        "280px";

                    wrapper.style.display =
                        "grid";

                    wrapper.style.placeItems =
                        "center";

                    wrapper.innerHTML =
                        `
                        <div style="
                            width:140px;
                            height:140px;
                            border-radius:50%;
                            display:grid;
                            place-items:center;
                            background:linear-gradient(135deg,#6c63ff,#20d6c7);
                            color:white;
                            font-family:Space Grotesk,sans-serif;
                            font-size:42px;
                            font-weight:700;
                        ">
                            AR
                        </div>
                        `;

                }

            }
        );

    }

});
```
