#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Figuras institucionales — Informe de Inteligencia Criminal N.º 02/2026."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch, Circle
import matplotlib.font_manager as fm
import networkx as nx
import matplotlib.patheffects as pe
import numpy as np

# ---------- paleta institucional ----------
TINTA   = "#0A1426"
PANEL   = "#0F1D38"
LINEA   = "#24395C"
ORO     = "#C9A24B"
MARFIL  = "#EDE7DA"
ACERO   = "#8FA3C0"
ACERO2  = "#5F7394"
F_ORIGEN, F_LOG, F_COM, F_FIN, F_PRED = "#C14B3A", "#5E97C4", "#6FAE8F", "#C9A24B", "#9A6FB8"
T_DOC, T_ORG, T_LUG, T_MER = "#94A8C7", "#D06A50", "#5E97C4", "#6FAE8F"

plt.rcParams.update({
    "figure.facecolor": TINTA, "axes.facecolor": TINTA, "savefig.facecolor": TINTA,
    "text.color": MARFIL, "axes.edgecolor": LINEA, "axes.labelcolor": ACERO,
    "xtick.color": ACERO, "ytick.color": MARFIL,
    "font.family": "DejaVu Sans", "font.size": 11,
})

def marco(fig, titulo, sub, fuente):
    fig.text(0.045, 0.955, titulo, fontsize=16.5, fontweight="bold", color=MARFIL, va="top")
    fig.text(0.045, 0.905, sub, fontsize=10.5, color=ACERO, va="top")
    fig.text(0.045, 0.028, fuente, fontsize=8.2, color=ACERO2, va="bottom")
    fig.lines.append(plt.Line2D([0.045, 0.16], [0.878, 0.878], transform=fig.transFigure,
                                color=ORO, linewidth=2.4))

# =========================================================
# FIGURA 1 — Asimetría territorial
# =========================================================
reg = ["Metropolitana","Arica y Parinacota","Tarapacá","Maule","Los Lagos","Coquimbo",
       "Antofagasta","Atacama","Valparaíso","O'Higgins","Los Ríos","Araucanía","Ñuble","Biobío","Aysén","Magallanes"]
sen = [143,11,9,8,6,4,3,3,3,3,2,2,1,1,0,0]
norte = {"Arica y Parinacota","Tarapacá","Antofagasta","Atacama","Coquimbo"}

fig, ax = plt.subplots(figsize=(11.6, 7.4))
plt.subplots_adjust(left=0.20, right=0.955, top=0.80, bottom=0.10)
y = np.arange(len(reg))[::-1]
cols = [ORO if r=="Metropolitana" else (F_ORIGEN if r in norte else ACERO2) for r in reg]
ax.barh(y, sen, height=0.62, color=cols, edgecolor="none")
for yi, v, r in zip(y, sen, reg):
    ax.text(v+1.6, yi, f"{v}", va="center", fontsize=10,
            color=ORO if r=="Metropolitana" else MARFIL,
            fontweight="bold" if r=="Metropolitana" else "normal")
ax.set_yticks(y); ax.set_yticklabels(reg, fontsize=10)
ax.set_xlim(0, 165)
for s in ("top","right","bottom"): ax.spines[s].set_visible(False)
ax.spines["left"].set_color(LINEA)
ax.xaxis.set_visible(False)
ax.text(146, y[3], "71,9% del total\nnacional", fontsize=9.5, color=ORO, va="center")
leg = [mpatches.Patch(color=ORO, label="Región Metropolitana"),
       mpatches.Patch(color=F_ORIGEN, label="Macrozona Norte (genera la renta)"),
       mpatches.Patch(color=ACERO2, label="Resto del país")]
ax.legend(handles=leg, loc="lower right", frameon=False, fontsize=9.5, labelcolor=MARFIL)
marco(fig, "Asimetría territorial de la persecución patrimonial",
      "Sentencias condenatorias por lavado de activos según región · 2020–2024 (Patrón II)",
      "Fuente: UAF, XI Informe de Tipologías y Señales de Alerta de Lavado de Activos en Chile (2020–2024). Elaboración: Ríos & Ríos Asociados.")
