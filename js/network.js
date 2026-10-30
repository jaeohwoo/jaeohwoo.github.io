// Drifting node network behind the hero (and essay headers). Decorative only.
(function () {
  var host = document.querySelector('.hero') || document.querySelector('.essay-header');
  if (!host) return;

  var canvas = document.createElement('canvas');
  canvas.className = 'net-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  host.insertBefore(canvas, host.firstChild);
  var ctx = canvas.getContext('2d');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nodes = [], w = 0, h = 0, dpr = 1, running = true;
  var LINK = 150;

  function resize() {
    var r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.round(Math.min(90, (w * h) / 14000));
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
        warm: Math.random() < 0.08
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      for (var j = i + 1; j < nodes.length; j++) {
        var b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) {
          ctx.strokeStyle = 'rgba(120,190,255,' + (0.16 * (1 - d / LINK)).toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (var k = 0; k < nodes.length; k++) {
      var n = nodes[k];
      ctx.fillStyle = n.warm ? 'rgba(234,162,108,0.85)' : 'rgba(150,205,255,0.7)';
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  function step() {
    if (!running) return;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    draw();
    requestAnimationFrame(step);
  }

  resize();
  window.addEventListener('resize', resize);
  if (reduced) { draw(); return; }

  // Only animate while the hero is on screen.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var vis = entries[0].isIntersecting;
      if (vis && !running) { running = true; requestAnimationFrame(step); }
      else if (!vis) running = false;
    }).observe(host);
  }
  requestAnimationFrame(step);
})();
