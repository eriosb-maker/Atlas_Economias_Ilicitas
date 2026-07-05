const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Footer, PageNumber, PageBreak, ImageRun
} = require("docx");
const fs = require("fs");

const FUENTE = "Times New Roman";
const AZUL = "1F3454";

// ---------- utilidades APA ----------
function p(texto) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 480, after: 0 },
    indent: { firstLine: 708 },
    children: [new TextRun({ text: texto, font: FUENTE, size: 24 })],
  });
}
function pRuns(runs) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 480, after: 0 },
    indent: { firstLine: 708 },
    children: runs.map(r => new TextRun(Object.assign({ font: FUENTE, size: 24 }, r))),
  });
}
// APA nivel 1: centrado, negrita
function h1(texto) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { before: 360, after: 240, line: 480 },
    children: [new TextRun({ text: texto, font: FUENTE, size: 24, bold: true, color: "000000" })],
  });
}
// APA nivel 2: izquierda, negrita
function h2(texto) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
    spacing: { before: 300, after: 200, line: 480 },
    children: [new TextRun({ text: texto, font: FUENTE, size: 24, bold: true, color: "000000" })],
  });
}
function refBib(runs) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 480, after: 0 },
    indent: { left: 708, hanging: 708 },
    children: runs.map(r => new TextRun(Object.assign({ font: FUENTE, size: 24 }, r))),
  });
}
// Figura APA: rótulo negrita, título cursiva, imagen, nota
function figura(num, titulo, archivo, ancho, ratio, nota) {
  const w = ancho, h = Math.round(ancho * ratio);
  return [
    new Paragraph({
      alignment: AlignmentType.LEFT, spacing: { before: 240, after: 0, line: 240 },
      keepNext: true,
      children: [new TextRun({ text: `Figura ${num}`, font: FUENTE, size: 24, bold: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT, spacing: { after: 120, line: 240 },
      keepNext: true,
      children: [new TextRun({ text: titulo, font: FUENTE, size: 24, italics: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 80 },
      keepNext: true,
      children: [new ImageRun({ type: "png", data: fs.readFileSync(archivo), transformation: { width: w, height: h } })],
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED, spacing: { after: 240, line: 240 },
      children: [
        new TextRun({ text: "Nota. ", font: FUENTE, size: 20, italics: true }),
        new TextRun({ text: nota, font: FUENTE, size: 20 }),
      ],
    }),
  ];
}

// ---------- portada APA ----------
const portada = [
  new Paragraph({ spacing: { before: 3200 }, children: [] }),
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { line: 480, after: 0 },
    children: [new TextRun({ text: "Patrones Estructurales de las Economías Ilícitas y del Crimen Organizado en Chile: Informe de Inteligencia Criminal N.º 02/2026 (Versión 2)", font: FUENTE, size: 28, bold: true })],
  }),
  new Paragraph({ spacing: { before: 480 }, children: [] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: 480 },
    children: [new TextRun({ text: "Eduardo Ríos Briones", font: FUENTE, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: 480 },
    children: [new TextRun({ text: "Ríos & Ríos Asociados, Iquique, Chile", font: FUENTE, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: 480 },
    children: [new TextRun({ text: "Julio de 2026", font: FUENTE, size: 24 })] }),
  new Paragraph({ spacing: { before: 720 }, children: [] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: 480 },
    children: [new TextRun({ text: "Documento de trabajo confidencial. Sustituye y actualiza al Informe N.º 01/2026.", font: FUENTE, size: 22, italics: true, color: AZUL })] }),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---------- resumen APA ----------
const resumen = [
  h1("Resumen"),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: { line: 480 },
    children: [new TextRun({ text: "El presente informe actualiza el análisis relacional de las economías ilícitas y el crimen organizado en Chile mediante la incorporación de una tercera fuente institucional: el XI Informe de Tipologías y Señales de Alerta de Lavado de Activos de la Unidad de Análisis Financiero, que sistematiza las 199 sentencias condenatorias dictadas entre 2020 y 2024. Del cruce de las tres fuentes se consolidan cinco patrones estructurales: la convergencia de corredores logísticos en la Macrozona Norte; la asimetría territorial entre generación de renta y persecución patrimonial, ahora corroborada con serie quinquenal; la rusticidad del universo condenatorio de lavado, patrón recalificado de hipótesis a antecedente indiciario; la zona gris regulatoria como factor criminógeno autónomo; y la transición hacia formas de gobernanza criminal. El hallazgo central de esta versión es la brecha de recuperación patrimonial: el comiso judicial del quinquenio, ascendente a CLP 9.481 millones, contrastado con los flujos anuales estimados de las economías ilícitas, arroja una tasa de recuperación inferior al 0,1% anual.", font: FUENTE, size: 24 })],
  }),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: { line: 480, before: 240 },
    children: [
      new TextRun({ text: "Palabras clave: ", font: FUENTE, size: 24, italics: true }),
      new TextRun({ text: "crimen organizado, economías ilícitas, lavado de activos, persecución patrimonial, análisis de redes.", font: FUENTE, size: 24 }),
    ],
  }),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---------- cuerpo ----------
const cuerpo = [];

cuerpo.push(h1("Objeto, Alcance y Novedades de esta Versión"));
cuerpo.push(p("El presente informe constituye la segunda versión del análisis de inteligencia criminal elaborado por este estudio sobre la base del Atlas de Economías Ilícitas, plataforma de análisis relacional que integra fuentes institucionales verificables en un grafo de conocimiento georreferenciado. Su objeto es extraer, ordenar y valorar los patrones estructurales que se desprenden del cruce de dichas fuentes, conforme al estándar epistémico que este estudio aplica invariablemente: distinción expresa entre hechos acreditados, antecedentes indiciarios, inferencias razonables e hipótesis que requieren corroboración."));
cuerpo.push(p("Tres son las novedades de esta versión respecto del Informe N.º 01/2026. Primera: la incorporación del XI Informe de Tipologías y Señales de Alerta de Lavado de Activos (Unidad de Análisis Financiero [UAF], 2025), fuente cuya consulta quedó expresamente consignada en la versión anterior como condición de corroboración del tercer patrón. Segunda: la recalificación de dicho patrón, que transita de hipótesis a antecedente indiciario, y la formulación del hallazgo central sobre la brecha de recuperación patrimonial. Tercera: la integración de cinco figuras analíticas que representan visualmente los hallazgos y el grafo de conexiones del atlas."));

cuerpo.push(h1("Fuentes Examinadas y Estándar Epistémico"));
cuerpo.push(p("Se han tenido a la vista tres fuentes principales, cuya jerarquía epistémica corresponde declarar desde el inicio. En primer término, el Informe de Crimen Organizado en Chile 2025 de la Unidad Especializada en Crimen Organizado y Drogas (Fiscalía Nacional, 2025), elaborado con la colaboración de Carabineros de Chile, la Policía de Investigaciones, Gendarmería de Chile, la Directemar, SENDA, la Subsecretaría del Interior y el Servicio Nacional de Aduanas: sus cifras de persecución penal y sentencias identificadas constituyen hechos acreditados. En segundo término, el XI Informe de Tipologías de la UAF (2025), que sistematiza las 199 sentencias definitivas condenatorias por lavado de activos dictadas entre 2020 y 2024 —363 personas condenadas—, 174 de ellas agrupadas en 103 casos: se trata igualmente de información judicial acreditada, con la advertencia metodológica de que el propio organismo califica la valorización de comisos como estimación conservadora. En tercer término, el estudio Por un Chile sin Economía Ilícita (Confederación de la Producción y del Comercio [CPC], 2026), cuyas valorizaciones —mercados ilícitos por al menos US$ 5.700 millones anuales— provienen de metodologías gremiales heterogéneas y deben tratarse, conforme lo reconoce el propio documento, como antecedentes indiciarios de carácter conservador."));
cuerpo.push(p("Así las cosas, toda afirmación relevante del presente informe lleva aparejada su calificación, y las conclusiones que combinan fuentes de distinta jerarquía —singularmente, el contraste entre flujos estimados y comisos acreditados— se formulan con las cautelas que dicha combinación impone."));

cuerpo.push(h1("Reconstrucción General del Fenómeno"));
cuerpo.push(p("Del examen conjunto de los antecedentes se desprende una imagen coherente. Las economías ilícitas operan en Chile como sistemas económicos paralelos que cubren la cadena de valor completa —origen, acopio e intermediación, comercialización y lavado de activos—, explotando brechas regulatorias, debilidades de fiscalización y marcos sancionatorios de bajo efecto disuasivo (CPC, 2026). El tráfico de drogas se mantiene como el mercado predominante, con cerca de la mitad de los ingresos asociados al crimen organizado en el bienio 2023-2024, rutas de ingreso concentradas en los pasos habilitados y no habilitados de la Macrozona Norte, acopio en Alto Hospicio, Iquique, Calama y Antofagasta, redistribución desde Santiago y exportación hacia Europa y Oceanía por los puertos de San Antonio y Valparaíso (Fiscalía Nacional, 2025). A su vez, la serie quinquenal de la UAF (2025) confirma que el narcotráfico constituye el principal delito base del lavado —70 sentencias y 109 condenados—, aunque con una diversificación progresiva hacia la corrupción, el contrabando y la estafa que corresponde seguir con atención."));

cuerpo.push(h1("Patrones Estructurales Identificados"));

cuerpo.push(h2("Patrón I: Convergencia de Corredores Logísticos en la Macrozona Norte"));
cuerpo.push(pRuns([{ text: "Calificación: antecedente indiciario con elementos acreditados. ", bold: true }, { text: "Los pasos fronterizos no habilitados del norte del país no operan como rutas especializadas por mercado, sino como infraestructura criminal de uso común. En efecto, el paso de Colchane concentra simultáneamente el ingreso de cocaína boliviana, marihuana prensada paraguaya, ketamina y tráfico ilícito de migrantes (Fiscalía Nacional, 2025). A mayor abundamiento, el 80% de los grandes decomisos de cigarrillos de contrabando se asocia a la presencia de drogas y armamento (CPC, 2026), antecedente que corrobora que el contrabando de tabaco comparte corredor con los mercados de alta violencia. Del cruce de ambos antecedentes aparece razonable concluir que quien controla el corredor arrienda capacidad logística a múltiples mercados a la vez, lo que explica la disputa territorial violenta por los nodos de Iquique y Alto Hospicio. En consecuencia, la persecución que se organiza por mercado y no por corredor fragmenta artificialmente un fenómeno que en los hechos es unitario: la unidad de análisis eficaz no es el delito, sino la infraestructura que lo sostiene. La Figura 5 representa esquemáticamente esta convergencia." }]));
cuerpo.push(...figura(5, "Convergencia del corredor logístico de la Macrozona Norte (Patrón I)", "fig5_corredor_convergente.png", 600, 0.5, "Representación esquemática de la infraestructura criminal compartida. Fuentes: Fiscalía Nacional (2025); CPC (2026). Elaboración propia."));

cuerpo.push(h2("Patrón II: Asimetría Territorial entre Generación de Renta y Persecución Patrimonial"));
cuerpo.push(pRuns([{ text: "Calificación: hecho acreditado en sus cifras; inferencia razonable en su explicación. ", bold: true }, { text: "La renta ilícita se genera predominantemente en la Macrozona Norte —ingreso de mercancías, acopio, zona franca—; sin embargo, la sanción de su blanqueo se concentra abrumadoramente en la Región Metropolitana. El informe de la Fiscalía Nacional (2025) constató que 69 de las 100 condenas por lavado de 2024 se dictaron en la RM, contra tres en Tarapacá y una en Atacama. Esta versión incorpora la corroboración quinquenal: entre 2020 y 2024, la Región Metropolitana concentró 143 de las 199 sentencias condenatorias por lavado de activos —el 71,9% del total, con 242 personas condenadas— y el 76,2% del monto de los inmuebles decomisados, mientras Tarapacá registró nueve sentencias, Antofagasta tres, y las regiones de Aysén y Magallanes ninguna (UAF, 2025). Resulta particularmente relevante esta última constatación, pues en Magallanes la propia Fiscalía Nacional (2025) documenta la operación de la organización denominada Confederación, dedicada precisamente al tráfico de drogas y al lavado de activos." }]));
cuerpo.push(p("De lo anterior se desprende una inferencia razonable: la persecución patrimonial sigue al sistema financiero formal —cuyo nodo es Santiago— y no a la cadena de valor del delito, dejando la fase de colocación, la más vulnerable del ciclo de blanqueo conforme al modelo del Grupo de Acción Financiera Internacional, prácticamente sin cobertura investigativa en el territorio donde materialmente ocurre. Cabe advertir que esta inferencia admite corroboración adicional mediante el examen de causas en actual tramitación, que no constan en los antecedentes examinados. Con todo, existe base suficiente para estimar que el fortalecimiento de la persecución patrimonial en las fiscalías del norte —con foco en el artículo 27 de la Ley N.º 19.913— constituye la intervención de mayor rendimiento marginal disponible. La Figura 1 ilustra la magnitud de la asimetría."));
cuerpo.push(...figura(1, "Distribución regional de las sentencias condenatorias por lavado de activos, 2020-2024 (Patrón II)", "fig1_asimetria_territorial.png", 600, 0.638, "Las regiones de la Macrozona Norte, donde se genera la renta ilícita, se destacan en rojo óxido. Fuente: UAF (2025). Elaboración propia."));

cuerpo.push(h2("Patrón III: Rusticidad del Universo Condenatorio de Lavado y Brecha de Recuperación Patrimonial"));
cuerpo.push(pRuns([{ text: "Calificación: antecedente indiciario, recalificado desde hipótesis. ", bold: true }, { text: "El Informe N.º 01/2026 formuló como hipótesis que el sistema de persecución solo lograba condenar los esquemas rudimentarios de blanqueo, y condicionó su sostenimiento a la corroboración con el informe de tipologías de la UAF. Verificada la consulta, la corroboración procede. En efecto, de los 103 casos sistematizados en el quinquenio, el uso de testaferros aparece en el 73,8%, la creación de personas o estructuras jurídicas en el 44,7% y el fraccionamiento o pitufeo en el 21,4%; en el extremo opuesto, la intervención de profesionales legales o financieros —gatekeepers— se identifica en apenas el 5,8% de los casos (UAF, 2025). El instrumental societario es igualmente elemental: 81 casos emplearon 139 sociedades, con predominio de la sociedad por acciones (55,4%), y el dinero en efectivo aparece en el 86,4% de los casos. Los sectores formales vulnerados —comercializadoras de vehículos en el 77,7% de los casos, bancos, notarios y conservadores de bienes raíces— confirman un blanqueo de primera generación, apoyado en bienes registrables y canales presenciales, tal como se aprecia en la Figura 2." }]));
cuerpo.push(...figura(2, "Tipologías de blanqueo y sectores formales vulnerados en las sentencias 2020-2024 (Patrón III)", "fig2_tipologias_sectores.png", 600, 0.524, "La intervención de gatekeepers profesionales, propia del segmento sofisticado, aparece en apenas el 5,8% de los casos sentenciados. Fuente: UAF (2025). Elaboración propia."));
cuerpo.push(pRuns([{ text: "El hallazgo central de esta versión surge del contraste entre magnitudes. ", bold: true }, { text: "El comiso judicial total del quinquenio 2020-2024 ascendió a CLP 9.481 millones, equivalentes a aproximadamente US$ 9,6 millones —esto es, un promedio cercano a US$ 1,9 millones anuales—, cifra acreditada por la UAF (2025) sobre la base de las sentencias analizadas. Los flujos anuales de las economías ilícitas, por su parte, fueron estimados en al menos US$ 5.700 millones (CPC, 2026). Aun concediendo la heterogeneidad metodológica de ambas cifras —una judicial y acreditada, la otra gremial e indiciaria— y la calificación de conservadoras que ambas fuentes reconocen, el contraste arroja una tasa de recuperación patrimonial inferior al 0,1% anual. Se trata de una inferencia razonable y no de un hecho acreditado, pero su orden de magnitud es tal que resiste holgadamente los márgenes de error de las estimaciones subyacentes: aunque el flujo real fuese la mitad del estimado, la recuperación seguiría siendo inferior al dos por mil. De las dos lecturas posibles del patrón —lavado rudimentario o persecución que solo alcanza lo rudimentario—, los antecedentes concordantes inclinan decididamente la balanza hacia la segunda: el segmento sofisticado permanece mayormente fuera del alcance condenatorio, y la rentabilidad esperada del blanqueo en Chile es, en los hechos, prácticamente íntegra. La Figura 3 representa la brecha." }]));
cuerpo.push(...figura(3, "Brecha de recuperación patrimonial: flujos estimados frente a comiso judicial efectivo (Patrón III)", "fig3_brecha_recuperacion.png", 600, 0.586, "Representación esquemática; las magnitudes no están a escala. Fuentes: CPC (2026); UAF (2025). Elaboración propia."));

cuerpo.push(h2("Patrón IV: La Zona Gris Regulatoria como Factor Criminógeno Autónomo"));
cuerpo.push(pRuns([{ text: "Calificación: antecedente indiciario con alta concordancia intersectorial. ", bold: true }, { text: "Resulta particularmente relevante la repetición de un mismo mecanismo en mercados que carecen de conexión aparente entre sí: el régimen tributario especial de zona franca, aprovechado para el ingreso y tránsito de vehículos y mercancías sin completar internación ni tributos; la autorización excepcional del artículo 21 del Decreto Supremo N.º 3 en materia farmacéutica, explotada mediante recetas falsificadas o profesionales coludidos; la reducción de la Tasa Máxima Convencional de 2013, que excluyó del crédito formal a segmentos hoy capturados por redes de préstamo extorsivo; la exclusión del control sanitario de los productos de aseo sin propiedades antimicrobianas; y la operación extraterritorial de plataformas de apuestas sin habilitación legal (CPC, 2026). En todos los casos se verifica la misma secuencia: la organización criminal no crea el mercado, sino que captura una informalidad que el propio diseño normativo generó previamente. Conforme a ello, la brecha regulatoria debe tratarse analíticamente como factor criminógeno autónomo, y su identificación temprana constituye una diligencia de inteligencia tan relevante como el levantamiento fáctico." }]));

cuerpo.push(h2("Patrón V: Transición hacia Formas de Gobernanza Criminal"));
cuerpo.push(pRuns([{ text: "Calificación: antecedente indiciario con elementos acreditados. ", bold: true }, { text: "Los delitos parasitarios o predatorios —extorsiones y secuestros— fueron los de mayor crecimiento relativo durante 2024 (Fiscalía Nacional, 2025). El grafo de conexiones del atlas, representado en la Figura 4, revela un modelo de franquicia con especialización funcional: Los Gallegos en trata de personas, con la primera condena a personas jurídicas dictada al amparo de la Ley N.º 20.393 por el Juzgado de Garantía de Arica; Los Orientales en secuestros; Los Pulpos y Los Melean en extorsiones; La Empresa en usura y crédito extorsivo en Valparaíso. El delito predatorio no compite con el mercado de bienes ilícitos: lo complementa como renta de control territorial, cobrada sobre población vulnerable y sostenida mediante violencia demostrativa. Se advierte, al menos indiciariamente, el tránsito desde una criminalidad de tráfico hacia una criminalidad de gobernanza paralela, cualitativamente más difícil de desarticular, pues no depende de una mercancía incautable sino de una relación de sujeción. El promedio acreditado de veintiún dispositivos telefónicos incautados diariamente en recintos penitenciarios durante 2024 confirma que dicha gobernanza se ejerce incluso desde el interior de las cárceles." }]));
cuerpo.push(...figura(4, "Grafo de conexiones del Atlas de Economías Ilícitas: el lavado de activos como nodo articulador", "fig4_grafo_red.png", 600, 0.672, "Subgrafo representativo del atlas. El tamaño de cada nodo refleja su grado de conexión; el color de las aristas, la fase delictual. Fuentes: Fiscalía Nacional (2025); CPC (2026); UAF (2025). Elaboración propia."));

cuerpo.push(h1("Riesgos y Contingencias"));
cuerpo.push(p("Del análisis precedente se identifican, en lo principal, cinco riesgos. Primero, un riesgo de persecución asimétrica: mientras la respuesta patrimonial permanezca concentrada en la Región Metropolitana, la fase de colocación seguirá ejecutándose con baja probabilidad de sanción en el norte del país, y las macrozonas australes permanecerán como espacios sin registro condenatorio alguno pese a la presencia acreditada de organizaciones dedicadas al lavado. Segundo, un riesgo de comiso simbólico: una tasa de recuperación patrimonial inferior al 0,1% anual priva al sistema de todo efecto disuasivo económico, pues la expectativa de conservación de la ganancia ilícita es prácticamente cierta. Tercero, un riesgo de opacidad sofisticada: la marginalidad de los gatekeepers en el universo condenatorio, contrastada con la magnitud de los flujos, sugiere que el segmento profesionalizado del blanqueo opera sin ser alcanzado. Cuarto, un riesgo regulatorio: cada modificación normativa sectorial que genere zonas grises debe evaluarse también en su dimensión criminógena. Quinto, un riesgo de consolidación de gobernanza criminal, cuya reversión resulta exponencialmente más costosa una vez asentado el control territorial."));

cuerpo.push(h1("Conclusiones"));
cuerpo.push(p("En definitiva, del examen relacional de los antecedentes es posible sostener las siguientes conclusiones. Primera: la infraestructura logística compartida —y no el mercado individual— constituye la unidad de análisis eficaz del crimen organizado en Chile, lo que aconseja estrategias investigativas organizadas por corredor. Segunda: existe una asimetría acreditada, ahora con serie quinquenal, entre el territorio donde se genera la renta ilícita y aquel donde se sanciona su blanqueo; su corrección representa la intervención de mayor rendimiento disponible para la persecución patrimonial. Tercera: el universo condenatorio de lavado captura predominantemente esquemas rudimentarios —testaferros, vehículos, efectivo—, y la brecha de recuperación patrimonial inferior al 0,1% anual constituye el indicador más elocuente del corpus: la rentabilidad esperada del blanqueo en Chile permanece prácticamente intacta. Cuarta: la brecha regulatoria opera como factor criminógeno autónomo y su identificación temprana constituye una diligencia de inteligencia en sí misma. Quinta: se verifica una transición indiciaria hacia formas de gobernanza criminal cuya desarticulación exigirá herramientas distintas de las diseñadas para los mercados de bienes."));
cuerpo.push(p("Este informe se emite como documento de trabajo confidencial del estudio, sobre la base exclusiva de las fuentes que en él se individualizan. Sus conclusiones deberán ajustarse en la medida en que nuevos antecedentes, incorporados al Atlas de Economías Ilícitas, así lo exijan; y aquellas que descansan en inferencias que combinan fuentes de distinta jerarquía epistémica no deberán invocarse ante terceros sin la corroboración adicional que en cada caso se ha dejado consignada."));

cuerpo.push(new Paragraph({ children: [new PageBreak()] }));
cuerpo.push(h1("Referencias"));
cuerpo.push(refBib([{ text: "Confederación de la Producción y del Comercio. (2026). " }, { text: "Por un Chile sin economía ilícita: Seguridad, certeza, institucionalidad y confianza para el desarrollo sostenible", italics: true }, { text: ". CPC." }]));
cuerpo.push(refBib([{ text: "Fiscalía Nacional, Unidad Especializada en Crimen Organizado y Drogas. (2025). " }, { text: "Informe crimen organizado en Chile", italics: true }, { text: ". Ministerio Público de Chile." }]));
cuerpo.push(refBib([{ text: "Unidad de Análisis Financiero. (2025). " }, { text: "XI Informe de tipologías y señales de alerta de lavado de activos en Chile: Análisis de las sentencias definitivas condenatorias 2020-2024", italics: true }, { text: ". Gobierno de Chile. https://www.uaf.cl" }]));

// ---------- documento ----------
const doc = new Document({
  styles: { default: { document: { run: { font: FUENTE, size: 24 } } } },
  sections: [{
    properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ children: [PageNumber.CURRENT], font: FUENTE, size: 22 })],
        })],
      }),
    },
    children: [...portada, ...resumen, ...cuerpo],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("/home/claude/Informe_Inteligencia_Criminal_02-2026_APA.docx", buf);
  console.log("DOCX v2 generado");
});
