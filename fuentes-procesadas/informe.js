const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Footer, PageNumber, BorderStyle, PageBreak
} = require("docx");
const fs = require("fs");

const AZUL = "1F3454";
const ORO = "8A6D2A";
const FUENTE = "Times New Roman";

// ---------- utilidades ----------
function p(texto, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 480, after: 0 },
    indent: opts.sinSangria ? undefined : { firstLine: 708 },
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
function h1(texto) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 240, line: 360 },
    children: [new TextRun({ text: texto, font: FUENTE, size: 26, bold: true, color: AZUL, allCaps: true })],
  });
}
function h2(texto) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 200, line: 360 },
    children: [new TextRun({ text: texto, font: FUENTE, size: 24, bold: true, color: AZUL })],
  });
}
function refBib(texto) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 480, after: 120 },
    indent: { left: 708, hanging: 708 },
    children: [new TextRun({ text: texto, font: FUENTE, size: 24 })],
  });
}

// ---------- portada ----------
const portada = [
  new Paragraph({ spacing: { before: 2400 }, children: [] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "RÍOS & RÍOS ASOCIADOS", font: FUENTE, size: 32, bold: true, color: AZUL, allCaps: true })],
    spacing: { after: 60 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Litigación compleja · Delitos económicos · Crimen organizado", font: FUENTE, size: 20, italics: true, color: ORO })],
    spacing: { after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ORO, space: 8 } },
  }),
  new Paragraph({ spacing: { before: 1800 }, children: [] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "INFORME DE INTELIGENCIA CRIMINAL N.º 01/2026", font: FUENTE, size: 26, bold: true, color: AZUL })],
    spacing: { after: 300 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "PATRONES ESTRUCTURALES DE LAS ECONOMÍAS ILÍCITAS Y DEL CRIMEN ORGANIZADO EN CHILE", font: FUENTE, size: 30, bold: true })],
    spacing: { after: 200 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Análisis de conexiones elaborado sobre el Atlas de Economías Ilícitas a partir del Informe de Crimen Organizado en Chile 2025 (Fiscalía Nacional – UCOD) y del estudio «Por un Chile sin Economía Ilícita» (CPC, 2026)", font: FUENTE, size: 22, italics: true })],
    spacing: { after: 2400 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Iquique, julio de 2026", font: FUENTE, size: 24 })],
    spacing: { after: 120 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "DOCUMENTO DE TRABAJO — CONFIDENCIAL", font: FUENTE, size: 20, bold: true, color: ORO, allCaps: true })],
  }),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---------- cuerpo ----------
const cuerpo = [];

cuerpo.push(h1("I. Objeto y alcance del informe"));
cuerpo.push(p("El presente informe tiene por objeto extraer, ordenar y valorar los patrones estructurales que se desprenden del análisis relacional de dos fuentes institucionales recientes sobre criminalidad organizada y economías ilícitas en Chile, integradas en una plataforma de análisis de conexiones desarrollada por este estudio. No se trata de una reseña descriptiva de ambos documentos, sino de un ejercicio de inteligencia analítica: las fuentes se cruzan como unidades de información, se identifican los nodos y conexiones que ambas corroboran o que una sola sostiene, y se derivan de ese cruce conclusiones con relevancia estratégica para la litigación, la asesoría regulatoria y el diseño de líneas investigativas."));
cuerpo.push(p("El alcance del informe es analítico y preliminar. Sus conclusiones se formulan conforme al estándar epistémico que este estudio aplica en todos sus productos: distinción expresa entre hechos acreditados, antecedentes indiciarios e hipótesis que requieren corroboración, sin sobredimensionar en caso alguno lo que la evidencia disponible permite sostener."));

cuerpo.push(h1("II. Fuentes examinadas y estándar epistémico"));
cuerpo.push(p("Se han tenido a la vista dos fuentes principales. La primera es el Informe de Crimen Organizado en Chile 2025, elaborado por la Unidad Especializada en Crimen Organizado y Drogas de la Fiscalía Nacional con la colaboración de Carabineros de Chile, la Policía de Investigaciones, Gendarmería de Chile, la Directemar, SENDA, la Subsecretaría del Interior y el Servicio Nacional de Aduanas. Este documento reviste el mayor peso epistémico del corpus, pues descansa en cifras de persecución penal, sentencias ejecutoriadas y entrevistas a fiscales y funcionarios con competencia directa en la materia."));
cuerpo.push(p("La segunda es el estudio «Por un Chile sin Economía Ilícita», publicado por la Confederación de la Producción y del Comercio en julio de 2026, con participación de cerca de setenta expertos y treinta gremios. Sus estimaciones de valorización —mercados ilícitos por al menos US$ 5.700 millones anuales, equivalentes al 1,5% del producto interno bruto, con pérdida fiscal superior a US$ 1.500 millones— provienen de metodologías heterogéneas y de fuentes gremiales, por lo que deben tratarse como antecedentes indiciarios de carácter conservador, calificación que el propio estudio reconoce."));
cuerpo.push(p("Conforme a ello, en lo sucesivo cada afirmación relevante lleva aparejada su calificación: lo acreditado se sostiene en cifras oficiales de la Fiscalía o en sentencias identificadas; lo indiciario, en estimaciones sectoriales concordantes; y lo hipotético se declara expresamente como tal."));

