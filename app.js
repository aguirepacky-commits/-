/* SECTION: app-core */
(function () {
  'use strict';
  var LS_DATA = 'wzry-board-data';
  var LS_PASS = 'wzry-admin-pass';
  var SS_OK = 'wzry-admin-ok';
  var PALETTE = ['#f5c542','#4fc3f7','#81c784','#ba68c8','#ff8a65','#e57373','#4db6ac','#9575cd','#a1887f','#64b5f6','#f06292','#aed581','#ffb74d','#4dd0e1','#dce775'];

  var state = { data: null, view: 'overview', sortKey: 'avg', sortDesc: true, trendOn: {}, filterDate: '', filterPlayer: '', adminOk: false, editingMatchId: null };

  /* ---------- 存储 ---------- */
  function loadData() {
    try {
      var raw = localStorage.getItem(LS_DATA);
      if (raw) { var p = JSON.parse(raw); if (p && p.players && p.matches) return p; }
    } catch (e) {}
    return JSON.parse(JSON.stringify(window.WZRY_DATA));
  }
  function hasLocalCopy() {
    try { return !!localStorage.getItem(LS_DATA); } catch (e) { return false; }
  }
  function saveData() {
    try { localStorage.setItem(LS_DATA, JSON.stringify(state.data)); } catch (e) { toast('本地保存失败：' + e.message); }
  }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(msg) { var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2600); }
  function modal(html) { $('modal').innerHTML = html; $('modal-mask').classList.add('show'); }
  function closeModal() { $('modal-mask').classList.remove('show'); }

  /* ---------- 玩家与统计 ---------- */
  function playerById(id) { for (var i = 0; i < state.data.players.length; i++) if (state.data.players[i].id === id) return state.data.players[i]; return null; }
  function findPlayerByName(name) {
    name = String(name).trim();
    var ps = state.data.players;
    for (var i = 0; i < ps.length; i++) {
      if (ps[i].name === name) return ps[i];
      if (ps[i].aliases && ps[i].aliases.indexOf(name) >= 0) return ps[i];
    }
    return null;
  }
  function addPlayer(name) {
    var p = { id: 'p' + Date.now().toString(36) + Math.floor(Math.random() * 900 + 100), name: name, aliases: [], color: PALETTE[state.data.players.length % PALETTE.length] };
    state.data.players.push(p); return p;
  }
  function stats() {
    var map = {};
    state.data.players.forEach(function (p) { map[p.id] = { id: p.id, games: 0, wins: 0, scores: [], mvps: 0, best: 0, heroes: {}, k: 0, d: 0, a: 0 }; });
    state.data.matches.forEach(function (m) {
      m.records.forEach(function (r) {
        var s = map[r.player]; if (!s) return;
        s.games++; if (r.win) s.wins++;
        s.scores.push({ date: m.date, seq: m.seq, score: r.score, hero: r.hero, mvp: r.mvp, k: r.k, d: r.d, a: r.a, matchId: m.id, win: r.win });
        if (r.mvp) s.mvps++;
        if (r.score > s.best) s.best = r.score;
        s.k += r.k; s.d += r.d; s.a += r.a;
        var h = s.heroes[r.hero] || (s.heroes[r.hero] = { n: 0, sum: 0, wins: 0 });
        h.n++; h.sum += r.score; if (r.win) h.wins++;
      });
    });
    Object.keys(map).forEach(function (id) {
      var s = map[id];
      s.avg = s.games ? +(s.scores.reduce(function (x, y) { return x + y.score; }, 0) / s.games).toFixed(2) : 0;
      s.winrate = s.games ? Math.round(s.wins / s.games * 100) : 0;
    });
    return map;
  }
  function dailyStats() {
    var days = {};
    state.data.matches.forEach(function (m) {
      var d = days[m.date] || (days[m.date] = { date: m.date, matches: 0, scores: [], players: {}, best: null });
      d.matches++;
      m.records.forEach(function (r) {
        d.scores.push(r.score); d.players[r.player] = 1;
        if (!d.best || r.score > d.best.score) d.best = { score: r.score, player: r.player, hero: r.hero };
      });
    });
    return Object.keys(days).sort().map(function (k) {
      var d = days[k];
      d.avg = +(d.scores.reduce(function (x, y) { return x + y; }, 0) / d.scores.length).toFixed(2);
      d.count = Object.keys(d.players).length;
      return d;
    });
  }
  function fmtKDA(r) { return r.k + '/' + r.d + '/' + r.a; }
  function scoreTag(v) { return v >= 11 ? 'color:#f5c542' : v >= 9 ? 'color:#81c784' : v < 5 ? 'color:#e57373' : ''; }

  /* ---------- 路由 ---------- */
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, '');
    if (h.indexOf('player/') === 0) return { view: 'player', id: h.slice(7) };
    if (h === 'matches') return { view: 'matches' };
    if (h === 'admin') return { view: 'admin' };
    return { view: 'overview' };
  }
  function go(view, id) { location.hash = id ? '#/player/' + id : '#/' + view; }
  function render() {
    var r = parseHash();
    state.view = r.view;
    ['overview', 'matches', 'player', 'admin'].forEach(function (v) { $('view-' + v).hidden = v !== state.view; });
    var btns = $('tabs').querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('on', btns[i].getAttribute('data-view') === state.view);
    if (state.view === 'overview') renderOverview();
    else if (state.view === 'matches') renderMatches();
    else if (state.view === 'player') renderPlayer(r.id);
    else renderAdmin();
    window.scrollTo(0, 0);
  }

  /* SECTION: view-overview */
  function renderOverview() {
    var st = stats(), days = dailyStats(), ms = state.data.matches;
    $('site-sub').textContent = state.data.meta.teamName + ' · 共 ' + ms.length + ' 局 · 数据更新至 ' + (days.length ? days[days.length - 1].date : '—');
    /* SECTION: summary-card */
    var allScores = [];
    ms.forEach(function (m) { m.records.forEach(function (r) { allScores.push(r.score); }); });
    var totalAvg = allScores.length ? allScores.reduce(function (a, b) { return a + b; }, 0) / allScores.length : 0;
    var dayRows = days.slice().reverse().map(function (d) {
      return '<span class="tag" style="margin-right:6px">' + esc(d.date.slice(5)) + ' ' + d.matches + '局 <b style="color:var(--gold)">' + d.avg.toFixed(2) + '</b></span>';
    }).join('');
    $('summary-card').innerHTML = '<h2>总体数据</h2>' +
      '<div class="kpis">' +
      '<div class="kpi"><div class="v">' + totalAvg.toFixed(2) + '</div><div class="l">总平均评分（' + allScores.length + '人次）</div></div>' +
      '<div class="kpi"><div class="v">' + ms.length + '</div><div class="l">总局数</div></div>' +
      '<div class="kpi"><div class="v">' + days.length + '</div><div class="l">天数</div></div>' +
      '<div class="kpi"><div class="v">' + Object.keys(st).filter(function (k) { return st[k].games > 0; }).length + '</div><div class="l">参战玩家</div></div></div>' +
      '<div style="margin-top:10px">' + dayRows + '</div>' +
      '<div class="hint" style="margin-top:6px">每日平均 = 当天全部对局、全部玩家评分之和 ÷ 人次；总平均 = 所有局所有玩家评分之和 ÷ 总人次。</div>';
    var lc = $('latest-card');
    if (!ms.length) { lc.innerHTML = '<div class="empty">还没有对局数据。把战绩截图发给助理，或在「录入管理」中手动录入。</div>'; }
    else {
      var m = ms[ms.length - 1];
      var winIds = m.records.filter(function (r) { return r.win; }).map(function (r) { return r.player; });
      var loseIds = m.records.filter(function (r) { return !r.win; }).map(function (r) { return r.player; });
      var nameList = function (ids) { return ids.map(function (id) { var p = playerById(id); return p ? p.name : id; }).join('、'); };
      var mvps = m.records.filter(function (r) { return r.mvp; }).map(function (r) {
        var p = playerById(r.player);
        return (r.mvp === 'win' ? '胜方MVP ' : '败方MVP ') + (p ? p.name : r.player) + '（' + r.hero + ' ' + r.score + '分）';
      }).join('　');
      lc.innerHTML = '<h2>最新战报 · ' + esc(m.date) + ' 第' + m.seq + '局</h2>' +
        '<div class="kpis" style="margin-bottom:10px">' +
        '<div class="kpi"><div class="v">' + esc(m.score) + '</div><div class="l">总比分</div></div>' +
        '<div class="kpi"><div class="v" style="color:var(--win)">' + esc(m.winnerTeam || 'A') + '队</div><div class="l">胜方（' + winIds.length + '人）</div></div>' +
        '<div class="kpi"><div class="v">' + m.records.length + '</div><div class="l">参战人数</div></div>' +
        '<div class="kpi"><div class="v">' + (m.records.reduce(function (x, r) { return x + r.score; }, 0) / m.records.length).toFixed(1) + '</div><div class="l">场均评分</div></div></div>' +
        '<div class="hint" style="margin-bottom:4px">胜方：' + esc(nameList(winIds)) + '</div>' +
        '<div class="hint" style="margin-bottom:4px">负方：' + esc(nameList(loseIds)) + '</div>' +
        (mvps ? '<div style="margin-top:6px"><span class="tag mvp">' + esc(mvps) + '</span></div>' : '');
    }
    renderRank(st);
    renderTrend(st);
    renderDaily(days, st);
  }
  function renderRank(st) {
    var rows = state.data.players.map(function (p) { var s = st[p.id]; s.name = p.name; s.color = p.color; return s; })
      .filter(function (s) { return s.games > 0; });
    var key = state.sortKey;
    rows.sort(function (a, b) { return state.sortDesc ? b[key] - a[key] : a[key] - b[key]; });
    var th = function (label, k) { return '<th class="sortable" data-k="' + k + '">' + label + (state.sortKey === k ? (state.sortDesc ? ' ↓' : ' ↑') : '') + '</th>'; };
    var html = '<thead><tr><th>#</th><th>玩家</th>' + th('场次', 'games') + th('胜率', 'winrate') + th('平均分', 'avg') + th('MVP', 'mvps') + '<th>最高分</th></tr></thead><tbody>';
    if (!rows.length) html += '<tr><td colspan="7" class="empty">暂无数据</td></tr>';
    rows.forEach(function (s, i) {
      var medal = i === 0 ? 'background:linear-gradient(90deg,#f5c542,#ff9d3c);color:#101427' : i === 1 ? 'background:#b8c4d6;color:#101427' : i === 2 ? 'background:#c98d5a;color:#101427' : '';
      html += '<tr><td><span class="tag" style="' + medal + '">' + (i + 1) + '</span></td>' +
        '<td><span class="dot" style="background:' + s.color + '"></span><span class="plink" data-p="' + s.id + '">' + esc(s.name) + '</span></td>' +
        '<td class="num">' + s.games + '</td><td class="num">' + s.winrate + '%</td>' +
        '<td class="num score">' + s.avg.toFixed(2) + '</td><td class="num">' + s.mvps + '</td>' +
        '<td class="num" style="' + scoreTag(s.best) + '">' + s.best.toFixed(1) + '</td></tr>';
    });
    $('rank-table').innerHTML = html + '</tbody>';
    var ths = $('rank-table').querySelectorAll('th.sortable');
    for (var i = 0; i < ths.length; i++) ths[i].onclick = function () {
      var k = this.getAttribute('data-k');
      if (state.sortKey === k) state.sortDesc = !state.sortDesc; else { state.sortKey = k; state.sortDesc = true; }
      renderRank(stats());
    };
    bindPlayerLinks($('rank-table'));
  }
  function bindPlayerLinks(scope) {
    var els = scope.querySelectorAll('.plink');
    for (var i = 0; i < els.length; i++) els[i].onclick = function () { go('player', this.getAttribute('data-p')); };
  }
  /* SECTION: trend-chart */
  function renderTrend(st) {
    var days = dailyStats().map(function (d) { return d.date; });
    var legend = $('trend-legend');
    if (!Object.keys(state.trendOn).length) state.data.players.forEach(function (p, i) { state.trendOn[p.id] = i < 6; });
    legend.innerHTML = state.data.players.map(function (p) {
      return '<label><input type="checkbox" data-p="' + p.id + '"' + (state.trendOn[p.id] ? ' checked' : '') + '><span class="dot" style="background:' + p.color + '"></span>' + esc(p.name) + '</label>';
    }).join('');
    var cbs = legend.querySelectorAll('input');
    for (var i = 0; i < cbs.length; i++) cbs[i].onchange = function () { state.trendOn[this.getAttribute('data-p')] = this.checked; renderTrend(stats()); };
    var series = state.data.players.filter(function (p) { return state.trendOn[p.id]; }).map(function (p) {
      var byDay = {};
      st[p.id].scores.forEach(function (s) { (byDay[s.date] = byDay[s.date] || []).push(s.score); });
      return { name: p.name, color: p.color, pts: days.map(function (d) { var a = byDay[d]; return a ? +(a.reduce(function (x, y) { return x + y; }, 0) / a.length).toFixed(2) : null; }) };
    });
    drawChart($('trend-chart'), days, series, '评分');
  }
  function drawChart(box, xs, series, yLabel) {
    if (!xs.length) { box.innerHTML = '<div class="empty">暂无可绘制的数据</div>'; return; }
    var W = 640, H = 250, L = 34, R = 12, T = 12, B = 30;
    var x = function (i) { return xs.length === 1 ? (L + (W - L - R) / 2) : L + i * (W - L - R) / (xs.length - 1); };
    var y = function (v) { return T + (16 - v) / 16 * (H - T - B); };
    var g = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet">';
    for (var v = 0; v <= 16; v += 4) g += '<line x1="' + L + '" y1="' + y(v) + '" x2="' + (W - R) + '" y2="' + y(v) + '" stroke="#2c3765" stroke-width="1"/><text x="' + (L - 6) + '" y="' + (y(v) + 4) + '" fill="#9aa6d4" font-size="10" text-anchor="end">' + v + '</text>';
    var step = Math.ceil(xs.length / 8);
    xs.forEach(function (d, i) { if (i % step === 0 || i === xs.length - 1) g += '<text x="' + x(i) + '" y="' + (H - 8) + '" fill="#9aa6d4" font-size="10" text-anchor="middle">' + esc(d.slice(5)) + '</text>'; });
    series.forEach(function (s) {
      var path = '', dots = '';
      s.pts.forEach(function (v, i) {
        if (v == null) return;
        path += (path ? ' L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1);
        dots += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="3" fill="' + s.color + '"><title>' + esc(s.name) + ' ' + esc(xs[i]) + '：' + v + '</title></circle>';
      });
      if (path) g += '<path d="' + path + '" fill="none" stroke="' + s.color + '" stroke-width="2"/>' + dots;
    });
    g += '</svg>';
    box.innerHTML = g;
  }
  function renderDaily(days, st) {
    var html = '<thead><tr><th>日期</th><th>局数</th><th>参战人数</th><th>全场平均分</th><th>当日最佳</th></tr></thead><tbody>';
    if (!days.length) html += '<tr><td colspan="5" class="empty">暂无数据</td></tr>';
    days.slice().reverse().forEach(function (d) {
      var p = d.best ? playerById(d.best.player) : null;
      html += '<tr><td class="num">' + esc(d.date) + '</td><td class="num">' + d.matches + '</td><td class="num">' + d.count + '</td>' +
        '<td class="num score">' + d.avg.toFixed(2) + '</td>' +
        '<td>' + (d.best ? '<span class="dot" style="background:' + (p ? p.color : '#888') + '"></span><span class="plink" data-p="' + d.best.player + '">' + esc(p ? p.name : '?') + '</span> ' + esc(d.best.hero) + ' <b style="' + scoreTag(d.best.score) + '">' + d.best.score.toFixed(1) + '</b>' : '—') + '</td></tr>';
    });
    $('daily-table').innerHTML = html + '</tbody>';
    bindPlayerLinks($('daily-table'));
  }

  /* SECTION: view-matches */
  function renderMatches() {
    var fd = $('f-date'), fp = $('f-player');
    var dates = dailyStats().map(function (d) { return d.date; }).reverse();
    fd.innerHTML = '<option value="">全部日期</option>' + dates.map(function (d) { return '<option' + (state.filterDate === d ? ' selected' : '') + '>' + d + '</option>'; }).join('');
    fp.innerHTML = '<option value="">全部玩家</option>' + state.data.players.map(function (p) { return '<option value="' + p.id + '"' + (state.filterPlayer === p.id ? ' selected' : '') + '>' + esc(p.name) + '</option>'; }).join('');
    fd.onchange = function () { state.filterDate = this.value; renderMatchList(); };
    fp.onchange = function () { state.filterPlayer = this.value; renderMatchList(); };
    $('f-reset').onclick = function () { state.filterDate = ''; state.filterPlayer = ''; renderMatches(); };
    renderMatchList();
  }
  function renderMatchList() {
    var ms = state.data.matches.slice().reverse().filter(function (m) {
      if (state.filterDate && m.date !== state.filterDate) return false;
      if (state.filterPlayer && !m.records.some(function (r) { return r.player === state.filterPlayer; })) return false;
      return true;
    });
    var box = $('match-list');
    if (!ms.length) { box.innerHTML = '<div class="card"><div class="empty">没有符合条件的对局</div></div>'; return; }
    box.innerHTML = ms.map(function (m) {
      var A = m.records.filter(function (r) { return r.win; }), B = m.records.filter(function (r) { return !r.win; });
      var tbl = function (rows, label) {
        return '<div class="team-label">' + label + '</div><div class="tbl-scroll"><table><thead><tr><th>玩家</th><th>英雄</th><th>分路</th><th>K/D/A</th><th>经济</th><th>评分</th><th>荣誉</th></tr></thead><tbody>' +
          rows.map(function (r) {
            var p = playerById(r.player);
            return '<tr><td><span class="dot" style="background:' + (p ? p.color : '#888') + '"></span><span class="plink" data-p="' + r.player + '">' + esc(p ? p.name : r.player) + '</span></td>' +
              '<td>' + esc(r.hero) + '</td><td><span class="tag">' + esc(r.lane || '—') + '</span></td><td class="num">' + fmtKDA(r) + '</td>' +
              '<td class="num">' + (r.gold || '—') + '</td><td class="num score" style="' + scoreTag(r.score) + '">' + r.score.toFixed(1) + '</td>' +
              '<td>' + (r.mvp === 'win' ? '<span class="tag mvp">MVP</span>' : r.mvp === 'lose' ? '<span class="tag lose">败方MVP</span>' : '') + (r.medal ? ' <span class="tag medal">' + esc(r.medal) + '</span>' : '') + '</td></tr>';
          }).join('') + '</tbody></table></div>';
      };
      return '<div class="card match" data-m="' + m.id + '"><div class="match-head">' +
        '<span class="date">' + esc(m.date) + ' 第' + m.seq + '局' + (m.time ? ' ' + esc(m.time) : '') + '</span>' +
        '<span class="vs">' + esc(m.score) + '</span>' +
        '<span class="tag win">胜方 ' + A.length + ' 人</span><span class="tag lose">负方 ' + B.length + ' 人</span>' +
        '<span class="arrow">▶</span></div>' +
        '<div class="match-body">' + tbl(A, '胜方') + tbl(B, '负方') + '</div></div>';
    }).join('');
    var heads = box.querySelectorAll('.match-head');
    for (var i = 0; i < heads.length; i++) heads[i].onclick = function () { this.parentNode.classList.toggle('open'); };
    bindPlayerLinks(box);
  }

  /* SECTION: view-player */
  function renderPlayer(id) {
    var sel = $('p-select');
    sel.innerHTML = state.data.players.map(function (p) { return '<option value="' + p.id + '"' + (p.id === id ? ' selected' : '') + '>' + esc(p.name) + '</option>'; }).join('');
    sel.onchange = function () { go('player', this.value); };
    var p = playerById(id), box = $('player-detail');
    if (!p) { box.innerHTML = '<div class="card"><div class="empty">未找到该玩家</div></div>'; return; }
    var st = stats()[p.id];
    var days = dailyStats().map(function (d) { return d.date; });
    var byDay = {};
    st.scores.forEach(function (s) { (byDay[s.date] = byDay[s.date] || []).push(s.score); });
    var series = [{ name: p.name, color: p.color, pts: days.map(function (d) { var a = byDay[d]; return a ? +(a.reduce(function (x, y) { return x + y; }, 0) / a.length).toFixed(2) : null; }) }];
    var heroes = Object.keys(st.heroes).map(function (h) { var o = st.heroes[h]; o.name = h; o.avg = +(o.sum / o.n).toFixed(2); return o; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 5);
    box.innerHTML =
      '<div class="card"><h2><span class="dot" style="background:' + p.color + ';width:12px;height:12px"></span>' + esc(p.name) +
      (p.aliases && p.aliases.length ? ' <span class="hint">（又名：' + esc(p.aliases.join('、')) + '）</span>' : '') + '</h2>' +
      '<div class="kpis">' +
      '<div class="kpi"><div class="v">' + st.games + '</div><div class="l">出场</div></div>' +
      '<div class="kpi"><div class="v" style="color:var(--win)">' + st.winrate + '%</div><div class="l">胜率（' + st.wins + '胜）</div></div>' +
      '<div class="kpi"><div class="v">' + st.avg.toFixed(2) + '</div><div class="l">平均评分</div></div>' +
      '<div class="kpi"><div class="v" style="color:var(--accent)">' + st.mvps + '</div><div class="l">MVP 次数</div></div>' +
      '<div class="kpi"><div class="v">' + st.best.toFixed(1) + '</div><div class="l">最高评分</div></div>' +
      '<div class="kpi"><div class="v">' + (st.games ? ((st.k + st.a) / Math.max(st.d, 1)).toFixed(1) : '0') + '</div><div class="l">总KDA</div></div></div></div>' +
      '<div class="grid2"><div class="card"><h2>评分走势</h2><div id="p-trend"></div></div>' +
      '<div class="card"><h2>常用英雄</h2><div class="tbl-scroll"><table><thead><tr><th>英雄</th><th>场次</th><th>胜率</th><th>均分</th></tr></thead><tbody>' +
      (heroes.length ? heroes.map(function (h) { return '<tr><td>' + esc(h.name) + '</td><td class="num">' + h.n + '</td><td class="num">' + Math.round(h.wins / h.n * 100) + '%</td><td class="num score">' + h.avg.toFixed(2) + '</td></tr>'; }).join('') : '<tr><td colspan="4" class="empty">暂无</td></tr>') +
      '</tbody></table></div></div></div>' +
      '<div class="card"><h2>全部对局</h2><div class="tbl-scroll"><table><thead><tr><th>日期</th><th>第几局</th><th>英雄</th><th>K/D/A</th><th>评分</th><th>荣誉</th><th>胜负</th></tr></thead><tbody>' +
      st.scores.slice().reverse().map(function (s) { return '<tr><td class="num">' + esc(s.date) + '</td><td class="num">' + s.seq + '</td><td>' + esc(s.hero) + '</td><td class="num">' + s.k + '/' + s.d + '/' + s.a + '</td><td class="num score" style="' + scoreTag(s.score) + '">' + s.score.toFixed(1) + '</td><td>' + (s.mvp === 'win' ? '<span class="tag mvp">MVP</span>' : s.mvp === 'lose' ? '<span class="tag lose">败方MVP</span>' : '—') + '</td><td><span class="tag ' + (s.win ? 'win">胜' : 'lose">负') + '</span></td></tr>'; }).join('') +
      '</tbody></table></div></div>';
    drawChart($('p-trend'), days, series, '评分');
  }
  /* SECTION: view-admin */
  function renderAdmin() {
    var gate = $('admin-gate'), body = $('admin-body');
    if (sessionStorage.getItem(SS_OK) === '1') state.adminOk = true;
    if (!state.adminOk) {
      body.hidden = true; gate.hidden = false;
      var has = !!localStorage.getItem(LS_PASS);
      gate.innerHTML = '<h2>录入管理</h2><p class="hint" style="margin-bottom:10px">' + (has ? '请输入管理口令后进入。口令只保存在你自己的浏览器里。' : '首次使用请设置一个管理口令（只保存在你自己的浏览器里，用于防止别人误改数据）。') + '</p>' +
        '<div class="row"><input type="password" id="gate-pass" placeholder="管理口令" style="max-width:220px"><button class="btn primary" id="gate-btn">进入</button></div><div class="err" id="gate-err"></div>';
      $('gate-btn').onclick = function () {
        var v = $('gate-pass').value;
        if (!v) { $('gate-err').textContent = '口令不能为空'; return; }
        if (!has) { localStorage.setItem(LS_PASS, v); }
        else if (v !== localStorage.getItem(LS_PASS)) { $('gate-err').textContent = '口令不对，请重试'; return; }
        sessionStorage.setItem(SS_OK, '1'); state.adminOk = true; renderAdmin();
      };
      return;
    }
    gate.hidden = true; body.hidden = false;
    renderAdminBody();
  }
  function heroOptions() {
    var set = {};
    (window.WZRY_HEROES.lanes || []).forEach(function (l) { l.heroes.forEach(function (h) { set[h] = 1; }); });
    state.data.matches.forEach(function (m) { m.records.forEach(function (r) { set[r.hero] = 1; }); });
    return Object.keys(set);
  }
  function renderAdminBody() {
    var body = $('admin-body');
    body.innerHTML =
      '<div class="card"><h2>新增一局</h2>' +
      '<div class="row"><label>日期</label><input type="date" id="m-date" value="' + new Date().toISOString().slice(0, 10) + '">' +
      '<label>时间</label><input type="time" id="m-time">' +
      '<label>当天第几局</label><input type="number" id="m-seq" min="1" value="1" style="width:70px"></div>' +
      '<p class="hint">每行一名玩家。粘贴战绩文本可自动填充，格式：<code>名字 英雄 击杀/死亡/助攻 评分 [MVP|败方MVP] [胜|负]</code></p>' +
      '<textarea id="m-paste" placeholder="例：&#10;乐观善良娱乐 钟馗 3/0/8 10.7 MVP 胜&#10;沧澜潇潇 赵云 2/2/1 5.6 负"></textarea>' +
      '<div class="row"><button class="btn" id="m-parse">解析并填入</button><span class="hint" id="m-parse-msg"></span></div>' +
      '<div class="tbl-scroll"><table id="m-rows"></table></div>' +
      '<div class="row" style="margin-top:10px"><button class="btn small" id="m-addrow">+ 加一行</button>' +
      '<button class="btn primary" id="m-save" data-primary-action="save-match">保存这一局</button>' +
      '<button class="btn" id="m-export" data-primary-action="export">导出数据文件</button>' +
      '<button class="btn small" id="m-restore">恢复为文件版本</button>' +
      '<button class="btn small" id="m-logout">退出管理</button></div>' +
      '<div class="hint" id="m-src"></div>' +
      '<div class="err" id="m-err"></div></div>' +
      '<div class="card"><h2>历史对局管理</h2><div id="m-list"></div></div>' +
      '<div class="card"><h2>玩家名单</h2><div id="p-manage"></div>' +
      '<div class="row" style="margin-top:10px"><input id="p-new" placeholder="新玩家名字" style="max-width:200px"><button class="btn small" id="p-add">添加玩家</button></div></div>' +
      '<datalist id="hero-list">' + heroOptions().map(function (h) { return '<option value="' + esc(h) + '">'; }).join('') + '</datalist>';
    newRowBlank();
    $('m-addrow').onclick = newRowBlank;
    $('m-parse').onclick = parsePaste;
    $('m-save').onclick = saveMatch;
    $('m-export').onclick = exportData;
    $('m-src').textContent = hasLocalCopy() ? '当前显示：你浏览器里的本地暂存数据（含你未导出的改动）。' : '当前显示：data.js 文件中的数据。';
    $('m-restore').onclick = function () {
      if (!confirm('将丢弃你浏览器里的本地暂存改动，恢复为 data.js 文件中的数据。确定继续？')) return;
      localStorage.removeItem(LS_DATA);
      state.data = JSON.parse(JSON.stringify(window.WZRY_DATA));
      renderAdminBody(); toast('已恢复为文件版本');
    };
    $('m-logout').onclick = function () { sessionStorage.removeItem(SS_OK); state.adminOk = false; renderAdmin(); };
    $('p-add').onclick = function () {
      var v = $('p-new').value.trim();
      if (!v) return toast('名字不能为空');
      if (findPlayerByName(v)) return toast('已有同名或同外号的玩家');
      addPlayer(v); saveData(); $('p-new').value = ''; renderAdminBody(); toast('已添加 ' + v);
    };
    renderMatchAdminList();
    renderPlayerManage();
  }
  function newRowBlank(rec) {
    var tb = $('m-rows');
    var head = !tb.querySelector('thead');
    if (head) tb.innerHTML = '<thead><tr><th>玩家</th><th>英雄</th><th>分路</th><th>K/D/A</th><th>评分</th><th>经济</th><th>MVP</th><th>胜</th><th>奖牌</th><th></th></tr></thead><tbody></tbody>';
    var tr = document.createElement('tr');
    var pOpts = state.data.players.map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + '</option>'; }).join('');
    var laneOpts = ['对抗路', '打野', '中路', '发育路', '游走'].map(function (l) { return '<option>' + l + '</option>'; }).join('');
    tr.innerHTML = '<td><select class="r-p">' + pOpts + '</select></td>' +
      '<td><input class="r-hero" list="hero-list" style="width:86px" value="' + esc(rec ? rec.hero : '') + '"></td>' +
      '<td><select class="r-lane">' + laneOpts + '</select></td>' +
      '<td class="num"><input class="r-k" type="number" min="0" style="width:44px" value="' + (rec ? rec.k : 0) + '">/<input class="r-d" type="number" min="0" style="width:44px" value="' + (rec ? rec.d : 0) + '">/<input class="r-a" type="number" min="0" style="width:44px" value="' + (rec ? rec.a : 0) + '"></td>' +
      '<td><input class="r-score" type="number" step="0.1" min="0" max="16" style="width:64px" value="' + (rec ? rec.score : '') + '"></td>' +
      '<td><input class="r-gold" type="number" min="0" style="width:74px" value="' + (rec && rec.gold ? rec.gold : '') + '"></td>' +
      '<td><select class="r-mvp"><option value="">无</option><option value="win">胜方MVP</option><option value="lose">败方MVP</option></select></td>' +
      '<td><input type="checkbox" class="r-win"></td>' +
      '<td><input class="r-medal" style="width:80px" placeholder="如银牌游走" value="' + esc(rec && rec.medal ? rec.medal : '') + '"></td>' +
      '<td><button class="btn small danger r-del">删</button></td>';
    if (rec) {
      tr.querySelector('.r-p').value = rec.player;
      tr.querySelector('.r-lane').value = rec.lane || '中路';
      tr.querySelector('.r-mvp').value = rec.mvp || '';
      tr.querySelector('.r-win').checked = !!rec.win;
    }
    tr.querySelector('.r-del').onclick = function () { tr.remove(); };
    tb.querySelector('tbody').appendChild(tr);
  }
  function parsePaste() {
    var lines = $('m-paste').value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    var ok = 0, errs = [];
    lines.forEach(function (ln, idx) {
      var m = ln.match(/^(\S+)\s+(\S+)\s+(\d+)\s*\/\s*(\d+)\s*\/\s*(\d+)\s+(\d+(?:\.\d+)?)(.*)$/);
      if (!m) { errs.push('第' + (idx + 1) + '行格式不对：' + ln); return; }
      var name = m[1], hero = m[2], k = +m[3], d = +m[4], a = +m[5], sc = +m[6], rest = m[7];
      var mvp = /败方MVP/.test(rest) ? 'lose' : /MVP/.test(rest) ? 'win' : '';
      var win = /负/.test(rest) ? false : /胜/.test(rest) ? true : null;
      var p = findPlayerByName(name); if (!p) p = addPlayer(name);
      var lane = guessLane(hero);
      newRowBlank({ player: p.id, hero: hero, lane: lane, k: k, d: d, a: a, score: sc, mvp: mvp, win: win === null ? false : win, medal: '' });
      var tr = $('m-rows').querySelector('tbody').lastElementChild;
      tr.querySelector('.r-win').checked = win === true;
      ok++;
    });
    $('m-parse-msg').innerHTML = (ok ? '已填入 ' + ok + ' 行。' : '') + (errs.length ? '<span class="err">' + esc(errs.join('；')) + '</span>' : '');
  }
  function guessLane(hero) {
    var ls = window.WZRY_HEROES.lanes || [];
    for (var i = 0; i < ls.length; i++) if (ls[i].heroes.indexOf(hero) >= 0) return ls[i].key;
    return '中路';
  }
  function saveMatch() {
    var err = $('m-err'); err.textContent = '';
    var rows = Array.prototype.slice.call($('m-rows').querySelectorAll('tbody tr'));
    if (!rows.length) { err.textContent = '至少填一行玩家数据'; return; }
    var recs = [], seen = {}, mvpWin = 0, mvpLose = 0;
    for (var i = 0; i < rows.length; i++) {
      var tr = rows[i], q = function (c) { return tr.querySelector(c); };
      var pid = q('.r-p').value, hero = q('.r-hero').value.trim(), sc = parseFloat(q('.r-score').value);
      if (!hero) { err.textContent = '第' + (i + 1) + '行缺英雄名'; return; }
      if (isNaN(sc) || sc < 0 || sc > 16) { err.textContent = '第' + (i + 1) + '行评分需在 0–16 之间'; return; }
      if (seen[pid]) { err.textContent = '玩家重复：' + (playerById(pid) || {}).name; return; }
      seen[pid] = 1;
      var mvp = q('.r-mvp').value;
      if (mvp === 'win') mvpWin++; if (mvp === 'lose') mvpLose++;
      recs.push({ player: pid, hero: hero, lane: q('.r-lane').value, k: +q('.r-k').value || 0, d: +q('.r-d').value || 0, a: +q('.r-a').value || 0, score: sc, gold: +q('.r-gold').value || 0, mvp: mvp || null, win: q('.r-win').checked, medal: q('.r-medal').value.trim() });
    }
    if (mvpWin > 1 || mvpLose > 1) { err.textContent = '胜方MVP和败方MVP各只能有一名'; return; }
    var kA = recs.filter(function (r) { return r.win; }).reduce(function (x, r) { return x + r.k; }, 0);
    var kB = recs.filter(function (r) { return !r.win; }).reduce(function (x, r) { return x + r.k; }, 0);
    var date = $('m-date').value, seq = +$('m-seq').value || 1;
    var m = { id: state.editingMatchId || ('m' + date.replace(/-/g, '') + '-' + seq + '-' + Date.now().toString(36)), date: date, time: $('m-time').value || '', seq: seq, score: kA + ' : ' + kB, winnerTeam: kA >= kB ? 'A' : 'B', records: recs };
    if (state.editingMatchId) {
      for (var j = 0; j < state.data.matches.length; j++) if (state.data.matches[j].id === state.editingMatchId) state.data.matches[j] = m;
      state.editingMatchId = null; toast('已更新该局');
    } else { state.data.matches.push(m); toast('已保存 ' + date + ' 第' + seq + '局'); }
    saveData(); renderAdminBody();
  }
  function renderMatchAdminList() {
    var box = $('m-list');
    var ms = state.data.matches.slice().reverse();
    if (!ms.length) { box.innerHTML = '<div class="empty">暂无对局</div>'; return; }
    box.innerHTML = '<div class="tbl-scroll"><table><thead><tr><th>日期</th><th>第几局</th><th>比分</th><th>人数</th><th>操作</th></tr></thead><tbody>' +
      ms.map(function (m) { return '<tr><td class="num">' + esc(m.date) + '</td><td class="num">' + m.seq + '</td><td class="num score">' + esc(m.score) + '</td><td class="num">' + m.records.length + '</td>' +
        '<td><button class="btn small" data-edit="' + m.id + '">编辑</button> <button class="btn small danger" data-del="' + m.id + '">删除</button></td></tr>'; }).join('') + '</tbody></table></div>';
    var bs = box.querySelectorAll('button');
    for (var i = 0; i < bs.length; i++) bs[i].onclick = function () {
      var id = this.getAttribute('data-edit') || this.getAttribute('data-del');
      var m = null; state.data.matches.forEach(function (x) { if (x.id === id) m = x; });
      if (!m) return;
      if (this.getAttribute('data-del')) {
        if (!confirm('确定删除 ' + m.date + ' 第' + m.seq + '局？删除后可在本地数据中找回旧导出文件。')) return;
        state.data.matches = state.data.matches.filter(function (x) { return x.id !== id; });
        saveData(); renderAdminBody(); toast('已删除');
        return;
      }
      state.editingMatchId = id;
      $('m-date').value = m.date; $('m-time').value = m.time || ''; $('m-seq').value = m.seq;
      $('m-rows').innerHTML = '';
      m.records.forEach(function (r) { newRowBlank(r); });
      window.scrollTo(0, 0); toast('已载入该局到上方表单，改完点「保存这一局」');
    };
  }
  function renderPlayerManage() {
    var box = $('p-manage');
    box.innerHTML = '<div class="tbl-scroll"><table><thead><tr><th>颜色</th><th>名字</th><th>外号（逗号分隔）</th><th>操作</th></tr></thead><tbody>' +
      state.data.players.map(function (p) { return '<tr data-p="' + p.id + '"><td><input type="color" class="pm-c" value="' + p.color + '" style="width:36px;padding:2px"></td>' +
        '<td><input class="pm-n" value="' + esc(p.name) + '" style="width:150px"></td>' +
        '<td><input class="pm-a" value="' + esc((p.aliases || []).join(',')) + '" style="width:180px"></td>' +
        '<td><button class="btn small pm-s">保存</button></td></tr>'; }).join('') + '</tbody></table></div>';
    var bs = box.querySelectorAll('.pm-s');
    for (var i = 0; i < bs.length; i++) bs[i].onclick = function () {
      var tr = this.closest('tr'), p = playerById(tr.getAttribute('data-p'));
      var n = tr.querySelector('.pm-n').value.trim();
      if (!n) return toast('名字不能为空');
      p.name = n; p.color = tr.querySelector('.pm-c').value;
      p.aliases = tr.querySelector('.pm-a').value.split(/[,，]/).map(function (s) { return s.trim(); }).filter(Boolean);
      saveData(); toast('已保存 ' + n);
    };
  }
  /* SECTION: export */
  function exportData() {
    var content = '/* SECTION: match-data\n * 内战赛数据文件（唯一数据源）。\n * 由看板网页导出，替换托管仓库中的 ' + ['assets', 'data.js'].join('/') + ' 即可让群友看到最新数据。\n */\nwindow.WZRY_DATA = ' + JSON.stringify(state.data, null, 2) + ';\n';
    var blob = new Blob([content], { type: 'text/javascript;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'data.js';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    toast('已导出：' + state.data.matches.length + ' 局、' + state.data.players.length + ' 位玩家，文件名 data.js');
  }

  /* SECTION: init */
  function init() {
    state.data = loadData();
    $('site-title').textContent = state.data.meta.title;
    $('tabs').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      go(b.getAttribute('data-view'));
    });
    $('modal-mask').addEventListener('click', function (e) { if (e.target === this) closeModal(); });
    window.addEventListener('hashchange', render);
    render();
  }
  init();
})();