plt.savefig("fig1_asimetria_territorial.png", dpi=170)
plt.close(fig)

# =========================================================
# FIGURA 2 — Rusticidad de tipologías + sectores vulnerados
# =========================================================
fig, (a1, a2) = plt.subplots(1, 2, figsize=(12.6, 6.6))
plt.subplots_adjust(left=0.24, right=0.965, top=0.775, bottom=0.11, wspace=0.62)

tip = ["Uso de testaferros","Creación de estructuras jurídicas","Fraccionamiento («pitufeo»)",
       "Operaciones ficticias o anormales","Gatekeepers profesionales"]
tv  = [73.8, 44.7, 21.4, 11.7, 5.8]
y1 = np.arange(len(tip))[::-1]
c1 = [ACERO2]*4 + [F_ORIGEN]
a1.barh(y1, tv, height=0.56, color=c1[::-1] if False else [F_ORIGEN if t=="Gatekeepers profesionales" else ACERO2 for t in tip], edgecolor="none")
for yi, v in zip(y1, tv):
    a1.text(v+1.5, yi, f"{v:.1f}%".replace(".", ","), va="center", fontsize=10, color=MARFIL)
a1.set_yticks(y1); a1.set_yticklabels(tip, fontsize=9.6)
a1.set_xlim(0, 88); a1.xaxis.set_visible(False)
for s in ("top","right","bottom"): a1.spines[s].set_visible(False)
a1.spines["left"].set_color(LINEA)
a1.set_title("Tipologías en los 103 casos sentenciados", fontsize=11, color=ACERO, pad=10, loc="left")
a1.annotate("el segmento sofisticado\napenas aparece condenado", xy=(5.8, y1[-1]), xytext=(34, y1[-1]-0.12),
            fontsize=9, color=F_ORIGEN, va="center",
            arrowprops=dict(arrowstyle="-", color=F_ORIGEN, lw=1))

sec = ["Comercializadoras de vehículos","Bancos","Notarios","Conservadores de bienes raíces"]
sv  = [77.7, 44.7, 42.7, 38.8]
y2 = np.arange(len(sec))[::-1]
a2.barh(y2, sv, height=0.5, color=[ORO if s=="Comercializadoras de vehículos" else ACERO2 for s in sec], edgecolor="none")
for yi, v in zip(y2, sv):
    a2.text(v+1.5, yi, f"{v:.1f}%".replace(".", ","), va="center", fontsize=10, color=MARFIL)
a2.set_yticks(y2); a2.set_yticklabels(sec, fontsize=9.6)
a2.set_xlim(0, 92); a2.xaxis.set_visible(False)
for s in ("top","right","bottom"): a2.spines[s].set_visible(False)
a2.spines["left"].set_color(LINEA)
a2.set_title("Sectores formales vulnerados", fontsize=11, color=ACERO, pad=10, loc="left")

marco(fig, "Rusticidad del universo condenatorio de lavado",
      "Mecanismos de blanqueo y canales de colocación identificados en sentencias · 2020–2024 (Patrón III)",
      "Fuente: UAF, XI Informe de Tipologías (2020–2024). El efectivo aparece en el 86,4% de los casos. Elaboración: Ríos & Ríos Asociados.")
plt.savefig("fig2_tipologias_sectores.png", dpi=170)
plt.close(fig)

# =========================================================
# FIGURA 3 — Brecha de recuperación patrimonial
# =========================================================
fig, ax = plt.subplots(figsize=(11.6, 6.8))
plt.subplots_adjust(left=0.05, right=0.97, top=0.78, bottom=0.06)
ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis("off")

