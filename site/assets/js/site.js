/* Shared page behaviour: header, footer, icons, shared components, enquiry form. */
(function () {
  "use strict";

  var S = window.SITE;
  var page = document.body.getAttribute("data-page") || "";
  var params = new URLSearchParams(location.search);

  /* ---------- helpers ---------- */

  function isPlaceholder(v) {
    return typeof v === "string" && /\[[^\]]+\]/.test(v);
  }

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Escape text and wrap any [PLACEHOLDER] in a highlight.
  function txt(v) {
    return esc(v).replace(/\[[^\]]+\]/g, function (m) {
      return S.showPlaceholders ? '<mark class="ph">' + m + "</mark>" : m;
    });
  }

  function icon(name, cls) {
    return '<svg class="icon ' + (cls || "") + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>';
  }

  function telHref() {
    return isPlaceholder(S.phone) ? "contact.html" : "tel:" + S.phone.replace(/[^\d+]/g, "");
  }

  function mailHref() {
    return isPlaceholder(S.email) ? "contact.html" : "mailto:" + S.email;
  }

  /* ---------- icon sprite (line icons that echo the house-on-hand logo) ---------- */

  var hand =
    '<path d="M2 18.6 7.6 15.9a3 3 0 0 1 1.4-.4h5.5a1.5 1.5 0 0 1 0 3H11"/>' +
    '<path d="M15.6 17.3l4.2-2.5a1.4 1.4 0 0 1 1.7 2.2l-6.1 4.5a2 2 0 0 1-1.2.4H9.6c-2.3 0-4.3.7-5.6 1.9"/>';

  var icons = {
    "heart-hand": hand + '<path d="M12 12.6s-4.4-2.8-4.4-5.6a2.2 2.2 0 0 1 4.4-.9 2.2 2.2 0 0 1 4.4.9c0 2.8-4.4 5.6-4.4 5.6z"/>',
    "house-hand": hand + '<path d="M7 8.2 12 3.6l5 4.6"/><path d="M8.6 7v6h6.8V7"/><path d="M11 13v-2.8h2V13"/>',
    "bag-hand": hand + '<path d="M8 6.6h8l-.8 6.4H8.8z"/><path d="M10 6.6v-.8a2 2 0 0 1 4 0v.8"/>',
    "tablet-hand": hand + '<rect x="8.6" y="2.4" width="6.8" height="10.6" rx="1.2"/><path d="M11.3 11h1.4"/>',
    "people": '<circle cx="8.5" cy="8" r="3"/><path d="M3 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="16.5" cy="9" r="2.5"/><path d="M15.3 14.6c.4-.1.8-.1 1.2-.1 2.3 0 4 1.5 4.5 4.3"/>',
    "pin": '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    "list-check": '<path d="M4 6.5l1.6 1.6L8.6 5"/><path d="M4 12.5l1.6 1.6 3-3.1"/><path d="M4 18.5l1.6 1.6 3-3.1"/><path d="M11.5 7h8.5M11.5 13h8.5M11.5 19h8.5"/>',
    "phone": '<path d="M6.6 3.5h2.6l1.4 4-2 1.3a11.5 11.5 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/>',
    "mail": '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    "clock": '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    "check": '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    "cross": '<path d="M7 7l10 10M17 7 7 17"/>',
    "menu": '<path d="M4 7h16M4 12h16M4 17h16"/>',
    "close": '<path d="M6 6l12 12M18 6 6 18"/>',
    "arrow": '<path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5"/>',
    "alert": '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5.5M12 16.2v.3"/>'
  };

  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">';
  Object.keys(icons).forEach(function (k) {
    sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + icons[k] + "</symbol>";
  });
  sprite += "</svg>";
  document.body.insertAdjacentHTML("afterbegin", sprite);

  /* ---------- header ---------- */

  // Every page goes in the footer; only `main` pages go in the header.
  var pages = [
    { href: "services.html", label: "Services", id: "services", main: true },
    { href: "how-it-works.html", label: "How it works", id: "how", main: true },
    { href: "for-families.html", label: "For families", id: "families", main: true },
    { href: "about.html", label: "About us", id: "about" },
    { href: "trust-and-safety.html", label: "Trust and safety", id: "trust", hidden: !S.trust.enabled },
    { href: "faq.html", label: "Questions", id: "faq" },
    { href: "contact.html", label: "Contact", id: "contact" }
  ].filter(function (n) { return !n.hidden; });

  function navLinks(mainOnly) {
    return pages.filter(function (n) { return !mainOnly || n.main; }).map(function (n) {
      return '<li><a href="' + n.href + '"' + (n.id === page ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
    }).join("");
  }

  var brand =
    '<a class="brand" href="index.html">' +
    '<img class="brand__mark" src="assets/img/logo-mark.svg" alt="" width="44" height="42">' +
    '<span class="brand__name">' + esc(S.name) + "</span></a>";

  var header = document.querySelector("[data-site-header]");
  if (header) {
    header.innerHTML =
      '<div class="wrap header__inner">' + brand +
      '<nav class="nav" id="site-nav" aria-label="Main">' +
      '<ul class="nav__list">' + navLinks(true) + "</ul>" +
      '<a class="btn btn--primary nav__cta" href="contact.html">Request a free visit</a>' +
      "</nav>" +
      '<a class="btn btn--call" href="' + telHref() + '">' + icon("phone") +
      '<span class="btn--call__num">' + txt(S.phone) + "</span>" +
      '<span class="btn--call__short">Call</span></a>' +
      '<a class="btn btn--primary header__cta" href="contact.html">Request a free visit</a>' +
      '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">' +
      icon("menu", "menu-toggle__open") + icon("close", "menu-toggle__close") + "<span>Menu</span></button>" +
      "</div>";

    var toggle = header.querySelector(".menu-toggle");
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      header.classList.toggle("is-open", open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) {
        toggle.click();
        toggle.focus();
      }
    });
  }

  /* ---------- shared components ---------- */

  function dontDoList(items) {
    return '<ul class="dont-list">' + items.map(function (t) {
      return "<li>" + icon("cross") + "<span>" + esc(t) + "</span></li>";
    }).join("") + "</ul>";
  }

  var components = {
    // Full "what we don't do" card (Services page).
    "dont-do": function () {
      return '<div class="dont-card">' + dontDoList(S.dontDo) +
        '<p class="dont-card__note">We never hold bank cards, PINs or passwords. If you need one of these things, we\'ll point you to someone who can help.</p></div>';
    },

    // ID-badge styled card: what we do and don't do, at a glance.
    "badge": function () {
      return '<div class="badge" role="group" aria-label="What we do and don\'t do">' +
        '<div class="badge__clip" aria-hidden="true"></div>' +
        '<div class="badge__head"><img src="assets/img/logo-mark.svg" alt="" width="40" height="38"><span>' + esc(S.name) + "</span></div>" +
        '<p class="badge__title">We help with</p>' +
        '<ul class="do-list">' + S.serviceGroups.map(function (g) {
          return "<li>" + icon("check") + "<span>" + esc(g.title) + "</span></li>";
        }).join("") + "</ul>" +
        '<p class="badge__title">We don\'t do</p>' + dontDoList(S.dontDoShort) +
        "</div>";
    },

    // Four service groups as a strip (home page).
    "services-strip": function () {
      return '<ul class="groups">' + S.serviceGroups.map(function (g) {
        return '<li class="group">' + icon(g.icon, "group__icon") +
          '<h3><a href="services.html#' + g.id + '">' + esc(g.title) + "</a></h3><p>" + esc(g.summary) + "</p>" +
          '<ul class="group__list">' + g.services.map(function (s) { return "<li>" + esc(s.name) + "</li>"; }).join("") + "</ul></li>";
      }).join("") + "</ul>";
    },

    // Every service, grouped (Services page).
    "services-full": function () {
      return S.serviceGroups.map(function (g) {
        return '<section class="service-group" id="' + g.id + '" aria-labelledby="' + g.id + '-h">' +
          '<div class="service-group__head">' + icon(g.icon, "service-group__icon") +
          '<div><h2 id="' + g.id + '-h">' + esc(g.title) + "</h2><p>" + esc(g.summary) + "</p></div></div>" +
          '<ul class="services">' + g.services.map(function (s) {
            var t = esc(s.text);
            if (s.strong) t = t.replace(esc(s.strong), "<strong>" + esc(s.strong) + "</strong>");
            var flag = s.confirm && S.showPlaceholders ? ' <mark class="ph">[confirm]</mark>' : "";
            return '<li class="service">' + icon("check", "service__tick") + "<div><h3>" + esc(s.name) + flag + "</h3><p>" + t + "</p></div></li>";
          }).join("") + "</ul></section>";
      }).join("");
    },

    // Trust & safety items: only confirmed ones, unless previewing.
    "trust": function () {
      var preview = params.get("preview") === "trust";
      var items = S.trust.items.filter(function (i) { return preview || i.confirmed; });
      return '<ul class="trust-list">' + items.map(function (i) {
        var status = preview && !i.confirmed ? ' <mark class="ph">[not yet confirmed: hidden on the live site]</mark>' : "";
        return '<li class="trust-item">' + icon("check", "trust-item__icon") + "<div><h3>" + esc(i.title) + status + "</h3><p>" + txt(i.text) + "</p></div></li>";
      }).join("") + "</ul>";
    }
  };

  document.querySelectorAll("[data-component]").forEach(function (el) {
    var fn = components[el.getAttribute("data-component")];
    if (fn) el.innerHTML = fn();
  });

  /* ---------- footer ---------- */

  var footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML =
      '<div class="wrap footer__grid">' +
      '<div class="footer__about">' + brand + "<p>" + esc(S.tagline) + "</p>" +
      '<ul class="footer__contact">' +
      '<li>' + icon("phone") + '<a href="' + telHref() + '">' + txt(S.phone) + "</a></li>" +
      '<li>' + icon("mail") + '<a href="' + mailHref() + '">' + txt(S.email) + "</a></li>" +
      '<li>' + icon("pin") + "<span>" + txt(S.area) + "</span></li>" +
      '<li>' + icon("clock") + "<span>" + txt(S.hours) + "</span></li>" +
      "</ul></div>" +
      '<nav class="footer__links" aria-label="Footer"><h2>Pages</h2><ul>' +
      '<li><a href="index.html">Home</a></li>' + navLinks() + "</ul></nav>" +
      '<div class="footer__dont"><h2>What we don\'t do</h2>' + dontDoList(S.dontDoShort) +
      '<p><a href="services.html#dont-do">Why, and who can help instead</a></p></div>' +
      "</div>" +
      '<div class="wrap footer__base"><p>&copy; ' + new Date().getFullYear() + " " + esc(S.name) + ". Practical help only: we are not a care, medical or emergency service. In an emergency, call 999.</p>" +
      '<ul><li><a href="privacy.html">Privacy</a></li><li><a href="terms.html">Terms</a></li></ul></div>';
  }

  /* ---------- config values in page copy ---------- */

  document.querySelectorAll("[data-site]").forEach(function (el) {
    var v = S[el.getAttribute("data-site")];
    if (v != null) el.innerHTML = txt(v);
  });
  document.querySelectorAll("[data-tel]").forEach(function (el) {
    el.setAttribute("href", telHref());
  });
  document.querySelectorAll("[data-mail]").forEach(function (el) {
    el.setAttribute("href", mailHref());
  });

  // Page title: "<data-title> | <business name>"
  var t = document.documentElement.getAttribute("data-title");
  if (t) document.title = t + " | " + S.name;

  // Placeholders already in the HTML copy
  if (!S.showPlaceholders) {
    document.querySelectorAll("mark.ph").forEach(function (m) { m.classList.add("ph--off"); });
  } else {
    var n = document.querySelectorAll("mark.ph").length;
    if (n) console.warn(n + " placeholder(s) on this page still need filling in. See TODO.md.");
  }

  /* ---------- structured data (LocalBusiness) ---------- */

  var ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: S.name,
    description: S.tagline,
    areaServed: S.area,
    address: { "@type": "PostalAddress", addressLocality: S.locality, addressRegion: S.region, addressCountry: "GB" }
  };
  if (!isPlaceholder(S.url)) { ld.url = S.url; ld.logo = S.url + "/assets/img/logo-mark.svg"; }
  if (!isPlaceholder(S.phone)) ld.telephone = S.phone;
  if (!isPlaceholder(S.email)) ld.email = S.email;
  var script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(ld);
  document.head.appendChild(script);

  /* ---------- enquiry form ---------- */

  var form = document.querySelector("[data-enquiry]");
  if (form) initForm(form);

  function initForm(form) {
    var summary = form.querySelector(".error-summary");
    var status = document.querySelector(".form-status");

    var hubspot = S.form.provider === "hubspot";

    // Task choices come from the shared task list (mirrors the HubSpot form)
    var choices = form.querySelector("[data-task-choices]");
    if (choices) {
      choices.innerHTML = S.enquiryTasks.map(function (g, gi) {
        return '<fieldset class="task-group"><legend>' + esc(g.title) + "</legend>" +
          g.options.map(function (o, oi) {
            return '<label class="check"><input type="checkbox" id="t-' + gi + "-" + oi + '" name="task:' + g.field + '" value="' + esc(o) + '"><span>' + esc(o) + "</span></label>";
          }).join("") + "</fieldset>";
      }).join("");
    }

    if (S.form.provider === "netlify") {
      form.setAttribute("data-netlify", "true");
      form.setAttribute("netlify-honeypot", "website");
    }

    // HubSpot needs an email address; otherwise a phone number will do
    if (hubspot) {
      form.querySelector("#f-phone-hint").textContent = "So we can call you back.";
      form.querySelector("#f-email-hint").textContent = "We need this to reply. No email address? Call us instead.";
    }

    var rules = [
      { name: "firstname", test: function (v) { return v.trim() !== ""; }, msg: "Enter your first name" },
      { name: "lastname", test: function (v) { return v.trim() !== ""; }, msg: "Enter your last name" },
      { name: "phone", test: function (v, f) { return hubspot || v.trim() !== "" || f.email.value.trim() !== ""; }, msg: "Enter a phone number or an email address, so we can reply" },
      { name: "email", test: function (v) { return (!hubspot && v.trim() === "") || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, msg: "Enter an email address like name@example.co.uk" },
      { name: "for", test: function (v, f) { return !!f.querySelector('input[name="for"]:checked'); }, msg: "Choose who the help is for" },
      { name: "area", test: function (v) { return v.trim() !== ""; }, msg: "Enter your postcode or area" },
      { name: "consent", test: function (v, f) { return f.consent.checked; }, msg: "Tick the box to agree to us using your details to reply" }
    ];

    function fieldWrap(name) {
      return form.querySelector('[data-field="' + name + '"]');
    }

    function setError(name, msg) {
      var wrap = fieldWrap(name);
      var err = wrap.querySelector(".field__error");
      var inputs = wrap.querySelectorAll("input, select, textarea");
      if (msg) {
        wrap.classList.add("has-error");
        err.innerHTML = icon("alert") + "<span>" + esc(msg) + "</span>";
        inputs.forEach(function (i) { i.setAttribute("aria-invalid", "true"); });
      } else {
        wrap.classList.remove("has-error");
        err.innerHTML = "";
        inputs.forEach(function (i) { i.removeAttribute("aria-invalid"); });
      }
    }

    function validate() {
      var errors = [];
      rules.forEach(function (r) {
        var el = form.elements[r.name];
        var v = el && typeof el.value === "string" ? el.value : "";
        var ok = r.test(v, form);
        setError(r.name, ok ? "" : r.msg);
        if (!ok) errors.push(r);
      });
      return errors;
    }

    // Re-check a field once it has been flagged, so errors clear as people fix them
    form.addEventListener("change", function (e) {
      var wrap = e.target.closest("[data-field]");
      if (wrap && wrap.classList.contains("has-error")) validate();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var errors = validate();
      if (errors.length) {
        summary.hidden = false;
        summary.querySelector("ul").innerHTML = errors.map(function (r) {
          var first = fieldWrap(r.name).querySelector("input, select, textarea");
          return '<li><a href="#' + first.id + '">' + esc(r.msg) + "</a></li>";
        }).join("");
        summary.focus();
        return;
      }
      summary.hidden = true;
      if (form.website.value) return; // spam honeypot

      var data = new FormData(form);
      var name = (data.get("firstname") + " " + data.get("lastname")).trim();
      var tasks = S.enquiryTasks.map(function (g) {
        var picked = data.getAll("task:" + g.field);
        return picked.length ? g.title + ": " + picked.join(", ") : "";
      }).filter(Boolean);

      if (S.form.provider === "mailto" || (S.form.provider === "formspree" && !S.form.endpoint)) {
        var body = [
          "Name: " + name,
          "Phone: " + data.get("phone"),
          "Email: " + data.get("email"),
          "Help is for: " + data.get("for"),
          "Help with: " + (tasks.length ? "\n  " + tasks.join("\n  ") : "Not given"),
          "Postcode or area: " + data.get("area"),
          "Best time to contact: " + data.get("time"),
          "",
          data.get("message")
        ].join("\n");
        if (isPlaceholder(S.email)) {
          showStatus("error", "This form isn't connected yet: the business email address hasn't been set. Please call us instead.");
          return;
        }
        location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Request a visit: " + name) + "&body=" + encodeURIComponent(body);
        showStatus("ok", "Your email app should now open with your message ready. Press send in your email app to finish.");
        return;
      }

      var btn = form.querySelector("[type=submit]");
      btn.disabled = true;
      btn.textContent = "Sending…";

      var req;
      if (hubspot) {
        req = fetch(hubspotUrl(), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(hubspotPayload(data)) });
      } else if (S.form.provider === "netlify") {
        req = fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data).toString() });
      } else {
        req = fetch(S.form.endpoint, { method: "POST", headers: { Accept: "application/json" }, body: data });
      }

      req.then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        form.hidden = true;
        showStatus("ok", "Thank you. Your request has been sent and we'll be in touch " + (isPlaceholder(S.replyTime) ? "soon" : S.replyTime) + ".");
      }).catch(function () {
        showStatus("error", "Your request didn't send. Please try again, or call us on " + S.phone + (isPlaceholder(S.email) ? "" : " or email " + S.email) + ".");
      }).then(function () {
        btn.disabled = false;
        btn.textContent = "Send my request";
      });
    });

    function hubspotUrl() {
      var h = S.form.hubspot;
      var host = h.region && h.region !== "na1" ? "api-" + h.region + ".hsforms.com" : "api.hsforms.com";
      return "https://" + host + "/submissions/v3/integration/submit/" + h.portalId + "/" + h.formId;
    }

    // Field names match the HubSpot form. The HubSpot form has no postcode or
    // contact-time fields, so those go at the end of the message.
    function hubspotPayload(data) {
      var fields = [
        ["firstname", data.get("firstname")],
        ["lastname", data.get("lastname")],
        ["email", data.get("email")],
        ["phone", data.get("phone")],
        ["i_would_like_help_for", data.get("for")]
      ];
      S.enquiryTasks.forEach(function (g) {
        var map = S.form.hubspot.optionValues || {};
        var picked = data.getAll("task:" + g.field).map(function (v) { return map[v] || v; });
        if (picked.length) fields.push([g.field, picked.join(";")]);
      });
      var message = [data.get("message"), "Postcode or area: " + data.get("area"), "Best time to contact: " + data.get("time")]
        .filter(function (l) { return l && l.trim(); }).join("\n\n");
      fields.push(["message", message]);
      return {
        fields: fields.filter(function (f) { return f[1]; }).map(function (f) {
          return { objectTypeId: "0-1", name: f[0], value: f[1] };
        }),
        context: { pageUri: location.href, pageName: document.title }
      };
    }

    function showStatus(kind, msg) {
      status.hidden = false;
      status.className = "form-status form-status--" + kind;
      status.innerHTML = icon(kind === "ok" ? "check" : "alert") + "<p>" + esc(msg) + "</p>";
      status.focus();
    }
  }
})();
