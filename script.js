const root = document.documentElement;
root.classList.add("js-enabled");

const tabs = document.querySelectorAll(".tab");
const filterItems = document.querySelectorAll("[data-kind]");
const year = document.querySelector("#year");
const revealItems = document.querySelectorAll(".reveal");
const rebirth = document.querySelector(".rebirth-section");
const rebirthStage = document.querySelector(".rebirth-stage");

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

if (rebirth && rebirthStage) {
  rebirthStage.addEventListener(
    "pointermove",
    (event) => {
      const rect = rebirthStage.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      rebirth.classList.add("is-awake");
      rebirthStage.style.setProperty("--stage-x", `${x}%`);
      rebirthStage.style.setProperty("--stage-y", `${y}%`);
    },
    { passive: true }
  );

  rebirthStage.addEventListener("pointerleave", () => {
    rebirth.classList.remove("is-awake");
  });
}

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

  if (window.location.hash) {
    item.classList.add("visible");
  }

  observer.observe(item);
});
