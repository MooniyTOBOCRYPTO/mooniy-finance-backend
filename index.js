<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mooniy Finance</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #07070f;
    --surface: #0f0f1a;
    --surface2: #161625;
    --border: #252538;
    --accent: #c8ff00;
    --accent2: #7b61ff;
    --text: #eeeef8;
    --muted: #5a5a7a;
    --green: #00e87a;
    --red: #ff3d5a;
    --gold: #ffc940;
    --blue: #38bdf8;
    --orange: #fb923c;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: var(--bg); color: var(--text); font-family: 'DM Mono', monospace; min-height: 100vh; overflow-x: hidden; }
  body::before {
    content: ''; position: fixed; inset: 0;
    background: radial-gradient(ellipse 60% 40% at 80% 10%, rgba(123,97,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 90%, rgba(200,255,0,0.04) 0%, transparent 50%);
    pointer-events: none; z-index: 0;
  }
  .container { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; padding: 0 24px 60px; }
  header { padding: 28px 0 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
  .logo { display: flex; align-items: center; gap: 12px; }
  .logo-icon { width: 36px; height: 36px; background: var(--accent); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; color: var(--bg); }
  .logo-text { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; }
  .logo-text span { color: var(--accent); }
  .status-badge { display: flex; align-items: center; gap: 8px; padding: 6px 14px; background: var(--surface); border: 1px solid var(--border); border-radius: 20px; font-size: 11px; color: var(--muted); }
  .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); }
  .status-dot.online { background: var(--green); box-shadow: 0 0 6px var(--green); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .nav-tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border); padding: 20px 0 0; overflow-x: auto; }
  .nav-tab { padding: 10px 20px; border-radius: 10px 10px 0 0; font-size: 12px; font-family: 'DM Mono', monospace; cursor: pointer; border: none; background: transparent; color: var(--muted); transition: all 0.15s; white-space: nowrap; border-bottom: 2px solid transparent; margin-bottom: -1px; }
  .nav-tab.active { color: var(--accent); border-bottom-color: var(--accent); background: rgba(200,255,0,0.04); }
  .nav-tab:hover:not(.active) { color: var(--text); }
  .section { display: none; padding: 28px 0; flex-direction: column; gap: 24px; }
  .section.visible { display: flex; }
  #login-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh; text-align: center; }
  .login-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 48px 56px; max-width: 460px; width: 100%; }
  .login-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 8px; }
  .login-title span { color: var(--accent); }
  .login-sub { color: var(--muted); font-size: 13px; line-height: 1.7; margin-bottom: 36px; }
  .btn-ml { display: inline-flex; align-items: center; gap: 10px; background: #ffe600; color: #1a1a1a; border: none; border-radius: 12px; padding: 14px 28px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.2s; text-decoration: none; width: 100%; justify-content: center; }
  .btn-ml:hover { background: #fff000; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,230,0,0.25); }
  .period-bar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
  .section-label { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 1.5px; }
  .period-tabs { display: flex; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 3px; gap: 2px; }
  .period-tab { padding: 6px 16px; border-radius: 7px; font-size: 12px; font-family: 'DM Mono', monospace; cursor: pointer; border: none; background: transparent; color: var(--muted); transition: all 0.15s; }
  .period-tab.active { background: var(--accent); color: var(--bg); font-weight: 500; }
  .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
  .kpi-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px; position: relative; overflow: hidden; transition: border-color 0.2s, transform 0.15s; }
  .kpi-card:hover { border-color: var(--accent2); transform: translateY(-2px); }
  .kpi-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent); opacity: 0; transition: opacity 0.2s; }
  .kpi-card:hover::before { opacity: 1; }
  .kpi-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .kpi-value { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; line-height: 1; margin-bottom: 6px; }
  .kpi-sub { font-size: 11px; color: var(--muted); }
  .kpi-icon { position: absolute; top: 18px; right: 18px; font-size: 18px; opacity: 0.25; }
  .green { color: var(--green); } .red { color: var(--red); } .gold { color: var(--gold); } .blue { color: var(--blue); } .purple { color: var(--accent2); }
  .ads-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
  .ads-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px; }
  .ads-card.highlight { border-color: rgba(200,255,0,0.3); background: rgba(200,255,0,0.03); }
  .meter-bar { height: 6px; background: var(--border); border-radius: 3px; margin-top: 12px; overflow: hidden; }
  .meter-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
  .meter-fill.good { background: var(--green); } .meter-fill.warn { background: var(--gold); } .meter-fill.bad { background: var(--red); }
  .reco-list { display: flex; flex-direction: column; gap: 12px; }
  .reco-item { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 18px 20px; display: flex; gap: 16px; align-items: flex-start; transition: border-color 0.2s; }
  .reco-item:hover { border-color: var(--accent2); }
  .reco-icon { font-size: 20px; flex-shrink: 0; width: 40px; height: 40px; background: var(--surface2); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
  .reco-content { flex: 1; }
  .reco-tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 9px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 6px; }
  .tag-ads { background: rgba(123,97,255,0.15); color: var(--accent2); }
  .tag-listing { background: rgba(200,255,0,0.12); color: var(--accent); }
  .tag-precio { background: rgba(255,201,64,0.15); color: var(--gold); }
  .reco-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; margin-bottom: 4px; }
  .reco-desc { font-size: 12px; color: var(--muted); line-height: 1.6; }
  .reco-impact { font-size: 11px; color: var(--green); margin-top: 8px; }
  .proyeccion-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 28px; }
  .proy-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; margin-bottom: 20px; }
  .proy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
  .proy-escenario { background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 18px; text-align: center; }
  .proy-escenario.destacado { border-color: rgba(200,255,0,0.4); background: rgba(200,255,0,0.04); }
  .proy-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .proy-value { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; margin-bottom: 4px; }
  .proy-sub { font-size: 11px; color: var(--muted); }
  .chart-wrap { position: relative; height: 160px; margin-top: 8px; }
  canvas { width: 100% !important; }
  .titulo-builder { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 28px; }
  .titulo-preview { background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 16px 20px; font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 600; color: var(--text); min-height: 56px; margin-bottom: 8px; line-height: 1.5; }
  .titulo-meta { display: flex; gap: 16px; margin-bottom: 20px; font-size: 11px; }
  .titulo-count { color: var(--muted); } .titulo-count span { color: var(--accent); font-weight: 600; }
  .titulo-score { color: var(--muted); } .titulo-score span { color: var(--green); font-weight: 600; }
  .builder-fields { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 20px; }
  .field-group { display: flex; flex-direction: column; gap: 6px; }
  .field-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }
  .field-select, .field-input { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; color: var(--text); font-family: 'DM Mono', monospace; font-size: 12px; outline: none; transition: border-color 0.15s; width: 100%; }
  .field-select:focus, .field-input:focus { border-color: var(--accent); }
  .field-select option { background: var(--surface2); }
  .keywords-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
  .kw-chip { padding: 5px 12px; background: var(--surface2); border: 1px solid var(--border); border-radius: 20px; font-size: 11px; cursor: pointer; transition: all 0.15s; user-select: none; }
  .kw-chip:hover { border-color: var(--accent); color: var(--accent); }
  .kw-chip.selected { background: rgba(200,255,0,0.1); border-color: var(--accent); color: var(--accent); }
  .btn-copy { display: inline-flex; align-items: center; gap: 8px; background: var(--accent); color: var(--bg); border: none; border-radius: 10px; padding: 12px 24px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.15s; }
  .btn-copy:hover { background: #d4ff00; transform: translateY(-1px); }
  .table-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
  .table-header { padding: 18px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .table-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; }
  table { width: 100%; border-collapse: collapse; }
  th { padding: 10px 20px; text-align: left; font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; background: var(--surface2); border-bottom: 1px solid var(--border); }
  td { padding: 13px 20px; font-size: 12px; border-bottom: 1px solid rgba(42,42,58,0.4); }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,255,255,0.015); }
  .badge { display: inline-block; padding: 3px 9px; border-radius: 20px; font-size: 10px; }
  .badge-green { background: rgba(0,232,122,0.1); color: var(--green); }
  .badge-red { background: rgba(255,61,90,0.1); color: var(--red); }
  .badge-gold { background: rgba(255,201,64,0.1); color: var(--gold); }
  .tax-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .tax-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
  .tax-card-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; margin-bottom: 16px; }
  .tax-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(42,42,58,0.4); font-size: 12px; }
  .tax-row:last-child { border-bottom: none; }
  .tax-row-label { color: var(--muted); }
  .loading { display: flex; align-items: center; justify-content: center; padding: 40px; color: var(--muted); font-size: 13px; gap: 10px; }
  .spinner { width: 16px; height: 16px; border: 2px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .empty { text-align: center; padding: 48px 24px; color: var(--muted); }
  .empty-icon { font-size: 36px; margin-bottom: 12px; }
  .empty-text { font-size: 13px; line-height: 1.6; }
  .toast { position: fixed; bottom: 24px; right: 24px; background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 14px 20px; font-size: 13px; z-index: 1000; transform: translateY(80px); opacity: 0; transition: all 0.3s; max-width: 320px; }
  .toast.show { transform: translateY(0); opacity: 1; }
  .toast.success { border-color: var(--green); }
  .toast.error { border-color: var(--red); }
  @media (max-width: 640px) {
    .login-card { padding: 32px 20px; }
    .kpi-value { font-size: 20px; }
    .proy-grid { grid-template-columns: 1fr; }
    th, td { padding: 10px 14px; }
  }
</style>
</head>
<body>
<div class="container">
  <header>
    <div class="logo">
      <div class="logo-icon">M</div>
      <div class="logo-text">Mooniy <span>Finance</span></div>
    </div>
    <div class="status-badge">
      <div class="status-dot" id="status-dot"></div>
      <span id="status-text">Desconectado</span>
    </div>
  </header>

  <div id="login-screen">
    <div class="login-card">
      <div class="login-title">Mooniy <span>Finance</span></div>
      <p class="login-sub">Tu centro de comando para Mercado Libre. Ventas, ROAS/ACOS/TACOS, proyección 90 días y optimización de títulos en tiempo real.</p>
      <a href="#" class="btn-ml" onclick="conectarML(); return false;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
        Conectar con Mercado Libre
      </a>
    </div>
  </div>

  <div id="main-app" style="display:none">
    <div class="nav-tabs">
      <button class="nav-tab active" onclick="showTab('resumen',this)">📊 Resumen</button>
      <button class="nav-tab" onclick="showTab('ads',this)">🎯 Ads & ROAS</button>
      <button class="nav-tab" onclick="showTab('ventas',this)">🛍 Ventas</button>
      <button class="nav-tab" onclick="showTab('proyeccion',this)">📈 Proyección 90D</button>
      <button class="nav-tab" onclick="showTab('titulos',this)">✏️ Títulos</button>
      <button class="nav-tab" onclick="showTab('fiscal',this)">🧾 Fiscal</button>
    </div>

    <div id="tab-resumen" class="section visible">
      <div class="period-bar">
        <div class="section-label">Vista general</div>
        <div class="period-tabs">
          <button class="period-tab active" onclick="cambiarPeriodo('7',this)">7D</button>
          <button class="period-tab" onclick="cambiarPeriodo('30',this)">30D</button>
          <button class="period-tab" onclick="cambiarPeriodo('90',this)">90D</button>
        </div>
      </div>
      <div class="kpi-grid" id="kpi-grid"><div class="loading"><div class="spinner"></div>Cargando...</div></div>
      <div class="reco-list" id="recos-resumen"></div>
    </div>

    <div id="tab-ads" class="section">
      <div class="period-bar">
        <div class="section-label">Ads & Performance</div>
        <div class="period-tabs">
          <button class="period-tab active" onclick="cambiarPeriodo('7',this)">7D</button>
          <button class="period-tab" onclick="cambiarPeriodo('30',this)">30D</button>
          <button class="period-tab" onclick="cambiarPeriodo('90',this)">90D</button>
        </div>
      </div>
      <div class="ads-grid" id="ads-kpis"><div class="loading"><div class="spinner"></div>Cargando Ads...</div></div>
      <div class="table-card">
        <div class="table-header"><div class="table-title">Campañas activas</div></div>
        <div id="campanas-container"><div class="loading"><div class="spinner"></div>Cargando campañas...</div></div>
      </div>
      <div class="section-label">Recomendaciones para mejorar ROAS</div>
      <div class="reco-list" id="recos-ads"></div>
    </div>

    <div id="tab-ventas" class="section">
      <div class="section-label">Últimas ventas</div>
      <div class="table-card">
        <div class="table-header"><div class="table-title">Órdenes pagadas</div></div>
        <div id="ventas-container"><div class="loading"><div class="spinner"></div>Cargando...</div></div>
      </div>
    </div>

    <div id="tab-proyeccion" class="section">
      <div class="section-label">Proyección 90 días</div>
      <div class="proyeccion-card" id="proy-card"><div class="loading"><div class="spinner"></div>Calculando...</div></div>
      <div class="reco-list" id="recos-proy"></div>
    </div>

    <div id="tab-titulos" class="section">
      <div class="section-label">Constructor de títulos ML</div>
      <div class="titulo-builder">
        <div class="titulo-preview" id="titulo-preview">Pack X5 Remeras Mujer Lisa Modal Soft Básica Manga Corta</div>
        <div class="titulo-meta">
          <div class="titulo-count">Caracteres: <span id="char-count">52</span>/60</div>
          <div class="titulo-score">Score: <span id="titulo-score">87</span>/100</div>
        </div>
        <div class="builder-fields">
          <div class="field-group">
            <div class="field-label">Formato / Pack</div>
            <select class="field-select" id="f-formato" onchange="buildTitulo()">
              <option value="Pack X5">Pack X5</option>
              <option value="Pack X3">Pack X3</option>
              <option value="Pack X2">Pack X2</option>
              <option value="Pack X10">Pack X10</option>
              <option value="">Sin pack</option>
            </select>
          </div>
          <div class="field-group">
            <div class="field-label">Producto</div>
            <select class="field-select" id="f-producto" onchange="buildTitulo()">
              <option value="Remeras Mujer">Remeras Mujer</option>
              <option value="Remera Mujer">Remera Mujer</option>
              <option value="Remeras Hombre">Remeras Hombre</option>
              <option value="Remeras Unisex">Remeras Unisex</option>
            </select>
          </div>
          <div class="field-group">
            <div class="field-label">Material</div>
            <select class="field-select" id="f-material" onchange="buildTitulo()">
              <option value="Modal Soft">Modal Soft</option>
              <option value="100% Algodón">100% Algodón</option>
              <option value="Algodón Peinado">Algodón Peinado</option>
              <option value="Modal Premium">Modal Premium</option>
              <option value="Dry Fit">Dry Fit</option>
            </select>
          </div>
          <div class="field-group">
            <div class="field-label">Estilo</div>
            <select class="field-select" id="f-estilo" onchange="buildTitulo()">
              <option value="Lisa Básica">Lisa Básica</option>
              <option value="Lisa">Lisa</option>
              <option value="Básica">Básica</option>
              <option value="Oversize">Oversize</option>
              <option value="Slim Fit">Slim Fit</option>
            </select>
          </div>
          <div class="field-group">
            <div class="field-label">Manga</div>
            <select class="field-select" id="f-manga" onchange="buildTitulo()">
              <option value="Manga Corta">Manga Corta</option>
              <option value="Manga Larga">Manga Larga</option>
              <option value="Sin Mangas">Sin Mangas</option>
              <option value="">—</option>
            </select>
          </div>
          <div class="field-group">
            <div class="field-label">Extra (opcional)</div>
            <input class="field-input" id="f-extra" placeholder="Ej: Verano Premium" oninput="buildTitulo()">
          </div>
        </div>
        <div class="section-label" style="margin-bottom:12px">Keywords de alto volumen — clic para agregar</div>
        <div class="keywords-grid" id="kw-grid"></div>
        <button class="btn-copy" onclick="copiarTitulo()">📋 Copiar título</button>
      </div>
      <div class="table-card">
        <div class="table-header"><div class="table-title">📚 Reglas de oro para títulos en ML</div></div>
        <div style="padding:20px 24px; display:flex; flex-direction:column; gap:14px;">
          <div class="reco-item"><div class="reco-icon">1️⃣</div><div class="reco-content"><div class="reco-title">Máximo 60 caracteres</div><div class="reco-desc">ML trunca el título en los resultados. Todo lo que pase de 60 chars no existe para el algoritmo ni para el comprador.</div></div></div>
          <div class="reco-item"><div class="reco-icon">2️⃣</div><div class="reco-content"><div class="reco-title">Keyword principal al inicio</div><div class="reco-desc">El algoritmo pondera más las primeras palabras. "Pack X5 Remeras Mujer" gana a "Remeras Básicas Pack de 5 para Mujer".</div></div></div>
          <div class="reco-item"><div class="reco-icon">3️⃣</div><div class="reco-content"><div class="reco-title">Sin artículos ni preposiciones</div><div class="reco-desc">Eliminá "de", "para", "con". "Remeras Mujer Modal" no "Remeras para Mujer de Modal".</div></div></div>
          <div class="reco-item"><div class="reco-icon">4️⃣</div><div class="reco-content"><div class="reco-title">Mantené "Modal Soft" — es tu diferenciador</div><div class="reco-desc">WACKY y Mojo usan "100% Algodón". Modal Soft es tu terreno exclusivo.</div></div></div>
          <div class="reco-item"><div class="reco-icon">5️⃣</div><div class="reco-content"><div class="reco-title">Nunca pongas precio ni marca en el título</div><div class="reco-desc">ML penaliza estos títulos. La marca va en el campo "Marca".</div></div></div>
        </div>
      </div>
    </div>

    <div id="tab-fiscal" class="section">
      <div class="section-label">Resumen fiscal — Responsable Inscripto</div>
      <div class="tax-grid" id="tax-grid"><div class="loading"><div class="spinner"></div>Calculando...</div></div>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
const BACKEND = 'https://mooniy-finance-backend-production.up.railway.app';
const ML_CLIENT_ID = '3008908008934093';
const ML_REDIRECT_URI = 'https://mooniytobocrypto.github.io/mooniy-dashboard';
const ML_AUTH_URL = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${ML_CLIENT_ID}&redirect_uri=${encodeURIComponent(ML_REDIRECT_URI)}`;

let accessToken = localStorage.getItem('ml_token');
let userId = localStorage.getItem('ml_user_id');
let periodo = '7';
let ordenesCache = null;

window.onload = async () => {
  const params = new URLSearchParams(window.location.search);

  // Recibir token desde Railway redirect
  const token = params.get('token');
  const uid = params.get('user_id');
  if (token && uid) {
    accessToken = token;
    userId = uid;
    localStorage.setItem('ml_token', token);
    localStorage.setItem('ml_user_id', uid);
    window.history.replaceState({}, '', window.location.pathname);
    mostrarToast('¡Conectado!', 'success');
    buildTitulo();
    renderKeywords();
    iniciarApp();
    return;
  }

  // Recibir code desde ML (fallback)
  const code = params.get('code');
  if (code) {
    mostrarToast('Conectando...', 'info');
    try {
      const res = await fetch(`${BACKEND}/callback?code=${code}`);
      const data = await res.json();
      if (data.access_token) {
        accessToken = data.access_token;
        userId = data.user_id;
        localStorage.setItem('ml_token', accessToken);
        localStorage.setItem('ml_user_id', userId);
        window.history.replaceState({}, '', window.location.pathname);
        mostrarToast('¡Conectado!', 'success');
        buildTitulo();
        renderKeywords();
        iniciarApp();
      } else {
        mostrarToast('Error al obtener token', 'error');
      }
    } catch(e) {
      mostrarToast('Error de conexión', 'error');
    }
    return;
  }

  // Token guardado
  if (accessToken && userId) {
    buildTitulo();
    renderKeywords();
    iniciarApp();
    return;
  }

  buildTitulo();
  renderKeywords();
};

function conectarML() { window.location.href = ML_AUTH_URL; }

function iniciarApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('main-app').style.display = 'block';
  document.getElementById('status-dot').classList.add('online');
  document.getElementById('status-text').textContent = 'Conectado';
  cargarTodo();
}

function showTab(tab, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('visible');
  btn.classList.add('active');
}

function cambiarPeriodo(p, btn) {
  periodo = p;
  document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  ordenesCache = null;
  cargarTodo();
}

async function cargarTodo() {
  await cargarOrdenes();
  cargarKPIs();
  cargarAds();
  cargarVentas();
  cargarProyeccion();
  cargarFiscal();
}

async function mlFetch(url) {
  const mlPath = url.replace("https://api.mercadolibre.com/", "");
  const proxyUrl = `${BACKEND}/api/${mlPath}`;
  const res = await fetch(proxyUrl, { headers: { "Authorization": `Bearer ${accessToken}` } });
  if (res.status === 401) { localStorage.removeItem('ml_token'); localStorage.removeItem('ml_user_id'); window.location.reload(); }
  return res.json();
}

async function cargarOrdenes() {
  if (ordenesCache) return;
  try {
    const data = await mlFetch(`https://api.mercadolibre.com/orders/search?seller=${userId}&order.date_created.from=${getFechaDesde()}&order.status=paid&limit=50`);
    ordenesCache = data.results || [];
  } catch(e) { ordenesCache = []; }
}

