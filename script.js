document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const form = document.getElementById("subscribeForm");
  const emailInput = document.getElementById("email");
  const message = document.getElementById("formMessage");

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Header style on scroll
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu toggle
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  };
  navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => setMenu(false))
  );

  // Highlight active nav link while scrolling
  const sections = document.querySelectorAll("main section[id]");
  const links = nav.querySelectorAll("a[href^='#']");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));

  // Subscribe form
  const showMessage = (text, type) => {
    message.textContent = text;
    message.className = "form-message " + type;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      showMessage("Please enter a valid email address.", "error");
      emailInput.focus();
      return;
    }

    // TODO: send `email` to your backend or email service here.
    showMessage("Thanks for subscribing! Check your inbox soon.", "success");
    form.reset();
  });
});
