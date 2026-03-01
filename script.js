(function () {
    const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
    const sectionIds = navLinks.map((link) => link.getAttribute("data-nav"));
    const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    const header = document.querySelector(".site-header");

    if (!navLinks.length || !sections.length) {
        return;
    }

    const setActive = (id) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute("data-nav") === id;
            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    const getHeaderOffset = () => (header ? header.offsetHeight : 0) + 12;

    const getCurrentSectionId = () => {
        const marker = window.scrollY + getHeaderOffset() + window.innerHeight * 0.25;
        let currentId = sections[0].id;

        sections.forEach((section) => {
            if (marker >= section.offsetTop) {
                currentId = section.id;
            }
        });

        const viewportBottom = window.scrollY + window.innerHeight;
        const pageBottom = document.documentElement.scrollHeight - 2;
        if (viewportBottom >= pageBottom) {
            currentId = sections[sections.length - 1].id;
        }
        return currentId;
    };

    let ticking = false;
    const updateActiveFromScroll = () => {
        setActive(getCurrentSectionId());
        ticking = false;
    };

    const onScroll = () => {
        if (ticking) {
            return;
        }
        ticking = true;
        window.requestAnimationFrame(updateActiveFromScroll);
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const id = link.getAttribute("data-nav");
            if (id) {
                setActive(id);
            }
        });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);

    setActive(getCurrentSectionId());
})();
