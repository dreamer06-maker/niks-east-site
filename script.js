const root = document.documentElement;
const body = document.body;
root.classList.add("js-enabled");

const year = document.querySelector("#year");
const revealItems = document.querySelectorAll(".reveal");
const descentSection = document.querySelector(".descent-section");
const tiltCards = document.querySelectorAll(".tilt-card");

if (year) {
  year.textContent = new Date().getFullYear();
}

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

const updateScrollState = () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  root.style.setProperty("--progress", `${progress * 100}%`);

  if (descentSection) {
    const rect = descentSection.getBoundingClientRect();
    const travel = Math.max(rect.height - window.innerHeight, 1);
    const descent = clamp(-rect.top / travel);
    root.style.setProperty("--descent", descent.toFixed(3));
    body.dataset.zone = descent > 0.62 || progress > 0.38 ? "ground" : "space";
  }
};

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
updateScrollState();

window.addEventListener(
  "pointermove",
  (event) => {
    root.style.setProperty("--mouse-x", `${event.clientX}px`);
    root.style.setProperty("--mouse-y", `${event.clientY}px`);
  },
  { passive: true }
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
  if (window.location.hash) {
    item.classList.add("visible");
  }
  observer.observe(item);
});

tiltCards.forEach((card) => {
  card.addEventListener(
    "pointermove",
    (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`;
    },
    { passive: true }
  );

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
