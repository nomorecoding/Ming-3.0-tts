// Renders window.DEMOS (static/js/examples.js) into one table per section.
(function () {
  function cell(column, value) {
    var td = document.createElement("td");
    if (column.type === "audio") {
      td.className = "audio";
      if (value) {
        var audio = document.createElement("audio");
        audio.controls = true;
        audio.preload = "none";
        audio.src = value;
        td.appendChild(audio);
      }
    } else if (column.type === "code" && value) {
      var code = document.createElement("code");
      code.textContent = value;
      td.appendChild(code);
    } else {
      td.textContent = value || "";
    }
    return td;
  }

  function table(demo) {
    var tableEl = document.createElement("table");
    tableEl.className = "table is-bordered is-fullwidth demo";
    var head = tableEl.createTHead().insertRow();
    demo.columns.forEach(function (column) {
      var th = document.createElement("th");
      th.textContent = column.label;
      head.appendChild(th);
    });
    var body = tableEl.createTBody();
    var rows = demo.rows.length ? demo.rows : [{}];
    rows.forEach(function (row) {
      var tr = body.insertRow();
      demo.columns.forEach(function (column) {
        tr.appendChild(cell(column, row[column.key]));
      });
    });
    return tableEl;
  }

  var root = document.getElementById("demos");
  window.DEMOS.forEach(function (demo) {
    var section = document.createElement("section");
    section.className = "section";
    section.id = demo.id;
    var container = document.createElement("div");
    container.className = "container is-max-desktop";

    var title = document.createElement("h2");
    title.className = "title is-3";
    title.textContent = demo.title;
    container.appendChild(title);

    if (demo.note) {
      var note = document.createElement("p");
      note.className = "demo-note";
      note.textContent = demo.note;
      container.appendChild(note);
    }

    var wrap = document.createElement("div");
    wrap.className = "table-wrap";
    wrap.appendChild(table(demo));
    container.appendChild(wrap);
    section.appendChild(container);
    root.appendChild(section);
  });
})();
