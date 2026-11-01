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
  const search = document.getElementById('search');
  if (search) search.addEventListener('input', () => {
    let count = 0;
    document.querySelectorAll('.analysis-card').forEach(card => {
      card.hidden = !card.dataset.title.includes(search.value.trim());
      if (!card.hidden) count++;
    });
    document.getElementById('empty').hidden = count > 0;
  });
  // A backgrounded tab must renew access after the Shanghai calendar day changes.
  const shanghaiDay = () => new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date());
  const day = shanghaiDay();
  setInterval(() => { if (shanghaiDay() !== day) location.reload(); }, 30000);
  document.querySelectorAll('.chart-scroll').forEach(el => {
    el.addEventListener('scroll', () => {
      const tooltip = document.getElementById('tooltipHOS');
      if (tooltip) tooltip.style.display = 'none';
    });
  });
})();