# círculo de flujos (área proporcional imposible: se usa escala visual con advertencia)
c_flujo = Circle((3.1, 4.6), 3.05, facecolor=PANEL, edgecolor=F_ORIGEN, linewidth=2.4)
ax.add_patch(c_flujo)
ax.text(3.1, 5.35, "US$ 5.700", ha="center", fontsize=30, fontweight="bold", color=F_ORIGEN)
ax.text(3.1, 4.55, "millones / año", ha="center", fontsize=12, color=MARFIL)
ax.text(3.1, 3.75, "flujo estimado de las\neconomías ilícitas (CPC, 2026)", ha="center", fontsize=9.5, color=ACERO)
ax.text(3.1, 3.02, "ANTECEDENTE INDICIARIO", ha="center", fontsize=8, color=F_ORIGEN,
        fontweight="bold", bbox=dict(boxstyle="round,pad=0.35", fc="none", ec=F_ORIGEN, lw=1))

c_comiso = Circle((7.9, 4.6), 0.62, facecolor=ORO, edgecolor="none")
ax.add_patch(c_comiso)
ax.text(7.9, 6.0, "US$ 1,9", ha="center", fontsize=22, fontweight="bold", color=ORO)
ax.text(7.9, 5.5, "millones / año", ha="center", fontsize=11, color=MARFIL)
ax.text(7.9, 3.55, "comiso judicial promedio\n(UAF: CLP 9.481 MM en 2020–2024)", ha="center", fontsize=9.5, color=ACERO)
ax.text(7.9, 2.82, "HECHO ACREDITADO", ha="center", fontsize=8, color=ORO,
        fontweight="bold", bbox=dict(boxstyle="round,pad=0.35", fc="none", ec=ORO, lw=1))

ax.add_patch(FancyArrowPatch((5.55, 4.6), (7.1, 4.6), arrowstyle="-|>", mutation_scale=22,
                             color=ACERO2, lw=1.6))
ax.text(6.33, 4.95, "tasa de recuperación", ha="center", fontsize=9, color=ACERO)
ax.text(6.33, 4.22, "< 0,1%", ha="center", fontsize=17, fontweight="bold", color=MARFIL)
ax.text(5.0, 0.9, "Nota: representación esquemática; las magnitudes no están a escala. El contraste combina una estimación gremial\n"
                  "con una cifra judicial acreditada, por lo que constituye una inferencia razonable sujeta a las cautelas metodológicas del informe.",
        ha="center", fontsize=8.2, color=ACERO2)
marco(fig, "Brecha de recuperación patrimonial",
      "Flujos anuales estimados de las economías ilícitas frente al comiso judicial efectivo (Patrón III · hallazgo central)",
      "Fuentes: CPC (2026); UAF, XI Informe de Tipologías (2020–2024). Elaboración: Ríos & Ríos Asociados.")
plt.savefig("fig3_brecha_recuperacion.png", dpi=170)
plt.close(fig)

# =========================================================
# FIGURA 4 — Grafo de red (subgrafo representativo del atlas)
# =========================================================
G = nx.Graph()
nodos = {
 # id: (etiqueta, tipo)
 "TdA":("Tren de Aragua","org"), "Gall":("Los Gallegos","org"), "Emp":("La Empresa","org"),
 "Fuj":("Bang de Fujian","org"), "Cal":("Los Caleños","org"), "Sin":("C. de Sinaloa","org"),
 "Bol":("Bolivia","lug"), "Colch":("Colchane","lug"), "AH":("Alto Hospicio","lug"),
 "Iqq":("Iquique · ZOFRI","lug"), "Ant":("Antofagasta","lug"), "Stgo":("Santiago RM","lug"),
 "SA":("San Antonio","lug"), "Eur":("Europa","lug"), "Par":("Paraguay","lug"),
 "Coca":("Cocaína","mer"), "Tab":("Tabaco ilícito","mer"), "Lav":("LAVADO DE ACTIVOS","mer"),
 "Soc":("Sociedades SpA","mer"), "Sect":("Automotoras/banca","mer"), "Ext":("Extorsión/secuestro","mer"),
 "Cred":("Crédito «gota a gota»","mer"), "Trata":("Trata de personas","mer"),
 "UAF":("XI Informe UAF","doc"), "UCOD":("Informe UCOD 2025","doc"), "CPC":("Estudio CPC 2026","doc"),
}
for k,(lab,t) in nodos.items(): G.add_node(k, lab=lab, tipo=t)
edges = [
 ("Bol","Colch","origen"),("Par","Colch","origen"),("Colch","AH","log"),("AH","Iqq","log"),
 ("Bol","Ant","origen"),("Ant","Stgo","log"),("Iqq","Stgo","log"),("Stgo","SA","log"),("SA","Eur","com"),
 ("Coca","Colch","origen"),("Coca","Lav","fin"),("Tab","Par","origen"),("Tab","Ant","origen"),("Tab","Coca","log"),
 ("TdA","Colch","origen"),("TdA","Ext","pred"),("TdA","Trata","pred"),("TdA","Lav","fin"),
 ("Gall","TdA","pred"),("Gall","Trata","pred"),("Emp","Cred","fin"),("Cred","Lav","fin"),
 ("Fuj","Lav","fin"),("Cal","Lav","fin"),("Sin","Eur","log"),
 ("Soc","Lav","fin"),("Sect","Lav","fin"),("Lav","Stgo","fin"),("Lav","Bol","fin"),
 ("UAF","Lav","doc"),("UAF","Soc","doc"),("UCOD","TdA","doc"),("UCOD","Coca","doc"),
 ("CPC","Tab","doc"),("CPC","Cred","doc"),
]
cmap_e = {"origen":F_ORIGEN,"log":F_LOG,"com":F_COM,"fin":F_FIN,"pred":F_PRED,"doc":ACERO2}
for a,b,f in edges: G.add_edge(a,b,fase=f)

