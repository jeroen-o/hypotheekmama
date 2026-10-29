/* Hypotheekmama: site-scripts */
  var BOOK_TITLES = {
    'mijn-eerste-huis': { nl: 'Mijn eerste huis', en: 'My first home' },
    'aankoopmakelaar': { nl: 'Starters & de aankoopmakelaar', en: 'First-time buyers & the buying agent' },
    'hypotheek-verhogen': { nl: 'Mijn hypotheek verhogen', en: 'Increasing my mortgage' },
    'huis-groener': { nl: 'Mijn huis groener maken', en: 'Making my home greener' },
    'samenwonen': { nl: 'Samenwonen: zorg goed voor elkaar', en: 'Living together: look after each other' },
    'uit-elkaar': { nl: 'Wij gaan uit elkaar. Wat nu?', en: 'We\'re splitting up. Now what?' },
    'alimentatie-berekenen': { nl: 'Hoe bereken je alimentatie?', en: 'How is child/spousal support calculated?' },
    'kinderalimentatie': { nl: 'Kinderalimentatie', en: 'Child support' },
    'partneralimentatie': { nl: 'Partneralimentatie', en: 'Spousal support' },
    'ouderschapsplan': { nl: 'Het ouderschapsplan', en: 'The parenting plan' },
    'scheidingsconvenant': { nl: 'Het scheidingsconvenant', en: 'The divorce settlement' },
    'akte-verdeling': { nl: 'De akte van verdeling', en: 'The deed of division' },
    'beleggen-pensioen': { nl: 'Beleggen voor je pensioen', en: 'Investing for your pension' },
    'nieuwe-pensioenwet': { nl: 'De nieuwe pensioenwet', en: 'The new pension law' },
    'testament': { nl: 'Testament en levenstestament', en: 'Will and living will' },
    'middelbare-school': { nl: 'Naar de middelbare school', en: 'Starting secondary school' }
  };
  var LABELS = {
    nl: { requestPrefix: 'Aanvragen: ', subjectPrefix: 'Boekje aanvraag: ', bodyBook: 'Boekje: ', bodyName: 'Naam: ', bodyPhone: 'Telefoonnummer: ', bodyEmail: 'E-mailadres: ',
      title: 'Hypotheekmama | Karima Rijkse, financieel advies',
      description: 'Karima Rijkse helpt moeders, (over)grootmoeders en weduwen met hypotheek- en financieel advies, in iedere levensfase.',
      ogTitle: 'Hypotheekmama | Karima Rijkse',
      ogDescription: 'Financieel advies voor moeders, (over)grootmoeders en weduwen, in gewone taal, met tijd voor jouw situatie.' },
    en: { requestPrefix: 'Request: ', subjectPrefix: 'Guide request: ', bodyBook: 'Guide: ', bodyName: 'Name: ', bodyPhone: 'Phone number: ', bodyEmail: 'Email address: ',
      title: 'Mortgagemama | Karima Rijkse, financial advice',
      description: 'Karima Rijkse helps mothers, grandmothers and widows with mortgage and financial advice, at every stage of life.',
      ogTitle: 'Mortgagemama | Karima Rijkse',
      ogDescription: 'Financial advice for mothers, grandmothers and widows, in plain language, with time for your situation.' }
  };
  function toggleLang() {
    var html = document.documentElement;
    var current = html.getAttribute('data-lang');
    var next = current === 'nl' ? 'en' : 'nl';
    html.setAttribute('data-lang', next);
    html.setAttribute('lang', next);
    document.getElementById('langToggle').textContent = next === 'nl' ? 'EN' : 'NL';
    document.title = LABELS[next].title;
    var descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', LABELS[next].description);
    var ogT = document.querySelector('meta[property="og:title"]');
    if (ogT) ogT.setAttribute('content', LABELS[next].ogTitle);
    var ogD = document.querySelector('meta[property="og:description"]');
    if (ogD) ogD.setAttribute('content', LABELS[next].ogDescription);
    if (currentBookSlug) updateModalTitle();
    if (isReading) stopReadAloud();
  }

  /* TEXT SIZE */
  var textSizes = ['normal', 'lg', 'xl'];
  var textSizeLabels = { normal: 'A+', lg: 'A++', xl: 'A' };
  function cycleTextSize() {
    var html = document.documentElement;
    var current = html.getAttribute('data-textsize') || 'normal';
    var idx = (textSizes.indexOf(current) + 1) % textSizes.length;
    var next = textSizes[idx];
    if (next === 'normal') {
      html.removeAttribute('data-textsize');
    } else {
      html.setAttribute('data-textsize', next);
    }
    var btn = document.getElementById('textSizeBtn');
    document.getElementById('textSizeValue').textContent = ' ' + (next === 'xl' ? 'A' : 'A+');
  }

  /* READ ALOUD */
  var isReading = false;
  var synth = window.speechSynthesis;
  function getReadableText() {
    var lang = document.documentElement.getAttribute('data-lang') || 'nl';
    var selector = lang === 'nl' ? '.i18n-nl' : '.i18n-en';
    var main = document.getElementById('main-content');
    var nodes = main.querySelectorAll('h1, h2, h3, h4, p, summary, li, label');
    var parts = [];
    nodes.forEach(function (node) {
      if (node.closest('#bookModal')) return;
      var target = node.matches(selector) ? node : node.querySelector(selector);
      var text = target ? target.textContent : node.textContent;
      text = text.trim();
      if (text) parts.push(text);
    });
    return parts.join('. ');
  }
  function toggleReadAloud() {
    if (!synth) {
      alert('Voorlezen wordt niet ondersteund in deze browser. / Read-aloud is not supported in this browser.');
      return;
    }
    if (isReading) {
      stopReadAloud();
      return;
    }
    var lang = document.documentElement.getAttribute('data-lang') || 'nl';
    var text = getReadableText();
    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === 'nl' ? 'nl-NL' : 'en-US';
    utter.rate = 0.95;
    utter.onend = stopReadAloud;
    utter.onerror = stopReadAloud;
    synth.cancel();
    synth.speak(utter);
    isReading = true;
    var btn = document.getElementById('readAloudBtn');
    btn.setAttribute('aria-pressed', 'true');
    btn.innerHTML = '<span aria-hidden="true">⏸</span> <span class="i18n-nl">Stop voorlezen</span><span class="i18n-en">Stop reading</span>';
  }
  function stopReadAloud() {
    if (synth) synth.cancel();
    isReading = false;
    var btn = document.getElementById('readAloudBtn');
    if (btn) {
      btn.setAttribute('aria-pressed', 'false');
      btn.innerHTML = '<span aria-hidden="true">🔊</span> <span class="i18n-nl">Lees voor</span><span class="i18n-en">Read aloud</span>';
    }
  }
  (function () {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('navLinks');
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  })();
  var currentBookSlug = '';
  function currentLang() {
    return document.documentElement.getAttribute('data-lang') || 'nl';
  }
  function updateModalTitle() {
    var lang = currentLang();
    var titleObj = BOOK_TITLES[currentBookSlug];
    var titleText = titleObj ? titleObj[lang] : '';
    document.getElementById('modalBookTitle').textContent = LABELS[lang].requestPrefix + titleText;
  }
  function openBookModal(slug) {
    currentBookSlug = slug;
    updateModalTitle();
    document.getElementById('bookModal').classList.add('open');
  }
  function closeBookModal() {
    document.getElementById('bookModal').classList.remove('open');
    document.getElementById('bookForm').reset();
  }
  document.getElementById('bookForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var lang = currentLang();
    var titleObj = BOOK_TITLES[currentBookSlug];
    var titleText = titleObj ? titleObj[lang] : currentBookSlug;
    var naam = document.getElementById('bookName').value;
    var tel = document.getElementById('bookPhone').value;
    var email = document.getElementById('bookEmail').value;
    var L = LABELS[lang];
    var subject = encodeURIComponent(L.subjectPrefix + titleText);
    var body = encodeURIComponent(
      L.bodyBook + titleText + '\n' +
      L.bodyName + naam + '\n' +
      L.bodyPhone + tel + '\n' +
      L.bodyEmail + email
    );
    window.location.href = 'mailto:info@hypotheekmama.nl?subject=' + subject + '&body=' + body;
    closeBookModal();
  });

  /* Klik-acties via data-action (geen inline onclick, nodig voor de CSP) */
  var ACTIONS = {
    toggleLang: toggleLang,
    cycleTextSize: cycleTextSize,
    toggleReadAloud: toggleReadAloud,
    openBookModal: openBookModal,
    closeBookModal: closeBookModal
  };
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el || !ACTIONS.hasOwnProperty(el.getAttribute('data-action'))) return;
    ACTIONS[el.getAttribute('data-action')](el.getAttribute('data-arg') || undefined);
  });
