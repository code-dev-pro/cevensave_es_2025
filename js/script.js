var CalculateurModule = (function () {
  console.log('IS-PHONE : ', DetectDeviceresizeModule.isPhone());
  console.log('IS-TABLET : ', DetectDeviceresizeModule.isTablet());

  function hasTouch() {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  if (!hasTouch()) {
    document.body.classList.add('hasHover');
  }

  languageModule.init();
  fullscreenModule.init();
  welcomeModule.init();
  popupModule.init();
  toolModule.init();
  outputModule.init();
})();