pos = nx.spring_layout(G, k=1.05, iterations=420, seed=11)
deg = dict(G.degree())
cmap_n = {"org":T_ORG,"lug":T_LUG,"mer":T_MER,"doc":T_DOC}

fig, ax = plt.subplots(figsize=(12.8, 8.6))
plt.subplots_adjust(left=0.02, right=0.98, top=0.845, bottom=0.075)
ax.axis("off")
for a,b,d in G.edges(data=True):
    x1,y1 = pos[a]; x2,y2 = pos[b]
    st = "dashed" if d["fase"]=="doc" else "solid"
    ax.add_patch(FancyArrowPatch((x1,y1),(x2,y2), connectionstyle="arc3,rad=0.16",
                 color=cmap_e[d["fase"]], lw=1.0 if d["fase"]=="doc" else 1.7,
                 alpha=0.55 if d["fase"]=="doc" else 0.8, linestyle=st, arrowstyle="-"))
for n,(x,y) in pos.items():
    t = G.nodes[n]["tipo"]; r = 0.028 + 0.011*deg[n]
    halo = Circle((x,y), r*1.55, facecolor=cmap_n[t], alpha=0.13, edgecolor="none"); ax.add_patch(halo)
    c = Circle((x,y), r, facecolor=cmap_n[t], edgecolor=TINTA, linewidth=1.4,
               alpha=0.95, zorder=5); ax.add_patch(c)
    lab = G.nodes[n]["lab"]
    fw = "bold" if n=="Lav" else "normal"
    fs = 10.5 if n=="Lav" else 8.4
    ax.text(x, y-r-0.045, lab, ha="center", va="top", fontsize=fs, color=MARFIL,
            fontweight=fw, zorder=6,
            path_effects=[pe.withStroke(linewidth=2.6, foreground=TINTA)])
ax.set_xlim(-1.28, 1.28); ax.set_ylim(-1.22, 1.18)
leg1 = [mpatches.Patch(color=T_ORG,label="Organización criminal"),
        mpatches.Patch(color=T_LUG,label="Lugar / nodo logístico"),
        mpatches.Patch(color=T_MER,label="Mercado ilícito"),
        mpatches.Patch(color=T_DOC,label="Fuente documental")]
l1 = ax.legend(handles=leg1, loc="upper left", frameon=False, fontsize=8.6, labelcolor=MARFIL,
               bbox_to_anchor=(0.0, 1.0))
ax.add_artist(l1)
leg2 = [plt.Line2D([0],[0],color=c,lw=2.4,label=n) for n,c in
        [("Origen",F_ORIGEN),("Logística",F_LOG),("Comercialización",F_COM),
         ("Fase económica",F_FIN),("Predatoria",F_PRED),("Documental",ACERO2)]]