cuerpo.push(h1("III. Reconstrucción general del fenómeno"));
cuerpo.push(p("Del examen conjunto de los antecedentes se desprende una imagen coherente y preocupante. Las economías ilícitas operan en Chile como sistemas económicos paralelos que cubren la cadena de valor completa —origen, acopio e intermediación, comercialización y lavado de activos—, explotando brechas regulatorias, debilidades de fiscalización y marcos sancionatorios de bajo efecto disuasivo. El tráfico de drogas continúa siendo el mercado predominante, representando cerca de la mitad de los ingresos asociados al crimen organizado en el bienio 2023-2024, con rutas de ingreso concentradas en los pasos habilitados y no habilitados de la Macrozona Norte, acopio en Alto Hospicio, Iquique, Calama y Antofagasta, redistribución desde Santiago y exportación hacia Europa y Oceanía por los puertos de San Antonio y Valparaíso."));
cuerpo.push(p("A su vez, el año 2024 registró la primera radiografía judicial completa del lavado de activos vinculado a crimen organizado: cincuenta y siete sentencias condenatorias y cien personas condenadas, con el tráfico de drogas como delito base predominante y con tipologías dominadas por el testaferrato y la adquisición de vehículos. Sobre esta base fáctica se construyen los patrones que siguen."));

cuerpo.push(h1("IV. Patrones estructurales identificados"));

cuerpo.push(h2("IV.1. Convergencia de corredores logísticos en la Macrozona Norte"));
cuerpo.push(pRuns([{ text: "Calificación: antecedente indiciario con elementos acreditados. ", bold: true }, { text: "Los pasos fronterizos no habilitados del norte del país no operan como rutas especializadas por mercado, sino como infraestructura criminal de uso común. En efecto, el paso de Colchane concentra simultáneamente el ingreso de cocaína boliviana, marihuana prensada paraguaya, ketamina y tráfico ilícito de migrantes, según consta en la caracterización de rutas de la propia Fiscalía. A mayor abundamiento, el estudio CPC consigna que el 80% de los grandes decomisos de cigarrillos de contrabando se asocia a la presencia de drogas y armamento, antecedente que corrobora que el contrabando de tabaco comparte corredor con los mercados de alta violencia." }]));
cuerpo.push(p("Del cruce de ambos antecedentes aparece razonable concluir que quien controla el corredor arrienda capacidad logística a múltiples mercados a la vez, lo que explica la disputa territorial violenta por los nodos de Iquique y Alto Hospicio y la presencia superpuesta de organizaciones rivales —Los Shottas y Los Espartanos, entre otras— en el mismo eje geográfico. En consecuencia, la persecución penal que se organiza por mercado y no por corredor fragmenta artificialmente un fenómeno que en los hechos es unitario. Este primer patrón anticipa la tesis general del informe: la unidad de análisis eficaz no es el delito, sino la infraestructura que lo sostiene."));

cuerpo.push(h2("IV.2. Asimetría territorial entre generación de renta y persecución patrimonial"));
cuerpo.push(pRuns([{ text: "Calificación: hecho acreditado en sus cifras; inferencia razonable en su explicación. ", bold: true }, { text: "Este es, a juicio de este analista, el hallazgo de mayor relevancia estratégica. La renta ilícita se genera predominantemente en la Macrozona Norte —ingreso de mercancías, acopio, zona franca—; sin embargo, sesenta y nueve de las cien condenas por lavado de activos dictadas durante 2024 se concentraron en la Región Metropolitana, mientras Tarapacá registró apenas tres y Atacama una. Las cifras son oficiales y constan en el informe de la Fiscalía Nacional." }]));
cuerpo.push(p("Del contraste entre el lugar de generación de la renta y el lugar de su sanción se desprende una inferencia razonable: la persecución patrimonial sigue al sistema financiero formal —cuyo nodo es Santiago— y no a la cadena de valor del delito. Ello deja la fase de colocación, que la doctrina y el propio Grupo de Acción Financiera identifican como la más vulnerable del ciclo de blanqueo, prácticamente sin cobertura investigativa en el territorio donde materialmente ocurre. Cabe advertir que esta inferencia admite corroboración adicional mediante el examen de causas en actual tramitación, que no constan en los antecedentes examinados. Con todo, existe base suficiente para estimar que el fortalecimiento de la persecución patrimonial en las fiscalías del norte —con foco en el artículo 27 de la Ley N.º 19.913— constituye la intervención de mayor rendimiento marginal disponible."));

