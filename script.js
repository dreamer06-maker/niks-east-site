const root = document.documentElement;
const tabs = document.querySelectorAll(".tab");
const filterItems = document.querySelectorAll("[data-kind]");
const year = document.querySelector("#year");
const revealItems = document.querySelectorAll(".reveal");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateScroll = () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  root.style.setProperty("--scroll", `${percent}%`);
};

window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

window.addEventListener(
  "pointermove",
  (event) => {
    root.style.setProperty("--mouse-x", `${event.clientX}px`);
    root.style.setProperty("--mouse-y", `${event.clientY}px`);
    root.style.setProperty("--tilt", `${(event.clientX / window.innerWidth - 0.5) * 20}`);
  },
  { passive: true }
);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
    });

    filterItems.forEach((item) => {
      const shouldShow = filter === "all" || item.dataset.kind === filter;
      item.classList.toggle("hidden", !shouldShow);
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
  observer.observe(item);
});