function cargarKPIs() {
  const grid = document.getElementById('kpi-grid');
  const ordenes = ordenesCache || [];
  const totalVentas = ordenes.reduce((s,o) => s + o.total_amount, 0);
  const cantVentas = ordenes.length;
  const comisiones = ordenes.reduce((s,o) => s + (o.payments?.[0]?.marketplace_fee || 0), 0);
  const neto = totalVentas - comisiones;
  const ticket = cantVentas > 0 ? totalVentas / cantVentas : 0;
  const diario = parseInt(periodo) > 0 ? totalVentas / parseInt(periodo) : 0;
  grid.innerHTML = `
    <div class="kpi-card"><div class="kpi-icon">💰</div><div class="kpi-label">Ventas brutas</div><div class="kpi-value green">${formatPeso(totalVentas)}</div><div class="kpi-sub">${cantVentas} órdenes · ${periodo}D</div></div>
    <div class="kpi-card"><div class="kpi-icon">📦</div><div class="kpi-label">Neto (sin ads/imp)</div><div class="kpi-value">${formatPeso(neto)}</div><div class="kpi-sub">Comisión ML: ${formatPeso(comisiones)}</div></div>
    <div class="kpi-card"><div class="kpi-icon">🎯</div><div class="kpi-label">Ticket promedio</div><div class="kpi-value gold">${formatPeso(ticket)}</div><div class="kpi-sub">Por orden</div></div>
    <div class="kpi-card"><div class="kpi-icon">📅</div><div class="kpi-label">Promedio diario</div><div class="kpi-value blue">${formatPeso(diario)}</div><div class="kpi-sub">Últimos ${periodo} días</div></div>
  `;
  document.getElementById('recos-resumen').innerHTML = generarRecos(totalVentas, cantVentas, comisiones, ticket, diario);
}

