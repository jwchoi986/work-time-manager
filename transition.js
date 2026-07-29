function navigateTo(url) {
  document.body.classList.add('page-leaving');
  setTimeout(() => {
    window.location.href = url;
  }, 200);
}

document.addEventListener('click', e => {
  const link = e.target.closest('a[data-nav]');
  if (!link) return;
  e.preventDefault();
  navigateTo(link.getAttribute('href'));
});
