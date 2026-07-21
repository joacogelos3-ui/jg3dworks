(() => {
  const translations = {
    en: {
      lang: "en", title: "JG3D Works | Automotive 3D Design", nav: ["Designs", "How it works", "FAQ"], order: "Request a design", menu: "MENU", mobileNav: ["Designs", "How it works", "Frequently asked questions"], whatsapp: "Contact us on WhatsApp",
      heroEye: "AUTOMOTIVE 3D DESIGN", hero: ["Your electronics.", "Perfectly integrated."], heroText: "Mounts, panels and connectors designed for race cars. Download the STL file and print it wherever you are.", explore: "Explore designs", custom: "I need a custom solution", trust: ["DIGITAL DELIVERY", "VERIFIED COMPATIBILITY", "CUSTOM DESIGNS"], delivery: ["DELIVERY FORMAT", "STL file", "Ready to print"],
      catalog: "DIGITAL CATALOG", catalogTitle: ["Designed to fit.", "Built to compete."], catalogText: "Precision-developed models designed for durable printing and a clean installation.", consult: "Inquire",
      products: [["MOUNTS", "Competition mounts", "Precision mounts for FuelTech, Injepro, MoTeC, ECUMaster and more.", "Articulated · Steering column · Fixed"], ["PANELS", "OEM integration", "Panels that respect the original interior while organizing all the electronics.", "Panels · Consoles · Relay boxes"], ["CONNECTORS", "Protective housings", "Straight, 45° and 90° models with orientation options for every direction.", "Harnesses · Connectors · 26/34 pins"]],
      processEye: "FROM MODEL TO CAR", processTitle: ["From design", "to the final result."], processText: "We design, validate and refine every development before final installation.", steps: [["3D design", "We model the solution and define its geometry, mounting points and fit for each project."], ["Testing and validation", "We verify the fit in the vehicle and make the necessary adjustments before the final version."], ["Final installation", "The finished design is integrated into the vehicle with a clean, functional installation."]],
      faqEye: "FREQUENTLY ASKED QUESTIONS", faqTitle: ["Everything clear", "before you print."], faqIntro: "If your case is not listed here, contact us and we will check compatibility together.", faqs: [["What do I receive with my purchase?", "You receive digital STL files ready to download and print. No physical product is shipped."], ["Are the models tested?", "Designs are developed using real measurements, 3D scans or verified references. Each listing specifies compatibility."], ["Can I request a design for another display, ECU or vehicle?", "Yes. We can develop a custom design for another display, racing ECU or vehicle model. Contact us on WhatsApp and send photos, measurements and equipment details so we can evaluate the project."], ["Can I send a 3D scan for a custom part?", "Yes. We work from 3D scans to adapt or develop parts with greater precision. Through reverse engineering, we use the scanned mesh as a reference to rebuild the geometry in CAD and create an editable design tailored to the project."], ["What material do you recommend?", "For motorsport interiors, we recommend ABS, ASA or equivalent temperature-resistant materials."]],
      contactEye: "CUSTOM DEVELOPMENTS", contactTitle: ["Didn’t find", "what you need?"], contactText: "Tell us which vehicle, display or component you need to integrate. We can adapt an existing design or create one from scratch.", direct: "Custom models · Direct assistance", global: "Digital files · Worldwide delivery", message: "Hello JG3D, I would like to ask about a custom model", footer: "Automotive 3D Parts · STL files only"
    },
    es: {
      lang: "es", title: "JG3D Works | Diseño 3D automotriz", nav: ["Diseños", "Cómo funciona", "FAQ"], order: "Pedir diseño", menu: "MENÚ", mobileNav: ["Diseños", "Cómo funciona", "Preguntas frecuentes"], whatsapp: "Consultar por WhatsApp",
      heroEye: "DISEÑO 3D AUTOMOTRIZ", hero: ["Tu electrónica.", "Perfectamente integrada."], heroText: "Soportes, paneles y conectores diseñados para autos de competición. Descargá el archivo STL e imprimilo donde estés.", explore: "Explorar diseños", custom: "Necesito algo personalizado", trust: ["ENTREGA DIGITAL", "COMPATIBILIDAD VERIFICADA", "DISEÑOS A MEDIDA"], delivery: ["FORMATO DE ENTREGA", "Archivo STL", "Listo para imprimir"],
      catalog: "CATÁLOGO DIGITAL", catalogTitle: ["Diseñado para encajar.", "Creado para competir."], catalogText: "Modelos desarrollados con precisión, pensados para una impresión resistente y una instalación limpia.", consult: "Consultar",
      products: [["SOPORTES", "Soportes de competición", "Montajes precisos para FuelTech, Injepro, MoTeC, ECUMaster y más.", "Articulados · De columna · Fijos"], ["PANELES", "Integración OEM", "Paneles que respetan el interior original y organizan toda la electrónica.", "Paneles · Consolas · Cajas de relés"], ["CONECTORES", "Carcasas protectoras", "Modelos rectos, a 45° y 90° con orientación disponible para todas las direcciones.", "Ramales · Conectores · 26/34 vías"]],
      processEye: "DEL MODELO AL AUTO", processTitle: ["Del diseño", "al resultado final."], processText: "Diseñamos, validamos y ajustamos cada desarrollo antes de llegar a la instalación final.", steps: [["Diseño 3D", "Modelamos la solución y definimos geometría, fijaciones y ajuste para cada proyecto."], ["Prueba y validación", "Comprobamos el encastre en el vehículo y realizamos los ajustes necesarios antes de la versión final."], ["Instalación final", "El diseño terminado queda integrado en el vehículo, con una instalación limpia y funcional."]],
      faqEye: "PREGUNTAS FRECUENTES", faqTitle: ["Todo claro antes", "de imprimir."], faqIntro: "Si tu caso no aparece acá, escribinos y revisamos juntos la compatibilidad.", faqs: [["¿Qué recibo con la compra?", "Recibís archivos STL digitales listos para descargar e imprimir. No se envía un producto físico."], ["¿Los modelos están probados?", "Los diseños se desarrollan con medidas reales, escaneos 3D o referencias verificadas. Cada publicación indica su compatibilidad."], ["¿Puedo pedir un diseño para otra pantalla, ECU o vehículo?", "Sí. Podemos desarrollar un diseño personalizado para otra pantalla, computadora de competición o modelo de vehículo. Contactanos por WhatsApp y envianos fotos, medidas y los detalles del equipo para evaluar el proyecto."], ["¿Puedo enviar un escaneo 3D para desarrollar una pieza personalizada?", "Sí. Trabajamos a partir de escaneos 3D para adaptar o desarrollar piezas con mayor precisión. Mediante ingeniería inversa, utilizamos la malla escaneada como referencia para reconstruir la geometría en CAD y crear un diseño editable, ajustado a las necesidades del proyecto."], ["¿Qué material recomiendan?", "Para interiores de competición recomendamos ABS, ASA o materiales equivalentes resistentes a temperatura."]],
      contactEye: "DESARROLLOS PERSONALIZADOS", contactTitle: ["¿No encontraste", "lo que buscabas?"], contactText: "Contanos qué vehículo, pantalla o componente necesitás integrar. Podemos adaptar un diseño o crear uno desde cero.", direct: "Modelos personalizados · Atención directa", global: "Archivos digitales · Entrega global", message: "Hola JG3D, quiero consultar por un modelo personalizado", footer: "Automotive 3D Parts · STL files only"
    },
    pt: {
      lang: "pt-BR", title: "JG3D Works | Design 3D automotivo", nav: ["Projetos", "Como funciona", "FAQ"], order: "Solicitar projeto", menu: "MENU", mobileNav: ["Projetos", "Como funciona", "Perguntas frequentes"], whatsapp: "Falar pelo WhatsApp",
      heroEye: "DESIGN 3D AUTOMOTIVO", hero: ["Sua eletrônica.", "Perfeitamente integrada."], heroText: "Suportes, painéis e conectores projetados para carros de competição. Baixe o arquivo STL e imprima onde estiver.", explore: "Explorar projetos", custom: "Preciso de algo personalizado", trust: ["ENTREGA DIGITAL", "COMPATIBILIDADE VERIFICADA", "PROJETOS SOB MEDIDA"], delivery: ["FORMATO DE ENTREGA", "Arquivo STL", "Pronto para imprimir"],
      catalog: "CATÁLOGO DIGITAL", catalogTitle: ["Projetado para encaixar.", "Criado para competir."], catalogText: "Modelos desenvolvidos com precisão, pensados para uma impressão resistente e uma instalação limpa.", consult: "Consultar",
      products: [["SUPORTES", "Suportes de competição", "Montagens precisas para FuelTech, Injepro, MoTeC, ECUMaster e muito mais.", "Articulados · De coluna · Fixos"], ["PAINÉIS", "Integração OEM", "Painéis que respeitam o interior original e organizam toda a eletrônica.", "Painéis · Consoles · Caixas de relés"], ["CONECTORES", "Carcaças protetoras", "Modelos retos, a 45° e 90°, com opções de orientação para todas as direções.", "Chicotes · Conectores · 26/34 vias"]],
      processEye: "DO MODELO AO CARRO", processTitle: ["Do projeto", "ao resultado final."], processText: "Projetamos, validamos e ajustamos cada desenvolvimento antes da instalação final.", steps: [["Design 3D", "Modelamos a solução e definimos geometria, fixações e encaixe para cada projeto."], ["Teste e validação", "Verificamos o encaixe no veículo e fazemos os ajustes necessários antes da versão final."], ["Instalação final", "O projeto finalizado é integrado ao veículo com uma instalação limpa e funcional."]],
      faqEye: "PERGUNTAS FREQUENTES", faqTitle: ["Tudo esclarecido", "antes de imprimir."], faqIntro: "Se o seu caso não estiver aqui, fale conosco e verificaremos juntos a compatibilidade.", faqs: [["O que recebo com a compra?", "Você recebe arquivos STL digitais prontos para baixar e imprimir. Nenhum produto físico é enviado."], ["Os modelos são testados?", "Os projetos são desenvolvidos com medidas reais, escaneamentos 3D ou referências verificadas. Cada anúncio informa sua compatibilidade."], ["Posso solicitar um projeto para outra tela, ECU ou veículo?", "Sim. Podemos desenvolver um projeto personalizado para outra tela, ECU de competição ou modelo de veículo. Fale conosco pelo WhatsApp e envie fotos, medidas e detalhes do equipamento para avaliarmos o projeto."], ["Posso enviar um escaneamento 3D para desenvolver uma peça personalizada?", "Sim. Trabalhamos a partir de escaneamentos 3D para adaptar ou desenvolver peças com maior precisão. Por meio de engenharia reversa, usamos a malha escaneada como referência para reconstruir a geometria em CAD e criar um projeto editável, ajustado às necessidades do projeto."], ["Qual material vocês recomendam?", "Para interiores de competição, recomendamos ABS, ASA ou materiais equivalentes resistentes à temperatura."]],
      contactEye: "DESENVOLVIMENTOS PERSONALIZADOS", contactTitle: ["Não encontrou", "o que procurava?"], contactText: "Conte qual veículo, tela ou componente você precisa integrar. Podemos adaptar um projeto existente ou criar um do zero.", direct: "Modelos personalizados · Atendimento direto", global: "Arquivos digitais · Entrega mundial", message: "Olá JG3D, gostaria de consultar sobre um modelo personalizado", footer: "Peças automotivas 3D · Somente arquivos STL"
    }
  };

  const one = selector => document.querySelector(selector);
  const all = selector => Array.from(document.querySelectorAll(selector));
  const setText = (selector, value) => { const node = one(selector); if (node) node.textContent = value; };
  const setHeading = (selector, values, emphasis = false) => { const node = one(selector); if (node) node.innerHTML = emphasis ? `${values[0]}<br><em>${values[1]}</em>` : `${values[0]}<br>${values[1]}`; };
  const setEyebrow = (selector, value, dot = false) => { const node = one(selector); if (node) node.innerHTML = `${dot ? "<i></i> " : ""}${value}`; };
  const replaceLeadText = (node, value) => { if (!node) return; const textNode = Array.from(node.childNodes).find(child => child.nodeType === Node.TEXT_NODE); if (textNode) textNode.textContent = `${value} `; };
  const safeStorage = {
    get() { try { return window.localStorage.getItem("jg3d-language"); } catch { return null; } },
    set(value) { try { window.localStorage.setItem("jg3d-language", value); } catch { /* file:// may block storage; language switching still works */ } }
  };

  function applyLanguage(language) {
    const t = translations[language] || translations.en;
    document.documentElement.lang = t.lang;
    document.title = t.title;
    all(".navlinks a").forEach((node, i) => node.textContent = t.nav[i]);
    replaceLeadText(one(".nav-actions .button"), t.order);
    setText(".menu-label", t.menu);
    all(".mobile-menu-panel>a:not(.mobile-menu-whatsapp)").forEach((node, i) => replaceLeadText(node, t.mobileNav[i]));
    all(".mobile-menu-whatsapp").forEach(node => { replaceLeadText(node, t.whatsapp); node.href = `https://wa.me/5493517887769?text=${encodeURIComponent(t.message)}`; });
    setEyebrow(".hero .eyebrow", t.heroEye, true);
    setHeading(".hero h1", t.hero, true);
    setText(".hero-copy>p", t.heroText);
    replaceLeadText(one(".actions .button"), t.explore);
    setText(".custom-design-link span", t.custom);
    all(".trust>span").forEach((node, i) => { const icon = node.querySelector("b"); node.textContent = ""; if (icon) node.appendChild(icon); node.appendChild(document.createTextNode(` ${t.trust[i]}`)); });
    ["small", "strong", "span"].forEach((tag, i) => setText(`.float-card ${tag}`, t.delivery[i]));
    setText("#productos .eyebrow", t.catalog);
    setHeading("#productos .section-head h2", t.catalogTitle);
    setText("#productos .section-head>p", t.catalogText);
    all(".product").forEach((node, i) => { const p = t.products[i]; node.querySelector("small").textContent = p[0]; node.querySelector("h3").textContent = p[1]; node.querySelector(".product-info>p").textContent = p[2]; node.querySelector(".product-info>div>span").textContent = p[3]; replaceLeadText(node.querySelector(".product-info a"), t.consult); });
    setText(".process .eyebrow", t.processEye);
    setHeading(".process .section-head h2", t.processTitle);
    setText(".process .section-head>p", t.processText);
    all(".process-step").forEach((node, i) => { node.querySelector("h3").textContent = t.steps[i][0]; node.querySelector("p").textContent = t.steps[i][1]; });
    setText(".faq .eyebrow", t.faqEye);
    setHeading(".faq>div>h2", t.faqTitle);
    setText(".faq>div>p", t.faqIntro);
    all(".faq-item").forEach((node, i) => { node.querySelector("button span").textContent = t.faqs[i][0]; node.querySelector(".faq-answer p").textContent = t.faqs[i][1]; });
    setEyebrow(".contact .eyebrow", t.contactEye, true);
    setHeading(".contact h2", t.contactTitle);
    setText(".contact-copy>p", t.contactText);
    setText(".whatsapp-button>span:not(.arrow-symbol)", t.whatsapp);
    const whatsapp = one(".whatsapp-button"); if (whatsapp) whatsapp.href = `https://wa.me/5493517887769?text=${encodeURIComponent(t.message)}`;
    const contactNotes = all(".contact-actions>span"); if (contactNotes[0]) contactNotes[0].textContent = t.direct; if (contactNotes[1]) contactNotes[1].textContent = t.global;
    setText(".footer>p", t.footer);
    all("[data-language]").forEach(button => { const active = button.dataset.language === language; button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active)); });
    safeStorage.set(language);
  }

  document.addEventListener("DOMContentLoaded", () => {
    all("[data-language]").forEach(button => button.addEventListener("click", () => applyLanguage(button.dataset.language)));
    const saved = safeStorage.get();
    applyLanguage(["en", "es", "pt"].includes(saved) ? saved : "en");
  });
})();
