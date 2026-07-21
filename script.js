(() => {
  const menuButton = document.querySelector('.mobile-menu-toggle');
  const menuPanel = document.querySelector('.mobile-menu-panel');

  const closeMenu = () => {
    if (!menuButton || !menuPanel) return;
    menuButton.classList.remove('open');
    menuPanel.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  if (menuButton && menuPanel) {
    menuButton.addEventListener('click', () => {
      const willOpen = !menuButton.classList.contains('open');
      menuButton.classList.toggle('open', willOpen);
      menuPanel.classList.toggle('open', willOpen);
      menuButton.setAttribute('aria-expanded', String(willOpen));
    });
    menuPanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });
  }

  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('button');
    const answer = item.querySelector('.faq-answer');
    const symbol = button?.querySelector('b');
    if (!button || !answer || !symbol) return;

    button.addEventListener('click', () => {
      const opening = !item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem === item) return;
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer')?.classList.remove('open');
        const openButton = openItem.querySelector('button');
        openButton?.setAttribute('aria-expanded', 'false');
        const openSymbol = openButton?.querySelector('b');
        if (openSymbol) openSymbol.textContent = '+';
      });
      item.classList.toggle('open', opening);
      answer.classList.toggle('open', opening);
      button.setAttribute('aria-expanded', String(opening));
      symbol.textContent = opening ? '−' : '+';
    });
  });
})();
