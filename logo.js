// Animation des logos de marques
const brandLogos = document.querySelectorAll('.brand-logo');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('grayscale');
    } else {
      entry.target.classList.add('grayscale');
    }
  });
}, observerOptions);

brandLogos.forEach((logo) => {
  observer.observe(logo);
});