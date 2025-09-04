var languageModule = (function () {
  var nameModule = 'lang';
  var dom = {};
  var defaultLang = 'es';

  function getLang() {
    var browsertLang = window.navigator.language;

    switch (browsertLang) {
      case 'en-US':
        return 'en';
      case 'en-GB':
        return 'en';
      case 'de-DE':
        return 'de';
      default:
        return defaultLang;
    }
  }

  function init() {
    console.log('INIT::', nameModule);
    document.documentElement.lang = defaultLang;
    setDom();
    setLang();
  }

  var lang = {
    en: {
      warning_message: "",
      // home page
      overview_tool: "Overview of tool",
      overview_tool_text:
        "This tool enables the calculation of savings obtained with CEVENFACTA<sup>®</sup> in comparison with aPCC and eptacog alfa, for the treatment of acute bleeding episodes or during surgeries in adult and adolescent (12 years of age or older) patients suffering from hemophilia A / B with inhibitors.",
      overview_tool_subtitle_1: "Hospital-level:",
      overview_tool_text_1:
        "The tool will be able to calculate the potential saving within the haemophilia hospital departement, considering several patients are being treated for their bleeding events or surgeries.",
      overview_tool_subtitle_2: "Patient-level:",
      overview_tool_text_2:
        "The tool will be able to calculate the potential saving for a giving patient, considering several different bleeding events or surgery per patient.",
      overview_tool_subtitle_3: "Event-level:",
      overview_tool_text_3:
        "The tool will be able to calculate the savings potentially made for each different bleeding event that a patient concurs.",
      overview_output: "Summary of outputs",
      overview_output_text_1:
        "Comparative cost of treatment for the three products (CEVENFACTA<sup>®</sup>, aPCC, eptacog alfa)",
      overview_output_text_2:
        "Comparative usage of vials or mg for the three products (CEVENFACTA<sup>®</sup>, aPCC, eptacog alfa)",
      tool_button_text: "Tool",

      // tool page
      label_level: "Select Level :",
      option_level_1: "Hospital",
      option_level_2: "Patient",
      option_level_3: "Event",
      label_apcc_checkbox:
        'Show aPCC product <input type="checkbox" name="apcc_checkbox" /><span class="checkmark"></span>',
      default_view: "Default View",
      clear_button: "Clear All",
      tools_legend_first: "Orange cells are modifiable",
      tools_legend_second:
        "* Patients are considered as adults or adolescents (12 years of age and older)",
      tools_legend_third: "** Average prices observed on April, 1, 2023.",
      output_button_text: "Output",
      // tool page table
      no_patients: "No. of Patients",
      type_patient: "Type of patients*",
      body_weight: "Body weight (kg)",
      non_replacement_therapy: "Non-replacement therapy",
      type_event: "Type of event",
      events_patients: "No. of Events Per Patient",
      product: "Product",
      presentation: "Presentation",
      initial_dose: "Initial Dose (μg or IU per kg)",
      subsequent_doses: "Subsequent Doses (μg or IU per kg)",
      no_subsequent_doses: "No. of Subsequent Doses",
      price: "Price per mg or IU** (£)",
      event_body_weight: "Body weight (kg)*", // only for event level

      //output page
      outputleft_title: "Comparative cost (£)",
      label_cost_saving_vs_alfa: "Cost savings<br /><i>vs</i> eptacog alfa",
      label_cost_saving_vs_alfa_percent:
        "% savings<br /><i>vs</i> eptacog alfa",
      label_cost_saving_vs_apcc: "Cost savings<br /><i>vs</i> aPCC",
      label_cost_saving_vs_apcc_percent: "% savings<br /><i>vs</i> aPCC",
      outputleft_notes:
        "* If the number after the decimal point is equal to 5 or more, the number is rounded up",
      outputright_title: "Comparative usage (vials or mg)",
      vials_saved_alpha: "Vials saved<br /><i>vs</i> eptacog alfa",
      vials_saved_apcc: "Vials saved<br /><i>vs</i> aPCC",
      label_usage_vials: "Usage in vials/mg",
      label_total_vials:
        'Total vials <input type="radio" id="totalVials" value="totalvials" class="total checkmark" name="total" checked/><span class="checkmark"></span>',
      label_total_mg:
        'Total mg <input type="radio" id="totalmg" value="totalmg" class="total checkmark" name="total"/><span class="checkmark"></span>',
      outputright_notes:
        "* If the number after the decimal point is equal to 5 or more, the number is rounded up.",
      tool_button_text_2: "Tool",

      // popup
      popup_1_title: "Sources",
      popup_1_text: `
      <b>1.</b> SEVENFACT SmPC (IDR recommended for mild/moderate Bleeding Episode and minor surgery. For
      Major surgery: 200 µg/kg before surgery, followed by 75 µg/kg) <br />
      <b>2.</b> PERSEPT-1 Clinical Study Report (CSR) (Mean Total Dose reported directly from the source;
      Adult Mean Body Weight [Table 9, page 84]) <br />
      <b>3.</b> PERSEPT-2 CSR (Mean Total Dose reported directly from the source; Paediatric Mean Body Weight
      [Table 11, page 90]) <br />
      <b>4.</b> PERSEPT-3 CSR (Mean Total Dose calculated from the source) <br />
      <b>5.</b> “Recommendations concerning products licensed (including eptacob-beta) for the treatment of
      hemophilia and other bleeding disorders” from the Medical and Scientific Advisory Council (MASAC) of the
      National Hemophilia Foundation (NHF). Revised August 2020 (“Given the lack of in vivo data demonstrating
      the safety of using higher doses of rFVIIa products in patients with hemophilia A and inhibitors
      receiving emicizumab, at this time we recommend using either the 70-90 mcg/kg (eptacog alfa) or 75
      mcg/kg (eptacog beta) nitial dose regimens in these patients”) <br />
      <b>6.</b> Based on (5) and as no (for EB) or too few (for EA) cases of concomitant use of rFVIIa and
      emicizumab in patients with HA with inhibitors have been reported in the literature, the MTD recommended
      are supposed to be the same than the ones currently used in patients with HA with inhibitors without
      Emicizumab. <br />
      <b>7.</b> FEIBA SmPC (As a general guideline, a dose of 50 –100 U FEIBA per kg body weight is
      recommended)<br />
      <b>8.</b> “Randomized comparison of prophylaxis and on-demand regimens with FEIBA NF in the treatment of
      haemophilia A and B with inhibitors”. Antunes et al., Haemophilia 2014. (Median Total Dose calculated
      from the source)<br />
      <b>9.</b> “Experience of four UK comprehensive care centres using FEIBA for surgeries in patients with
      inhibitors”. Rangarajan et al., Haemophilia 2011. (Mean Total Dose calculated from the source) <br />
      <b>10.</b> The UK guidance (“Treatment of bleeding episodes in haemophilia A complicated by a factor
      VIII inhibitor in patients receiving Emicizumab. Interim guidance from UKHCDO Inhibitor Working Party
      and Executive Committee”, Haemophilia 2018) emphasizes that aPCC should not be used in patients
      receiving emicizumab unless no other alternative is available—a recommendation endorsed by the German
      panel (“Optimizing the management of patients with haemophilia A and inhibitors in the era of
      emicizumab: Recommendations from a German expert panel”, Haemophilia 2020). <br />
      <b>11.</b> NOVOSEVEN SmPC (IDR recommended for mild, moderate and serious Bleeding Episode) <br />
      <b>12.</b> “Recombinant factor VIIa analog in the management of hemophilia with inhibitors: results from a
      multicenter, randomized, controlled trial of vatreptacog alfa”. S. Lentz and al., J Thomb Haemost 2014
      (Mean Total Dose reported directly from the source). <br />
      <b>13.</b> Mean Total Dose extrapolated from the source (PERSEPT-2 &amp; 3 CSR). For details, see the
      Contextualization Study (NOVOSEVEN) comparing “Recombinant factor VIIa analog in the management of
      hemophilia with inhibitors: results from a multicenter, randomized, controlled trial of vatreptacog
      alfa”. S. Lentz and al., J Thromb Haemost. 2014 with “PERSEPT 1: a phase 3 trial of activated eptacog
      beta for on-demand treatment of haemophilia inhibitor-related bleeding”. Wang et al., Clinical
      Haemophilia 2017, showing that in Haemophilia A/B patient (&gt; 12y.) with inhibitors and presenting
      bleeding events, the NOVOSEVEN® Mean Total Dose (90µg/kg IDR) required to have an effective and
      sustained bleeding control measured at 24hrs would be 20% higher than SEVENFACT® Mean Total Dose
      (75µg/kg IDR) <br />
      <b>14.</b> For details, see the Contextualization Study (FEIBA) <br />
      <b>15.</b> Open Exchange Rates: https://openexchangerates.org/ <br />
      <b>16.</b> All price, reimbursement, and cost of treatment calculations are sourced from the GPI pulse
      analytics platform.
      `,
    },
    de: {
      warning_message:"",
      // home page
      overview_tool: "Überblick über das Tool",
      overview_tool_text:
        "Dieses Tool ermöglicht die Berechnung der Einsparungen, die mit CEVENFACTA<sup>®</sup> im Vergleich zu aPCC und Eptacog alfa bei der Behandlung von akuten Blutungsepisoden oder während Operationen bei erwachsenen und jugendlichen (ab 12 Jahren) Patienten mit Hämophilie A / B mit Inhibitoren erzielt werden.",
      overview_tool_subtitle_1: "Krankenhaus-Ebene:",
      overview_tool_text_1:
        "Das Tool wird in der Lage sein, die potenziellen Einsparungen innerhalb der Hämophilie-Krankenhausabteilung zu berechnen, wenn mehrere Patienten wegen ihrer Blutungsereignisse oder Operationen behandelt werden.",
      overview_tool_subtitle_2: "Patientenebene:",
      overview_tool_text_2:
        "Das Tool wird in der Lage sein, die potenziellen Einsparungen für einen bestimmten Patienten zu berechnen, wobei mehrere verschiedene Blutungsereignisse oder Operationen pro Patient berücksichtigt werden.",
      overview_tool_subtitle_3: "Ereignis-Ebene",
      overview_tool_text_3:
        "Das Tool wird in der Lage sein, die potenziellen Einsparungen für jedes verschiedene Blutungsereignis zu berechnen, das ein Patient einräumt.",
      overview_output: "Zusammenfassung der Ergebnisse",
      overview_output_text_1:
        "Vergleich der Behandlungskosten für die drei Produkte (CEVENFACTA<sup>®</sup>, aPCC, eptacog alfa)",
      overview_output_text_2:
        "Vergleich des Verbrauchs an Ampullen oder mg für die drei Produkte (CEVENFACTA<sup>®</sup>, aPCC, eptacog alfa)",
      tool_button_text: "Werkzeug",

      // tool page
      label_level: "Ebene auswählen:",
      option_level_1: "Krankenhaus",
      option_level_2: "Patient",
      option_level_3: "Ereignis",
      label_apcc_checkbox:
        'aPCC-Produkt anzeigen <input type="checkbox" name="apcc_checkbox" /><span class="checkmark"></span>',
      default_view: "Standardansicht",
      clear_button: "Alle löschen",
      tools_legend_first: "Orangefarbene Zellen sind veränderbar",
      tools_legend_second:
        "* Patienten gelten als Erwachsene oder Jugendliche (12 Jahre und älter)",
      tools_legend_third:
        "** Durchschnittliche Preise, beobachtet am 1. April 2023.",
      output_button_text: "Ausgabe",
      // tool page table
      no_patients: "Anzahl der Patienten",
      type_patient: "Art der Patienten*",
      body_weight: "Körper-<br />gewicht (kg)",
      non_replacement_therapy: "Nicht-Ersatztherapie",
      type_event: "Art des Ereignisses",
      events_patients: "Anzahl der Ereignisse pro Patient",
      product: "Produkt",
      presentation: "Darstellung",
      initial_dose: "Anfangsdosis (μg oder I.E. pro kg)",
      subsequent_doses: "Nachfolgende Dosen (μg oder I.E. pro kg)",
      no_subsequent_doses: "Anzahl der nachfolgenden Dosen",
      price: "Preis pro mg oder I.E.** (€)",
      event_body_weight: "Körper-<br />gewicht (kg)*", // only for event level
      event_events_patients: "Anzahl der Ereignisse", // only for event level

      //output page
      outputleft_title: "Kosten im Vergleich (€)",
      label_cost_saving_vs_alfa:
        "Kosteneinsparungen<br /><i>gegenüber</i> Eptacog alfa",
      label_cost_saving_vs_alfa_percent:
        "Einsparungen in %<br /><i>gegenüber</i> Eptacog alfa",
      label_cost_saving_vs_apcc:
        "Kosteneinsparungen<br /><i>gegenüber</i> aPCC",
      label_cost_saving_vs_apcc_percent:
        "Einsparungen in %<br /><i>gegenüber</i> aPCC",
      outputleft_notes:
        "* Wenn die Zahl nach dem Komma 5 oder mehr beträgt, wird die Zahl aufgerundet.",
      outputright_title: "Vergleichender Verbrauch (Flaschen oder mg)",
      vials_saved_alpha:
        "Eingesparte Flaschen<br /><i>im Vergleich</i> zu Eptacog alfa",
      vials_saved_apcc: "Eingesparte Flaschen<br /><i>im Vergleich</i> zu aPCC",
      label_usage_vials: "Verbrauch in Flaschen/mg",
      label_total_vials:
        'Flaschen insgesamt <input type="radio" id="totalVials" value="totalvials" class="total checkmark" name="total" checked/><span class="checkmark"></span>',
      label_total_mg:
        'mg Gesamt <input type="radio" id="totalmg" value="totalmg" class="total checkmark" name="total"/><span class="checkmark"></span>',
      outputright_notes:
        "* Wenn die Zahl nach dem Komma 5 oder mehr beträgt, wird die Zahl aufgerundet.",
      tool_button_text_2: "Werkzeug",

      // popup
      popup_1_title: "Referenzen",
      popup_1_text: `
      <b>1.</b> SEVENFACT SmPC (IDR empfohlen für leichte/moderate Blutungsepisoden und kleinere Operationen. 
      Für größere Operationen: 200 µg/kg vor der Operation, gefolgt von 75 µg/kg) <br />
      <b>2.</b> PERSEPT-1 Klinischer Studienbericht (CSR) (Mittlere Gesamtdosis, direkt von der Quelle gemeldet; 
      Mittleres Körpergewicht bei Erwachsenen [Tabelle 9, Seite 84]) <br />
      <b>3.</b> PERSEPT-2 CSR (direkt von der Quelle gemeldete mittlere Gesamtdosis; mittleres pädiatrisches Körpergewicht [Tabelle 11, Seite 90]) <br />
      <b>4.</b> PERSEPT-3 CSR (Mittlere Gesamtdosis, berechnet aus der Quelle) <br />
      <b>5.</b> Empfehlungen für Produkte, die für die Behandlung von Hämophilie und anderen Blutungsstörungen zugelassen sind (einschließlich Eptacob-beta)"
      (Empfehlungen zu Produkten, die für die Behandlung von Hämophilie und anderen Blutungsstörungen zugelassen sind)
      des Medical and Scientific Advisory Council (MASAC) der National Hemophilia Foundation (NHF). Überarbeitet im August 2020 
      ("Angesichts des Mangels an in-vivo-Daten, die die Sicherheit der Verwendung höherer Dosen von rFVIIa-Produkten bei Patienten 
      mit Hämophilie A und Inhibitoren, die Emicizumab erhalten, belegen, empfehlen wir derzeit, bei diesen Patienten entweder die 70-90 µg/kg 
      (Eptacog alfa) oder 75 µg/kg (Eptacog beta) zu verwenden") <br />
      <b>6.</b> Auf der Grundlage von (5) und da in der Literatur keine (für Eptacog beta ) oder zu wenige (für Eptacog alfa ) 
      Fälle der gleichzeitigen Anwendung von rFVIIa und Emicizumab bei Patienten mit HA mit Inhibitoren berichtet wurden, sollten die 
      empfohlenen mittlere Gesamtdosisdie gleichen sein wie die, die derzeit bei Patienten mit Hämophilen A mit Inhibitoren ohne Emicizumab verwendet werden. <br />
      <b>7.</b> FEIBA Fachinformation (als allgemeine Richtlinie wird eine Dosis von 50 - 100 U FEIBA pro kg Körpergewicht empfohlen) <br />
      <b>8.</b> "Randomisierter Vergleich von Prophylaxe- und Bedarfstherapien mit FEIBA NF bei der Behandlung von Hämophilie A und -B mit Inhibitoren".Antunes et al. 
      (Hämophilie 2014). (Mittlere Gesamtdosis aus der Quelle berechnet)<br />
      <b>9.</b> "Erfahrungen von vier britischen Zentren, die FEIBA für Operationen bei Patienten mit Inhibitoren einsetzen.". 
      Rangarajan et al, Hämophilie 2011. (Mittlere Gesamtdosis aus der Quelle berechnet) <br />
      <b>10.</b> Die britische Leitlinie ("Treatment of bleeding episodes in Haemophilia A complicated by a factor VIII inhibitor in patients receiving Emicizumab. 
      Interim guidance from UKHCDO Inhibitor Working Party and Executive Committee", Haemophilia 2018) betont, dass aPCC bei Patienten, die Emicizumab erhalten, 
      nicht eingesetzt werden sollte, es sei denn, es gibt keine andere Alternative - eine Empfehlung, die vom deutschen Expertengremium ("Optimizing the management 
      of patients with Haemophilia A and inhibitors in the era of Emicizumab: Empfehlungen eines deutschen Expertengremiums", Hämophilie 2020). <br />
      <b>11.</b> NOVOSEVEN Fachinformation (IDR empfohlen für leichte, mittelschwere und schwere Blutungsepisoden) <br />
      <b>12.</b> "Rekombinantes Faktor VIIa-Analogon in der Behandlung von Hämophilie mit Inhibitoren: Ergebnisse einer multizentrischen, randomisierten, 
      kontrollierten Studie mit Vatreptacog alfa". S. Lentz u. a., J Thomb Haemost 2014 (Mittlere Gesamtdosis direkt von der Quelle gemeldet). <br />
      <b>13.</b> Mittlere Gesamtdosis extrapoliert aus der Quelle (PERSEPT-2 & 3 CSR).
      Für Einzelheiten siehe die Kontextualisierungsstudie (NOVOSEVEN) zum Vergleich von "Recombinant factor VIIa analog in the management of hemophilia 
      with inhibitors: results from a multicenter, randomized, controlled trial of vatreptacog alfa". S. Lentz u.a., J Thromb Haemost. 2014 mit 
      "PERSEPT 1: a phase 3 trial of activated eptacog beta for on-demand treatment of haemophilia inhibitor-related bleeding".Wang et al. 2017, 
      Clinical Haemophilia, zeigt, dass bei Hämophilie A/B-Patienten (> 12 J.) mit Inhibitoren, die Blutungsereignisse aufweisen, die mittlere Gesamtdosis von NOVOSEVEN® 
      (90 µg/kg IDR), die für eine wirksame und anhaltende Blutungskontrolle, gemessen nach 24 Stunden, erforderlich ist, 20% höher ist als die mittlere Gesamtdosis 
      von CEVENFACTA® (75 µg/kg IDR). <br />
      <b>14.</b> Einzelheiten sind der Kontextualisierungsstudie (FEIBA) zu entnehmen. <br />
      <b>15.</b> Offene Wechselkurse: https://openexchangerates.org/ <br />
      <b>16.</b> Alle Preis-, Erstattungs- und Behandlungskostenberechnungen stammen von der GPI-Pulse-Analyseplattform.
      `,
    },
    // Esta herramienta permite calcular el ahorro obtenido con CEVENFACTA<sup>®</sup> en comparación con complejo protrombínico activado y eptacog alfa, para el tratamiento de episodios hemorrágicos agudos o durante cirugías en pacientes adultos y adolescentes (a partir de 12 años) que padecen hemofilia A / B con inhibidores
    es: {
      // home page
      resumen_pdf_button_text:
        "CEVENFACTA<sup>®</sup><br/>Resumen de las caractéristicas del producto",
      overview_tool: "Visión general de la herramienta",
      overview_tool_text:
        "Esta herramienta permite calcular el ahorro obtenido con CEVENFACTA<sup>®</sup> en comparación con eptacog alfa, para el tratamiento de episodios hemorrágicos agudos o durante cirugías en pacientes adultos y adolescentes (a partir de 12 años) que padecen hemofilia A / B con inhibidores.<br/>La herramienta podrá calcular el ahorro potencial dentro del departamento del hospital de hemofilia, considerando que varios pacientes están siendo tratados por sus eventos hemorrágicos o cirugías.",
      overview_tool_subtitle_1: "",
      overview_tool_text_1: "",
      overview_tool_subtitle_2: "",
      overview_tool_text_2: "",
      overview_tool_subtitle_3: "",
      overview_tool_text_3: "",
      overview_output: "Resumen de resultados",
      overview_output_text_1:
        "Costo comparativo del tratamiento para los tres productos (CEVENFACTA<sup>®</sup>, eptacog alfa)",
      overview_output_text_2:
        "Uso comparativo de viales o mg para los tres productos (CEVENFACTA<sup>®</sup>, eptacog alfa)",
      tool_button_text: "Herramienta",

      // tool page
      label_level: "Seleccione el nivel:",
      option_level_1: "Hospital",
      option_level_2: "Paciente",
      option_level_3: "Evento",
      label_apcc_checkbox:
        'Mostrar producto aPCC <input type="checkbox" name="apcc_checkbox" /><span class="checkmark"></span>',
      default_view: "Vista por defecto",
      clear_button: "Borrar todo",
      tools_legend_first: "Las celdas naranjas son modificables",
      tools_legend_second:
        "* Los pacientes se consideran adultos o adolescentes (a partir de 12 años)",
      tools_legend_third: "** Precios medios observados el 1 de abril de 2023.",
      output_button_text: "Salida",
      // tool page table
      no_patients: "Nº de pacientes",
      type_patient: "Tipo de pacientes*",
      body_weight: "Peso corporal (kg)",
      non_replacement_therapy: "Terapia no sustitutiva",
      type_event: "Tipo de evento",
      events_patients: "Nº de episodios por paciente",
      product: "Producto",
      presentation: "Presentación",
      initial_dose: "Dosis inicial (μg/kg)",
      subsequent_doses: "Dosis posteriores (μg/kg)",
      no_subsequent_doses: "Nº de dosis posteriores",
      price: "Precio<br/>por mg (€)",
      event_body_weight: "Peso corporal (kg)*", // only for event level
      event_events_patients: "Nº de episodios", // only for event level

      //output page
      outputleft_title: "Coste comparativo (€)",
      label_cost_saving_vs_alfa:
        "Ahorro de costes<br /><i>frente a</i> eptacog alfa",
      label_cost_saving_vs_alfa_percent:
        "% de ahorro<br /><i>frente a</i> eptacog alfa",
      label_cost_saving_vs_apcc: "Ahorro de costes<br /><i>frente a</i> aPCC",
      label_cost_saving_vs_apcc_percent:
        "% de ahorro<br /><i>frente a</i> aPCC",
      outputleft_notes:
        "* Si el número después del punto decimal es igual a 5 o más, el número se redondea hacia arriba.",
      outputright_title: "Uso comparativo (mg)",
      vials_saved_alpha: "Viales ahorrados<br /><i>vs</i> eptacog alfa",
      vials_saved_apcc: "Viales ahorrados<br /><i>vs</i> aPCC",
      label_usage_vials: "Uso en viales/mg",
      label_total_vials:
        'Total viales <input type="radio" id="totalVials" value="totalvials" class="total checkmark" name="total" checked/><span class="checkmark"></span>',
      label_total_mg:
        'Total mg <input type="radio" id="totalmg" value="totalmg" class="total checkmark" name="total"/><span class="checkmark"></span>',
      outputright_notes:
        "* Si el número después del punto decimal es igual a 5 o más, el número se redondea hacia arriba.",
      tool_button_text_2: "Herramienta",
      warning_message: "Por favor, complete todos los campos obligatorios para obtener un resultado.",

      // popup
      popup_1_title: "Calculadora de dosis​",
      popup_1_text: `
      <b>1.</b> SEVENFACT SmPC (régimen inicial de dosis recomendada para Episodio hemorrágico leve/moderado y cirugía menor. 
      Para cirugía mayor: 200 µg/kg antes de la cirugía, seguido de 75 µg/kg) <br />
      <b>2.</b> PERSEPT-1 Clinical Study Report (CSR) (Dosis Total Media comunicada directamente de la fuente; 
      Peso Corporal Medio del Adulto [Tabla 9, página 84]) <br />
      <b>3.</b> PERSEPT-2 CSR (Dosis Total Media comunicada directamente de la fuente; 
      Peso Corporal Medio Pediátrico [Tabla 11, página 90]) <br />
      <b>4.</b> PERSEPT-3 CSR (Dosis Total Media calculada a partir de la fuente) <br />
      <b>5.</b> "Recomendaciones relativas a productos autorizados (incluido eptacog-beta) para el tratamiento de la hemofilia 
      y otros trastornos hemorrágicos" del Consejo Asesor Médico y Científico (MASAC) de la Fundación Nacional de Hemofilia (NHF).
      Revisado en agosto de 2020 ("Dada la falta de datos in vivo que demuestren la seguridad de usar dosis más altas de productos 
      de rFVIIa en pacientes con hemofilia A e inhibidores que reciben emicizumab, en este momento recomendamos usar los regímenes 
      de dosis iniciales de 70-90 mcg/kg (eptacog alfa) o 75 mcg/kg (eptacog beta) en estos pacientes"). <br />
      <b>6.</b> En base a (5) y dado que no se han descrito en la literatura casos (para EB) o muy pocos (para EA) de uso concomitante 
      de rFVIIa y emicizumab en pacientes con HA con inhibidores, se supone que las MTD recomendadas son las mismas que las utilizadas 
      actualmente en pacientes con HA con inhibidores sin Emicizumab. <br />
      <b>7.</b> FEIBA SmPC (Como pauta general, se recomienda una dosis de 50 -100 U de FEIBA por kg de peso corporal). <br />
      <b>8.</b> "Comparación aleatorizada de regímenes profilácticos y a demanda con FEIBA NF en el tratamiento de la hemofilia A y B 
      con inhibidores". Antunes et al., Hemofilia 2014. (Dosis total mediana calculada a partir de la fuente). <br />
      <b>9.</b> "Experiencia de cuatro centros de atención integral del Reino Unido utilizando FEIBA para cirugías en pacientes con inhibidores". 
      Rangarajan et al., Hemofilia 2011. (Dosis total media calculada a partir de la fuente) <br />
      <b>10.</b> La guía del Reino Unido ("Treatment of bleeding episodes in haemophilia A complicated by a factor VIII inhibitor in patients 
      receiving Emicizumab.Interim guidance from UKHCDO Inhibitor Working Party and Executive Committee", Haemophilia 2018) enfatiza que el aPCC 
      no debe usarse en pacientes que reciben emicizumab a menos que no haya otra alternativa disponible, una recomendación respaldada por el panel 
      alemán ("Optimizing the management of patients with haemophilia A and inhibitors in the era of emicizumab: Recomendaciones de un panel de 
      expertos alemanes", Haemophilia 2020). <br />
      <b>11.</b> NOVOSEVEN SmPC (IDR recomendada para episodios hemorrágicos leves, moderados y graves). <br />
      <b>12.</b> "Análogo del factor VIIa recombinante en el tratamiento de la hemofilia con inhibidores: resultados de un ensayo multicéntrico, 
      aleatorizado y controlado de vatreptacog alfa".S. Lentz y otros, J Thomb Haemost 2014 (Dosis media total comunicada directamente por la fuente). <br />
      <b>13.</b> Dosis total media extrapolada de la fuente (PERSEPT-2 & 3 CSR). Para más detalles, véase el estudio de contextualización (NOVOSEVEN) 
      que compara "Recombinant factor VIIa analog in the management of hemophilia with inhibitors: results from a multicenter, randomized, controlled 
      trial of vatreptacog alfa".S. Lentz y otros, J Thromb Haemost. 2014 con "PERSEPT 1: a phase 3 trial of activated eptacog beta for on-demand treatment 
      of haemophilia inhibitor-related bleeding".Wang y cols, Clinical Haemophilia 2017, mostrando que en paciente con Hemofilia A/B (> 12y.) con inhibidores 
      y presentando eventos hemorrágicos, la Dosis Total Media de NOVOSEVEN® (90µg/kg IDR) requerida para tener un control hemorrágico efectivo y sostenido 
      medido a las 24hrs sería un 20% mayor que la Dosis Total Media de SEVENFACT® (75µg/kg IDR). <br />
      <b>14.</b> Para más detalles, véase el Estudio de Contextualización (FEIBA) <br />
      <b>15.</b> Tipos de cambio abiertos: https://openexchangerates.org/ <br />
      <b>16.</b> Todos los cálculos de precios, reembolsos y costes de tratamiento proceden de la plataforma analítica GPI pulse.
      `,
    },
  };

  function setDom() {
    // home page
    dom.overview_tool = document.getElementById('overview_tool');
    dom.overview_tool_text = document.getElementById('overview_tool_text');
    dom.overview_tool_subtitle_1 = document.getElementById('overview_tool_subtitle_1');
    dom.overview_tool_subtitle_2 = document.getElementById('overview_tool_subtitle_2');
    dom.overview_tool_subtitle_3 = document.getElementById('overview_tool_subtitle_3');
    dom.overview_tool_text_1 = document.getElementById('overview_tool_text_1');
    dom.overview_tool_text_2 = document.getElementById('overview_tool_text_2');
    dom.overview_tool_text_3 = document.getElementById('overview_tool_text_3');
    dom.overview_output = document.getElementById('overview_output');
    dom.overview_output_text_1 = document.getElementById('overview_output_text_1');
    dom.overview_output_text_2 = document.getElementById('overview_output_text_2');
    dom.tool_button_text = document.getElementById('tool_button_text');

    // tool page
    dom.label_level = document.getElementById('label_level');
    dom.option_level_1 = document.getElementById('option_level_1');
    dom.option_level_2 = document.getElementById('option_level_2');
    dom.option_level_3 = document.getElementById('option_level_3');
    dom.label_apcc_checkbox = document.getElementById('label_apcc_checkbox');
    dom.default_view = document.getElementById('default_view');
    dom.clear_button = document.getElementById('clear_button');
    dom.tools_legend_first = document.getElementById('tools_legend--first');
    dom.tools_legend_second = document.getElementById('tools_legend--second');
    // dom.tools_legend_third = document.getElementById('tools_legend--third');
    dom.output_button_text = document.getElementById('output_button_text');
    // tool page table
    dom.no_patients = document.querySelectorAll('.no_patients');
    dom.type_patient = document.querySelectorAll('.type_patient');
    dom.body_weight = document.querySelectorAll('.body_weight');
    dom.non_replacement_therapy = document.querySelectorAll('.non_replacement_therapy');
    dom.type_event = document.querySelectorAll('.type_event');
    dom.events_patients = document.querySelectorAll('.events_patients');
    dom.product = document.querySelectorAll('.product');
    dom.presentation = document.querySelectorAll('.presentation');
    dom.initial_dose = document.querySelectorAll('.initial_dose');
    dom.subsequent_doses = document.querySelectorAll('.subsequent_doses');
    dom.no_subsequent_doses = document.querySelectorAll('.no_subsequent_doses');
    dom.price = document.querySelectorAll('.price');
    dom.event_body_weight = document.getElementById('event_body_weight');
    dom.event_events_patients = document.getElementById('event_events_patients');

    //output page
    dom.outputleft_title = document.getElementById('outputleft-title');
    dom.label_cost_saving_vs_alfa = document.getElementById('label_cost_saving_vs_alfa');
    dom.label_cost_saving_vs_alfa_percent = document.getElementById('label_cost_saving_vs_alfa_percent');
    dom.label_cost_saving_vs_apcc = document.getElementById('label_cost_saving_vs_apcc');
    dom.label_cost_saving_vs_apcc_percent = document.getElementById('label_cost_saving_vs_apcc_percent');
    dom.outputleft_notes = document.getElementById('outputleft-notes');
    dom.outputright_title = document.getElementById('outputright-title');
    dom.vials_saved_alpha = document.getElementById('vials_saved_alpha');
    dom.vials_saved_apcc = document.getElementById('vials_saved_apcc');
    dom.label_usage_vials = document.getElementById('label_usage_vials');
    dom.label_total_vials = document.getElementById('label_total_vials');
    dom.label_total_mg = document.getElementById('label_total_mg');
    dom.outputright_notes = document.getElementById('outputright-notes');
    dom.tool_button_text_2 = document.getElementById('tool_button_text_2');

    // popup
    dom.popup_1_title = document.getElementById('popup_1_title');
    dom.popup_1_text = document.getElementById('popup_1_text');
    dom.has_error = document.querySelector('.has_error');
  }

  function setLang() {
    var langCode = defaultLang;
    var langObject = lang[langCode];
    if (!langObject) {
      console.log('No language found for', langCode);
      return;
    }

    // home page
    dom.overview_tool.innerHTML = langObject.overview_tool;
    dom.overview_tool_text.innerHTML = langObject.overview_tool_text;
    dom.overview_tool_subtitle_1.innerHTML = langObject.overview_tool_subtitle_1;
    overview_tool_text_1.innerHTML = langObject.overview_tool_text_1;
    overview_tool_subtitle_2.innerHTML = langObject.overview_tool_subtitle_2;
    overview_tool_text_2.innerHTML = langObject.overview_tool_text_2;
    overview_tool_subtitle_3.innerHTML = langObject.overview_tool_subtitle_3;
    overview_tool_text_3.innerHTML = langObject.overview_tool_text_3;
    overview_output.innerHTML = langObject.overview_output;
    overview_output_text_1.innerHTML = langObject.overview_output_text_1;
    overview_output_text_2.innerHTML = langObject.overview_output_text_2;
    tool_button_text.innerHTML = langObject.tool_button_text;

    // tool page
    label_level.innerHTML = langObject.label_level;
    option_level_1.innerHTML = langObject.option_level_1;
    option_level_2.innerHTML = langObject.option_level_2;
    option_level_3.innerHTML = langObject.option_level_3;
    label_apcc_checkbox.innerHTML = langObject.label_apcc_checkbox;
    default_view.innerHTML = langObject.default_view;
    clear_button.innerHTML = langObject.clear_button;
    dom.tools_legend_first.innerHTML = langObject.tools_legend_first;
    dom.tools_legend_second.innerHTML = langObject.tools_legend_second;
    // dom.tools_legend_third.innerHTML = langObject.tools_legend_third;
    output_button_text.innerHTML = langObject.output_button_text;
    // tool page table
    dom.no_patients.forEach((element) => {
      element.innerHTML = langObject.no_patients;
    });
    dom.type_patient.forEach((element) => {
      element.innerHTML = langObject.type_patient;
    });
    dom.body_weight.forEach((element) => {
      element.innerHTML = langObject.body_weight;
    });
    dom.non_replacement_therapy.forEach((element) => {
      element.innerHTML = langObject.non_replacement_therapy;
    });
    dom.type_event.forEach((element) => {
      element.innerHTML = langObject.type_event;
    });
    dom.events_patients.forEach((element) => {
      element.innerHTML = langObject.events_patients;
    });
    dom.product.forEach((element) => {
      element.innerHTML = langObject.product;
    });
    dom.presentation.forEach((element) => {
      element.innerHTML = langObject.presentation;
    });
    dom.initial_dose.forEach((element) => {
      element.innerHTML = langObject.initial_dose;
    });
    dom.subsequent_doses.forEach((element) => {
      element.innerHTML = langObject.subsequent_doses;
    });
    dom.no_subsequent_doses.forEach((element) => {
      element.innerHTML = langObject.no_subsequent_doses;
    });
    dom.price.forEach((element) => {
      element.innerHTML = langObject.price;
    });
    dom.event_body_weight.innerHTML = langObject.event_body_weight;
    dom.event_events_patients.innerHTML = langObject.event_events_patients;

    dom.has_error.innerHTML = langObject.warning_message;
    //output page
    dom.outputleft_title.innerHTML = langObject.outputleft_title;
    dom.label_cost_saving_vs_alfa.innerHTML = langObject.label_cost_saving_vs_alfa;
    dom.label_cost_saving_vs_alfa_percent.innerHTML = langObject.label_cost_saving_vs_alfa_percent;
    dom.label_cost_saving_vs_apcc.innerHTML = langObject.label_cost_saving_vs_apcc;
    dom.label_cost_saving_vs_apcc_percent.innerHTML = langObject.label_cost_saving_vs_apcc_percent;
    dom.outputleft_notes.innerHTML = langObject.outputleft_notes;
    dom.outputright_title.innerHTML = langObject.outputright_title;
    dom.vials_saved_alpha.innerHTML = langObject.vials_saved_alpha;
    dom.vials_saved_apcc.innerHTML = langObject.vials_saved_apcc;
    dom.label_usage_vials.innerHTML = langObject.label_usage_vials;
    dom.label_total_vials.innerHTML = langObject.label_total_vials;
    dom.label_total_mg.innerHTML = langObject.label_total_mg;
    dom.outputright_notes.innerHTML = langObject.outputright_notes;
    dom.tool_button_text_2.innerHTML = langObject.tool_button_text_2;

    // popup
      dom.popup_1_title.innerHTML = langObject.popup_1_title;
    //  dom.popup_1_text.innerHTML = langObject.popup_1_text;
  }

  return {
    init: init,
    defaultLang: defaultLang,
  };
})();
