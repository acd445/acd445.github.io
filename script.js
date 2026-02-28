(function () {
    const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
    const sectionIds = navLinks.map((link) => link.getAttribute("data-nav"));
    const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

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

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visible.length) {
                setActive(visible[0].target.id);
            }
        },
        {
            root: null,
            rootMargin: "-35% 0px -50% 0px",
            threshold: [0.2, 0.45, 0.7]
        }
    );

    sections.forEach((section) => observer.observe(section));

    setActive("home");
})();
