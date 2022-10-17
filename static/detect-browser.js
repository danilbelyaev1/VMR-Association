if (
  location.pathname !== '/browser_not_supported.html' &&
  /Trident|MSIE/.test(navigator.userAgent)
)
  window.location = '/browser_not_supported.html'
