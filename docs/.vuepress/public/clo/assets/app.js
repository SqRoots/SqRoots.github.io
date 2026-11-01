(() => {
  const allowed = ['mint', 'sand', 'ink'];
  let theme = 'mint';
  try { theme = localStorage.getItem('operations-theme') || theme; } catch (_) {}
  if (!allowed.includes(theme)) theme = 'mint';
  document.documentElement.dataset.theme = theme;
  const control = document.getElementById('theme');
  if (control) {
    control.value = theme;
    control.addEventListener('change', () => {
      document.documentElement.dataset.theme = control.value;
      try { localStorage.setItem('operations-theme', control.value); } catch (_) {}
    });
  }
  document.querySelectorAll('.chart-scroll').forEach(el => {
    el.addEventListener('scroll', () => {
      const tooltip = document.getElementById('tooltipHOS');
      if (tooltip) tooltip.style.display = 'none';
    });
  });
})();
