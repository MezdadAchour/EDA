window.addEventListener('load', function() {
    const categories = document.querySelectorAll('.col-3');
  
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });
  
    categories.forEach(function(category) {
      observer.observe(category);
    });
  });