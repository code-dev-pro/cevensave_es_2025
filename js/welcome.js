var welcomeModule = (function () {
  var nameModule = 'welcome';
  var cevensave = {};

  function setDom() {
    cevensave.toolButton = document.getElementById('tool_button');
    cevensave.outputButton = document.getElementById('output_button');
    cevensave.toolButton = document.getElementById('tool_button');
    cevensave.toolSection = document.getElementById('tool');
    cevensave.outputSection = document.getElementById('output');
    cevensave.homeButton = document.getElementById('home_button');
    cevensave.welcomeSection = document.getElementById('welcome');
    cevensave.headerImg = document.getElementById('header_img');
    cevensave.logo = document.getElementById('logo');
    cevensave.logoP = document.querySelector('#logo p');
    cevensave.logoApp = document.querySelector('#logo_app');
    cevensave.popupButton = document.getElementById('popup_button');
    cevensave.ref = document.getElementById("references");
  }

  function init() {
    console.log('INIT::', nameModule);
    setDom();
    cevensave.toolButton.addEventListener('click', function () {
      cevensave.welcomeSection.style.display = 'none';
      cevensave.toolButton.style.display = 'none';
      cevensave.toolSection.style.display = 'flex';
      cevensave.outputButton.style.display = 'flex';
      cevensave.homeButton.style.display = 'block';
      cevensave.ref.style.display = 'none';
      // document.getElementById('header_img').style.top = '-70px';
       cevensave.headerImg.style.top = '-70px';
      
      cevensave.logo.style.maxHeight = '95px';
      cevensave.logoP.style.fontSize = '70px';
      cevensave.logoApp.style.fontSize = '32px';
      cevensave.popupButton.style.display = "flex";
    });
  }

  return {
    init: init,
  };
})();
