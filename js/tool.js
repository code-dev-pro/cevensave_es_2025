var toolModule = (function () {
  var nameModule = "tool";
  var cevensave = {};

  var currentLanguage = languageModule.defaultLang;

  function updateTextValues(language, data) {
    return data.map((item) => {
      const updatedItem = { ...item, text: item[language] || item.text };

      if (item.price !== undefined) {
        updatedItem.price = item[language + "_price"] || item.price;
      }
      return updatedItem;
    });
  }

  var defaultPatientValues = {
    nbOfPatients: 1,
    bodyWeight: 70,
    // 66.48,
    nbOfEvents: 1,
  };

  var selectHaemophilia = updateTextValues(currentLanguage, [
    {
      value: "haemophilia_a",
      text: "HAEMOPHILIA A",
      de: "HÄMOPHILIE A",
      es: "HEMOFILIA A",
    },
    {
      value: "haemophilia_b",
      text: "HAEMOPHILIA B",
      de: "HÄMOPHILIE B",
      es: "HEMOFILIA B",
    },
  ]);

  var selectNonReplacement = updateTextValues(currentLanguage, [
    { value: "no", text: "NO", de: "NEIN", es: "NO" },
    { value: "yes", text: "YES", de: "JA", es: "SÍ" },
  ]);

  var selectTypeEvent_1 = updateTextValues(currentLanguage, [
    {
      value: "bleeding_event",
      text: "BLEEDING EPISODE",
      de: "BLUTUNGSEPISODE",
      es: "EPISODIO HEMORRÁGICO",
    },
    {
      value: "minor_surgery",
      text: "MINOR SURGERY",
      de: "KLEINE CHIRURGISCHE EINGRIFFE",
      es: "CIRUGÍA MENOR",
    },
    {
      value: "major_surgery",
      text: "MAJOR SURGERY",
      de: "GROSSE CHIRURGISCHE EINGRIFFE",
      es: "CIRUGÍA MAYOR",
    },
  ]);

  var selectTypeEvent_2 = updateTextValues(currentLanguage, [
    {
      value: "breakthrough_bleed",
      text: "BREAKTHROUGH BLEED",
      de: "DURCHBRUCHSBLUTUNG",
      es: "HEMORRAGIA INTERCURRENTE",
    },
    {
      value: "minor_surgery",
      text: "MINOR SURGERY",
      de: "KLEINE CHIRURGISCHE EINGRIFFE",
      es: "CIRUGÍA MENOR",
    },
    {
      value: "major_surgery",
      text: "MAJOR SURGERY",
      de: "GROSSE CHIRURGISCHE EINGRIFFE",
      es: "CIRUGÍA MAYOR",
    },
  ]);

  var selectCevenfactaPresentation = updateTextValues(currentLanguage, [
    {
      value: 1,
      text: "1 mg",
      de: "1 mg",
      price: 525.2,
      de_price: 905,
      es_price: 558.51,
    },
  ]);

  var selectApccPresentation = updateTextValues(currentLanguage, [
    {
      value: 500,
      text: "500 IU",
      de: "500 I.E",
      es: "500 UI",
      price: 0.78,
      de_price: 0.5,
      es_price: 0.39,
    },
  ]);

  var selectEptacogPresentation = updateTextValues(currentLanguage, [
    {
      value: 1,
      text: "1 mg",
      de: "1 mg",
      price: 525.2,
      de_price: 744.09,
      es_price: 558.51,
    },
  ]);

  var defaultDosagePerKg = {
    cevenfacta: 0.075,
    apcc: 50,
    eptacogalfa: 0.09,
  };

  var defaultDosage = {
    bleeding_event: {
      cevenfacta: 1.5,
      apcc: 1.82,
      eptacogalfa: 1.52,
    },
    breakthrough_bleed: {
      cevenfacta: 1.5,
      apcc: null,
      eptacogalfa: 1.52,
    },
    minor_surgery: {
      cevenfacta: 45.96,
      apcc: 5.88,
      eptacogalfa: 46.24,
    },
    major_surgery: {
      cevenfacta: 73.23,
      apcc: 24.9,
      eptacogalfa: 73.68,
    },
  };

  var dataTemplate = {
    patientIndex: 1,
    nbOfPatients: defaultPatientValues.nbOfPatients,
    typeOfPatients: selectHaemophilia[0].value,
    bodyWeight: defaultPatientValues.bodyWeight,
    nonReplacementTherapy: selectNonReplacement[0].value,
    typeOfEvent: selectTypeEvent_1[0].value,
    eventPerPatient: defaultPatientValues.nbOfEvents,
    cevenfacta: {
      presentation: selectCevenfactaPresentation[0].value,
      initialDose: {
        bleeding_event: defaultDosagePerKg.cevenfacta,
        breakthrough_bleed: defaultDosagePerKg.cevenfacta,
        minor_surgery: defaultDosagePerKg.cevenfacta,
        major_surgery: 0.2,
      },
      subsequentDoses: defaultDosagePerKg.cevenfacta,
      nbOfDoses: {
        bleeding_event: "",
        //  met la case concernée dans un état initial vide
        // bleeding_event: defaultDosage[selectTypeEvent_1[0].value].cevenfacta,
        breakthrough_bleed:
          defaultDosage[selectTypeEvent_2[0].value].cevenfacta,
        minor_surgery: defaultDosage[selectTypeEvent_1[1].value].cevenfacta,
        major_surgery: defaultDosage[selectTypeEvent_1[2].value].cevenfacta,
      },
      pricePerMg: "",
      //  met la case concernée dans un état initial vide
      //  pricePerMg:  selectCevenfactaPresentation[0].price,
    },
    apcc: {
      presentation: selectApccPresentation[0].value,
      initialDose: {
        bleeding_event: defaultDosagePerKg.apcc,
        breakthrough_bleed: defaultDosagePerKg.apcc,
        minor_surgery: defaultDosagePerKg.apcc,
        major_surgery: defaultDosagePerKg.apcc,
      },
      subsequentDoses: defaultDosagePerKg.apcc,
      nbOfDoses: {
        bleeding_event: defaultDosage[selectTypeEvent_1[0].value].apcc,
        breakthrough_bleed: defaultDosage[selectTypeEvent_2[0].value].apcc,
        minor_surgery: defaultDosage[selectTypeEvent_1[1].value].apcc,
        major_surgery: defaultDosage[selectTypeEvent_1[2].value].apcc,
      },
      pricePerMg: selectApccPresentation[0].price,
    },
    eptacogalfa: {
      presentation: selectEptacogPresentation[0].value,
      initialDose: {
        bleeding_event: defaultDosagePerKg.eptacogalfa,
        breakthrough_bleed: defaultDosagePerKg.eptacogalfa,
        minor_surgery: defaultDosagePerKg.eptacogalfa,
        major_surgery: defaultDosagePerKg.eptacogalfa,
      },
      subsequentDoses: defaultDosagePerKg.eptacogalfa,
      nbOfDoses: {
        bleeding_event: "",
        //  met la case concernée dans un état initial vide
        // bleeding_event: defaultDosage[selectTypeEvent_1[0].value].eptacogalfa,
        breakthrough_bleed:
          defaultDosage[selectTypeEvent_2[0].value].eptacogalfa,
        minor_surgery: defaultDosage[selectTypeEvent_1[1].value].eptacogalfa,
        major_surgery: defaultDosage[selectTypeEvent_1[2].value].eptacogalfa,
      },
      pricePerMg: "",
      //  met la case concernée dans un état initial vide
      //  pricePerMg: selectEptacogPresentation[0].price,
    },
  };

  var hospitalData = [JSON.parse(JSON.stringify(dataTemplate))];
  var patientData = [JSON.parse(JSON.stringify(dataTemplate))];
  var eventData = [JSON.parse(JSON.stringify(dataTemplate))];

  function setDom() {
    cevensave.outputButton = document.getElementById("output_button");
    cevensave.toolButton = document.getElementById("tool_button");
    cevensave.goBackToTools = document.getElementById("tool_button_2");
    cevensave.toolSection = document.getElementById("tool");
    cevensave.outputSection = document.getElementById("output");
    cevensave.homeButton = document.getElementById("home_button");
    cevensave.welcomeSection = document.getElementById("welcome");
    cevensave.selectLevel = document.querySelector("select[name=level]");
    cevensave.tablesHeader = document.getElementById("tables_header");
    cevensave.hospitalThead = document.getElementById("hospital_thead");
    cevensave.patientThead = document.getElementById("patient_thead");
    cevensave.eventThead = document.getElementById("event_thead");
    cevensave.hospitalTbody = document.getElementById("hospital_tbody");
    cevensave.patientTbody = document.getElementById("patient_tbody");
    cevensave.eventTbody = document.getElementById("event_tbody");
    cevensave.apccCheckbox = document.querySelector(
      "input[name=apcc_checkbox]"
    );
    cevensave.clearAllButton = document.getElementById("clear_button");
    cevensave.defaultViewButton = document.getElementById("default_view");
    cevensave.headerImg = document.getElementById("header_img");
    cevensave.logo = document.getElementById("logo");
    cevensave.logoP = document.querySelector("#logo p");
    cevensave.logoApp = document.querySelector("#logo_app");
    cevensave.popupButton = document.getElementById("popup_button");
    cevensave.hasError = document.querySelector(".has_error");
  }

  var tableScroll = new IScroll("#table_wrapper", {
    scrollbars: "custom",
    resizeScrollbars: false,
    zoom: false,
    mouseWheel: true,
    wheelAction: "scroll",
    probeType: 1,
    bounce: false,
    interactiveScrollbars: true,
    deceleration: 0.0008,
    useTransition: false,
    useTransform: true,
    HWCompositing: true,
    preventDefault: false,
    pointerEvents: "none",
    preventDefaultException: {
      tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/,
      className: /(^|\s)btn(\s|$)/,
    },
  });

  function refreshScroll() {
    var timeout = null;
    timeout = setTimeout(function () {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      tableScroll.refresh();

      if (
        document.querySelector(".iScrollIndicator").style.display === "none"
      ) {
        document
          .querySelector(".iScrollVerticalScrollbar")
          .classList.add("transparent");
      } else {
        document
          .querySelector(".iScrollVerticalScrollbar")
          .classList.remove("transparent");
      }
    }, 100);
  }

  function removeError() {
    var colum_11 = document.querySelectorAll(".col_11");
    var colum_12 = document.querySelectorAll(".col_12");
    for (var i = 0; i < colum_11.length; i++) {
      colum_11[i].classList.remove("error");
    }
    for (var i = 0; i < colum_12.length; i++) {
      colum_12[i].classList.remove("error");
    }
  }

  /* ------------ EVENTS ------------- */

  function initAppEvents() {
    cevensave.outputButton.addEventListener("click", function () {
     
      var hasError = false;
      var colum_11 = document.querySelectorAll(".col_11");
      var colum_12 = document.querySelectorAll(".col_12");

      for (var i = 0; i < colum_11.length; i++) {
        var col_11_cevenfacta = colum_11[i].querySelector(
          "input[data-key='cevenfacta']"
        );
        var col_11_eptacogalfa = colum_11[i].querySelector(
          "input[data-key='eptacogalfa']"
        );

        if (col_11_cevenfacta) {
          if (col_11_cevenfacta.value === "") {
            col_11_cevenfacta.parentNode.classList.add("error");
            hasError = true;
          }
        }
        if (col_11_eptacogalfa) {
          if (col_11_eptacogalfa.value === "") {
            col_11_eptacogalfa.parentNode.classList.add("error");
            hasError = true;
          }
        }
      }

      for (var i = 0; i < colum_12.length; i++) {
        var col_12_cevenfacta = colum_12[i].querySelector(
          "input[data-key='cevenfacta']"
        );
        var col_12_eptacogalfa = colum_12[i].querySelector(
          "input[data-key='eptacogalfa']"
        );

        if (col_12_cevenfacta) {
          if (col_12_cevenfacta.value === "") {
            col_12_cevenfacta.parentNode.classList.add("error");
            hasError = true;
          }
        }
        if (col_12_eptacogalfa) {
          if (col_12_eptacogalfa.value === "") {
            col_12_eptacogalfa.parentNode.classList.add("error");
            hasError = true;
          }
        }
      }

      if (hasError) {
        cevensave.hasError.classList.remove("has_error_hide");
        return;
      }

      cevensave.toolSection.style.display = "none";
      cevensave.outputButton.style.display = "none";
      cevensave.outputSection.style.display = "flex";
      cevensave.goBackToTools.style.display = "flex";
      outputModule.refresh();
      cevensave.popupButton.style.display = "none";
    });

    cevensave.homeButton.addEventListener("click", function () {
      cevensave.toolSection.style.display = "none";
      cevensave.outputButton.style.display = "none";
      cevensave.welcomeSection.style.display = "flex";
      cevensave.toolButton.style.display = "flex";
      cevensave.homeButton.style.display = "none";
      cevensave.headerImg.style.top = "0px";
      cevensave.logo.style.maxHeight = "126px";
      cevensave.logoP.style.fontSize = "126px";
      cevensave.logoApp.style.fontSize = "58px";
      cevensave.popupButton.style.display = "none";
    });

    cevensave.apccCheckbox.addEventListener("change", function () {
      document.body.classList.toggle("toggleApcc");
      toggleApccRow();
    });

    cevensave.clearAllButton.addEventListener("click", function () {
      handleClearAll();
    });

    cevensave.defaultViewButton.addEventListener("click", function () {
      handleDefaultView();
    });

    var clearNbOfPatientsInputs = document.querySelectorAll(".clear_patients");
    for (var i = 0; i < clearNbOfPatientsInputs.length; i++) {
      clearNbOfPatientsInputs[i].addEventListener("click", function (event) {
        if (cevensave.selectLevel.value === "hospital") {
          handleClearNbOfPatients(cevensave.hospitalTbody);
        } else {
          throw new Error("number of patients does not exist on this level");
        }
      });
    }

    var clearWeightInputs = document.querySelectorAll(".clear_weight");
    for (var i = 0; i < clearWeightInputs.length; i++) {
      clearWeightInputs[i].addEventListener("click", function (event) {
        if (cevensave.selectLevel.value === "hospital") {
          handleClearWeight(cevensave.hospitalTbody);
        } else if (cevensave.selectLevel.value === "patient") {
          handleClearWeight(cevensave.patientTbody);
        } else {
          handleClearWeight(cevensave.eventTbody);
        }
      });
    }

    var clearEventInputs = document.querySelectorAll(".clear_events");
    for (var i = 0; i < clearEventInputs.length; i++) {
      clearEventInputs[i].addEventListener("click", function (event) {
        if (cevensave.selectLevel.value === "hospital") {
          handleClearEvents(cevensave.hospitalTbody);
        } else if (cevensave.selectLevel.value === "patient") {
          handleClearEvents(cevensave.patientTbody);
        } else {
          handleClearEvents(cevensave.eventTbody);
        }
      });
    }

    var clearDoseInputs = document.querySelectorAll(".clear_doses");
    for (var i = 0; i < clearDoseInputs.length; i++) {
      clearDoseInputs[i].addEventListener("click", function (event) {
        if (cevensave.selectLevel.value === "hospital") {
          handleClearDoses(cevensave.hospitalTbody);
        } else if (cevensave.selectLevel.value === "patient") {
          handleClearDoses(cevensave.patientTbody);
        } else {
          handleClearDoses(cevensave.eventTbody);
        }
      });
    }

    var clearPriceInputs = document.querySelectorAll(".clear_prices");
    for (var i = 0; i < clearPriceInputs.length; i++) {
      clearPriceInputs[i].addEventListener("click", function (event) {
        if (cevensave.selectLevel.value === "hospital") {
          handleClearPrices(cevensave.hospitalTbody);
        } else if (cevensave.selectLevel.value === "patient") {
          handleClearPrices(cevensave.patientTbody);
        } else {
          handleClearPrices(cevensave.eventTbody);
        }
      });
    }

    window.addEventListener("resize", refreshScroll);
  }

  function initTableEvents(table) {
    var addPatientRowButton = table.querySelector(".add_row");
    addPatientRowButton.addEventListener("click", function () {
      handleAddPatientRow(table);
      document.querySelector(".has_error").classList.add("has_error_hide");
    });

    var deletePatientRowButton = table.querySelectorAll(".col_13");
    for (var i = 0; i < deletePatientRowButton.length; i++) {
      deletePatientRowButton[i].addEventListener("click", function () {
        handleDeletePatientRow(table, this);
      });
    }
    toggleDeleteRowButton(table);

    var nbOfPatientsInputs = table.querySelectorAll(
      "input[name=patient_number]"
    );
    for (var i = 0; i < nbOfPatientsInputs.length; i++) {
      nbOfPatientsInputs[i].addEventListener("blur", function () {
        handleNbOfPatientsChange(table, this);
      });

      nbOfPatientsInputs[i].addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          handleNbOfPatientsChange(table, this);
        }
      });
    }

    var selectTypeOfPatients = table.querySelectorAll(
      "select[name=type_of_patients]"
    );
    for (var i = 0; i < selectTypeOfPatients.length; i++) {
      selectTypeOfPatients[i].addEventListener("change", function () {
        handleSelectTypeOfPatients(table, this);
      });
    }

    var bodyWeightInputs = table.querySelectorAll("input[name=body_weight]");
    for (var i = 0; i < bodyWeightInputs.length; i++) {
      bodyWeightInputs[i].addEventListener("blur", function () {
        handleBodyWeightChange(table, this);
      });

      bodyWeightInputs[i].addEventListener("beforeinput", (e) => {
        // e.data peut être null (suppression, etc.)
        if (e.data && /[.,]/.test(e.data)) {
          e.preventDefault();
        }
      });

      bodyWeightInputs[i].addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          handleBodyWeightChange(table, this);
        }
      });
    }

    var selectNonReplacementTherapy = table.querySelectorAll(
      "select[name=non_replacement]"
    );
    for (var i = 0; i < selectNonReplacementTherapy.length; i++) {
      selectNonReplacementTherapy[i].addEventListener("change", function () {
        handleSelectNonReplacementTherapy(table, this);
      });
    }

    var selectTypeOfEvent = table.querySelectorAll(
      "select[name=type_of_event]"
    );
    for (var i = 0; i < selectTypeOfEvent.length; i++) {
      selectTypeOfEvent[i].addEventListener("change", function () {
        handleSelectTypeOfEvent(table, this);
      });
    }

    var eventPerPatientInputs = table.querySelectorAll(
      "input[name=event_per_patient]"
    );
    for (var i = 0; i < eventPerPatientInputs.length; i++) {
      eventPerPatientInputs[i].addEventListener("blur", function () {
        handleEventPerPatientChange(table, this);
      });

      eventPerPatientInputs[i].addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          handleEventPerPatientChange(table, this);
        }
      });
    }

    var initialDoseInputs = table.querySelectorAll("input[name=initial_dose]");
    for (var i = 0; i < initialDoseInputs.length; i++) {
      initialDoseInputs[i].addEventListener("blur", function () {
        handleInitialDoseChange(table, this);
      });

      initialDoseInputs[i].addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          handleInitialDoseChange(table, this);
        }
      });
    }

    var subsequentDoseInputs = table.querySelectorAll(
      "input[name=subsequent_doses]"
    );
    for (var i = 0; i < subsequentDoseInputs.length; i++) {
      subsequentDoseInputs[i].addEventListener("blur", function () {
        handleSubsequentDoseChange(table, this);
      });

      subsequentDoseInputs[i].addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          handleSubsequentDoseChange(table, this);
        }
      });
    }

    var nbOfDosesInputs = table.querySelectorAll("input[name=nb_of_doses]");

    for (var i = 0; i < nbOfDosesInputs.length; i++) {
      nbOfDosesInputs[i].addEventListener("blur", function () {
        document.querySelector(".has_error").classList.add("has_error_hide");
        handleNbOfDosesChange(table, this);
      });

      nbOfDosesInputs[i].addEventListener("change", function () {
        document.querySelector(".has_error").classList.add("has_error_hide");
        removeError();
      });

      nbOfDosesInputs[i].addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          handleNbOfDosesChange(table, this);
        }
      });
    }

    var pricePerMgInputs = table.querySelectorAll("input[name=price_per_mg]");
    for (var i = 0; i < pricePerMgInputs.length; i++) {
      pricePerMgInputs[i].addEventListener("blur", function () {
        handlePriceChange(table, this);
      });

      pricePerMgInputs[i].addEventListener("change", function () {
        document.querySelector(".has_error").classList.add("has_error_hide");
        removeError();
      });

      pricePerMgInputs[i].addEventListener("keyup", function (event) {
        document.querySelector(".has_error").classList.add("has_error_hide");
        if (event.keyCode === 13) {
          handlePriceChange(table, this);
        }
      });
    }
  }

  function toggleApccRow() {
    if (cevensave.apccCheckbox.checked) {
      window.isApcc = true;
      showApccRow();
    } else {
      window.isApcc = false;
      hideApccRow();
    }
  }

  function showApccRow() {
    var apccRows = document.querySelectorAll(".apcc_row");
    var hospitalFirstTds = document.querySelectorAll(
      "#hospital_tbody .col_rowspan"
    );
    var patientFirstTds = document.querySelectorAll(
      "#patient_tbody .col_rowspan"
    );
    var eventFirstTds = document.querySelectorAll("#event_tbody .col_rowspan");

    for (var i = 0; i < apccRows.length; i++) {
      apccRows[i].style.display = "table-row";
    }
    for (var i = 0; i < hospitalFirstTds.length; i++) {
      hospitalFirstTds[i].rowSpan = 3;
    }
    for (var i = 0; i < patientFirstTds.length; i++) {
      patientFirstTds[i].rowSpan = 3;
      patientFirstTds[0].rowSpan = patientFirstTds[0].rowSpan + 1;
      patientFirstTds[1].rowSpan = patientFirstTds[1].rowSpan + 1;
    }
    for (var i = 0; i < eventFirstTds.length; i++) {
      eventFirstTds[i].rowSpan = 3;
      eventFirstTds[0].rowSpan = eventFirstTds[0].rowSpan + 1;
    }
  }

  function hideApccRow() {
    var apccRows = document.querySelectorAll(".apcc_row");
    var hospitalFirstTds = document.querySelectorAll(
      "#hospital_tbody .col_rowspan"
    );
    var patientFirstTds = document.querySelectorAll(
      "#patient_tbody .col_rowspan"
    );
    var eventFirstTds = document.querySelectorAll("#event_tbody .col_rowspan");

    for (var i = 0; i < apccRows.length; i++) {
      apccRows[i].style.display = "none";
    }
    for (var i = 0; i < hospitalFirstTds.length; i++) {
      hospitalFirstTds[i].rowSpan = 2;
    }
    for (var i = 0; i < patientFirstTds.length; i++) {
      patientFirstTds[i].rowSpan = 2;
      var nbOfPatients = patientData.length;
      patientFirstTds[0].rowSpan = 4 + 3 * nbOfPatients;
      patientFirstTds[1].rowSpan = 4 + 3 * nbOfPatients;
    }
    for (var i = 0; i < eventFirstTds.length; i++) {
      eventFirstTds[i].rowSpan = 2;
      eventFirstTds[0].rowSpan = 4 + 3 * nbOfPatients;
    }
  }

  /* ------------ DATA ------------- */

  function getData() {
    var level = cevensave.selectLevel.value;
    var data = null;
    switch (level) {
      case "hospital":
        data = hospitalData;
        window.dataToOutput = data;
        break;
      case "patient":
        data = patientData;
        window.dataToOutput = data;
        break;
      case "event":
        data = eventData;
        window.dataToOutput = data;
        break;
      default:
        data = hospitalData;
        window.dataToOutput = data;
        break;
    }
  }

  function handleAddPatientRow(table) {
    var data = window.dataToOutput;
    data.push(JSON.parse(JSON.stringify(dataTemplate)));
    var lastPatientNumber = data[data.length - 2].patientIndex;
    data[data.length - 1].patientIndex = lastPatientNumber + 1;

    var lastPatient = data[data.length - 2];
    var newPatient = data[data.length - 1];
    if (
      lastPatient.cevenfacta.pricePerMg !==
      selectCevenfactaPresentation[0].price
    ) {
      newPatient.cevenfacta.pricePerMg = lastPatient.cevenfacta.pricePerMg;
    }
    if (lastPatient.apcc.pricePerMg !== selectApccPresentation[0].price) {
      newPatient.apcc.pricePerMg = lastPatient.apcc.pricePerMg;
    }
    if (
      lastPatient.eptacogalfa.pricePerMg !== selectEptacogPresentation[0].price
    ) {
      newPatient.eptacogalfa.pricePerMg = lastPatient.eptacogalfa.pricePerMg;
    }

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleDeletePatientRow(table, button) {
    var data = window.dataToOutput;
    var patientNumber = parseInt(button.getAttribute("data-index")) + 1;
    var patientIndex = data.findIndex(function (patient) {
      return patient.patientIndex === patientNumber;
    });
    data.splice(patientIndex, 1);
    data.forEach(function (patient, index) {
      patient.patientIndex = index + 1;
    });

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleNbOfPatientsChange(table, input) {
    var data = window.dataToOutput;
    var dataIndex = input.getAttribute("data-index");
    var patientNumber = data[dataIndex].patientIndex;
    var nbOfPatients = parseFloat(input.value);
    var patient = data.find(function (patient) {
      return patient.patientIndex === patientNumber;
    });

    patient.nbOfPatients = isNaN(nbOfPatients)
      ? 1
      : Math.min(Math.max(nbOfPatients, 1), 100);

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleSelectTypeOfPatients(table, select) {
    var data = window.dataToOutput;
    var dataIndex = select.getAttribute("data-index");
    var patientNumber = data[dataIndex].patientIndex;
    var typeOfPatients = select.value;
    var patient = data.find(function (patient) {
      return patient.patientIndex === patientNumber;
    });
    patient.typeOfPatients = typeOfPatients;
    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleBodyWeightChange(table, input) {
    var data = window.dataToOutput;
    var dataIndex = input.getAttribute("data-index");
    var patientNumber = data[dataIndex].patientIndex;
    var bodyWeight = parseFloat(input.value);
    var patient = data.find(function (patient) {
      return patient.patientIndex === patientNumber;
    });

    if (isNaN(bodyWeight)) {
      patient.bodyWeight = dataTemplate.bodyWeight;
    } else {
      patient.bodyWeight = Math.min(Math.max(bodyWeight, 10), 300);
    }

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleSelectNonReplacementTherapy(table, select) {
    var data = window.dataToOutput;
    var dataIndex = select.getAttribute("data-index");
    var patientNumber = data[dataIndex].patientIndex;
    var nonReplacementTherapy = select.value;
    var patient = data.find(function (patient) {
      return patient.patientIndex === patientNumber;
    });
    patient.nonReplacementTherapy = nonReplacementTherapy;

    if (patient.nonReplacementTherapy === selectNonReplacement[1].value) {
      patient.typeOfEvent = selectTypeEvent_2[0].value;
      patient.apcc.initialDose[patient.typeOfEvent] = null;
      patient.apcc.pricePerMg = null;
    } else {
      patient.typeOfEvent = selectTypeEvent_1[0].value;
      patient.apcc.initialDose[patient.typeOfEvent] =
        dataTemplate.apcc.initialDose[patient.typeOfEvent];
      patient.apcc.pricePerMg = selectApccPresentation[0].price;
    }

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleSelectTypeOfEvent(table, select) {
    var data = window.dataToOutput;
    var dataIndex = select.getAttribute("data-index");
    var patientNumber = data[dataIndex].patientIndex;
    var typeOfEvent = select.value;
    var patient = data.find(function (patient) {
      return patient.patientIndex === patientNumber;
    });
    patient.typeOfEvent = typeOfEvent;

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleEventPerPatientChange(table, input) {
    var data = window.dataToOutput;
    var dataIndex = input.getAttribute("data-index");
    var patientNumber = data[dataIndex].patientIndex;
    var eventPerPatient = parseFloat(input.value);
    var patient = data.find(function (patient) {
      return patient.patientIndex === patientNumber;
    });

    patient.eventPerPatient = isNaN(eventPerPatient)
      ? dataTemplate.eventPerPatient
      : Math.min(Math.max(eventPerPatient, 1), 100);

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleInitialDoseChange(table, input) {
    var data = window.dataToOutput;
    var dataIndex = input.getAttribute("data-index");
    var dataKey = input.getAttribute("data-key");
    var patientNumber = data[dataIndex].patientIndex;
    var initialDose = parseFloat(input.value);
    var patient = data.find(function (patient) {
      return patient.patientIndex === patientNumber;
    });

    if (dataKey === "apcc") {
      patient[dataKey].initialDose[patient.typeOfEvent] = isNaN(initialDose)
        ? dataTemplate[dataKey].initialDose[patient.typeOfEvent]
        : Math.round(Math.min(Math.max(initialDose, 1), 200)) / 1;
    }
    if (dataKey === "cevenfacta" || dataKey === "eptacogalfa") {
      patient[dataKey].initialDose[patient.typeOfEvent] = isNaN(initialDose)
        ? dataTemplate[dataKey].initialDose[patient.typeOfEvent]
        : Math.round(Math.min(Math.max(initialDose, 1), 200000)) / 1000;
    }

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleSubsequentDoseChange(table, input) {
    var data = window.dataToOutput;
    var dataIndex = input.getAttribute("data-index");
    var dataKey = input.getAttribute("data-key");
    var patientNumber = data[dataIndex].patientIndex;
    var subsequentDose = parseFloat(input.value);
    var patient = data.find(function (patient) {
      return patient.patientIndex === patientNumber;
    });

    if (dataKey === "apcc") {
      patient[dataKey].subsequentDoses = isNaN(subsequentDose)
        ? dataTemplate[dataKey].subsequentDoses
        : Math.round(Math.min(Math.max(subsequentDose, 1), 200)) / 1;
    }

    if (dataKey === "cevenfacta" || dataKey === "eptacogalfa") {
      patient[dataKey].subsequentDoses = isNaN(subsequentDose)
        ? dataTemplate[dataKey].subsequentDoses
        : Math.round(Math.min(Math.max(subsequentDose, 1), 200000)) / 1000;
    }

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleNbOfDosesChange(table, input) {
    var data = window.dataToOutput;
    var dataIndex = input.getAttribute("data-index");
    var dataKey = input.getAttribute("data-key");
    var patientNumber = data[dataIndex].patientIndex;
    var nbDoses = parseFloat(input.value);
    var patient = data.find(function (patient) {
      return patient.patientIndex === patientNumber;
    });

    patient[dataKey].nbOfDoses[patient.typeOfEvent] = isNaN(nbDoses)
      ? dataTemplate[dataKey].nbOfDoses[patient.typeOfEvent]
      : Math.min(Math.max(nbDoses, 0), 500);

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handlePriceChange(table, input) {
    var dataKey = input.getAttribute("data-key");

    var pricePerMg = parseFloat(input.value);

    hospitalData.forEach(function (patient) {
      patient[dataKey].pricePerMg = pricePerMg;

      if (!isNaN(patient[dataKey].pricePerMg)) {
        patient[dataKey].pricePerMg = Math.min(
          Math.max(patient[dataKey].pricePerMg, 0.5),
          5000
        );
      } else {
        patient[dataKey].pricePerMg = dataTemplate[dataKey].pricePerMg;
      }
    });

    patientData.forEach(function (patient) {
      patient[dataKey].pricePerMg = pricePerMg;

      if (!isNaN(patient[dataKey].pricePerMg)) {
        patient[dataKey].pricePerMg = Math.min(
          Math.max(patient[dataKey].pricePerMg, 0.5),
          5000
        );
      } else {
        patient[dataKey].pricePerMg = dataTemplate[dataKey].pricePerMg;
      }
    });

    eventData.forEach(function (patient) {
      patient[dataKey].pricePerMg = pricePerMg;

      if (!isNaN(patient[dataKey].pricePerMg)) {
        patient[dataKey].pricePerMg = Math.min(
          Math.max(patient[dataKey].pricePerMg, 0.5),
          5000
        );
      } else {
        patient[dataKey].pricePerMg = dataTemplate[dataKey].pricePerMg;
      }
    });

    refreshTable(table);
  }

  function handleClearNbOfPatients(table) {
    var data = window.dataToOutput;
    data.forEach(function (patient) {
      patient.nbOfPatients = dataTemplate.nbOfPatients;
    });
    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleClearWeight(table) {
    var data = window.dataToOutput;
    data.forEach(function (patient) {
      patient.bodyWeight = dataTemplate.bodyWeight;
    });
    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleClearEvents(table) {
    var data = window.dataToOutput;
    data.forEach(function (patient) {
      patient.eventPerPatient = dataTemplate.eventPerPatient;
    });
    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleClearDoses(table) {
    var data = window.dataToOutput;
    data.forEach(function (patient) {
      patient.cevenfacta.initialDose[patient.typeOfEvent] =
        dataTemplate.cevenfacta.initialDose[patient.typeOfEvent];
      patient.cevenfacta.subsequentDoses =
        dataTemplate.cevenfacta.subsequentDoses;
      patient.cevenfacta.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.cevenfacta.nbOfDoses[patient.typeOfEvent];
      patient.apcc.initialDose[patient.typeOfEvent] =
        dataTemplate.apcc.initialDose[patient.typeOfEvent];
      patient.apcc.subsequentDoses = dataTemplate.apcc.subsequentDoses;
      patient.apcc.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.apcc.nbOfDoses[patient.typeOfEvent];
      patient.eptacogalfa.initialDose[patient.typeOfEvent] =
        dataTemplate.eptacogalfa.initialDose[patient.typeOfEvent];
      patient.eptacogalfa.subsequentDoses =
        dataTemplate.eptacogalfa.subsequentDoses;
      patient.eptacogalfa.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.eptacogalfa.nbOfDoses[patient.typeOfEvent];
    });

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleClearPrices(table) {
    var data = window.dataToOutput;

    data.forEach(function (patient) {
      patient.cevenfacta.pricePerMg = dataTemplate.cevenfacta.pricePerMg;
      patient.apcc.pricePerMg = dataTemplate.apcc.pricePerMg;
      patient.eptacogalfa.pricePerMg = dataTemplate.eptacogalfa.pricePerMg;
    });

    window.dataToOutput = data;

    refreshTable(table);
  }

  function handleClearAll() {
    var table = document.querySelector("tbody:not(.hide)");

    hospitalData.forEach(function (patient) {
      patient.nbOfPatients = dataTemplate.nbOfPatients;
      patient.bodyWeight = dataTemplate.bodyWeight;
      patient.eventPerPatient = dataTemplate.eventPerPatient;
      patient.cevenfacta.initialDose[patient.typeOfEvent] =
        dataTemplate.cevenfacta.initialDose[patient.typeOfEvent];
      patient.cevenfacta.subsequentDoses =
        dataTemplate.cevenfacta.subsequentDoses;
      patient.cevenfacta.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.cevenfacta.nbOfDoses[patient.typeOfEvent];
      patient.apcc.initialDose[patient.typeOfEvent] =
        dataTemplate.apcc.initialDose[patient.typeOfEvent];
      patient.apcc.subsequentDoses = dataTemplate.apcc.subsequentDoses;
      patient.apcc.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.apcc.nbOfDoses[patient.typeOfEvent];
      patient.eptacogalfa.initialDose[patient.typeOfEvent] =
        dataTemplate.eptacogalfa.initialDose[patient.typeOfEvent];
      patient.eptacogalfa.subsequentDoses =
        dataTemplate.eptacogalfa.subsequentDoses;
      patient.eptacogalfa.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.eptacogalfa.nbOfDoses[patient.typeOfEvent];
      patient.cevenfacta.pricePerMg = dataTemplate.cevenfacta.pricePerMg;
      patient.apcc.pricePerMg = dataTemplate.apcc.pricePerMg;
      patient.eptacogalfa.pricePerMg = dataTemplate.eptacogalfa.pricePerMg;
    });

    patientData.forEach(function (patient) {
      patient.nbOfPatients = dataTemplate.nbOfPatients;
      patient.bodyWeight = dataTemplate.bodyWeight;
      patient.eventPerPatient = dataTemplate.eventPerPatient;
      patient.cevenfacta.initialDose[patient.typeOfEvent] =
        dataTemplate.cevenfacta.initialDose[patient.typeOfEvent];
      patient.cevenfacta.subsequentDoses =
        dataTemplate.cevenfacta.subsequentDoses;
      patient.cevenfacta.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.cevenfacta.nbOfDoses[patient.typeOfEvent];
      patient.apcc.initialDose[patient.typeOfEvent] =
        dataTemplate.apcc.initialDose[patient.typeOfEvent];
      patient.apcc.subsequentDoses = dataTemplate.apcc.subsequentDoses;
      patient.apcc.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.apcc.nbOfDoses[patient.typeOfEvent];
      patient.eptacogalfa.initialDose[patient.typeOfEvent] =
        dataTemplate.eptacogalfa.initialDose[patient.typeOfEvent];
      patient.eptacogalfa.subsequentDoses =
        dataTemplate.eptacogalfa.subsequentDoses;
      patient.eptacogalfa.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.eptacogalfa.nbOfDoses[patient.typeOfEvent];
      patient.cevenfacta.pricePerMg = dataTemplate.cevenfacta.pricePerMg;
      patient.apcc.pricePerMg = dataTemplate.apcc.pricePerMg;
      patient.eptacogalfa.pricePerMg = dataTemplate.eptacogalfa.pricePerMg;
    });

    eventData.forEach(function (patient) {
      patient.nbOfPatients = dataTemplate.nbOfPatients;
      patient.bodyWeight = dataTemplate.bodyWeight;
      patient.eventPerPatient = dataTemplate.eventPerPatient;
      patient.cevenfacta.initialDose[patient.typeOfEvent] =
        dataTemplate.cevenfacta.initialDose[patient.typeOfEvent];
      patient.cevenfacta.subsequentDoses =
        dataTemplate.cevenfacta.subsequentDoses;
      patient.cevenfacta.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.cevenfacta.nbOfDoses[patient.typeOfEvent];
      patient.apcc.initialDose[patient.typeOfEvent] =
        dataTemplate.apcc.initialDose[patient.typeOfEvent];
      patient.apcc.subsequentDoses = dataTemplate.apcc.subsequentDoses;
      patient.apcc.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.apcc.nbOfDoses[patient.typeOfEvent];
      patient.eptacogalfa.initialDose[patient.typeOfEvent] =
        dataTemplate.eptacogalfa.initialDose[patient.typeOfEvent];
      patient.eptacogalfa.subsequentDoses =
        dataTemplate.eptacogalfa.subsequentDoses;
      patient.eptacogalfa.nbOfDoses[patient.typeOfEvent] =
        dataTemplate.eptacogalfa.nbOfDoses[patient.typeOfEvent];
      patient.cevenfacta.pricePerMg = dataTemplate.cevenfacta.pricePerMg;
      patient.apcc.pricePerMg = dataTemplate.apcc.pricePerMg;
      patient.eptacogalfa.pricePerMg = dataTemplate.eptacogalfa.pricePerMg;
    });

    refreshTable(table);
  }

  function handleDefaultView() {
    cevensave.hospitalTbody.innerHTML = "";
    cevensave.patientTbody.innerHTML = "";
    cevensave.eventTbody.innerHTML = "";

    hospitalData = [JSON.parse(JSON.stringify(dataTemplate))];
    patientData = [JSON.parse(JSON.stringify(dataTemplate))];
    eventData = [JSON.parse(JSON.stringify(dataTemplate))];

    window.dataToOutput = hospitalData;
    cevensave.selectLevel.value = "hospital";
    switchThead("hospital");
    switchTbody("hospital");
    refreshTable(cevensave.hospitalTbody);
    document.body.classList.remove("patient", "hospital", "event");
  }

  /* ------------ VIEW ------------- */

  function switchThead(level) {
    cevensave.hospitalThead.classList.toggle("hide", level !== "hospital");
    cevensave.patientThead.classList.toggle("hide", level !== "patient");
    cevensave.eventThead.classList.toggle("hide", level !== "event");
  }

  function switchTbody(level) {
    cevensave.hospitalTbody.classList.toggle("hide", level !== "hospital");
    cevensave.patientTbody.classList.toggle("hide", level !== "patient");
    cevensave.eventTbody.classList.toggle("hide", level !== "event");
  }

  function switchView() {
    cevensave.selectLevel.addEventListener("change", function () {
      switchThead(this.value);
      switchTbody(this.value);
      getData();
      if (this.value === "hospital") {
        document.body.classList.add("hospital");
        document.body.classList.remove("patient");
        document.body.classList.remove("event");
        var table = cevensave.hospitalTbody;
        refreshTable(table);
      }
      if (this.value === "patient") {
        document.body.classList.add("patient");
        document.body.classList.remove("hospital");
        document.body.classList.remove("event");
        var table = cevensave.patientTbody;
        refreshTable(table);
      }
      if (this.value === "event") {
        document.body.classList.add("event");
        document.body.classList.remove("hospital");
        document.body.classList.remove("patient");
        var table = cevensave.eventTbody;
        refreshTable(table);
      }
    });
  }

  function createPatientNumberCell(data) {
    var cell = document.createElement("td");
    cell.setAttribute("rowspan", 2);
    cell.classList.add("col_1", "col_rowspan");
    var input = document.createElement("input");
    input.setAttribute("data-index", data.patientIndex - 1);
    input.setAttribute("type", "number");
    input.setAttribute("name", "patient_number");
    input.setAttribute("required", true);
    input.setAttribute("data-error", "Please enter a patient number");
    input.setAttribute("data-error-visible", "true");
    input.setAttribute("min", 1);
    input.setAttribute("max", 100);
    input.setAttribute("value", data.nbOfPatients);
    input.classList.add("input");
    cell.appendChild(input);

    return cell;
  }

  function createTypeOfPatientsCell(table, data) {
    var cell = document.createElement("td");
    cell.classList.add("col_2", "col_rowspan", "table_select");

    var rowspan =
      table === cevensave.hospitalTbody
        ? 2
        : table === cevensave.patientTbody
        ? data.length * 4
        : 1;
    if (rowspan > 1) {
      cell.setAttribute("rowspan", rowspan);
    }

    var select = document.createElement("select");
    select.setAttribute("data-index", data.patientIndex - 1);
    select.setAttribute("name", "type_of_patients");
    select.setAttribute("required", true);
    select.setAttribute("data-error", "Please select a type of patients");
    select.setAttribute("data-error-visible", "true");

    selectHaemophilia.forEach(function (option) {
      var optionElement = document.createElement("option");
      optionElement.setAttribute("value", option.value);
      optionElement.textContent = option.text;
      if (option.value === data.typeOfPatients) {
        optionElement.setAttribute("selected", true);
      }
      select.appendChild(optionElement);
    });

    cell.appendChild(select);
    return cell;
  }

  function createBodyWeightCell(table, data) {
    var cell = document.createElement("td");
    cell.classList.add("col_3", "col_rowspan", "table_input");
    var rowspan =
      table === cevensave.hospitalTbody
        ? 2
        : table === cevensave.patientTbody
        ? data.length * 4
        : 1;
    if (rowspan > 1) {
      cell.setAttribute("rowspan", rowspan);
    }
    var input = document.createElement("input");
    input.setAttribute("data-index", data.patientIndex - 1);
    input.setAttribute("type", "number");
    input.setAttribute("name", "body_weight");
    input.setAttribute("required", true);
    input.setAttribute("data-error", "Por favor, introduzca un peso corporal");
    input.setAttribute("data-error-visible", "true");
    input.setAttribute("step", 1);
    input.setAttribute("min", 10);
    input.setAttribute("max", 300);
    input.setAttribute("value", data.bodyWeight);
    input.classList.add("input");
    cell.appendChild(input);
    return cell;
  }

  function createNonReplacementCell(data) {
    var cell = document.createElement("td");
    cell.classList.add("col_4", "col_rowspan", "table_select");
    cell.setAttribute("rowspan", 2);
    var select = document.createElement("select");
    select.setAttribute("data-index", data.patientIndex - 1);
    select.setAttribute("name", "non_replacement");
    select.setAttribute("required", true);
    select.setAttribute("data-error", "Por favor seleccione un no reemplazo");
    select.setAttribute("data-error-visible", "true");
    selectNonReplacement.forEach(function (option) {
      var optionElement = document.createElement("option");
      optionElement.setAttribute("value", option.value);
      optionElement.textContent = option.text;
      if (option.value === data.nonReplacementTherapy) {
        optionElement.setAttribute("selected", true);
      }
      select.appendChild(optionElement);
    });
    cell.appendChild(select);
    return cell;
  }

  function createTypeOfEventCell(data) {
    var cell = document.createElement("td");
    cell.classList.add("col_5", "col_rowspan", "table_select");
    cell.setAttribute("rowspan", 2);
    var select = document.createElement("select");
    select.setAttribute("data-index", data.patientIndex - 1);
    select.setAttribute("name", "type_of_event");
    select.setAttribute("required", true);
    select.setAttribute("data-error", "Por favor seleccione un tipo de evento");
    select.setAttribute("data-error-visible", "true");
    select.classList.add("select");

    var selectTypeEvent;
    if (data.nonReplacementTherapy === selectNonReplacement[0].value) {
      selectTypeEvent = selectTypeEvent_1;
    }
    if (data.nonReplacementTherapy === selectNonReplacement[1].value) {
      selectTypeEvent = selectTypeEvent_2;
    }

    selectTypeEvent.forEach(function (option) {
      var optionElement = document.createElement("option");
      optionElement.setAttribute("value", option.value);
      optionElement.textContent = option.text;

      if (option.value === data.typeOfEvent) {
        optionElement.setAttribute("selected", true);
      }
      select.appendChild(optionElement);
    });

    cell.appendChild(select);
    return cell;
  }

  function createNbOfEventCell(data) {
    var cell = document.createElement("td");
    cell.classList.add("col_6", "col_rowspan", "table_input");
    cell.setAttribute("rowspan", 2);
    var input = document.createElement("input");
    input.setAttribute("data-index", data.patientIndex - 1);
    input.setAttribute("type", "number");
    input.setAttribute("name", "event_per_patient");
    input.setAttribute("required", true);
    input.setAttribute("data-error", "Por favor introduzca un número de eventos");
    input.setAttribute("data-error-visible", "true");

    input.setAttribute("min", 1);
    input.setAttribute("max", 100);

    input.setAttribute("value", data.eventPerPatient);
    input.classList.add("input");
    cell.appendChild(input);
    return cell;
  }

  function createProductCell(product) {
    var cell = document.createElement("td");
    cell.classList.add("col_7");
    cell.innerHTML = product;
    return cell;
  }

  function createPresentationCell(data, product) {
    var selectPresentationMap = {
      cevenfacta: selectCevenfactaPresentation,
      apcc: selectApccPresentation,
      eptacogalfa: selectEptacogPresentation,
    };

    var selectPresentation = selectPresentationMap[product];

    var cell = document.createElement("td");
    cell.classList.add("col_8", "table_select");

    selectPresentation.forEach(function (option) {
      cell.textContent = option.text;
    });

    return cell;
  }

  function createInitialDoseCell(data, product) {
    var cell = document.createElement("td");
    cell.classList.add("col_9", "table_input");
    var input = document.createElement("input");
    input.setAttribute("data-index", data.patientIndex - 1);
    input.setAttribute("data-key", product);
    input.type = "number";
    input.name = "initial_dose";
    input.required = true;
    input.dataset.error = "Por favor introduzca una dosis inicial";
    input.dataset.errorVisible = true;
    input.min = 0;
    input.max = product === "apcc" ? 200 : 200000;
    input.step = 1;
    input.value =
      data[product].initialDose[data.typeOfEvent] *
      (product === "apcc" ? 1 : 1000);

    if (
      data.nonReplacementTherapy === selectNonReplacement[1].value &&
      product === "apcc"
    ) {
      input.type = "text";
      input.value = "N/A";
      input.disabled = true;
    }

    cell.appendChild(input);
    return cell;
  }

  function createSubsequentDoseCell(data, product) {
    var cell = document.createElement("td");
    cell.classList.add("col_10", "table_input");
    var input = document.createElement("input");
    input.setAttribute("data-index", data.patientIndex - 1);
    input.setAttribute("data-key", product);
    input.type = "number";
    input.name = "subsequent_doses";
    input.required = true;
    input.dataset.error = "Por favor introduzca un número de dosis";
    input.dataset.errorVisible = true;
    input.min = 0;
    input.max = product === "apcc" ? 200 : 200000;
    input.step = 1;
    input.value =
      data[product].subsequentDoses * (product === "apcc" ? 1 : 1000);

    if (
      data.nonReplacementTherapy === selectNonReplacement[1].value &&
      product === "apcc"
    ) {
      input.type = "text";
      input.value = "N/A";
      input.disabled = true;
    }

    cell.appendChild(input);
    return cell;
  }

  function createNbOfSubsequentDosesCell(data, product) {
    var cell = document.createElement("td");
    cell.classList.add("col_11");
    var input = document.createElement("input");
    input.setAttribute("data-index", data.patientIndex - 1);
    input.setAttribute("data-key", product);
    input.type = "number";
    input.name = "nb_of_doses";
    input.required = true;
    input.dataset.error = "Por favor introduzca un número de dosis";
    input.dataset.errorVisible = true;
    input.min = 0;
    input.max = 500;
    input.value = data[product].nbOfDoses[data.typeOfEvent];

    if (
      data.nonReplacementTherapy === selectNonReplacement[1].value &&
      product === "apcc"
    ) {
      input.type = "text";
      input.value = "N/A";
      input.disabled = true;
    }

    cell.appendChild(input);
    return cell;
  }

  function createPricePerMgCell(data, product) {
    var cell = document.createElement("td");
    cell.classList.add("col_12");
    var input = document.createElement("input");
    input.setAttribute("data-index", data.patientIndex - 1);
    input.setAttribute("data-key", product);
    input.type = "number";
    input.name = "price_per_mg";
    input.required = true;
    input.dataset.error = "Por favor introduzca un precio";
    input.dataset.errorVisible = true;
    input.min = 0;
    input.max = 5000;
    if (product === "apcc") {
      input.step = 0.1;
    }
    input.value = data[product].pricePerMg;
    if (
      data.nonReplacementTherapy === selectNonReplacement[1].value &&
      product === "apcc"
    ) {
      input.type = "text";
      input.value = "N/A";
      input.disabled = true;
    }
    cell.appendChild(input);
    return cell;
  }

  function createDeleteCell(data) {
    var cell = document.createElement("td");
    cell.classList.add("col_13", "col_rowspan");
    cell.setAttribute("rowspan", 2);
    cell.setAttribute("data-index", data.patientIndex - 1);
    var img = document.createElement("img");
    img.src = "./assets/medias/icon_mini_trash.png";
    img.alt = "";
    img.width = 50;
    img.height = 50;
    cell.appendChild(img);
    return cell;
  }

  function createAddPatientRow(table) {
    if (table.id === cevensave.hospitalTbody.id) {
      var numColumns = 11;
    }
    if (table.id === cevensave.patientTbody.id) {
      var numColumns = 8;
    }
    if (table.id === cevensave.eventTbody.id) {
      var numColumns = 8;
    }
    var addRow = document.createElement("tr");
    addRow.classList.add("col_add_row");
    var cell = document.createElement("td");
    cell.classList.add("col_1", "col_rowspan");
    cell.setAttribute("rowspan", 2);
    var div = document.createElement("div");
    var img = document.createElement("img");
    div.classList.add("add_row");
    img.src = "./assets/medias/icon_mini.png";
    img.alt = "";
    img.width = 50;
    img.height = 50;
    div.appendChild(img);
    cell.appendChild(div);
    addRow.appendChild(cell);

    for (var i = 0; i < numColumns; i++) {
      var cell = document.createElement("td");
      addRow.appendChild(cell);
    }
    return addRow;
  }

  function toggleDeleteRowButton(table) {
    var rows = document.querySelectorAll("#" + table.id + " tr");
    if (rows.length > 4) {
      showDeleteRowButton(table);
    } else {
      hideDeleteRowButton(table);
    }
  }

  function showDeleteRowButton(table) {
    var deleteRowHeader = document.querySelectorAll(
      "#" + table.id.split("_")[0] + "_thead .delete_row_header"
    );
    for (var i = 0; i < deleteRowHeader.length; i++) {
      deleteRowHeader[i].style.display = "table-cell";
    }
    var deleteRowBody = document.querySelectorAll("#" + table.id + " .col_13");
    for (var i = 0; i < deleteRowBody.length; i++) {
      deleteRowBody[i].style.display = "table-cell";
    }
  }

  function hideDeleteRowButton(table) {
    var deleteRowHeader = document.querySelectorAll(
      "#" + table.id.split("_")[0] + "_thead .delete_row_header"
    );
    for (var i = 0; i < deleteRowHeader.length; i++) {
      deleteRowHeader[i].style.display = "none";
    }
    var deleteRowBody = document.querySelectorAll("#" + table.id + " .col_13");
    for (var i = 0; i < deleteRowBody.length; i++) {
      deleteRowBody[i].style.display = "none";
    }
  }

  function createCevenfactaRow(table, data, isFirstRow) {
    var cevenfactaRow = document.createElement("tr");

    function appendCell(cell) {
      cevenfactaRow.appendChild(cell);
    }

    if (table.id === cevensave.hospitalTbody.id) {
      appendCell(createPatientNumberCell(data));
      appendCell(createTypeOfPatientsCell(table, data));
      appendCell(createBodyWeightCell(table, data));
    } else if (table.id === cevensave.patientTbody.id && isFirstRow) {
      appendCell(createTypeOfPatientsCell(table, data));
      appendCell(createBodyWeightCell(table, data));
    } else if (table.id === cevensave.eventTbody.id && isFirstRow) {
      appendCell(createBodyWeightCell(table, data));
    }

    appendCell(createNonReplacementCell(data));
    appendCell(createTypeOfEventCell(data));
    appendCell(createNbOfEventCell(data));
    appendCell(createProductCell("CEVENFACTA<sup>®</sup>"));
    appendCell(createPresentationCell(data, "cevenfacta"));
    appendCell(createInitialDoseCell(data, "cevenfacta"));
    appendCell(createSubsequentDoseCell(data, "cevenfacta"));
    appendCell(createNbOfSubsequentDosesCell(data, "cevenfacta"));
    appendCell(createPricePerMgCell(data, "cevenfacta"));
    appendCell(createDeleteCell(data));

    return cevenfactaRow;
  }

  function createApccRow(data) {
    var apccRow = document.createElement("tr");
    apccRow.appendChild(createProductCell("aPCC"));
    apccRow.appendChild(createPresentationCell(data, "apcc"));
    apccRow.appendChild(createInitialDoseCell(data, "apcc"));
    apccRow.appendChild(createSubsequentDoseCell(data, "apcc"));
    apccRow.appendChild(createNbOfSubsequentDosesCell(data, "apcc"));
    apccRow.appendChild(createPricePerMgCell(data, "apcc"));

    return apccRow;
  }

  function createEptacogRow(data) {
    var eptacogRow = document.createElement("tr");
    eptacogRow.appendChild(createProductCell("eptacog alfa"));
    eptacogRow.appendChild(createPresentationCell(data, "eptacogalfa"));
    eptacogRow.appendChild(createInitialDoseCell(data, "eptacogalfa"));
    eptacogRow.appendChild(createSubsequentDoseCell(data, "eptacogalfa"));
    eptacogRow.appendChild(createNbOfSubsequentDosesCell(data, "eptacogalfa"));
    eptacogRow.appendChild(createPricePerMgCell(data, "eptacogalfa"));

    return eptacogRow;
  }

  function setTableBody(table, data) {
    data.forEach(function (row, index) {
      var isFirstRow = index === 0;
      var tr = createCevenfactaRow(table, row, isFirstRow);
      table.appendChild(tr);
      var tr = createEptacogRow(row);
      tr.classList.add("eptacog_row");
      table.appendChild(tr);
      var tr = createApccRow(row);
      tr.classList.add("apcc_row");
      table.appendChild(tr);
    });

    var tr = createAddPatientRow(table);
    table.appendChild(tr);
  }

  /* ------------ UTILS ------------- */

  function init() {
    setDom();
    switchView();
    getData();
    setTableBody(cevensave.hospitalTbody, window.dataToOutput);
    initAppEvents();
    initTableEvents(cevensave.hospitalTbody);
    refreshScroll();
  }

  function refreshTable(table) {
    getData();
    table.innerHTML = "";
    setTableBody(table, window.dataToOutput);
    initTableEvents(table);
    toggleApccRow();
    refreshScroll();
  }

  return {
    init: init,
    refreshTable: refreshTable,
  };
})();
