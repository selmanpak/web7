function initRevealAnimations() {
  const revealItems = document.querySelectorAll('.reveal');

  if (!revealItems.length) {
    document.body.classList.add('reveal-ready');
    return;
  }

  revealItems.forEach((item) => item.classList.remove('in'));

  const revealFallback = () => {
    document.body.classList.add('reveal-ready');
    revealItems.forEach((item) => item.classList.add('in'));
  };

  if (!('IntersectionObserver' in window)) {
    requestAnimationFrame(revealFallback);
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
      document.body.classList.add('reveal-ready');
    });
  });
}

document.addEventListener('DOMContentLoaded', initRevealAnimations);