async function cargarAds() {
  const adsKpis = document.getElementById('ads-kpis');
  const campanas = document.getElementById('campanas-container');
  try {
    const adsData = await mlFetch(`https://api.mercadolibre.com/advertising/advertisers/${userId}/campaigns?status=active`);
    const ordenes = ordenesCache || [];
    const totalVentas = ordenes.reduce((s,o) => s + o.total_amount, 0);
    let gastoAds = 0, ventasAds = 0;
    if (adsData.data?.length) {
      for (const camp of adsData.data.slice(0,5)) {
        try {
          const stats = await mlFetch(`https://api.mercadolibre.com/advertising/advertisers/${userId}/campaigns/${camp.id}/stats?date_from=${getFechaDesdeISO()}&date_to=${new Date().toISOString().split('T')[0]}`);
          gastoAds += stats.results?.[0]?.spend || 0;
          ventasAds += stats.results?.[0]?.revenue || 0;
        } catch(e) {}
      }
    }
    const estimado = gastoAds === 0;
    if (estimado) { gastoAds = totalVentas * 0.08; ventasAds = totalVentas * 0.35; }
    const acos = ventasAds > 0 ? (gastoAds / ventasAds) * 100 : 0;
    const roas = gastoAds > 0 ? ventasAds / gastoAds : 0;
    const tacos = totalVentas > 0 ? (gastoAds / totalVentas) * 100 : 0;
    adsKpis.innerHTML = `
      <div class="ads-card highlight"><div class="kpi-label">ROAS</div><div class="kpi-value ${roas>6?'green':roas>3?'gold':'red'}">${roas.toFixed(1)}x</div><div class="kpi-sub">Por cada $1 en ads → $${roas.toFixed(1)}</div><div class="kpi-sub" style="margin-top:6px">${roas>=5?'✅ Excelente':roas>=3?'⚠️ Mejorable':'🔴 Bajo — revisar listing'}</div></div>
      <div class="ads-card"><div class="kpi-label">ACOS</div><div class="kpi-value ${acos<15?'green':acos<25?'gold':'red'}">${acos.toFixed(1)}%</div><div class="kpi-sub">% ventas ads gastado en ads</div><div class="meter-bar"><div class="meter-fill ${acos<15?'good':acos<25?'warn':'bad'}" style="width:${Math.min(acos/40*100,100)}%"></div></div><div class="kpi-sub" style="margin-top:6px">Objetivo: &lt;15%</div></div>
      <div class="ads-card"><div class="kpi-label">TACOS</div><div class="kpi-value ${tacos<10?'green':tacos<20?'gold':'red'}">${tacos.toFixed(1)}%</div><div class="kpi-sub">% ventas totales en ads</div><div class="meter-bar"><div class="meter-fill ${tacos<10?'good':tacos<20?'warn':'bad'}" style="width:${Math.min(tacos/25*100,100)}%"></div></div><div class="kpi-sub" style="margin-top:6px">Objetivo: &lt;10%</div></div>
      <div class="ads-card"><div class="kpi-label">Gasto en ads</div><div class="kpi-value red">${formatPeso(gastoAds)}</div><div class="kpi-sub">Ventas por ads: ${formatPeso(ventasAds)}</div><div class="kpi-sub" style="margin-top:6px;font-size:10px;color:var(--muted)">${estimado?'* Datos estimados':'✅ Datos reales'}</div></div>
    `;
    if (adsData.data?.length) {
      campanas.innerHTML = `<table><thead><tr><th>Campaña</th><th>Estado</th><th>Tipo</th></tr></thead><tbody>${adsData.data.map(c=>`<tr><td>${c.name||'—'}</td><td><span class="badge badge-green">Activa</span></td><td style="color:var(--muted)">${c.type||'—'}</td></tr>`).join('')}</tbody></table>`;
    } else {
      campanas.innerHTML = `<div class="empty"><div class="empty-icon">📭</div><div class="empty-text">Sin campañas activas.</div></div>`;
    }
    document.getElementById('recos-ads').innerHTML = generarRecosAds(acos, roas, tacos);
  } catch(e) {
    adsKpis.innerHTML = `<div class="empty"><div class="empty-icon">⚠️</div><div class="empty-text">Error al cargar Ads.</div></div>`;
  }
}

