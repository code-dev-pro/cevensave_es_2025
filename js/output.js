var outputModule = (function () {
  var nameModule = "output";
  var currentLanguage = languageModule.defaultLang;
  var isMgSelected = false;
  var barThickness = 80;
  var domChart = {};

  // Mock translation data
  const translations = {
    en: {
      "Cost (£)": "Cost (£)",
      Product: "Product",
      Products: "Products",
      "Total Cost": "Total Cost",
      "Number of vials*": "Number of vials*",
      Vials: "Vials",
      "Total mg": "Total mg",
      "mg saved vs eptacog alfa": "mg saved<br><i>vs</i> eptacog alfa",
      "vials saved vs eptacog alfa": "Vials saved<br><i>vs</i> eptacog alfa",
    },
    de: {
      "Cost (£)": "Kosten (€)",
      Product: "Produkt",
      Products: "Produkte",
      "Total Cost": "Gesamtkosten",
      "Number of vials*": "Anzahl der Flaschen*",
      Vials: "Flaschen",
      "Total mg": "mg Gesamt",
      "mg saved vs eptacog alfa":
        "Eingesparte mg<br><i>im Vergleich</i> zu Eptacog alfa",
      "vials saved vs eptacog alfa":
        "Eingesparte Flaschen<br /><i>im Vergleich</i> zu Eptacog alfa",
    },
    es: {
      "Cost (£)": "Coste (€)",
      Product: "Producto",
      Products: "Productos",
      "Total Cost": "Coste total (€)",
      "Number of vials*": "Número de viales*",
      Vials: "Viales",
      "Total mg": "Total mg",
      "mg saved vs eptacog alfa": "mg ahorrados<br><i>vs</i> eptacog alfa",
      "vials saved vs eptacog alfa":
        "Viales ahorrados<br><i>vs</i> eptacog alfa",
    },
  };

  function translate(text, language) {
    const translation = translations[language] || translations["en"];

    return translation[text] || text;
  }

  // function formatNumberToSpanish(input) {
  //   // 1. On enlève les espaces éventuels entre les milliers
  //   let cleaned = input.replace(/\s/g, "");

  //   // 2. On remplace la virgule française (décimales) par un point temporaire
  //   // pour bien parser le nombre en JS
  //   cleaned = cleaned.replace(",", ".");

  //   // 3. Conversion en nombre
  //   let number = parseFloat(cleaned);
  //   if (isNaN(number)) {
  //     throw new Error("Valeur invalide : " + input);
  //   }

  //   // 4. Formatage à l'espagnole
  //   // Intl.NumberFormat avec 'es-ES' gère automatiquement :
  //   // - le point comme séparateur de milliers
  //   // - la virgule comme séparateur décimal
  //   return new Intl.NumberFormat("es-ES").format(number);
  // }
  function formatNumberToSpanish(input) {
    // 1. Nettoyer l'entrée (supprimer espaces, remplacer , par .)
    let cleaned = input.replace(/\s/g, "").replace(",", ".");
    let number = parseFloat(cleaned);
    if (isNaN(number)) throw new Error("Valeur invalide : " + input);

    // 2. Transformer en string avec séparateurs personnalisés
    // Séparer la partie entière et la partie décimale
    let [integerPart, decimalPart] = number.toString().split(".");

    // Ajouter les points pour les milliers dans la partie entière
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Recomposer avec virgule si décimales
    return decimalPart ? `${integerPart},${decimalPart}` : integerPart;
  }

  // // 🔹 Exemples d'utilisation
  //  console.log(formatNumberToSpanish("2500")); // "2.500"
  // console.log(formatNumberToSpanish("2 500")); // "2.500"
  // console.log(formatNumberToSpanish("2500,75")); // "2.500,75"
  // console.log(formatNumberToSpanish("1234567,89")); // "1.234.567,89"

  const customTitle = {
    id: "customTitle",
    beforeLayout: (chart, args, opts) => {
      if (!opts.x.display) {
        return;
      }

      const { ctx } = chart;
      const { width } = ctx.measureText(opts.x.text);
      ctx.font =
        opts.x.font || '12px "Helvetica Neue", Helvetica, Arial, sans-serif';
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = opts.x.color || Chart.defaults.color;
      ctx.fillText(opts.x.text, chart.width / 2, chart.height - 10);

      chart.options.layout.padding.right = 150;
    },
    afterDraw: (chart, args, opts) => {
      const {
        ctx,
        scales: { x, y },
        chartArea: { top, bottom, left, right, width },
      } = chart;

      if (opts.x.display) {
        ctx.fillStyle = opts.x.color || Chart.defaults.color;
        ctx.font =
          opts.x.font || '12px "Helvetica Neue", Helvetica, Arial, sans-serif';
        ctx.fillText(
          opts.x.text,
          right + (opts.x.offsetX || 0),
          bottom + (opts.x.offsetY || 0)
        );
      }

      if (opts.y.display) {
        ctx.fillStyle = opts.y.color || Chart.defaults.color;
        ctx.font =
          opts.y.font || '12px "Helvetica Neue", Helvetica, Arial, sans-serif';
        ctx.fillText(
          opts.y.text,
          left + (opts.y.offsetX || 0),
          top + (opts.y.offsetY || 0)
        );
      }
    },
  };
  const customAxes = {
    id: "customAxes",

    afterDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "grey";

      ctx.moveTo(left - 1, top - 10);
      ctx.lineTo(left + 5, top - 3);
      ctx.moveTo(left + 1, top - 10);
      ctx.lineTo(left - 5, top - 3);

      ctx.moveTo(left, top - 10);
      ctx.lineTo(left, bottom);
      ctx.lineTo(right - 5, bottom);

      ctx.moveTo(right - 3, bottom + 1);
      ctx.lineTo(right - 10, bottom - 5);
      ctx.moveTo(right - 3, bottom - 1);
      ctx.lineTo(right - 10, bottom + 5);
      ctx.stroke();
      ctx.closePath();
    },
  };

  var currentData = [
    {
      nbOfPatients: 1,
      typeOfPatients: "haemophilia_a",
      bodyWeight: 70,
      // 66.48,
      nonReplacementTherapy: "no",
      typeOfEvent: "bleeding_event",
      eventPerPatient: 1,
      cevenfacta: {
        presentation: 1,
        initialDose: 0.075,
        nbOfDoses: 2.5,
        pricePerMg: 3, //null ?
        pricePerVial: 525.2,
      },
      apcc: {
        presentation: 5,
        initialDose: 0.075,
        nbOfDoses: 2.82,
        pricePerMg: 5, //null ?
        pricePerVial: 390,
      },
      eptacogalfa: {
        presentation: 1,
        initialDose: 0.09,
        nbOfDoses: 2.52,
        pricePerMg: 8, //null ?
        pricePerVial: 525.2,
      },
    },
    {
      nbOfPatients: 2,
      typeOfPatients: "haemophilia_a",
      bodyWeight: 86.48,
      nonReplacementTherapy: "no",
      typeOfEvent: "bleeding_event",
      eventPerPatient: 1,
      cevenfacta: {
        presentation: 1,
        initialDose: 0.075,
        nbOfDoses: 2.5,
        pricePerMg: 6, //null ?
        pricePerVial: 525.2,
      },
      apcc: {
        presentation: 5,
        initialDose: 0.075,
        nbOfDoses: 2.82,
        pricePerMg: 4, //null ?
        pricePerVial: 390,
      },
      eptacogalfa: {
        presentation: 1,
        initialDose: 0.09,
        nbOfDoses: 2.52,
        pricePerMg: 7, //null ?
        pricePerVial: 525.2,
      },
    },
  ];
  var isApcc = !false;
  var backgroundColors = ["#c44b2f", "#782133", "#e28a75"];
  var optionsGraphsCommun = {
    events: [],
    animation: {
      duration: 100,
      onComplete: function ({ chart }) {
        const ctx = chart.ctx;

        chart.config.data.datasets.forEach(function (dataset, i) {
          const meta = chart.getDatasetMeta(i);

          meta.data.forEach(function (bar, index) {
            const raw = dataset.data[index];
            const isNA = isNaN(raw);
            // Afficher uniquement le label, sans toucher aux données numériques du dataset
            let display = "N/A";
            if (!isNA) {
              if (isMgSelected) {
                // En mode mg, afficher uniquement la partie entière (troncature)
                display = formatNumberToSpanish(
                  Number(raw).toString().replace(".", ",")
                );
              } else {
                // En mode vials, conserver un arrondi entier
                // display = Math.round(Number(raw)).toString();
                // display = formatNumberToSpanish(Math.round(Number(raw)).toString());
              }
            }

            // ctx.textAlign = 'center';
            // ctx.fillStyle = 'grey';
            // ctx.font = Chart.helpers.fontString(20, 'bold', 'Open Sans');

            // ctx.fillText(display, bar.x, bar.y - 10);
            // const data = isNaN(dataset.data[index])? "N/A": dataset.data[index];
            ctx.textAlign = "center";
            ctx.fillStyle = "grey";
            ctx.font = Chart.helpers.fontString(20, "bold", "Open Sans");
            ctx.fillText(display, bar.x, bar.y - 10);
          });
        });
      },
    },
  };

  var optionsGraphLeft = {
    ...optionsGraphsCommun,

    plugins: {
      customTitle: {
        y: {
          display: true,
          text: translate("Cost (£)", currentLanguage),
          offsetX: -40,
          offsetY: -25,
          font: "24px Open Sans",
        },
        x: {
          display: true,
          text: translate("Product", currentLanguage),
          offsetX: 0,
          offsetY: 0,
          font: "24px Open Sans",
        },
      },
      title: {
        display: true,
        text: translate("Total Cost", currentLanguage),
        padding: { bottom: 60 },
        font: {
          size: 24,
          family: "Open Sans",
        },
      },

      legend: {
        display: false,
        labels: {
          boxWidth: 0,
        },
      },
    },

    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 18,
          },
        },
        title: {
          display: false,
          text: translate("Products", currentLanguage),
          align: "end",
          font: {
            size: 24,
            family: "Open Sans",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 18,
          },
        },
        title: {
          display: false,
          text: translate("Cost (£)", currentLanguage),
          align: "center",
          font: {
            size: 24,
            family: "Open Sans",
          },
        },

        grid: {
          display: false,
        },
      },
    },
  };

  var optionsGraphRight = {
    ...optionsGraphsCommun,
    layout: {
      padding: {
        right: 0, // Seems neccesarry to put to 0, otherwise seems to not update padding
      },
    },
    plugins: {
      customTitle: {
        y: {
          display: true,

          text: translate("Vials", currentLanguage),
          offsetX: -20,
          offsetY: -25,
          font: "24px Open Sans",
        },
        x: {
          display: true,
          text: translate("Product", currentLanguage),

          offsetX: 0,
          offsetY: 0,
          font: "24px Open Sans",
        },
      },
      title: {
        display: true,
        text: translate("Number of vials*", currentLanguage),
        padding: { bottom: 60 },
        font: {
          size: 24,
          family: "Open Sans",
        },
      },
      legend: {
        display: false,
        labels: {
          boxWidth: 0,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 18,
          },
        },
        title: {
          display: false,
          text: translate("Products", currentLanguage),
          align: "end",

          font: {
            size: 24,
            family: "Open Sans",
          },
        },

        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 18,
          },
        },
        title: {
          display: false,
          text: translate("Vials", currentLanguage),
          align: "center",
          font: {
            size: 24,
            family: "Open Sans",
          },
        },

        grid: {
          display: false,
        },
      },
    },
  };

  /**
   *
   * Comparative Cost
   */

  // Cost saving vs eptacog alfa
  function calculateCostSavingVsAlfa() {
    //TREATMENT COST (eptacog alfa) - TREATMENT COST (CEVENFACTA)
    var cost = getValueEptacog(true, false) - getValueCevenfacta(true, false);
    if (isNaN(cost)) {
      return "N/A";
    }
    return cost.toFixed(2);
  }
  // percent saving vs eptacog alfa
  function calculatePercentSavingVsAlfa() {
    //COST SAVINGS vs eptacog afla / TREATMENT COST (eptacog afla)) * 100

    var cost =
      (calculateCostSavingVsAlfa() / getValueEptacog(true, false)) * 100;
    if (isNaN(cost)) {
      return "N/A";
    }
    return Math.round(cost);
  }
  // Cost saving vs apcc
  function calculateCostSavingVsApcc() {
    //TREATMENT COST (aPCC) - TREATMENT COST (CEVENFACTA)

    var cost = getValueApcc(true, false) - getValueCevenfacta(true, false);

    if (isNaN(cost)) {
      return "N/A";
    }
    return cost.toFixed(2);
  }
  // Percent saving vs apcc
  function calculatePercentSavingVsApcc() {
    //COST SAVINGS vs aPCC / TREATMENT COST (apCC)) * 100
    var cost = (calculateCostSavingVsApcc() / getValueApcc(true, false)) * 100;
    if (isNaN(cost)) {
      return "N/A";
    }

    return Math.round(cost);
  }

  /**
   *
   * Comparative Cost Graph
   */

  function getValueCevenfacta(withPrice = true, isInt = true) {
    // Prendre les lignes du tableau de l'onglet Tool correspondantes au produit
    // "CEVENFACTA" et procéder au calcul suivant pour chacune de ces lignes : NO OF
    // PATIENTS * BODY WEIGHT * NO. OF EVENTS PER PATIENTS * INITIAL DOSE REGIMEN *
    // NUMBER OF DOSES * PRICE PER MG OR IU Résultat arrondi à l'unité
    var val = 0;
    for (var i = 0; i < currentData.length; i++) {
      if (withPrice) {
        val +=
          currentData[i].cevenfacta.initialDose[currentData[i].typeOfEvent] *
            currentData[i].bodyWeight *
            currentData[i].nbOfPatients *
            currentData[i].eventPerPatient *
            currentData[i].cevenfacta.pricePerMg +
          currentData[i].cevenfacta.subsequentDoses *
            currentData[i].cevenfacta.nbOfDoses[currentData[i].typeOfEvent] *
            currentData[i].bodyWeight *
            currentData[i].nbOfPatients *
            currentData[i].eventPerPatient *
            currentData[i].cevenfacta.pricePerMg;
      } else {
        val +=
          currentData[i].cevenfacta.initialDose[currentData[i].typeOfEvent] *
            currentData[i].bodyWeight *
            currentData[i].nbOfPatients *
            currentData[i].eventPerPatient +
          currentData[i].cevenfacta.subsequentDoses *
            currentData[i].cevenfacta.nbOfDoses[currentData[i].typeOfEvent] *
            currentData[i].bodyWeight *
            currentData[i].nbOfPatients *
            currentData[i].eventPerPatient;
      }
    }

    if (isInt) {
      return Math.round(val);
    }

    return val;
  }
  function getValueEptacog(withPrice = true, isInt = true) {
    // Prendre les lignes du tableau de l'onglet Tool correspondantes au produit
    // "eptacog alfa" et procéder au calcul suivant pour chacune de ces lignes : NO
    // OF PATIENTS * BODY WEIGHT * NO. OF EVENTS PER PATIENTS * INITIAL DOSE
    // REGIMEN * NUMBER OF DOSES * PRICE PER MG OR IU Résultat arrondi à l'unité
    var val = 0;
    for (var i = 0; i < currentData.length; i++) {
      if (withPrice) {
        val +=
          currentData[i].eptacogalfa.initialDose[currentData[i].typeOfEvent] *
            currentData[i].bodyWeight *
            currentData[i].nbOfPatients *
            currentData[i].eventPerPatient *
            currentData[i].eptacogalfa.pricePerMg +
          currentData[i].eptacogalfa.subsequentDoses *
            currentData[i].eptacogalfa.nbOfDoses[currentData[i].typeOfEvent] *
            currentData[i].bodyWeight *
            currentData[i].nbOfPatients *
            currentData[i].eventPerPatient *
            currentData[i].eptacogalfa.pricePerMg;
      } else {
        val +=
          currentData[i].eptacogalfa.initialDose[currentData[i].typeOfEvent] *
            currentData[i].bodyWeight *
            currentData[i].nbOfPatients *
            currentData[i].eventPerPatient +
          currentData[i].eptacogalfa.subsequentDoses *
            currentData[i].eptacogalfa.nbOfDoses[currentData[i].typeOfEvent] *
            currentData[i].bodyWeight *
            currentData[i].nbOfPatients *
            currentData[i].eventPerPatient;
      }
    }
    // si val est en milier

    if (isInt) {
      return Math.round(val);
    }

    return val;
  }

  function getValueApcc(withPrice = true, isInt = true) {
    // Prendre les lignes du tableau de l'onglet Tool correspondantes au produit
    // "aPCC" et procéder au calcul suivant pour chacune de ces lignes : NO OF
    // PATIENTS  BODY WEIGHT  NO. OF EVENTS PER PATIENTS  INITIAL DOSE REGIMEN
    // NUMBER OF DOSES * PRICE PER MG OR IU Résultat arrondi à l'unité
    var val = 0;
    for (var i = 0; i < currentData.length; i++) {
      if (
        currentData[i].apcc.initialDose[currentData[i].typeOfEvent] === null
      ) {
        return (val = "N/A");
      } else {
        if (withPrice) {
          val +=
            currentData[i].apcc.initialDose[currentData[i].typeOfEvent] *
              currentData[i].bodyWeight *
              currentData[i].nbOfPatients *
              currentData[i].eventPerPatient *
              currentData[i].apcc.pricePerMg +
            currentData[i].apcc.subsequentDoses *
              currentData[i].apcc.nbOfDoses[currentData[i].typeOfEvent] *
              currentData[i].bodyWeight *
              currentData[i].nbOfPatients *
              currentData[i].eventPerPatient *
              currentData[i].apcc.pricePerMg;
        } else {
          val +=
            currentData[i].apcc.initialDose[currentData[i].typeOfEvent] *
              currentData[i].bodyWeight *
              currentData[i].nbOfPatients *
              currentData[i].eventPerPatient +
            currentData[i].apcc.subsequentDoses *
              currentData[i].apcc.nbOfDoses[currentData[i].typeOfEvent] *
              currentData[i].bodyWeight *
              currentData[i].nbOfPatients *
              currentData[i].eventPerPatient;
        }
      }
    }

    if (isInt) {
      return Math.round(val);
    }
    return val;
  }

  /**
   *
   * Comparative Usage
   */

  function calulateVialsSavedVsAlfa() {
    // VIALS SAVED vs eptacog alfa : TOTAL VIALS (eptacog alfa) - TOTAL VIALS
    // (CEVENFACTA)
    var cost = getValueEptacog(false, false) - getValueCevenfacta(false, false);
    if (isNaN(cost)) {
      return "N/A";
    }

    return cost;
  }
  function calulateVialsSavedVsAPCC() {
    //VIALS SAVED vs aPCC : TOTAL VIALS (aPCC) - TOTAL VIALS (CEVENFACTA)
    var cost = getValueApcc(false, false) - getValueCevenfacta(false, false);
    if (isNaN(cost)) {
      return "N/A";
    }
    return cost;
  }

  function upateBarsChart(instance, data) {
    if (instance) {
      instance.data.datasets.forEach((dataset) => {
        dataset.data = data;
      });

      instance.update();
    }
  }

  /**
   *
   *  LOGIC
   *
   */

  function updateChart(instance, str, str2, data, labels) {
    if (instance) {
      instance.options.plugins.customTitle.y.text = str;
      instance.options.plugins.title.text = str2;
      instance.data.labels = labels;
      instance.data.datasets.forEach((dataset) => {
        dataset.data = data;
      });

      instance.update();
    }
  }

  function initDomChart() {
    domChart.toolSection = document.getElementById("tool");
    domChart.outputButton = document.getElementById("output_button");
    domChart.toolButton = document.getElementById("tool_button");
    domChart.goBackToTools = document.getElementById("tool_button_2");
    domChart.outputSection = document.getElementById("output");
    domChart.homeButton = document.getElementById("home_button");
    domChart.welcomeSection = document.getElementById("welcome");
    domChart.graphLeft = document.getElementById("bloc-graph-left");
    domChart.graphRight = document.getElementById("bloc-graph-right");
    domChart.radioIU = document.querySelectorAll(".iu");
    domChart.radioTOTAL = document.querySelectorAll(".total");
    domChart.domBlocPresentation = document.getElementById("bloc-presentation");
    domChart.domBlocVialsApcc = document.getElementById("bloc-vialsApcc");
    domChart.domLabelBlocVialsApcc =
      document.getElementById("vials_saved_alpha");
    domChart.costSavingVsAlfa = document.getElementById("costSavingVsAlfa");
    domChart.costSavingVsApcc = document.getElementById("costSavingVsApcc");
    domChart.percentSavingVsApcc = document.getElementById(
      "percentSavingVsApcc"
    );
    domChart.percentSavingVsAlfa = document.getElementById(
      "percentSavingVsAlfa"
    );
    domChart.vialsSavedSeptacog = document.getElementById("vialsSavedSeptacog");
    domChart.vialsSavedAlfa = document.getElementById("vialsSavedAlfa");
    domChart.blocCostsBottom = document.getElementById("bloc-costs-bottom-2");
    domChart.blocCostsBottom1 = document.getElementById("bloc-costs-bottom-1");
    domChart.headerImg = document.getElementById("header_img");
    domChart.popupButton = document.getElementById("popup_button");
  }

  function initEvents() {
    // setTotalMg();
    if (domChart.radioIU.length) {
      for (var i = 0; i < domChart.radioIU.length; i++) {
        domChart.radioIU[i].addEventListener("change", function () {
          var valueSelected = Number(this.value); // 1 | 2 | 5

          if (isMgSelected) {
            domChart.vialsSavedAlfa.innerHTML = (
              getValueEptacog(false) / valueSelected -
              getValueCevenfacta(false) / valueSelected
            ).toFixed(2);
            domChart.vialsSavedSeptacog.innerHTML = (
              getValueApcc(false) / valueSelected -
              getValueCevenfacta(false) / valueSelected
            ).toFixed(2);
          } else {
            domChart.vialsSavedAlfa.innerHTML =
              Math.ceil(getValueEptacog(false, false) / valueSelected) -
              Math.ceil(getValueCevenfacta(false, false) / valueSelected);
            domChart.vialsSavedSeptacog.innerHTML =
              Math.ceil(getValueApcc(false, false) / valueSelected) -
              Math.ceil(getValueCevenfacta(false, false) / valueSelected);
          }

          upateBarsChart(domChart.graphRightInstance, [
            Math.ceil(getValueCevenfacta(false, false) / valueSelected),
            Math.ceil(getValueEptacog(false, false) / valueSelected),
            Math.ceil(getValueApcc(false, false) / valueSelected),
          ]);
        });
      }
    }

    if (domChart.radioTOTAL.length) {
      for (var i = 0; i < domChart.radioTOTAL.length; i++) {
        domChart.radioTOTAL[i].addEventListener("change", function () {
          var valueSelected = this.value; // totalmg | totalvials
          if (valueSelected === "totalmg") {
            document.querySelector(".notes").style.opacity = 0;
            document.querySelector(".blank").style.opacity = 0;
            isMgSelected = true;

            updateChart(
              domChart.graphRightInstance,
              "mg",
              translate("Total mg", currentLanguage),
              [
                (
                  Math.round(getValueCevenfacta(false, false) * 100) / 100
                ).toFixed(2),
                (Math.round(getValueEptacog(false, false) * 100) / 100).toFixed(
                  2
                ),
              ],
              ["CEVENFACTA", "eptacog alfa"]
            );

            manageBlocsInMg("none");
            document
              .getElementById("bloc-costs-bottom-2")
              .classList.toggle("flex-center");

            domChart.domLabelBlocVialsApcc.innerHTML = translate(
              "mg saved vs eptacog alfa",
              currentLanguage
            );
            domChart.vialsSavedAlfa.innerHTML = isNaN(
              calulateVialsSavedVsAlfa()
            )
              ? "N/A"
              : calulateVialsSavedVsAlfa()
                  .toFixed(2)
                  .toString()
                  .replace(".", ",");
            domChart.vialsSavedSeptacog.innerHTML = isNaN(
              calulateVialsSavedVsAPCC()
            )
              ? "N/A"
              : calulateVialsSavedVsAPCC()
                  .toFixed(2)
                  .toString()
                  .replace(".", ",");
          } else {
            document.querySelector(".notes").style.opacity = 1;
            document.querySelector(".blank").style.opacity = 0;
            isMgSelected = false;
            if (isApcc) {
              updateChart(
                domChart.graphRightInstance,
                translate("Vials", currentLanguage),
                translate("Number of vials*", currentLanguage),
                [
                  Math.round(getValueCevenfacta(false, false)),
                  Math.round(getValueEptacog(false, false)),
                  Math.round(getValueApcc(false) / 500),
                ],
                ["CEVENFACTA", "eptacog alfa", "aPCC"]
              );
            } else {
              updateChart(
                domChart.graphRightInstance,
                translate("Vials", currentLanguage),
                translate("Number of vials*", currentLanguage),

                [
                  Math.round(getValueCevenfacta(false, false)),
                  Math.round(getValueEptacog(false, false)),
                ],
                ["CEVENFACTA", "eptacog alfa"]
              );
            }

            manageBlocsInMg("flex");
            domChart.vialsSavedAlfa.innerHTML = isNaN(
              calulateVialsSavedVsAlfa()
            )
              ? "N/A"
              : Math.ceil(calulateVialsSavedVsAlfa().toFixed(2))
                  .toString()
                  .replace(".", ",");
            domChart.vialsSavedSeptacog.innerHTML = isNaN(
              calulateVialsSavedVsAPCC()
            )
              ? "N/A"
              : Math.ceil(getValueApcc(false, false) / 500) -
                Math.ceil(getValueCevenfacta(false, false) / 1);
            domChart.domLabelBlocVialsApcc.innerHTML = translate(
              "vials saved vs eptacog alfa",
              currentLanguage
            );
          }
          hideBlocsIsApccFalse();
        });
      }
    }
    setTotalMg();
  }

  function setTotalMg() {
    document.querySelector(".notes").style.opacity = 0;
    document.querySelector(".blank").style.opacity = 0;
    isMgSelected = true;

    updateChart(
      domChart.graphRightInstance,
      "mg",
      translate("Total mg", currentLanguage),
      [
        (Math.round(getValueCevenfacta(false, false) * 100) / 100).toFixed(2),
        (Math.round(getValueEptacog(false, false) * 100) / 100).toFixed(2),
      ],
      ["CEVENFACTA", "eptacog alfa"]
    );

    manageBlocsInMg("none");
    document
      .getElementById("bloc-costs-bottom-2")
      .classList.toggle("flex-center");

    domChart.domLabelBlocVialsApcc.innerHTML = translate(
      "mg saved vs eptacog alfa",
      currentLanguage
    );
    domChart.vialsSavedAlfa.innerHTML = isNaN(calulateVialsSavedVsAlfa())
      ? "N/A"
      : calulateVialsSavedVsAlfa().toFixed(2).toString().replace(".", ",");
    domChart.vialsSavedSeptacog.innerHTML = isNaN(calulateVialsSavedVsAPCC())
      ? "N/A"
      : calulateVialsSavedVsAPCC().toFixed(2).toString().replace(".", ",");
  }

  function manageBlocsInMg(display) {
    domChart.domBlocPresentation.style.display = display;
    domChart.domBlocVialsApcc.style.display = display;

    document.getElementById("bloc-usage").classList.toggle("flex-center");
    document.getElementById("bloc-costs-top-2").classList.toggle("flex-center");
  }

  function initChart() {
    var myChartLeftInstance = new Chart(domChart.graphLeft, {
      type: "bar",
      data: {
        labels: isApcc
          ? ["CEVENFACTA", "eptacog alfa", "aPCC"]
          : ["CEVENFACTA", "eptacog alfa"],
        datasets: [
          {
            label: "Total Cost",
            data: isApcc
              ? [
                  getValueCevenfacta(true),
                  getValueEptacog(true),
                  Math.round(getValueApcc(true)),
                ]
              : [getValueCevenfacta(true), getValueEptacog(true)],
            backgroundColor: backgroundColors,
            borderWidth: 0,

            barThickness: barThickness,
          },
        ],
      },
      options: {
        ...optionsGraphLeft,
      },
      plugins: [customAxes, customTitle],
    });
    domChart.graphLeftInstance = myChartLeftInstance;
    var myChartRightInstance = new Chart(domChart.graphRight, {
      type: "bar",
      data: {
        labels: isApcc
          ? ["CEVENFACTA", "eptacog alfa", "aPCC"]
          : ["CEVENFACTA", "eptacog alfa"],
        datasets: [
          {
            label: "Number of vials*",

            data: isApcc
              ? [
                  Math.round(getValueCevenfacta(false, false)),
                  Math.round(getValueEptacog(false, false)),
                  Math.round(getValueApcc(false) / 500),
                ]
              : [
                  Math.round(getValueCevenfacta(false, false)),
                  Math.round(getValueEptacog(false, false)),
                ],

            backgroundColor: backgroundColors,
            borderWidth: 0,
            barThickness: barThickness,
          },
        ],
      },
      options: {
        ...optionsGraphRight,
      },
      plugins: [customAxes, customTitle],
    });
    domChart.graphRightInstance = myChartRightInstance;
  }

  function hideBlocsIsApccFalse() {
    if (isMgSelected) {
      domChart.domBlocVialsApcc.style.display = "none";
      document
        .getElementById("bloc-costs-top-2")
        .classList.add("justify-center");
      return;
    } else {
      domChart.domBlocVialsApcc.style.display = "flex";
    }

    if (!isApcc) {
      domChart.domBlocVialsApcc.style.display = "none";
      domChart.blocCostsBottom1.style.display = "none";
    } else {
      domChart.domBlocVialsApcc.style.display = "flex";
      domChart.blocCostsBottom1.style.display = "flex";
    }
  }

  function init() {
    initDomChart();
    initEvents();
    refresh();
 
    domChart.goBackToTools.addEventListener("click", function () {
      domChart.outputSection.style.display = "none";
      domChart.goBackToTools.style.display = "none";
      domChart.toolSection.style.display = "flex";
      domChart.outputButton.style.display = "flex";
      domChart.homeButton.style.display = "flex";
      domChart.headerImg.style.top = "-100px";
      domChart.popupButton.style.display = "flex";
      destroy();
    });

    domChart.homeButton.addEventListener("click", function () {
      domChart.outputSection.style.display = "none";
      domChart.goBackToTools.style.display = "none";
      domChart.welcomeSection.style.display = "flex";
      domChart.toolButton.style.display = "flex";
      domChart.homeButton.style.display = "none";
      domChart.headerImg.style.top = "0px";
    });
  }

  function refresh() {
    if (window.dataToOutput) {
      currentData = window.dataToOutput;
    }
    isMgSelected = false;
    isApcc = window.isApcc;
   
    if (domChart.graphRightInstance && domChart.graphLeftInstance) {
      destroy();
      initChart();
    } else {
      initChart();
    }

    hideBlocsIsApccFalse();

    document.getElementById("totalmg").checked = false;
    document.getElementById("totalVials").checked = true;

    isApcc
      ? document
          .getElementById("bloc-costs-top-2")
          .classList.remove("justify-center")
      : document
          .getElementById("bloc-costs-top-2")
          .classList.add("justify-center");

    domChart.costSavingVsAlfa.innerHTML = isNaN(calculateCostSavingVsAlfa())
      ? "N/A"
      : formatNumberToSpanish(
          calculateCostSavingVsAlfa().toString().replace(".", ",")
        );
    domChart.percentSavingVsAlfa.innerHTML = isNaN(
      calculatePercentSavingVsAlfa()
    )
      ? "N/A"
      : calculatePercentSavingVsAlfa().toString().replace(".", ",") + " %";
    domChart.costSavingVsApcc.innerHTML = isNaN(calculateCostSavingVsApcc())
      ? "N/A"
      : calculateCostSavingVsApcc().toString().replace(".", ",");
    domChart.percentSavingVsApcc.innerHTML = isNaN(
      calculatePercentSavingVsApcc()
    )
      ? "N/A"
      : calculatePercentSavingVsApcc().toString().replace(".", ",") + " %";
    domChart.vialsSavedAlfa.innerHTML = isNaN(calulateVialsSavedVsAlfa())
      ? "N/A"
      : Math.ceil(calulateVialsSavedVsAlfa().toFixed(2))
          .toString()
          .replace(".", ",");
    domChart.vialsSavedSeptacog.innerHTML = isNaN(calulateVialsSavedVsAPCC())
      ? "N/A"
      : Math.ceil(getValueApcc(false, false) / 500) -
        Math.ceil(getValueCevenfacta(false, false) / 1);

    setTotalMg();
  }

  function destroy() {
    domChart.graphRightInstance.destroy();
    domChart.graphLeftInstance.destroy();
    domChart.graphRightInstance = null;
    domChart.graphLeftInstance = null;
  }
  return { init: init, refresh: refresh, destroy: destroy };
})();