cuerpo.push(h2("IV.3. Rusticidad aparente de las tipologías de lavado condenadas"));
cuerpo.push(pRuns([{ text: "Calificación: hipótesis que requiere corroboración, formulada sobre cifras acreditadas. ", bold: true }, { text: "Las sentencias de 2024 muestran que el testaferrato y la adquisición de vehículos concentran, en conjunto, el 54% de las maniobras de blanqueo sancionadas, seguidas de las sociedades de pantalla (13%) y la adquisición de inmuebles (12%). Los esquemas sofisticados —intervención de gatekeepers profesionales, triangulación bancaria, black market peso exchange, criptoactivos— aparecen solo marginalmente en el universo condenatorio." }]));
cuerpo.push(p("Así las cosas, el dato admite dos lecturas incompatibles entre sí: o bien el lavado de activos en Chile es efectivamente rudimentario, o bien el sistema de persecución solo logra condenar lo rudimentario, permaneciendo invisible el segmento sofisticado. Los antecedentes del estudio CPC sobre plataformas de apuestas en línea —ingresos brutos por US$ 625 millones en 2025, sin regulación local ni trazabilidad de medios de pago— y sobre tasas de fraude digital hasta seis veces y media superiores a las europeas inclinan la balanza hacia la segunda hipótesis. La documentación tenida a la vista no permite concluir de manera definitiva; empero, la sola plausibilidad de la segunda lectura configura un riesgo sistémico de primer orden que aconseja no interpretar la estadística condenatoria como fotografía fiel del fenómeno."));

cuerpo.push(h2("IV.4. La zona gris regulatoria como factor criminógeno autónomo"));
cuerpo.push(pRuns([{ text: "Calificación: antecedente indiciario con alta concordancia intersectorial. ", bold: true }, { text: "Resulta particularmente relevante la repetición de un mismo mecanismo en mercados que carecen de conexión aparente entre sí: el régimen tributario especial de zona franca, aprovechado para el ingreso y tránsito de vehículos y mercancías sin completar internación ni tributos; la autorización excepcional del artículo 21 del Decreto Supremo N.º 3 en materia farmacéutica, explotada mediante recetas falsificadas o profesionales coludidos; la reducción de la Tasa Máxima Convencional de 2013, que excluyó del crédito formal a segmentos hoy capturados por redes de préstamo extorsivo; la exclusión del control sanitario de los productos de aseo sin propiedades antimicrobianas; y la operación extraterritorial de plataformas de apuestas sin habilitación legal." }]));
cuerpo.push(p("En todos los casos se verifica la misma secuencia: la organización criminal no crea el mercado, sino que captura una informalidad que el propio diseño normativo generó previamente. De lo anterior se desprende una consecuencia metodológica de importancia: la brecha regulatoria debe tratarse analíticamente como factor criminógeno autónomo y no como mera circunstancia ambiental. Para el ejercicio profesional, ello significa que el análisis normativo de cada sector —incluida la identificación de sus zonas grises— constituye una diligencia de inteligencia previa tan relevante como el levantamiento de información fáctica."));