function cargarVentas() {
  const container = document.getElementById('ventas-container');
  const ordenes = ordenesCache || [];
  if (!ordenes.length) { container.innerHTML = '<div class="empty"><div class="empty-icon">📭</div><div class="empty-text">Sin ventas en este período.</div></div>'; return; }
  const rows = ordenes.slice(0,30).map(o => {
    const fecha = new Date(o.date_created).toLocaleDateString('es-AR',{day:'2-digit',month:'2-digit'});
    const prod = o.order_items?.[0]?.item?.title || '—';
    const cant = o.order_items?.[0]?.quantity || 1;
    const monto = o.total_amount;
    const fee = o.payments?.[0]?.marketplace_fee || 0;
    return `<tr><td style="color:var(--muted)">${fecha}</td><td>${prod.length>32?prod.substring(0,32)+'…':prod}</td><td>${cant}</td><td class="green">${formatPeso(monto)}</td><td class="red">-${formatPeso(fee)}</td><td>${formatPeso(monto-fee)}</td><td><span class="badge badge-green">Pagado</span></td></tr>`;
  }).join('');
  container.innerHTML = `<table><thead><tr><th>Fecha</th><th>Producto</th><th>Cant</th><th>Bruto</th><th>Comisión</th><th>Neto</th><th>Estado</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function cargarProyeccion() {
  const card = document.getElementById('proy-card');
  const ordenes = ordenesCache || [];
  const totalVentas = ordenes.reduce((s,o) => s + o.total_amount, 0);
  const cantVentas = ordenes.length;
  const dias = parseInt(periodo);
  const diario = dias > 0 ? totalVentas / dias : 0;
  const conservador = diario * 90 * 0.9;
  const base = diario * 90 * 1.15;
  const optimista = diario * 90 * 1.45;
  const unidadesBase = Math.round((dias>0?cantVentas/dias:0)*90*1.15);
  const labels = Array.from({length:13},(_,i)=>`S${i+1}`);
  const dataBase = Array.from({length:13},(_,i)=>Math.round(diario*7*(1+i*0.02)));
  const dataOpt = Array.from({length:13},(_,i)=>Math.round(diario*7*(1+i*0.04)));
  card.innerHTML = `
    <div class="proy-title">📈 Proyección 90 días — basada en últimos ${periodo}D</div>
    <div class="proy-grid">
      <div class="proy-escenario"><div class="proy-label">Conservador</div><div class="proy-value red">${formatPeso(conservador)}</div><div class="proy-sub">Sin cambios</div></div>
      <div class="proy-escenario destacado"><div class="proy-label">Realista ✦</div><div class="proy-value green">${formatPeso(base)}</div><div class="proy-sub">~${unidadesBase} unidades</div></div>
      <div class="proy-escenario"><div class="proy-label">Optimista</div><div class="proy-value gold">${formatPeso(optimista)}</div><div class="proy-sub">Con optimización full</div></div>
    </div>
    <div class="section-label" style="margin-bottom:12px">Tendencia semanal proyectada</div>
    <div class="chart-wrap"><canvas id="proy-chart"></canvas></div>
    <div style="margin-top:16px;font-size:11px;color:var(--muted);line-height:1.8">
      📌 Realista: +15% por mejora de conversión y reviews.<br>
      📌 Optimista: +45% con optimización de ads + títulos + precio.<br>
      📌 Para superar a WACKY y Mojo: TACOS &lt;10% y 50+ reviews.
    </div>
  `;
  setTimeout(() => {
    const ctx = document.getElementById('proy-chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: [
        { label:'Realista', data:dataBase, borderColor:'#c8ff00', backgroundColor:'rgba(200,255,0,0.05)', tension:0.4, fill:true, pointRadius:3 },
        { label:'Optimista', data:dataOpt, borderColor:'#7b61ff', backgroundColor:'rgba(123,97,255,0.05)', tension:0.4, fill:true, pointRadius:3, borderDash:[4,4] }
      ]},
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{labels:{color:'#5a5a7a',font:{family:'DM Mono',size:11}}}}, scales:{x:{ticks:{color:'#5a5a7a',font:{size:10}},grid:{color:'#252538'}},y:{ticks:{color:'#5a5a7a',font:{size:10},callback:v=>'$'+Math.round(v/1000)+'k'},grid:{color:'#252538'}}}}
    });
  }, 100);
  document.getElementById('recos-proy').innerHTML = generarRecosProy();
}

function cargarFiscal() {
  const grid = document.getElementById('tax-grid');
  const ordenes = ordenesCache || [];
  const totalVentas = ordenes.reduce((s,o) => s + o.total_amount, 0);
  const sinIVA = totalVentas / 1.21;
  const debito = sinIVA * 0.21;
  const credito = debito * 0.4;
  const saldoIVA = debito - credito;
  const iibb = totalVentas * 0.03;
  const comisiones = ordenes.reduce((s,o) => s + (o.payments?.[0]?.marketplace_fee||0), 0);
  const gananciaEst = (totalVentas - comisiones) * 0.3 * 0.25;
  const totalCarga = saldoIVA + iibb + gananciaEst;
  grid.innerHTML = `
    <div class="tax-card"><div class="tax-card-title">🧾 IVA — Responsable Inscripto</div>
      <div class="tax-row"><span class="tax-row-label">Ventas sin IVA</span><span>${formatPeso(sinIVA)}</span></div>
      <div class="tax-row"><span class="tax-row-label">Débito fiscal (21%)</span><span class="red">${formatPeso(debito)}</span></div>
      <div class="tax-row"><span class="tax-row-label">Crédito fiscal est.</span><span class="green">-${formatPeso(credito)}</span></div>
      <div class="tax-row"><span class="tax-row-label" style="font-weight:600">Saldo IVA</span><span style="color:var(--gold);font-family:'Syne',sans-serif;font-weight:700">${formatPeso(saldoIVA)}</span></div>
    </div>
    <div class="tax-card"><div class="tax-card-title">📊 Otros impuestos</div>
      <div class="tax-row"><span class="tax-row-label">IIBB CABA (3%)</span><span class="red">${formatPeso(iibb)}</span></div>
      <div class="tax-row"><span class="tax-row-label">Ganancias est.</span><span class="red">${formatPeso(gananciaEst)}</span></div>
      <div class="tax-row"><span class="tax-row-label">Comisión ML</span><span class="red">${formatPeso(comisiones)}</span></div>
      <div class="tax-row"><span class="tax-row-label" style="font-weight:600">Total carga fiscal</span><span style="color:var(--gold);font-family:'Syne',sans-serif;font-weight:700">${formatPeso(totalCarga)}</span></div>
    </div>
    <div class="tax-card"><div class="tax-card-title">💵 Neto real estimado</div>
      <div class="tax-row"><span class="tax-row-label">Ventas brutas</span><span class="green">${formatPeso(totalVentas)}</span></div>
      <div class="tax-row"><span class="tax-row-label">Comisión ML</span><span class="red">-${formatPeso(comisiones)}</span></div>
      <div class="tax-row"><span class="tax-row-label">Carga fiscal</span><span class="red">-${formatPeso(totalCarga)}</span></div>
      <div class="tax-row"><span class="tax-row-label" style="font-weight:600">Neto real</span><span style="color:var(--green);font-family:'Syne',sans-serif;font-weight:700">${formatPeso(totalVentas-comisiones-totalCarga)}</span></div>
    </div>
  `;
}

const KEYWORDS_ML = ['Remeras Mujer','Remera Básica','Pack Remeras','Modal Soft','Manga Corta','Ropa Mujer','Remera Lisa','Casual','Algodón','Básica','Verano','Outfit','Talle Especial','Colores','Premium','Cómoda','Suave','Diaria'];
let kwSeleccionadas = new Set();

function renderKeywords() {
  document.getElementById('kw-grid').innerHTML = KEYWORDS_ML.map(kw =>
    `<div class="kw-chip ${kwSeleccionadas.has(kw)?'selected':''}" onclick="toggleKW('${kw}')">${kw}</div>`
  ).join('');
}

function toggleKW(kw) {
  if (kwSeleccionadas.has(kw)) kwSeleccionadas.delete(kw); else kwSeleccionadas.add(kw);
  renderKeywords(); buildTitulo();
}

function buildTitulo() {
  const partes = [
    document.getElementById('f-formato')?.value,
    document.getElementById('f-producto')?.value,
    document.getElementById('f-estilo')?.value,
    document.getElementById('f-material')?.value,
    document.getElementById('f-manga')?.value,
    document.getElementById('f-extra')?.value
  ].filter(Boolean);
  let titulo = partes.join(' ').trim().substring(0, 60);
  document.getElementById('titulo-preview').textContent = titulo;
  const len = titulo.length;
  const countEl = document.getElementById('char-count');
  countEl.textContent = len;
  countEl.style.color = len > 55 ? 'var(--red)' : len > 45 ? 'var(--gold)' : 'var(--accent)';
  let score = 60;
  if (len >= 45) score += 15;
  if (len <= 60) score += 5;
  if (document.getElementById('f-formato')?.value) score += 5;
  if (document.getElementById('f-material')?.value?.includes('Modal')) score += 10;
  if (document.getElementById('f-estilo')?.value) score += 5;
  document.getElementById('titulo-score').textContent = Math.min(score, 100);
}

function copiarTitulo() {
  navigator.clipboard.writeText(document.getElementById('titulo-preview').textContent).then(() => mostrarToast('¡Título copiado!', 'success'));
}

function generarRecos(ventas, cant, comisiones, ticket, diario) {
  const items = [];
  if (ticket < 5000) items.push({icon:'💡',tag:'tag-precio',label:'Precio',title:'Aumentá el ticket con packs más grandes',desc:`Ticket: ${formatPeso(ticket)}. Un Pack X10 puede llevarlo a $8.000-$10.000.`,impact:'Potencial +30% en ingresos'});
  if (cant < 5) items.push({icon:'📸',tag:'tag-listing',label:'Listing',title:'Optimizá las fotos',desc:'Menos de 5 ventas = problema de conversión. Foto 1: pack completo. Foto 2: tela de cerca.',impact:'+20-40% en tasa de conversión'});
  items.push({icon:'⭐',tag:'tag-listing',label:'Reviews',title:'Reviews: tu activo más valioso contra WACKY y Mojo',desc:'Insert en el paquete + mensaje post-entrega = review en 72hs.',impact:'+15% CTR con cada 10 reviews'});
  return items.map(r=>`<div class="reco-item"><div class="reco-icon">${r.icon}</div><div class="reco-content"><div class="reco-tag ${r.tag}">${r.label}</div><div class="reco-title">${r.title}</div><div class="reco-desc">${r.desc}</div><div class="reco-impact">↑ ${r.impact}</div></div></div>`).join('');
}

function generarRecosAds(acos, roas, tacos) {
  const items = [];
  if (acos > 20) items.push({icon:'✂️',tag:'tag-ads',label:'Ads',title:'ACOS alto: pausá keywords que no convierten',desc:`ACOS ${acos.toFixed(1)}%: pausá las que tienen clics pero cero conversiones.`,impact:'Bajar ACOS a <15%'});
  if (roas < 4) items.push({icon:'🎯',tag:'tag-ads',label:'Ads',title:'ROAS bajo: mejorá el listing antes de escalar',desc:'No escales presupuesto hasta optimizar la publicación.',impact:'Objetivo: ROAS 5x'});
  if (tacos > 12) items.push({icon:'📉',tag:'tag-ads',label:'Ads',title:'TACOS elevado: más ventas orgánicas',desc:`TACOS ${tacos.toFixed(1)}%: ads → reviews → ranking orgánico → reducir ads.`,impact:'Objetivo: TACOS <10%'});
  items.push({icon:'🕐',tag:'tag-ads',label:'Ads',title:'Programá ads en horarios pico',desc:'Picos en ML Argentina: 21-23hs y 12-14hs.',impact:'+15-25% en eficiencia'});
  return items.map(r=>`<div class="reco-item"><div class="reco-icon">${r.icon}</div><div class="reco-content"><div class="reco-tag ${r.tag}">${r.label}</div><div class="reco-title">${r.title}</div><div class="reco-desc">${r.desc}</div><div class="reco-impact">↑ ${r.impact}</div></div></div>`).join('');
}

function generarRecosProy() {
  return `
    <div class="reco-item"><div class="reco-icon">🚀</div><div class="reco-content"><div class="reco-tag tag-listing">Fase 1 · 0-30D</div><div class="reco-title">Conversión — arreglá el listing</div><div class="reco-desc">Optimizá título, completá las 10 fotos, diferenciá con Modal Soft.</div><div class="reco-impact">↑ Meta: duplicar tasa de conversión</div></div></div>
    <div class="reco-item"><div class="reco-icon">⭐</div><div class="reco-content"><div class="reco-tag tag-listing">Fase 2 · 30-60D</div><div class="reco-title">Reviews — acumulá reputación</div><div class="reco-desc">Objetivo: 50 reviews con 4.8+. Esto es lo que WACKY y Mojo tienen.</div><div class="reco-impact">↑ Meta: 50 reviews → +30% CTR orgánico</div></div></div>
    <div class="reco-item"><div class="reco-icon">📈</div><div class="reco-content"><div class="reco-tag tag-ads">Fase 3 · 60-90D</div><div class="reco-title">Escala — subí ads con TACOS controlado</div><div class="reco-desc">Con listing y reviews, escalás ads y superás a WACKY y Mojo.</div><div class="reco-impact">↑ Meta: superar a WACKY y Mojo en ventas diarias</div></div></div>
  `;
}

function getFechaDesde() {
  const d = new Date(); d.setDate(d.getDate() - parseInt(periodo));
  return d.toISOString().split('T')[0] + 'T00:00:00.000-03:00';
}

function getFechaDesdeISO() {
  const d = new Date(); d.setDate(d.getDate() - parseInt(periodo));
  return d.toISOString().split('T')[0];
}

function formatPeso(n) { return '$' + Math.round(n||0).toLocaleString('es-AR'); }

function mostrarToast(msg, tipo='info') {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = `toast ${tipo} show`;
  setTimeout(() => t.classList.remove('show'), 3500);
}
</script>
</body>
</html>
