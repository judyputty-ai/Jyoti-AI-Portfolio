/**
 * Jyoti Putty — portfolio scripts
 */

/* In-page sections on index.html (other sections are separate pages). */
const INDEX_SCROLL_SECTION_IDS = ["home", "about", "projects", "contact"];

function navHeight() {
    const nav = document.querySelector(".site-nav");
    return nav ? nav.getBoundingClientRect().height : 0;
}

function setActiveNavLink(activeId) {
    const links = document.querySelectorAll(".site-nav__link[data-section]");
    links.forEach((link) => {
        const isActive = link.dataset.section === activeId;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function updateActiveNavFromScroll() {
    const y = window.scrollY + navHeight() + 12;
    let activeId = "home";
    for (const id of INDEX_SCROLL_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) {
            activeId = id;
        }
    }
    setActiveNavLink(activeId);
}

document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    const singlePageHome = document.getElementById("home");
    if (singlePageHome) {
        updateActiveNavFromScroll();
        window.addEventListener("scroll", updateActiveNavFromScroll, { passive: true });
        window.addEventListener("resize", updateActiveNavFromScroll);
        window.addEventListener("hashchange", () => {
            requestAnimationFrame(updateActiveNavFromScroll);
        });
    } else if (window.location.pathname.toLowerCase().endsWith("about.html")) {
        setActiveNavLink("about");
    } else if (window.location.pathname.toLowerCase().endsWith("projects.html")) {
        setActiveNavLink("projects");
    } else if (window.location.pathname.toLowerCase().endsWith("products.html")) {
        setActiveNavLink("products");
    } else if (window.location.pathname.toLowerCase().endsWith("contact.html")) {
        setActiveNavLink("contact");
    }

    initMobileNav();
    initDarkMode();
    initScrollProgress();
});

window.addEventListener("load", () => {
    if (document.getElementById("home")) {
        requestAnimationFrame(updateActiveNavFromScroll);
    }
});

const NAV_MOBILE_MAX_PX = 767;

function initMobileNav() {
    const nav = document.querySelector(".site-nav");
    const toggle = document.querySelector(".site-nav__toggle");
    const panel = document.getElementById("site-nav-panel");
    if (!nav || !toggle || !panel) {
        return;
    }

    function syncNavPanelAria() {
        if (window.innerWidth > NAV_MOBILE_MAX_PX) {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation menu");
            panel.removeAttribute("aria-hidden");
        } else {
            const open = nav.classList.contains("is-open");
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
            panel.setAttribute("aria-hidden", String(!open));
        }
    }

    function setNavOpen(open) {
        if (window.innerWidth > NAV_MOBILE_MAX_PX) {
            return;
        }
        nav.classList.toggle("is-open", Boolean(open));
        if (window.innerWidth <= NAV_MOBILE_MAX_PX) {
            const isOpen = Boolean(open);
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
            panel.setAttribute("aria-hidden", String(!isOpen));
        }
    }

    toggle.addEventListener("click", () => {
        if (window.innerWidth > NAV_MOBILE_MAX_PX) {
            return;
        }
        setNavOpen(!nav.classList.contains("is-open"));
    });

    panel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= NAV_MOBILE_MAX_PX) {
                setNavOpen(false);
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
            setNavOpen(false);
            toggle.focus();
        }
    });

    window.addEventListener("resize", syncNavPanelAria);
    syncNavPanelAria();
}

function initDarkMode() {
    const toggle = document.getElementById("dark-mode-toggle");
    const icon = toggle.querySelector(".site-nav__dark-icon");
    if (!toggle || !icon) {
        return;
    }

    // Load preference from localStorage
    const isDark = localStorage.getItem("dark-mode") === "true";
    document.body.classList.toggle("dark-mode", isDark);
    icon.textContent = isDark ? "☀️" : "🌙";

    // Toggle on click
    toggle.addEventListener("click", () => {
        const isDarkNow = document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", isDarkNow);
        icon.textContent = isDarkNow ? "☀️" : "🌙";
    });
}

function initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");
    if (!progressBar) {
        return;
    }

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + "%";
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress(); // Initial call
}
