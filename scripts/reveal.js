function initRevealAnimations() {
  const revealItems = document.querySelectorAll('.reveal');

  if (!revealItems.length) return;

  revealItems.forEach((item) => item.classList.remove('in'));

  if (!('IntersectionObserver' in window)) {
    requestAnimationFrame(() => {
      revealItems.forEach((item) => item.classList.add('in'));
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      revealItems.forEach((item) => observer.observe(item));
    });
  });
}

document.addEventListener('DOMContentLoaded', initRevealAnimations);
