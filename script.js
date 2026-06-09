const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".work-card");
const featuredCards = document.querySelectorAll(".feature-card");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
    });

    [...cards, ...featuredCards].forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.kind === filter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});
