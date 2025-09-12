var popupModule = (function () {
  var nameModule = "popup";
  popupsTargets = document.querySelectorAll("[data-target]");
  popupsDismiss = document.querySelectorAll("[data-dismiss]");

  var maxRow = 7;
  var myScroll;

  function init() {
    console.log("INIT::", nameModule);
    setPopups();
    // scrollI("#scrollContainer", "elevatorContainer", function () {});
    // window.addEventListener("resize", refreshIScroll);
  }

  function setPopups() {
    for (var i = 0; i < popupsTargets.length; i++) {
      popupsTargets[i].addEventListener("click", function () {
        var target = this.dataset.target;
        if (target === "popup_1") {
          initCalculator();
          initEventAddRow();
          attachDelegatedListeners();
          updateTotal();
         
        }
        document.getElementById(target).classList.add("show");
        var sections = document.querySelectorAll("section");
        for (var i = 0; i < sections.length; i++) {
          sections[i].classList.add("blur");
        }
        var header = document.getElementById("header");
        header.classList.add("blur");
        var footer = document.getElementById("footer");
        footer.classList.add("blur");
        var popup = document.getElementById(target);
        popup.classList.remove("blur");
      });
    }
    for (var i = 0; i < popupsDismiss.length; i++) {
      popupsDismiss[i].addEventListener("click", function () {
        var target = this.dataset.dismiss;
        document.getElementById(target).classList.remove("show");
        var sections = document.querySelectorAll("section");
        for (var i = 0; i < sections.length; i++) {
          sections[i].classList.remove("blur");
        }
        var header = document.getElementById("header");
        header.classList.remove("blur");
        var footer = document.getElementById("footer");
        footer.classList.remove("blur");
      });
    }
  }

  function refreshIScroll() {
    myScroll.refresh();
  }

  function scrollI(scrolled) {
    myScroll = new IScroll(scrolled, {
      scrollbars: "custom",
      resizeScrollbars: false,

      zoom: true,
      mouseWheel: true,
      wheelAction: "zoom",
      probeType: 3,
      bounce: false,
      interactiveScrollbars: true,
      onBeforeScrollStart: function (e) {},
      onScrollStart: function (e) {},
    });
  }

  function htmlTemplateRow(index) {
    return (
      `<td>Periodo ${index}</td>
                  <td>
                  <input data-row=` +
      index +
      ` type="number" name="frequency" required="true" data-error="" data-error-visible="true" min="1" max="24" value="" class="input">
                  </td>
                  <td>
                  <input data-row=` +
      index +
      ` type="number" name="from" required="true" data-error="" data-error-visible="true" min="1" max="300" value="1" class="input">
                  </td>
                  <td>
                  <input data-row=` +
      index +
      ` type="number" name="to" required="true" data-error="" data-error-visible="true" min="1" max="300" value="2" class="input">
                  </td>
                  <td>
                  <div data-row=` +
      index +
      ` class="result_dosis">/</div>
                  </td>
                  </tr>`
    );
  }
  function addRow() {
    var tbody = document.getElementById("table_calculator_tbody");
    var addRowTr = tbody.querySelector(".col_add_row"); // ligne contenant le bouton

    // Calcule un index pour la nouvelle ligne (exclut la ligne bouton et la ligne total)
    var dataRowsCount = Array.from(tbody.querySelectorAll("tr")).filter(
      (tr) =>
        !tr.classList.contains("col_add_row") &&
        !tr.querySelector(".total_info")
    ).length;

    // Déterminer la valeur par défaut de "Desde el día" = (Hasta de la ligne précédente) + 1
    var existingRows = Array.from(tbody.querySelectorAll("tr")).filter(
      function (tr) {
        return (
          !tr.classList.contains("col_add_row") &&
          !tr.querySelector(".total_info")
        );
      }
    );
    var prevRow = existingRows.length
      ? existingRows[existingRows.length - 1]
      : null;
    var nextFromValue = "";
    if (prevRow) {
      var prevTds = prevRow.querySelectorAll("td");
      var prevHastaInput = prevTds[3] && prevTds[3].querySelector("input");
      var prevHasta = prevHastaInput ? Number(prevHastaInput.value) : NaN;
      if (isFinite(prevHasta)) nextFromValue = String(prevHasta + 1);
    }

    // IMPORTANT: htmlTemplateRow doit retourner un TR complet ou on le wrap ici
    var tr = document.createElement("tr");
    tr.innerHTML = htmlTemplateRow(dataRowsCount + 1); // injecte les TD

    // Insère avant la ligne avec le bouton
    tbody.insertBefore(tr, addRowTr);

    // Renseigner la valeur par défaut pour "Desde el día" sur la nouvelle ligne
    try {
      var newTds = tr.querySelectorAll("td");
      var desdeInput = newTds[2] && newTds[2].querySelector("input");
      var hastaInput = newTds[3] && newTds[3].querySelector("input");
      if (desdeInput && nextFromValue !== "") {
        desdeInput.value = nextFromValue;
        // Par défaut: Hasta = Desde + 1
        if (hastaInput) {
          var dVal = Number(desdeInput.value);
          if (isFinite(dVal)) {
            hastaInput.value = String(dVal + 1);
          }
        }
      }
    } catch (e) {}

    updateAddRowState();
    // Calcul initial de la ligne ajoutée + MAJ total
    calculateRowAndRender(tr);
    updateTotal();
  }
  function getDataRowsCount() {
    var tbody = document.getElementById("table_calculator_tbody");
    if (!tbody) return 0;
    return Array.from(tbody.querySelectorAll("tr")).filter(
      (tr) =>
        !tr.classList.contains("col_add_row") &&
        !tr.querySelector(".total_info")
    ).length;
  }

  function updateAddRowState() {
    var btn = document.getElementById("add_row_in_calculator");
    if (!btn) return;
    var count = getDataRowsCount();

    var disabled = count >= maxRow;

    btn.toggleAttribute("disabled", disabled);
  }

  // -----------------------------
  // Calculs "Número de dosis"
  // Excel: =SI(ET(B<>"";C<>"";D<>"";B>0);ENT(((D-C+1)*24)/B);0)
  // Ici: B=freq (heures), C=fromDay, D=toDay
  function computeDoses(freq, fromDay, toDay) {
    var f = Number(freq);
    var c = Number(fromDay);
    var d = Number(toDay);
    if (!isFinite(f) || !isFinite(c) || !isFinite(d)) return 0;
    if (f <= 0) return 0;
    // ENT -> Math.floor
    return Math.floor(((d - c + 1) * 24) / f);
  }

  // Récupère les valeurs d'une ligne et rend le résultat dans la 5e cellule si présente
  function calculateRowAndRender(tr) {
    if (!tr || tr.classList.contains("col_add_row")) return 0;
    var tds = tr.querySelectorAll("td");
    // On s'appuie sur l'ordre: [Periodo][freq][from][to][result]
    var freqInput = tds[1] && tds[1].querySelector("input");
    var fromInput = tds[2] && tds[2].querySelector("input");
    var toInput = tds[3] && tds[3].querySelector("input");

    var freq = freqInput ? Number(freqInput.value) : NaN;
    var fromDay = fromInput ? Number(fromInput.value) : NaN;
    var toDay = toInput ? Number(toInput.value) : NaN;

    var value = computeDoses(freq, fromDay, toDay);

    // Rendu si cellule résultat existe
    var resultCell = tds[4];
    if (resultCell) {
      var slot = resultCell.querySelector(".result_dosis");
      if (slot) slot.textContent = String(value);
    }
    return value;
  }

  function updateTotal() {
    var tbody = document.getElementById("table_calculator_tbody");
    if (!tbody) return;
    var sum = 0;
    var rows = Array.from(tbody.querySelectorAll("tr")).filter(function (tr) {
      return (
        !tr.classList.contains("col_add_row") &&
        !tr.querySelector(".total_info")
      );
    });
    rows.forEach(function (tr) {
      // Si la cellule résultat existe et contient une valeur, on l'utilise, sinon on recalcule
      var tds = tr.querySelectorAll("td");
      var slot = tds[4] && tds[4].querySelector(".result_dosis");
      var n = slot ? Number(slot.textContent) : NaN;
      if (!isFinite(n)) n = calculateRowAndRender(tr);
      sum += Number(n) || 0;
    });

    var totalEl =
      tbody.parentElement && tbody.parentElement.querySelector(".total");
    if (totalEl) totalEl.textContent = String(sum);
  }

  function attachDelegatedListeners() {
    var tbody = document.getElementById("table_calculator_tbody");
    if (!tbody) return;

    // Un seul listener pour tous les inputs numériques (dynamiques inclus)
    tbody.addEventListener("input", (e) => {
     
      console.log(e.target.name);
      if (!e.target.matches("input.input[type='number']")) return;

      if(e.target.name === "frequency") {
        e.target.addEventListener("beforeinput", (e) => {
          if (e.data && /[.,]/.test(e.data)) {
            e.preventDefault();
          }
        });
      }

      var tr = e.target.closest("tr");
      if (!tr || tr.classList.contains("col_add_row")) return; // ignorer la ligne-bouton

      // Exemple: récupérer les valeurs de la ligne et recalculer
      var inputs = tr.querySelectorAll("input.input[type='number']");
      var values = Array.from(inputs).map((i) => Number(i.value) || 0);

      // TODO: calcule le résultat pour la ligne si nécessaire
      // tr.querySelector(".result_dosis")?.textContent = monCalcul(values);
      calculateRowAndRender(tr);
      // TODO: recalcule le total global si nécessaire
      // updateTotal();
      updateTotal();
    });
  }

  // function initEventInput() {
  //   var tableCalculator = document.getElementById("table_calculator_tbody");
  //   if (!tableCalculator) return;
  //   var frequencyInputs = tableCalculator.querySelectorAll(
  //     "input[name=frequency]"
  //   );
  //   for (var i = 0; i < frequencyInputs.length; i++) {
  //     //  bodyWeightInputs[i].addEventListener("blur", function () {
  //     //    handleBodyWeightChange(table, this);
  //     //  });

  //     frequencyInputs[i].addEventListener("beforeinput", (e) => {
  //       if (e.data && /[.,]/.test(e.data)) {
  //         e.preventDefault();
  //       }
  //     });

  //     //  bodyWeightInputs[i].addEventListener("keyup", function (event) {
  //     //    if (event.keyCode === 13) {
  //     //      handleBodyWeightChange(table, this);
  //     //    }
  //     //  });
  //   }
  // }

  function initEventAddRow() {
    var button = document.getElementById("add_row_in_calculator");
    button.addEventListener("click", addRow);
  }

  function initCalculator() {
    document.getElementById(
      "popup_1_text"
    ).innerHTML = `<table class='tool_content--table' id='table_calculator'>
   <thead id="table_calculator_thead">
    <tr>
    <th>Periodo</th>
     <th>Frecuencia (cada X horas)</th>
     <th>Desde el día</th>
     <th>Hasta el día</th>
     <th>Número de dosis</th>
    </tr>
    </thread>    
    </table>
     <div id="table_wrapper">
                <table id="tables_body" class="tool_content--table">
                  <tbody id="table_calculator_tbody">
                  ${htmlTemplateRow(1)}
                  <tr class="col_add_row">
                  <td class="col_1 col_rowspan">
                  <button id="add_row_in_calculator" class="add_row_in_calculator"><img src="./assets/medias/icon_mini.png" alt="" width="50" height="50"></button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                  <div></div>
                  </td>
                  </tr>

                  <tr class="total_info_tr">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                  <div class="total_info">TOTAL</div>
                  </td>
                  <td>
                  <div class="total">/</div>
                  </td>
                  </tr>

                  </tbody>
                 
                </table>
              </div>
    `;
  }

  return {
    init: init,
  };
})();
