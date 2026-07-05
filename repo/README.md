# Atlas de Economías Ilícitas · Ríos & Ríos Asociados

Plataforma de inteligencia analítica sobre crimen organizado y economías ilícitas en Chile y su red transnacional, acompañada de informes de inteligencia criminal y figuras analíticas institucionales.

**Documento de trabajo confidencial del estudio.** Uso interno profesional.

---

## Contenido del repositorio

| Carpeta | Contenido |
|---|---|
| `atlas/` | Aplicativo web autocontenido (`atlas-economias-ilicitas.html`): mapa interactivo, grafo de red, mesa de análisis y registro persistente. |
| `informes/` | Informe de Inteligencia Criminal N.º 01/2026 (formato institucional) y N.º 02/2026 versión 2 (formato APA 7, con figuras integradas). |
| `figuras/` | Cinco figuras analíticas en alta resolución (PNG, 170 dpi), línea gráfica institucional. |
| `fuentes-procesadas/` | Scripts de generación reproducible: figuras (Python/matplotlib) e informes Word (Node/docx). |

## El aplicativo

Archivo único HTML (Leaflet + D3), sin dependencias de servidor. Características:

- **Vista dual**: mapa oscuro georreferenciado (Chile y red transnacional) y grafo de fuerza dirigida, con conexiones coloreadas por fase delictual (origen, logística, comercialización, fase económica, predatoria).
- **Sello epistémico**: cada nodo y conexión declara su calificación —hecho acreditado, antecedente indiciario o hipótesis por corroborar— reflejada también en el trazo (continuo, segmentado, punteado).
- **Mesa de análisis**: métricas computadas en tiempo real (centralidad de red, corredores multi-mercado, matriz territorial renta/persecución, composición del grafo) y los cinco patrones estructurales con evidencia autoactualizable.
- **Registro y fuentes**: ingreso estructurado de antecedentes y conexiones, persistencia entre sesiones, exportación e importación JSON.

Corpus vigente: **75 nodos y 88 conexiones** derivados de tres fuentes institucionales.

## Fuentes integradas

1. Fiscalía Nacional, Unidad Especializada en Crimen Organizado y Drogas (2025). *Informe Crimen Organizado en Chile*.
2. Confederación de la Producción y del Comercio (2026). *Por un Chile sin Economía Ilícita*.
3. Unidad de Análisis Financiero (2025). *XI Informe de Tipologías y Señales de Alerta de Lavado de Activos en Chile* (sentencias 2020-2024).

## Patrones estructurales (síntesis)

I. **Convergencia de corredores logísticos** en la Macrozona Norte (indiciario).
II. **Asimetría territorial** entre generación de renta y persecución patrimonial: RM concentra 71,9% de las sentencias por lavado 2020-2024 (acreditado en cifras).
III. **Rusticidad del universo condenatorio** y brecha de recuperación patrimonial inferior al 0,1% anual (indiciario, recalificado desde hipótesis tras corroboración UAF).
IV. **Zona gris regulatoria** como factor criminógeno autónomo (indiciario).
V. **Transición hacia gobernanza criminal** (indiciario con elementos acreditados).

## Reproducibilidad

```bash
# Figuras (requiere matplotlib y networkx)
python3 fuentes-procesadas/figuras.py

# Informes Word (requiere Node.js y la librería docx)
npm install docx
node fuentes-procesadas/informe_v2.js
```

---

*Ríos & Ríos Asociados — Litigación compleja · Delitos económicos · Crimen organizado — Iquique, Chile.*
