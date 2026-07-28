(() => {
  const STRINGS = {
    en: {
      title: "JG3D Works | Catalog",
      eyebrow: "FULL CATALOG",
      heading: ["designs.", "Ready to print."],
      intro: "Every model we publish on Cults3D. Buy there and download the file instantly.",
      searchPlaceholder: "Search by equipment, car or part (e.g. FT450 Gol)",
      sortLabel: "SORT",
      sort: { recent: "NEWEST", "price-asc": "PRICE ↑", "price-desc": "PRICE ↓", name: "A–Z" },
      chipAll: "ALL", chipSpares: "SPARE PARTS", chipShop: "SHOP · HOME",
      count: (shown, total) => `SHOWING ${shown} OF ${total} DESIGNS`,
      photos: n => `${n} PHOTO${n === 1 ? "" : "S"}`,
      isNew: "NEW", free: "FREE",
      cta: "VIEW ON CULTS3D", ctaFree: "DOWNLOAD",
      emptyTitle: q => q ? `No results for “${q}”` : "No results with these filters",
      emptyText: "Try the equipment brand (FuelTech, Injepro, ECUMaster…) or the car model (Gol, Chevette…). If what you need doesn't exist yet, we can design it for you.",
      emptyCta: "REQUEST A CUSTOM DESIGN", emptyClear: "Clear search",
      whatsappMsg: "Hello JG3D, I would like to ask about a custom model",
      types: { "SOPORTES": "MOUNTS", "PANELES · CONSOLAS": "PANELS · CONSOLES", "CONECTORES": "CONNECTORS", "REPUESTOS": "SPARE PARTS", "TALLER · HOGAR": "SHOP · HOME", "EXTERIOR": "EXTERIOR" }
    },
    es: {
      title: "JG3D Works | Catálogo",
      eyebrow: "CATÁLOGO COMPLETO",
      heading: ["diseños.", "Listos para imprimir."],
      intro: "Todos los modelos publicados en Cults3D. Compralos ahí y descargá el archivo al instante.",
      searchPlaceholder: "Buscá por equipo, auto o pieza (ej: FT450 Gol)",
      sortLabel: "ORDENAR",
      sort: { recent: "MÁS RECIENTES", "price-asc": "PRECIO ↑", "price-desc": "PRECIO ↓", name: "A–Z" },
      chipAll: "TODOS", chipSpares: "REPUESTOS", chipShop: "TALLER · HOGAR",
      count: (shown, total) => `MOSTRANDO ${shown} DE ${total} DISEÑOS`,
      photos: n => `${n} FOTO${n === 1 ? "" : "S"}`,
      isNew: "NUEVO", free: "GRATIS",
      cta: "VER EN CULTS3D", ctaFree: "DESCARGAR",
      emptyTitle: q => q ? `Sin resultados para «${q}»` : "Sin resultados con estos filtros",
      emptyText: "Probá con la marca del equipo (FuelTech, Injepro, ECUMaster…) o el modelo del auto (Gol, Chevette…). Si lo que buscás no existe todavía, lo diseñamos a medida.",
      emptyCta: "PEDIR DISEÑO PERSONALIZADO", emptyClear: "Limpiar búsqueda",
      whatsappMsg: "Hola JG3D, quiero consultar por un modelo personalizado",
      types: { "SOPORTES": "SOPORTES", "PANELES · CONSOLAS": "PANELES · CONSOLAS", "CONECTORES": "CONECTORES", "REPUESTOS": "REPUESTOS", "TALLER · HOGAR": "TALLER · HOGAR", "EXTERIOR": "EXTERIOR" }
    },
    pt: {
      title: "JG3D Works | Catálogo",
      eyebrow: "CATÁLOGO COMPLETO",
      heading: ["projetos.", "Prontos para imprimir."],
      intro: "Todos os modelos publicados no Cults3D. Compre lá e baixe o arquivo na hora.",
      searchPlaceholder: "Busque por equipamento, carro ou peça (ex: FT450 Gol)",
      sortLabel: "ORDENAR",
      sort: { recent: "MAIS RECENTES", "price-asc": "PREÇO ↑", "price-desc": "PREÇO ↓", name: "A–Z" },
      chipAll: "TODOS", chipSpares: "PEÇAS", chipShop: "OFICINA · CASA",
      count: (shown, total) => `MOSTRANDO ${shown} DE ${total} PROJETOS`,
      photos: n => `${n} FOTO${n === 1 ? "" : "S"}`,
      isNew: "NOVO", free: "GRÁTIS",
      cta: "VER NO CULTS3D", ctaFree: "BAIXAR",
      emptyTitle: q => q ? `Nenhum resultado para “${q}”` : "Nenhum resultado com esses filtros",
      emptyText: "Tente a marca do equipamento (FuelTech, Injepro, ECUMaster…) ou o modelo do carro (Gol, Chevette…). Se o que você procura ainda não existe, criamos sob medida.",
      emptyCta: "PEDIR PROJETO PERSONALIZADO", emptyClear: "Limpar busca",
      whatsappMsg: "Olá JG3D, gostaria de consultar sobre um modelo personalizado",
      types: { "SOPORTES": "SUPORTES", "PANELES · CONSOLAS": "PAINÉIS · CONSOLES", "CONECTORES": "CONECTORES", "REPUESTOS": "PEÇAS", "TALLER · HOGAR": "OFICINA · CASA", "EXTERIOR": "EXTERIOR" }
    }
  };

  const CHIPS = [
    { id: "all", match: () => true },
    { id: "FUELTECH", match: p => p.b === "FUELTECH" },
    { id: "INJEPRO", match: p => p.b === "INJEPRO" },
    { id: "OCTTANE", match: p => p.b === "OCTTANE" },
    { id: "ECUMASTER", match: p => p.b === "ECUMASTER" },
    { id: "VW GOL", match: p => p.v === "VW GOL" },
    { id: "CHEVETTE", match: p => p.v === "CHEVETTE" },
    { id: "spares", match: p => p.t === "REPUESTOS" },
    { id: "shop", match: p => p.t === "TALLER · HOGAR" }
  ];

  const NEW_DAYS = 30;
  const state = { lang: "en", chip: "all", query: "", sort: "recent" };
  const $ = s => document.querySelector(s);

  const normalize = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const t = () => STRINGS[state.lang] || STRINGS.en;

  function chipLabel(chip) {
    if (chip.id === "all") return t().chipAll;
    if (chip.id === "spares") return t().chipSpares;
    if (chip.id === "shop") return t().chipShop;
    return chip.id;
  }

  function filtered() {
    const chip = CHIPS.find(c => c.id === state.chip) || CHIPS[0];
    const q = normalize(state.query.trim());
    let items = CATALOG.filter(chip.match);
    if (q) {
      const words = q.split(/\s+/);
      items = items.filter(p => {
        const hay = normalize(`${p.n} ${p.s} ${p.b} ${p.v} ${p.t}`);
        return words.every(w => hay.includes(w));
      });
    }
    const sorters = {
      recent: (a, b) => b.d.localeCompare(a.d),
      "price-asc": (a, b) => a.p - b.p,
      "price-desc": (a, b) => b.p - a.p,
      name: (a, b) => a.n.localeCompare(b.n, undefined, { sensitivity: "base" })
    };
    return items.slice().sort(sorters[state.sort] || sorters.recent);
  }

  function isNew(p) {
    return (Date.now() - new Date(p.d + "T00:00:00Z").getTime()) < NEW_DAYS * 864e5;
  }

  function cardHTML(p) {
    const s = t();
    const label = [p.b, s.types[p.t] || p.t].filter(Boolean).join(" · ");
    const price = p.p > 0
      ? `<span class="cat-price"><i></i>$${p.p.toFixed(2)}</span>`
      : `<span class="cat-price free">${s.free}</span>`;
    const cta = p.p > 0 ? s.cta : s.ctaFree;
    return `<article class="cat-card">
      <a class="cat-img" href="${p.u}" target="_blank" rel="noreferrer">
        ${isNew(p) ? `<span class="cat-badge">${s.isNew}</span>` : ""}
        <span class="cat-photos">${s.photos(p.g)}</span>
        <img src="${p.img}" alt="${p.n.replace(/"/g, "&quot;")}" loading="lazy">
      </a>
      <div class="cat-body">
        <small>${label}</small>
        <h3>${p.n}</h3>
        <div class="cat-meta">${p.v || " "}</div>
        <div class="cat-foot">${price}<a class="cat-cta" href="${p.u}" target="_blank" rel="noreferrer">${cta} »</a></div>
      </div>
    </article>`;
  }

  function renderChips() {
    $("#cat-chips").innerHTML = CHIPS.map(chip => {
      const n = CATALOG.filter(chip.match).length;
      return `<button type="button" class="cat-chip${state.chip === chip.id ? " on" : ""}" data-chip="${chip.id}">${chipLabel(chip)} <b>${n}</b></button>`;
    }).join("");
    document.querySelectorAll(".cat-chip").forEach(b => b.addEventListener("click", () => {
      state.chip = b.dataset.chip;
      render();
    }));
  }

  function renderStatics() {
    const s = t();
    document.title = s.title;
    $("#cat-eyebrow-text").textContent = s.eyebrow;
    $("#cat-title").innerHTML = `${CATALOG.length} ${s.heading[0]}<br>${s.heading[1]}`;
    $("#cat-intro").textContent = s.intro;
    $("#cat-search").placeholder = s.searchPlaceholder;
    $("#cat-sort-label").textContent = s.sortLabel;
    document.querySelectorAll("#cat-sort option").forEach(o => { o.textContent = s.sort[o.value]; });
    $("#cat-empty-cta").firstChild.textContent = s.emptyCta + " ";
    $("#cat-empty-cta").href = `https://wa.me/5493517887769?text=${encodeURIComponent(s.whatsappMsg)}`;
    $("#cat-empty-clear").firstChild.textContent = s.emptyClear + " ";
  }

  function render() {
    const s = t();
    const items = filtered();
    renderStatics();
    renderChips();
    $("#cat-count").textContent = s.count(items.length, CATALOG.length);
    $("#cat-grid").innerHTML = items.map(cardHTML).join("");
    const empty = items.length === 0;
    $("#cat-empty").hidden = !empty;
    $("#cat-grid").hidden = empty;
    $("#cat-count").hidden = empty;
    if (empty) {
      $("#cat-empty-title").textContent = s.emptyTitle(state.query.trim());
      $("#cat-empty-text").textContent = s.emptyText;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    try { state.lang = ["en", "es", "pt"].includes(localStorage.getItem("jg3d-language")) ? localStorage.getItem("jg3d-language") : "en"; } catch { /* file:// */ }
    // i18n.js ya maneja nav/menú; acá solo reaccionamos para re-renderizar los textos del catálogo
    document.querySelectorAll("[data-language]").forEach(b => b.addEventListener("click", () => {
      state.lang = b.dataset.language;
      render();
    }));
    $("#cat-search").addEventListener("input", e => { state.query = e.target.value; render(); });
    $("#cat-sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
    $("#cat-empty-clear").addEventListener("click", e => {
      e.preventDefault();
      state.query = ""; state.chip = "all";
      $("#cat-search").value = "";
      render();
    });
    render();
  });
})();