cuerpo.push(h2("IV.5. Transición desde mercados de bienes hacia gobernanza criminal"));
cuerpo.push(pRuns([{ text: "Calificación: antecedente indiciario con elementos acreditados. ", bold: true }, { text: "Los delitos parasitarios o predatorios —extorsiones y secuestros— fueron los de mayor crecimiento relativo durante 2024, según consta en el informe de la Fiscalía. A su vez, el grafo de conexiones revela un modelo de franquicia con especialización funcional: Los Gallegos en trata de personas, con la primera condena a personas jurídicas dictada al amparo de la Ley N.º 20.393 por el Juzgado de Garantía de Arica; Los Orientales en secuestros; Los Pulpos y Los Melean en extorsiones; La Empresa en usura y crédito extorsivo en Valparaíso." }]));
cuerpo.push(p("El delito predatorio no compite con el mercado de bienes ilícitos: lo complementa como renta de control territorial, cobrada sobre población vulnerable —particularmente comunidades migrantes— y sostenida mediante violencia demostrativa. Se advierte, al menos indiciariamente, el tránsito desde una criminalidad de tráfico hacia una criminalidad de gobernanza paralela, fenómeno cualitativamente distinto y más difícil de desarticular, pues no depende de una mercancía incautable sino de una relación de sujeción. El promedio acreditado de veintiún dispositivos telefónicos incautados diariamente en recintos penitenciarios durante 2024 confirma, además, que dicha gobernanza se ejerce incluso desde el interior de las cárceles."));

cuerpo.push(h1("V. Riesgos y contingencias"));
cuerpo.push(p("Del análisis precedente se identifican, en lo principal, cuatro riesgos. Primero, un riesgo de persecución asimétrica: mientras la respuesta patrimonial permanezca concentrada en la Región Metropolitana, la fase de colocación seguirá ejecutándose con baja probabilidad de sanción en el norte del país. Segundo, un riesgo de opacidad sofisticada: la eventual existencia de un segmento de lavado profesionalizado no capturado por la estadística condenatoria, cuya verificación exige capacidades de análisis financiero forense que exceden el estándar actual. Tercero, un riesgo regulatorio: cada modificación normativa sectorial que genere zonas grises —o que omita cerrarlas— debe evaluarse también en su dimensión criminógena. Cuarto, un riesgo de consolidación de gobernanza criminal, cuya reversión resulta exponencialmente más costosa una vez asentado el control territorial, tal como lo demuestra la experiencia comparada que ambos informes recogen."));

cuerpo.push(h1("VI. Conclusiones"));
cuerpo.push(p("En definitiva, del examen relacional de los antecedentes es posible sostener las siguientes conclusiones. Primera: la infraestructura logística compartida —y no el mercado individual— constituye la unidad de análisis eficaz del crimen organizado en Chile, lo que aconseja estrategias investigativas organizadas por corredor. Segunda: existe una asimetría acreditada entre el territorio donde se genera la renta ilícita y aquel donde se sanciona su blanqueo, cuya corrección representa la intervención de mayor rendimiento disponible para la persecución patrimonial. Tercera: la estadística condenatoria de lavado no debe leerse como fotografía del fenómeno, pues surgen indicios concordantes de un segmento sofisticado no capturado por el sistema. Cuarta: la brecha regulatoria opera como factor criminógeno autónomo y su identificación temprana constituye una diligencia de inteligencia en sí misma. Quinta: se verifica una transición indiciaria hacia formas de gobernanza criminal cuya desarticulación exigirá herramientas distintas de las diseñadas para los mercados de bienes."));
cuerpo.push(p("Este informe se emite como documento de trabajo confidencial del estudio, sobre la base exclusiva de las fuentes que en él se individualizan, y sus conclusiones deberán ajustarse en la medida en que nuevos antecedentes —incorporados al Atlas de Economías Ilícitas— así lo exijan."));

cuerpo.push(h1("Referencias"));
cuerpo.push(refBib("Confederación de la Producción y del Comercio (2026). Por un Chile sin economía ilícita: seguridad, certeza, institucionalidad y confianza para el desarrollo sostenible. Santiago de Chile: CPC."));
cuerpo.push(refBib("Fiscalía Nacional, Unidad Especializada en Crimen Organizado y Drogas (2025). Informe Crimen Organizado en Chile. Santiago de Chile: Ministerio Público."));

// ---------- documento ----------
const doc = new Document({
  styles: {
    default: { document: { run: { font: FUENTE, size: 24 } } },
  },
  sections: [
    {
      properties: { page: { margin: { top: 1440, bottom: 1440, left: 1700, right: 1440 } } },
      children: portada,
    },
    {
      properties: { page: { margin: { top: 1440, bottom: 1440, left: 1700, right: 1440 } } },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Ríos & Ríos Asociados · Informe de Inteligencia Criminal N.º 01/2026 · Página ", font: FUENTE, size: 18, color: "5F7394" }),
              new TextRun({ children: [PageNumber.CURRENT], font: FUENTE, size: 18, color: "5F7394" }),
            ],
          })],
        }),
      },
      children: cuerpo,
    },
  ],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("/home/claude/Informe_Inteligencia_Criminal_01-2026.docx", buf);
  console.log("DOCX generado");
});
