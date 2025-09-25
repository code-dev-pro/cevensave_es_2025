var popupModule = (function () {
  var nameModule = "popup";
  popupsTargets = document.querySelectorAll("[data-target]");
  popupsDismiss = document.querySelectorAll("[data-dismiss]");

  var maxRow = 7;
  var myScroll;
  var STORAGE_KEY = "popup_calculator_state";

  function init() {
    console.log("INIT::", nameModule);
    setPopups();
  }

  function setPopups() {
    for (var i = 0; i < popupsTargets.length; i++) {
      popupsTargets[i].addEventListener("click", function () {
        var target = this.dataset.target;
        if (target === "popup_1") {
          initCalculator();

          restoreTableState();
          initEventAddRow();
          attachDelegatedListeners();
          initResetButton();
          updateAddRowState();
          updateTotal();
          validateTableSequence();
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

        saveTableState();
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

  function resetCalculator() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}

    initCalculator();

    initEventAddRow();

    attachDelegatedListeners();
    initResetButton();
    updateAddRowState();
    updateTotal();
    validateTableSequence();
  }

  function initResetButton() {
    var btn = document.getElementById("reset_calculator");
    if (!btn) return;
    btn.addEventListener("click", function () {
      resetCalculator();
    });
  }

  // -----------------------------
  // Persistance en localStorage
  // -----------------------------
  function getTableState() {
    var tbody = document.getElementById("table_calculator_tbody");
    if (!tbody) return { rows: [] };
    var rows = Array.from(tbody.querySelectorAll("tr")).filter(function (tr) {
      return (
        !tr.classList.contains("col_add_row") &&
        !tr.querySelector(".total_info")
      );
    });
    var data = rows.map(function (tr) {
      var tds = tr.querySelectorAll("td");
      var freq =
        tds[1] && tds[1].querySelector("input")
          ? tds[1].querySelector("input").value
          : "";
      var from =
        tds[2] && tds[2].querySelector("input")
          ? tds[2].querySelector("input").value
          : "";
      var to =
        tds[3] && tds[3].querySelector("input").value
          ? tds[3].querySelector("input").value
          : "";
      return { frequency: freq, from: from, to: to };
    });
    return { rows: data };
  }

  function saveTableState() {
    try {
      var state = getTableState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Silencieux: localStorage peut être indisponible (mode privé, etc.)
    }
  }

  function restoreTableState() {
    var raw = null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}
    if (!raw) return;
    var parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return;
    }
    if (!parsed || !Array.isArray(parsed.rows)) return;

    var tbody = document.getElementById("table_calculator_tbody");
    if (!tbody) return;

    var rows = parsed.rows.slice(0, maxRow); 
    if (rows.length === 0) {
     
      return;
    }

    // Nettoie les lignes de données actuelles uniquement si on va restaurer
    Array.from(tbody.querySelectorAll("tr")).forEach(function (tr) {
      if (
        !tr.classList.contains("col_add_row") &&
        !tr.querySelector(".total_info")
      ) {
        tr.remove();
      }
    });

    var addRowTr = tbody.querySelector(".col_add_row");
    rows.forEach(function (row, idx) {
      var tr = document.createElement("tr");
      tr.innerHTML = htmlTemplateRow(idx + 1);
      tbody.insertBefore(tr, addRowTr);
      try {
        var tds = tr.querySelectorAll("td");
        var freqInput = tds[1] && tds[1].querySelector("input");
        var fromInput = tds[2] && tds[2].querySelector("input");
        var toInput = tds[3] && tds[3].querySelector("input");
        if (freqInput) freqInput.value = row.frequency || "";
        if (fromInput) fromInput.value = row.from || "";
        if (toInput) toInput.value = row.to || "";
        
        calculateRowAndRender(tr);
      } catch (e) {}
    });
    updateTotal();
  }

  function htmlTemplateRow(index) {
    return (
      `<td>Periodo ${index}</td>
                  <td>
                  <input data-row=` +
      index +
      ` type="number" name="frequency" inputmode="numeric" required="true" step="1" data-error="" data-error-visible="true" min="1" max="24" value="" class="input">
                  </td>
                  <td>
                  <input data-row=` +
      index +
      ` type="number" name="from" inputmode="numeric" required="true" step="1" data-error="" data-error-visible="true" min="1" max="99" value="1" class="input">
                  </td>
                  <td>
                  <input data-row=` +
      index +
      ` type="number" name="to" inputmode="numeric" required="true" step="1" data-error="" data-error-visible="true" min="1" max="99" value="2" class="input">
                  </td>
                  <td>
                  <div data-row=` +
      index +
      ` class="result_dosis">/</div>
                  </td>
                  <td class="col_action">` +
      (index >= 2
        ? `<img src="./assets/medias/icon_mini_trash.png" alt="delete" width="50" height="50" class="trash">`
        : ``) +
      `</td>
                  
                  </tr>`
    );
  }
  function addRow() {
    var tbody = document.getElementById("table_calculator_tbody");
    var addRowTr = tbody.querySelector(".col_add_row"); 

 
    var dataRowsCount = Array.from(tbody.querySelectorAll("tr")).filter(
      (tr) =>
        !tr.classList.contains("col_add_row") &&
        !tr.querySelector(".total_info")
    ).length;

   
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

   
    var tr = document.createElement("tr");
    tr.innerHTML = htmlTemplateRow(dataRowsCount + 1);

   
    tbody.insertBefore(tr, addRowTr);

   
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
  
    calculateRowAndRender(tr);
    updateTotal();
    saveTableState();
    updateDeleteIcons();
    validateTableSequence();
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
   
    return Math.floor(((d - c + 1) * 24) / f);
  }

 
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

  // Fonction de validation pour limiter les valeurs dans les bornes définies
  function validateInputValue(input) {
    if (!input || input.type !== "number") return;

    var value = Number(input.value);
    var min = Number(input.getAttribute("min"));
    var max = Number(input.getAttribute("max"));

    // Si la valeur n'est pas un nombre valide, on ne fait rien
    if (!isFinite(value)) return;

    // Si les attributs min/max ne sont pas définis, on ne fait rien
    if (!isFinite(min) || !isFinite(max)) return;

    // Applique les limites et corrige automatiquement si nécessaire
    if (value < min) {
      input.value = String(min);
    } else if (value > max) {
      input.value = String(max);
    }
  }

  function attachDelegatedListeners() {
    var tbody = document.getElementById("table_calculator_tbody");
    if (!tbody) return;

    tbody.addEventListener("beforeinput", (e) => {
      if (e.data && /[.,]/.test(e.data)) {
        e.preventDefault();
      }
      if (e.target.name === "frequency") {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }
      if (e.target.name === "from") {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }
      if (e.target.name === "to") {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }
    });

    // validation de l'input au blur
    tbody.addEventListener("blur", (e) => {
      if (!e.target.matches("input.input[type='number']")) return;

      validateInputValue(e.target);
    });

    tbody.addEventListener("input", (e) => {
      if (!e.target.matches("input.input[type='number']")) return;

      // validateInputValue(e.target);

      var tr = e.target.closest("tr");
      if (!tr || tr.classList.contains("col_add_row")) return;

      var inputs = tr.querySelectorAll("input.input[type='number']");
      var values = Array.from(inputs).map((i) => Number(i.value) || 0);

      calculateRowAndRender(tr);

      updateTotal();
      saveTableState();
      validateTableSequence();
    });

    tbody.addEventListener(
      "blur",
      (e) => {
        if (!e.target.matches("input.input[type='number']")) return;

        validateInputValue(e.target);

        var tr = e.target.closest("tr");
        if (!tr || tr.classList.contains("col_add_row")) return;

        calculateRowAndRender(tr);
        updateTotal();
        saveTableState();
        validateTableSequence();
      },
      true
    );

    tbody.addEventListener("click", function (e) {
      var target = e.target;
      if (!(target && target.classList && target.classList.contains("trash")))
        return;
      var tr = target.closest("tr");
      if (!tr) return;

      tr.remove();

      var rows = Array.from(tbody.querySelectorAll("tr")).filter(function (
        row
      ) {
        return (
          !row.classList.contains("col_add_row") &&
          !row.querySelector(".total_info")
        );
      });
      rows.forEach(function (row, i) {
        var firstTd = row.querySelector("td");
        if (firstTd) firstTd.textContent = "Periodo " + (i + 1);
      });

      updateTotal();
      updateAddRowState();
      updateDeleteIcons();
      saveTableState();
      validateTableSequence();
    });
  }

  function validateTableSequence() {
    var tbody = document.getElementById("table_calculator_tbody");
    if (!tbody) return;
    var rows = Array.from(tbody.querySelectorAll("tr")).filter(function (tr) {
      return (
        !tr.classList.contains("col_add_row") &&
        !tr.querySelector(".total_info")
      );
    });

    var isValid = true;
    var prevHasta = null;

    // Nettoie les anciens états d'erreur
    rows.forEach(function (tr) {
      var tds = tr.querySelectorAll("td");
      var desdeInput = tds[2] && tds[2].querySelector("input");
      if (desdeInput) desdeInput.parentElement.classList.remove("error");
    });

    rows.forEach(function (tr, idx) {
      var tds = tr.querySelectorAll("td");
      var desdeInput = tds[2] && tds[2].querySelector("input");
      var hastaInput = tds[3] && tds[3].querySelector("input");
      var desde = desdeInput ? Number(desdeInput.value) : NaN;
      var hasta = hastaInput ? Number(hastaInput.value) : NaN;

      if (idx === 0) {
        prevHasta = isFinite(hasta) ? hasta : null;
        return;
      }
      if (isFinite(desde) && prevHasta !== null) {
        if (!(desde > prevHasta)) {
          isValid = false;
          if (desdeInput) desdeInput.parentElement.classList.add("error");
        }
      }
      prevHasta = isFinite(hasta) ? hasta : prevHasta;
    });

    var errorEl = document.getElementById("table_calc_error");
    if (!errorEl) return;
    if (isValid) {
      errorEl.classList.add("hide");
      errorEl.classList.remove("show");
      errorEl.textContent = "";
    } else {
      errorEl.textContent =
        "El valor debe ser mayor que el valor anterior en la lista para que sea válido.";
      errorEl.classList.remove("hide");
      errorEl.classList.add("show");
    }

    // Désactive/active le bouton d'ajout si invalide
    // var addBtn = document.getElementById("add_row_in_calculator");
    // if (addBtn) addBtn.toggleAttribute("disabled", !isValid || getDataRowsCount() >= maxRow);
  }

  function initEventAddRow() {
    var button = document.getElementById("add_row_in_calculator");

    if (!button) return;
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (button.hasAttribute("disabled")) return;
      addRow();
    });
  }

  function initCalculator() {
    document.getElementById(
      "popup_1_text"
    ).innerHTML = `<div class="table_actions"><button id="reset_calculator" class="reset_calculator">Reiniciar</button></div>
    <table class='tool_content--table' id='table_calculator'>
   <thead id="table_calculator_thead">
    <tr>
    <th>Periodo</th>
     <th>Frecuencia (cada X horas)</th>
     <th>Desde el día</th>
     <th>Hasta el día</th>
     <th>Número de dosis</th>
     <th></th>
    </tr>
    </thread>    
    </table>
     <div id="table_wrapper_calculator">
                <table id="tables_body" class="tool_content--table">
                  <tbody id="table_calculator_tbody">
                  ${htmlTemplateRow(1)}
                  <tr class="col_add_row">
                  <td class="col_1 col_rowspan">
                  <button type="button" id="add_row_in_calculator" class="add_row_in_calculator"><img src="./assets/medias/icon_mini.png" alt="" width="50" height="50"></button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                  <div></div>
                  </td>
                  <td></td>
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
                  <td></td>
                  </tr>

                  </tbody>
                 
                </table>
              <div id="table_calc_error" class="calc_error hide"></div>
              </div>
    `;
  }

  // Met à jour l'affichage des icônes poubelle selon la position des lignes (>= 2)
  function updateDeleteIcons() {
    var tbody = document.getElementById("table_calculator_tbody");
    if (!tbody) return;
    var dataRows = Array.from(tbody.querySelectorAll("tr")).filter(function (
      tr
    ) {
      return (
        !tr.classList.contains("col_add_row") &&
        !tr.querySelector(".total_info")
      );
    });
    dataRows.forEach(function (tr, idx) {
      var tds = tr.querySelectorAll("td");
      var actionCell = tds[5];
      if (!actionCell) return;
      // Nettoie la cellule
      actionCell.innerHTML = "";
      if (idx >= 1) {
        var img = document.createElement("img");
        img.src = "./assets/medias/icon_mini_trash.png";
        img.alt = "delete";
        img.width = 50;
        img.height = 50;
        img.className = "trash";
        actionCell.appendChild(img);
      }
    });
  }

  return {
    init: init,
  };
})();