ax.legend(handles=leg2, loc="upper right", frameon=False, fontsize=8.6, labelcolor=MARFIL,
          bbox_to_anchor=(1.0, 1.0))
marco(fig, "Grafo de conexiones del Atlas de Economías Ilícitas",
      "Subgrafo representativo: el lavado de activos como nodo articulador entre mercados, corredores y organizaciones",
      "Fuentes: Fiscalía Nacional–UCOD (2025); CPC (2026); UAF (2020–2024). El tamaño del nodo refleja su grado de conexión. Elaboración: Ríos & Ríos Asociados.")
plt.savefig("fig4_grafo_red.png", dpi=170)
plt.close(fig)

# =========================================================
# FIGURA 5 — Corredor logístico convergente (flujo)
# =========================================================
fig, ax = plt.subplots(figsize=(12.8, 6.4))
plt.subplots_adjust(left=0.03, right=0.97, top=0.78, bottom=0.10)
ax.set_xlim(0, 100); ax.set_ylim(0, 100); ax.axis("off")

etapas = [("Bolivia / Perú /\nParaguay", 8, F_ORIGEN, "ORIGEN"),
          ("Paso Colchane\n(y pasos aledaños)", 26, F_ORIGEN, "INGRESO"),
          ("Alto Hospicio /\nIquique · ZOFRI", 44, F_LOG, "ACOPIO"),
          ("Santiago\nRegión Metropolitana", 62, F_LOG, "REDISTRIBUCIÓN"),
          ("San Antonio /\nValparaíso", 80, F_COM, "EXPORTACIÓN"),
          ("Europa /\nOceanía", 95, F_COM, "DESTINO")]
yc = 58
for i,(lab,x,c,tag) in enumerate(etapas):
    ax.add_patch(Circle((x,yc), 4.6, facecolor=PANEL, edgecolor=c, lw=2.2, zorder=5))
    ax.text(x, yc, str(i+1), ha="center", va="center", fontsize=13, fontweight="bold", color=c, zorder=6)
    ax.text(x, yc+9.5, tag, ha="center", fontsize=8, color=c, fontweight="bold")
    ax.text(x, yc-8.5, lab, ha="center", va="top", fontsize=9, color=MARFIL)
for (l1,x1,c1,t1),(l2,x2,c2,t2) in zip(etapas[:-1], etapas[1:]):
    ax.add_patch(FancyArrowPatch((x1+4.9,yc),(x2-4.9,yc), arrowstyle="-|>", mutation_scale=16,
                 color=ACERO2, lw=1.6, zorder=4))
flujos = [("Cocaína · cannabis · ketamina", F_ORIGEN, 30),
          ("Cigarrillos (70% de origen paraguayo) · migrantes", F_ORIGEN, 24),
          ("Renta ilícita → lavado (colocación en el norte, sanción en la RM)", F_FIN, 18)]
for lab, c, yy in flujos:
    ax.add_patch(FancyArrowPatch((8, yy),(88, yy), arrowstyle="-|>", mutation_scale=12,
                 color=c, lw=2.0, alpha=0.85,
                 connectionstyle="arc3,rad=-0.04"))
    ax.text(9, yy+2.6, lab, fontsize=8.8, color=c)
ax.text(50, 6, "Un mismo corredor arrienda capacidad logística a múltiples mercados: el 80% de los grandes decomisos de\n"
               "cigarrillos se asocia a presencia de drogas y armamento (BAT, en CPC 2026).", ha="center",
        fontsize=8.4, color=ACERO2)
marco(fig, "Convergencia del corredor logístico de la Macrozona Norte",
      "Infraestructura criminal compartida entre mercados ilícitos (Patrón I)",
      "Fuentes: Fiscalía Nacional–UCOD (2025), rutas del tráfico; CPC (2026). Elaboración: Ríos & Ríos Asociados.")
plt.savefig("fig5_corredor_convergente.png", dpi=170)
plt.close(fig)

print("Figuras generadas")
