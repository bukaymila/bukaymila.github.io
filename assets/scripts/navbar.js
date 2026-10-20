/* ============================================================
   Cold Box Suite — shared top navigation bar
   Include with:  <script src="navbar.js" defer></script>
   The script injects a <nav class="topnav"> as the first
   child of <body> and marks the current page's link as active.
   ============================================================ */

(function () {
  "use strict";

  // Every tool in the suite. Order matches the launchpad cards.
  var PAGES = [
    { file: "U07B-extract.html",   label: "U07B Extractor"  },
    { file: "csv-edit.html",       label: "CSV Processor"   },
    { file: "csv-aggregator.html", label: "CSV Aggregator"  },
    { file: "line-chart.html",     label: "Line Charts"     },
    { file: "shaded-chart.html",   label: "Shaded Charts"   },
    { file: "stl-viewer.html",     label: "STL Viewer"      },
    { file: "ml-modelling.html",   label: "Model Builder"   }
  ];

  var HELP_FILE = "help.html";
  var HOME_FILE = "index.html";

  // Identify the current page from the URL. Handles both
  // "foo.html" and "/path/to/foo.html" and "foo.html?x=1".
  function currentFile() {
    var parts = window.location.pathname.split("/");
    return parts[parts.length - 1] || HOME_FILE;
  }

  // Build the DOM for the navbar.
  function build() {
    var current = currentFile();
    var isHome = current === HOME_FILE;

    var nav = document.createElement("nav");
    nav.className = "topnav";
    nav.setAttribute("aria-label", "Main navigation");

    // Brand
    var brand = document.createElement("a");
    brand.className = "brand";
    brand.href = HOME_FILE;
    brand.innerHTML = '<span class="brand-dot"></span>Cold Box Suite';
    nav.appendChild(brand);

    // Tool links
    var links = document.createElement("div");
    links.className = "links";
    PAGES.forEach(function (p) {
      var a = document.createElement("a");
      a.href = p.file;
      a.textContent = p.label;
      if (current === p.file) a.classList.add("active");
      links.appendChild(a);
    });
    nav.appendChild(links);

    // Right-hand side: Home (only when not already on home) + Help
    var right = document.createElement("div");
    right.className = "nav-right";

    if (!isHome) {
      var home = document.createElement("a");
      home.href = HOME_FILE;
      home.textContent = "Home";
      right.appendChild(home);
    }

    var help = document.createElement("a");
    help.href = HELP_FILE;
    help.textContent = "Help";
    if (current === HELP_FILE) help.classList.add("active");
    right.appendChild(help);

    nav.appendChild(right);

    // Insert as first child of body
    document.body.insertBefore(nav, document.body.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();