/* Voronia v0.0.12.0 · debug-API (вынесено из основного бандла, пункт 1 плана)
 *
 * Грузится ЛЕНИВО и только когда включён режим разработчика:
 *   · ?debug=1  (или #debug=1) — включает и запоминает в localStorage
 *   · ?debug=0                 — выключает
 *   · localStorage.voronia_debug = "1"
 *   · Настройки → 🧪 Режим разработчика
 *
 * Контракт: основной бандл публикует window.__V.debugApi — набор геттеров/сеттеров
 * на живые биндинги модуля. Всё, что раньше было замыканием, теперь читается как
 * DAPI.<имя>. Файл не загружается обычным игрокам: минус ~60 КБ парсинга.
 */
(function () {
  "use strict";
  var DAPI = (window.__V && window.__V.debugApi) || null;
  if (!DAPI) {
    try {
      console.warn("[Voronia] debug.js: контракт window.__V.debugApi не найден — debug-API не установлен");
    } catch (e) {}
    return;
  }
  window.__ccDebug = {
    selectedCell: function () {
      return DAPI.n.selectedCellId;
    },
    clearSelected: function () {
      return ((DAPI.n.selectedCellId = null), !0);
    },
    tapCell: function (e) {
      if (!DAPI.n.activePlanet) return null;
      let t = DAPI.n.activePlanet.cells[Number(e)];
      return t ? ((DAPI.n.selectedCellId = t.id), DAPI.eo(t), { id: t.id, selected: !0 }) : null;
    },
    achState: function () {
      return {
        unlocked: Object.keys(DAPI.n.unlockedAchievements).length,
        total: DAPI.un.length,
        ids: Object.keys(DAPI.n.unlockedAchievements).slice(),
        pct: DAPI.Lp(),
        tiersReached: DAPI.Ep(),
        tiersClaimed: DAPI.n.achTiersClaimed,
        nextTier: DAPI.Jl.find((e) => DAPI.mr() < e.count) || null,
      };
    },
    achUnlockCategory: function (e) {
      let t = 0;
      for (let o of DAPI.un) o.cat === e && !DAPI.n.unlockedAchievements[o.id] && ((DAPI.n.unlockedAchievements[o.id] = !0), t++);
      return (DAPI.ce(), DAPI.ca(), DAPI.se(), t);
    },
    achGrantCounters: function () {
      return (
        DAPI.n.gameSession || DAPI.sp(),
        Object.assign(DAPI.n.gameSession, {
          scanned: 5e3,
          upgraded: 2e3,
          deepMined: 50,
          anomalies: 100,
          techsBought: 150,
          planetsUnlocked: 10,
          travels: 100,
          meteorBuffs: 200,
          compoundsCrafted: 1e3,
          researchesBought: 25,
          recipesUnlocked: 8,
          deliveriesSent: 1e3,
          cargoMassMoved: 1e7,
          fleetUpgradesBought: 15,
          rolesAssigned: 10,
          roleChanges: 5,
          planetsFullyExplored: 7,
          bossesDefeated: 10,
          bossBoosts: 10,
          eventsTriggered: 50,
          maxLevelCells: 30,
          warehouseUpgrades: 10,
          hiddenWorldsOpened: 1,
          metaPrestigesDone: 5,
          sessionLength: 25 * 3600,
          ironEarned: 1e12,
          kriogenEarned: 1e9,
          crystalsEarned: 1e4,
          energyEarned: 1e12,
        }),
        DAPI.Bi(),
        this.achState()
      );
    },
    achMults: function () {
      return { energy: DAPI.Zl(), iron: DAPI.ed(), all: DAPI.ts(), rare: DAPI.Ti(), crystal: DAPI.td(), dust: DAPI.nd() };
    },
    achCheck: function () {
      return (DAPI.Bi(), Object.keys(DAPI.n.unlockedAchievements).length);
    },
    achUnlockAll: function () {
      for (let e of DAPI.un) DAPI.n.unlockedAchievements[e.id] = !0;
      return (DAPI.ce(), DAPI.ca(), DAPI.se(), Object.keys(DAPI.n.unlockedAchievements).length);
    },
    achReset: function () {
      return ((DAPI.n.unlockedAchievements = {}), DAPI.ce(), DAPI.ca(), DAPI.se(), 0);
    },
    settingsState: function () {
      return JSON.parse(JSON.stringify(DAPI.n.settings));
    },
    setSetting: function (e, t) {
      return e in DAPI.n.settings
        ? ((DAPI.n.settings[e] = t), DAPI.ia(), DAPI.kd(), (e === "music" || e === "musicVol") && DAPI.kn.applyVolume(), DAPI.n.settings[e])
        : null;
    },
    musicState: function () {
      return DAPI.kn.state();
    },
    sfxTest: function (e) {
      try {
        if (DAPI.le[e]) return (DAPI.le[e](), !0);
      } catch {}
      return !1;
    },
    exportB64: function () {
      return DAPI.hd();
    },
    importB64: function (e) {
      return DAPI.Np(e);
    },
    sessionState: function () {
      return DAPI.n.gameSession
        ? {
            scanned: DAPI.n.gameSession.scanned,
            upgraded: DAPI.n.gameSession.upgraded,
            synthRuns: DAPI.n.gameSession.synthRuns | 0,
            meteorBuffs: DAPI.n.gameSession.meteorBuffs | 0,
            hiddenFinds: DAPI.n.gameSession.hiddenFinds | 0,
            sonarRerolls: DAPI.n.gameSession.sonarRerolls | 0,
            chargesDone: DAPI.n.gameSession.chargesDone | 0,
            coresBuilt: DAPI.n.gameSession.coresBuilt | 0,
            travels: DAPI.n.gameSession.travels,
            prestiges: DAPI.n.gameSession.prestiges,
          }
        : null;
    },
    incomeSnapshot: function () {
      return { energy: DAPI.n.energyPerSec, iron: DAPI.n.ironPerSec, kriogen: DAPI.n.kriogenPerSec, crystals: DAPI.n.crystalsPerSec };
    },
    researchSnapshot: function () {
      return { rate: DAPI.Sr(), mult: DAPI.zg(), research: Math.floor(DAPI.n.research), total: Math.floor(DAPI.n.researchTotal) };
    },
    offlinePlanet: function () {
      return { active: DAPI.n.activePlanetId, alias: DAPI.n.offlinePlanetId, multiplier: DAPI.Xc(DAPI.$[DAPI.n.activePlanetId]) };
    },
    autoCfg: function () {
      return {
        scanEveryMs: DAPI.ze.scanEveryMs,
        upgradeEveryMs: DAPI.ze.upgradeEveryMs,
        transportEveryMs: DAPI.ze.transportEveryMs,
        scanReserveFactor: DAPI.ze.scanReserveFactor,
        upgradeEnergyReserve: DAPI.ze.upgradeEnergyReserve,
        lastScanAt: DAPI.ze.lastScanAt,
        lastUpgradeAt: DAPI.ze.lastUpgradeAt,
        lastTransportAt: DAPI.ze.lastTransportAt,
        lastToastAt: DAPI.ze.lastToastAt,
      };
    },
    autoStatus: function () {
      return {
        scan: DAPI.Ze("auto_scan"),
        upgrade: DAPI.Ze("auto_upgrade"),
        transport: DAPI.Ze("auto_transport"),
        lastScanAt: DAPI.ze.lastScanAt,
        lastUpgradeAt: DAPI.ze.lastUpgradeAt,
        lastTransportAt: DAPI.ze.lastTransportAt,
      };
    },
    autoSetPerk: function (e, t) {
      return (t ? (DAPI.n.dustPerks[e] = 1) : delete DAPI.n.dustPerks[e], DAPI.Ze(e));
    },
    autoRunNow: function (e) {
      return e === "scan" ? DAPI.Gp() : e === "upgrade" ? DAPI.qp() : e === "transport" ? DAPI.Xg(performance.now()) : null;
    },
    autoTickAt: function (e) {
      return (
        DAPI.Wp(Number(e) || performance.now()),
        { lastScanAt: DAPI.ze.lastScanAt, lastUpgradeAt: DAPI.ze.lastUpgradeAt, lastTransportAt: DAPI.ze.lastTransportAt }
      );
    },
    autoCandidates: function () {
      let e = DAPI.n.activePlanet;
      return e
        ? DAPI.Di(e, DAPI.n.activePlanetId).map((t) => ({
            id: t.c.id,
            type: t.c.type,
            level: t.c.level || 0,
            price: t.price,
            energy: t.cost.energy || 0,
            resources: Object.assign({}, t.cost.resources || {}),
          }))
        : [];
    },
    scanCellNow: function (e, t) {
      let o = DAPI.n.activePlanet && DAPI.n.activePlanet.cells[Number(e)];
      return o ? DAPI.Sd(o, { manual: t !== !1, x: 0, y: 0 }) : null;
    },
    upgradeCellNow: function (e, t) {
      let o = DAPI.ge.PLANETS[t || DAPI.n.activePlanetId],
        r = o && o.cells[Number(e)];
      return r ? DAPI.Ni(r, t || DAPI.n.activePlanetId, { countSession: !0 }) : null;
    },
    inboundTo: function (e) {
      return DAPI.hr(e || DAPI.n.activePlanetId);
    },
    renderDust: function (e) {
      DAPI.Mo(e || void 0);
      let t = document.getElementById("dust-list");
      return { tab: DAPI.n.currentDustTab, html: t ? String(t.innerHTML) : "" };
    },
    galaxyGen: function () {
      return { ...DAPI.cn, minDist: DAPI.Rr.MIN_DIST, thick: DAPI.Rr.THICK };
    },
    galaxyStats: function () {
      let e = { byArm: {}, byRadius: [], total: 0 },
        t = DAPI.ge.PlanetaryGraph;
      for (let o in t.nodes) {
        let r = t.nodes[o];
        if (!r) continue;
        let s = DAPI.$[o];
        if (!s || !DAPI.n.unlockedPlanets.has(o)) continue;
        let c = Math.hypot(r.x || 0, r.z || 0),
          l = r.armId || DAPI.er(r);
        ((e.byArm[l] = (e.byArm[l] || 0) + 1), e.byRadius.push({ id: o, name: s.name, r: +c.toFixed(2), arm: l }), e.total++);
      }
      return (e.byRadius.sort((o, r) => o.r - r.r), console.table(e.byRadius), console.log("Распределение по рукавам:", e.byArm), e);
    },
    galaxyDistanceCheck: function () {
      let e = DAPI.ge.PlanetaryGraph,
        t = e.nodes.ferrum,
        o = e.nodes.krios,
        r = [];
      for (let s in e.nodes) {
        if (s === "ferrum" || s === "krios") continue;
        let c = e.nodes[s];
        !c ||
          !t ||
          !o ||
          r.push({
            id: s,
            dFerrum: +DAPI.lo(c, t).toFixed(2),
            dKrios: +DAPI.lo(c, o).toFixed(2),
            minDist: +Math.min(DAPI.lo(c, t), DAPI.lo(c, o)).toFixed(2),
          });
      }
      return (r.sort((s, c) => s.minDist - c.minDist), console.table(r), r);
    },
    galaxyRepositionAll: function () {
      let e = DAPI.ge.PlanetaryGraph,
        t = {};
      (e.nodes.ferrum && ((e.nodes.ferrum.x = -2.6), (e.nodes.ferrum.y = 0), (e.nodes.ferrum.z = 0.4), (t.ferrum = e.nodes.ferrum)),
        e.nodes.krios && ((e.nodes.krios.x = 3), (e.nodes.krios.y = 0.6), (e.nodes.krios.z = -0.9), (t.krios = e.nodes.krios)));
      for (let o in e.nodes) {
        if (o === "ferrum" || o === "krios") continue;
        let r = e.nodes[o];
        if (!r) continue;
        let s = DAPI.Br((r.seed || 0) >>> 0, t);
        ((r.x = s.x), (r.y = s.y), (r.z = s.z), (r.armId = DAPI.er(r)), (t[o] = r));
      }
      return (DAPI.se(), this.galaxyStats());
    },
    mixState: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t
        ? {
            mixed: !!t._mixed,
            cellsTotal: t.cells.length,
            merged: t.cells.filter((o) => o._mixedCluster).length,
            largestCluster: Math.max(0, ...t.cells.map((o) => o._memberCount || 1)),
          }
        : null;
    },
    mixForce: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return { ok: !1, reason: "no planet" };
      if (t._mixed)
        return {
          ok: !1,
          reason: "already merged",
          hint: "Мир уже слит. Для теста новой формы открой СЛЕДУЮЩУЮ процедурную планету — новые сейвы пересоберутся с новыми параметрами климата.",
        };
      let o = DAPI.ni(t);
      return (DAPI.Js(t), DAPI.po(), { ok: !!o });
    },
    mixStats: function () {
      let e = [];
      for (let t in DAPI.$) {
        let o = DAPI.$[t];
        o && o._mixed && e.push({ id: t, cells: o.cells.length, merged: o.cells.filter((r) => r._mixedCluster).length });
      }
      return (console.table(e), e);
    },
    dustPerksState: function () {
      return Object.values(DAPI.Lc)
        .flat()
        .map((e) => ({ id: e.id, name: e.name, cost: e.cost, owned: DAPI.Ze(e.id), reqMet: DAPI.Dg(e.id), req: e.req || null }));
    },
    dustUnlock: function (e) {
      return ((DAPI.n.dustPerks[e] = 1), DAPI.Bc(), DAPI.Mo(), DAPI.he(), DAPI.se(), !0);
    },
    dustUnlockAll: function () {
      return (
        Object.values(DAPI.Lc)
          .flat()
          .forEach((e) => (DAPI.n.dustPerks[e.id] = 1)),
        DAPI.Bc(),
        DAPI.Mo(),
        DAPI.he(),
        DAPI.se(),
        Object.keys(DAPI.n.dustPerks).length
      );
    },
    listSaves: function () {
      let e = [];
      for (let t = 0; t < localStorage.length; t++) {
        let o = localStorage.key(t);
        if (o && /^cosmicClicker/i.test(o))
          try {
            let r = JSON.parse(localStorage.getItem(o));
            e.push({
              key: o,
              version: r.version,
              timestamp: new Date(r.timestamp || 0).toLocaleString(),
              planets: r.planets ? Object.keys(r.planets) : [],
              energy: r.energy,
              iron: r.iron,
            });
          } catch (r) {
            e.push({ key: o, error: r.message });
          }
      }
      return (console.table(e), e);
    },
    wipeAll: function () {
      let e = [];
      for (let t = 0; t < localStorage.length; t++) {
        let o = localStorage.key(t);
        o && /^cosmicClicker/i.test(o) && !(window.__VORONIA_SHARDS_KEEP && window.__VORONIA_SHARDS_KEEP(o)) && e.push(o);
      }
      (e.forEach((t) => localStorage.removeItem(t)), console.log("Удалено:", e));
    },
    forceSave: function () {
      (DAPI.jt(), console.log("✅ Сохранено"));
    },
    forceLoad: function () {
      console.log("Load result:", DAPI.gg());
    },
    daily: function () {
      return DAPI.n.dailyState;
    },
    weeklyState: function () {
      return DAPI.n.weekly;
    },
    weeklyStreak: function () {
      return DAPI.Vl();
    },
    surgeMult: function () {
      return DAPI.wi();
    },
    weeklyEliteState: function () {
      let e = DAPI.Yt();
      return {
        unlocked: !!e.eliteUnlocked,
        unlockedAt: e.unlockedAt || 0,
        streak: DAPI.n.weekly.cyclesStreak || 0,
        required: DAPI.mo,
        lastClaimAt: DAPI.n.weekly.lastClaimAt || 0,
        msSinceClaim: DAPI.n.weekly.lastClaimAt ? Date.now() - DAPI.n.weekly.lastClaimAt : 0,
        gapLimitMs: DAPI.xi,
        streakBreaks: e.streakBreaks || 0,
        firstEliteCrafted: !!e.firstEliteCrafted,
        recipeUnlocked: DAPI.Do("researchDataElite"),
        inLab: !!(typeof DAPI.je < "u" && DAPI.je.researchDataElite),
      };
    },
    weeklyEliteSetStreak: function (e) {
      return (
        (DAPI.n.weekly.cyclesStreak = Math.max(0, Math.min(DAPI.mo, Number(e) | 0))),
        (DAPI.n.weekly.lastClaimAt = Date.now()),
        DAPI.mn(),
        this.weeklyEliteState()
      );
    },
    weeklyEliteGrant: function () {
      let e = DAPI.Yt();
      ((e.eliteUnlocked = !0), (e.unlockedAt = Date.now()), (DAPI.n.weekly.cyclesStreak = DAPI.mo), DAPI.mn());
      let t = document.getElementById("lab-modal");
      return (t && t.style.display === "block" && DAPI.Xn(), DAPI.se(), this.weeklyEliteState());
    },
    weeklyEliteReset: function () {
      let e = DAPI.Yt();
      ((e.eliteUnlocked = !1), (e.unlockedAt = 0), (DAPI.n.weekly.cyclesStreak = 0), (DAPI.n.weekly.lastClaimAt = 0), DAPI.mn());
      let t = document.getElementById("lab-modal");
      return (t && t.style.display === "block" && DAPI.Xn(), DAPI.se(), this.weeklyEliteState());
    },
    weeklyEliteSimulate: function (e, t) {
      t = Number(t) || 0;
      for (let r = 0; r < (Number(e) | 0); r++) {
        DAPI.n.weekly.lastClaimAt = Date.now() - t;
        let s = DAPI.n.weekly.lastClaimAt || 0,
          c = Date.now();
        if (s > 0 && c - s > DAPI.xi) {
          DAPI.n.weekly.cyclesStreak = 1;
          try {
            DAPI.Yt().streakBreaks = (DAPI.Yt().streakBreaks || 0) + 1;
          } catch {}
        } else DAPI.n.weekly.cyclesStreak = Math.min(DAPI.mo, (DAPI.n.weekly.cyclesStreak || 0) + 1);
        DAPI.n.weekly.lastClaimAt = c;
        let l = DAPI.Yt();
        !l.eliteUnlocked && DAPI.n.weekly.cyclesStreak >= DAPI.mo && ((l.eliteUnlocked = !0), (l.unlockedAt = c));
      }
      DAPI.mn();
      let o = document.getElementById("lab-modal");
      return (o && o.style.display === "block" && DAPI.Xn(), DAPI.se(), this.weeklyEliteState());
    },
    markDay: function () {
      return (DAPI.lp(), DAPI.n.weekly);
    },
    rollQuests: function () {
      return (DAPI.Mi(), DAPI.Qr(), DAPI.n.dailyState);
    },
    quest: function (e, t) {
      return (DAPI.hn(e, t || 1), DAPI.n.dailyState);
    },
    fleetState: function () {
      return DAPI.n.fleet;
    },
    rolesState: function () {
      return Object.values(DAPI.kt).map((e) => ({ id: e.id, name: e.name, count: DAPI.nl(e.id), cost: DAPI.ol(e.id, DAPI.n.activePlanetId) }));
    },
    planetRole: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? { pid: t.id, role: t.role, roleName: t.role && DAPI.kt[t.role] ? DAPI.kt[t.role].name : null } : null;
    },
    assignRole: function (e, t) {
      return DAPI.qf(t || DAPI.n.activePlanetId, e);
    },
    pg: function (e, t) {
      return DAPI.Me(e, t);
    },
    pa: function (e, t, o) {
      return (DAPI.At(e, t, o), DAPI.Me(e, t));
    },
    tp: function (e, t, o, r) {
      return DAPI.Fk(e, t, o, r);
    },
    deliveriesList: function () {
      return DAPI.n.deliveries;
    },
    buyUpg: function (e) {
      return DAPI.$k(e);
    },
    arriveAll: function () {
      return (
        DAPI.n.deliveries.forEach(function (e) {
          e.eta = Date.now();
        }),
        DAPI.af()
      );
    },
    sendCargo: function (e, t, o) {
      return DAPI.Zr(e, t, o);
    },
    cancelDelivery: function (e) {
      return DAPI.Ik(e);
    },
    cargoMass: function (e) {
      return DAPI.dn(e);
    },
    cargoWeight: function (e) {
      return DAPI.yp(e);
    },
    origin: function (e, t, o) {
      return DAPI.tr(e, t, o);
    },
    whCap: function (e) {
      return DAPI.Hf(DAPI.ge.PLANETS[e]);
    },
    whUsed: function (e) {
      return DAPI.Ey(e);
    },
    synthRates: function (e) {
      return DAPI.ti(e);
    },
    synthProduct: function (e) {
      return DAPI.el(e);
    },
    synthUpgrade: function (e) {
      let t = DAPI.ge.PLANETS[e];
      if (!t) return null;
      let o = DAPI.Ds(t);
      return o.length ? (DAPI.tl(o[0], DAPI.n.W / 2, DAPI.n.H / 2), { level: o[0].level || 0, isDeep: !!o[0].isDeep }) : null;
    },
    resetPrestigeIntro: function () {
      try {
        localStorage.removeItem(DAPI.Ll);
      } catch {}
    },
    showPrestigeDemo: function () {
      window.__ccPrestigeDemo();
    },
    reactInfo: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t
        ? [...t.explored]
            .map((o) => t.cells[o])
            .filter((o) => o && (o.type === 3 || o.type === 5))
            .map((o) => ({
              id: o.id,
              level: o.level,
              reserve: Math.round(o.reserve || 0),
              reactCount: o.reactCount || 0,
              nextCost: DAPI.$n(o, e || DAPI.n.activePlanetId),
              esc: +DAPI.Xs(o).toFixed(2),
              active: DAPI.gt(o),
              lockReason: DAPI.zr(o) || null,
            }))
        : [];
    },
    resourceGate: function () {
      let e = [];
      for (let t in DAPI.te) {
        let o = DAPI.te[t];
        e.push({ key: t, name: o.name, researchUnlock: o.researchUnlock || "— (всегда открыт)", unlocked: DAPI.Kt(t) });
      }
      return (console.table(e), e);
    },
    cellGate: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      return t
        ? [...t.explored]
            .map((o) => t.cells[o])
            .filter((o) => o && (o.type === 3 || o.type === 5))
            .map((o) => ({
              id: o.id,
              type: o.type,
              resourceKey: o.type === 5 ? "kriogen" : o.resourceKey || "iron",
              active: DAPI.gt(o),
              lockReason: DAPI.zr(o) || null,
            }))
        : [];
    },
    batchReact: function (e) {
      let t = DAPI.Pl(e || DAPI.n.activePlanetId);
      return (console.log(t), t);
    },
    drainAll: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t) return 0;
      let o = 0;
      return (
        t.explored.forEach((r) => {
          let s = t.cells[r];
          s && (s.type === 3 || s.type === 5) && DAPI.gt(s) && s.reserve > 0 && ((s.reserve = 0), o++);
        }),
        DAPI.ce(),
        DAPI.se(),
        o
      );
    },
    grant: function (e, t) {
      if (e === "research") DAPI.n.research += Math.max(0, Number(t) || 0);
      else if (e === "energy") DAPI.n.energy += Math.max(0, Number(t) || 0);
      else if (e === "crystals") DAPI.n.crystals += Math.max(0, Number(t) || 0);
      else if (e === "dust") {
        let o = Math.max(0, Number(t) || 0);
        ((DAPI.n.dust += o), (DAPI.n.dustTotal += o));
      }
      (DAPI.Un(), DAPI.se());
    },
    nextPreview: function (e) {
      return DAPI.Zn(e || void 0);
    },
    pendingDiscoveryInfo: function () {
      return DAPI.n.pendingDiscovery
        ? {
            forIndex: DAPI.n.pendingDiscovery.forIndex,
            seed: DAPI.n.pendingDiscovery.seed,
            name: DAPI.n.pendingDiscovery.name,
            armId: DAPI.n.pendingDiscovery.armId,
            resourceList: DAPI.n.pendingDiscovery.resourceList.slice(),
          }
        : null;
    },
    clearPending: function () {
      return (DAPI.Hn(), DAPI.n.pendingDiscovery === null);
    },
    getStartSeed: function () {
      return DAPI.n.gameStartSeed;
    },
    setStartSeed: function (e) {
      return ((DAPI.n.gameStartSeed = (Number(e) || 0) >>> 0), DAPI.Hn(), DAPI.n.gameStartSeed);
    },
    latestPlanetId: function () {
      return DAPI.Nr();
    },
    openSonar: function () {
      DAPI.ea();
    },
    sonarTarget: function () {
      return {
        key: DAPI.Ol(),
        idx: DAPI.Bl(),
        avail: DAPI.Yr(),
        ready: DAPI.Nl(),
        onFerrum: DAPI.n.activePlanetId === "ferrum",
        seen: Array.from(DAPI.n.sonarActivatedPlanets),
      };
    },
    sonarState: function () {
      return { active: !!DAPI.Ln.active, total: DAPI.Ln.total, current: DAPI.Ln.current, period: DAPI.Ln.period, stopped: !!DAPI.Ln.stopped };
    },
    sonarSeek: function (e) {
      return ((DAPI.Ln.t = Math.max(0, Number(e) || 0)), DAPI.Ln.t);
    },
    difficultyFor: function (e) {
      return DAPI.Fl(Number(e) || 0);
    },
    ferrumInbound: function () {
      return DAPI.Z0();
    },
    gotoFerrum: function () {
      return DAPI.ep();
    },
    flyTo: function (e) {
      return DAPI.ge.setActivePlanet(e) ? DAPI.n.activePlanetId : !1;
    },
    craftSource: function () {
      return {
        pid: DAPI.n.activePlanetId,
        name: (DAPI.$[DAPI.n.activePlanetId] && DAPI.$[DAPI.n.activePlanetId].name) || DAPI.n.activePlanetId,
        slots: DAPI.qn(),
        speed: DAPI.zi(),
      };
    },
    orderToFerrum: function () {
      let e = DAPI.tp();
      return e ? { ok: !!e.ok, mass: Number(e.mass) || 0, msg: e.msg || null } : null;
    },
    stock: function (e, t) {
      return Math.floor(DAPI.Me(e, t) || 0);
    },
    setTech: function (e, t) {
      return (
        e in DAPI.n.tech &&
          ((DAPI.n.tech[e] = Math.max(0, Number(t) | 0)),
          e === "maxLevel" && (DAPI.n.MAX_LEVEL = 20 + DAPI.n.tech.maxLevel * 5 + DAPI.ds()),
          DAPI.ce(),
          DAPI.Oo(),
          DAPI.he()),
        DAPI.n.tech[e]
      );
    },
    giveResearch: function (e) {
      return ((DAPI.n.researchPerks[e] = !0), DAPI.ft(e));
    },
    sonarSet: function () {
      return Array.from(DAPI.n.sonarActivatedPlanets);
    },
    sonarReroll: function () {
      DAPI.si();
      let e = DAPI.zs(DAPI.n.sonarRerollState.count, DAPI.Dr());
      return {
        targetIndex: DAPI.n.sonarRerollState.targetIndex,
        count: DAPI.n.sonarRerollState.count,
        max: DAPI.uo,
        nextRerollNumber: e.number,
        available: !!e.available,
        free: !!e.free,
        reason: e.reason || null,
        cost: e,
        costText: DAPI.Zf(e),
        costShort: DAPI.e0(e),
        canAfford: DAPI.ai(e),
        peak: DAPI.n.sonarRerollPeak | 0,
        tierClaimed: DAPI.n.sonarRerollTierClaimed | 0,
      };
    },
    sonarRerollNow: function () {
      return DAPI.n0();
    },
    sonarRerollSet: function (e) {
      return (
        DAPI.si(),
        (DAPI.n.sonarRerollState.count = Math.max(0, Math.min(DAPI.uo, Number(e) | 0))),
        DAPI.Hn(),
        DAPI.se(),
        DAPI.Q && DAPI.Q.style.display === "block" && DAPI.Xr(),
        this.sonarReroll()
      );
    },
    sonarRerollReset: function () {
      return (
        (DAPI.n.sonarRerollState = { targetIndex: DAPI.Dr(), count: 0 }),
        DAPI.Hn(),
        DAPI.se(),
        DAPI.Q && DAPI.Q.style.display === "block" && DAPI.Xr(),
        this.sonarReroll()
      );
    },
    sonarRerollPreview: function (e, t) {
      return DAPI.zs(Number(e) || 0, Number(t) || DAPI.Dr());
    },
    sonarRerollCostTable: function () {
      let e = DAPI.Dr(),
        t = [];
      for (let o = 0; o < DAPI.uo; o++) {
        let r = DAPI.zs(o, e);
        t.push({ n: o + 1, free: !!r.free, text: DAPI.Zf(r) });
      }
      return (console.table(t), t);
    },
    sonarRerollTiers: function () {
      return {
        peak: DAPI.n.sonarRerollPeak | 0,
        claimed: DAPI.n.sonarRerollTierClaimed | 0,
        tiers: DAPI.sl.map((e) => ({ count: e.count, label: e.label, reward: e.reward, reached: (DAPI.n.sonarRerollPeak | 0) >= e.count })),
      };
    },
    energyCellReport: function (e) {
      let t = e || DAPI.n.activePlanetId,
        o = DAPI.n.planetIncome[t] || {};
      return {
        planet: t,
        planetEnergyPerSec: o.energy || 0,
        byType: Object.assign({}, o.energyByType || {}),
        simple: DAPI.fo(t, 0),
        rich: DAPI.fo(t, 1),
        rare: DAPI.fo(t, 2),
      };
    },
    energyCellCard: function (e) {
      let t = DAPI.n.activePlanet;
      if (!t) return null;
      let o = t.cells[Number(e)];
      return o ? (DAPI.c0(o), DAPI.fo(DAPI.n.activePlanetId, o.type)) : null;
    },
    descriptorEffectsFor: function (e) {
      let t = DAPI.Zn(Number(e) || void 0);
      return t
        ? {
            name: t.name,
            climate: t.descriptors.climate.name,
            surface: t.descriptors.surface.name,
            anomaly: t.descriptors.anomaly && t.descriptors.anomaly.name,
            effects: DAPI.op(t.descriptors.effects),
          }
        : null;
    },
    craftQueueState: function () {
      return {
        slots: DAPI.qn(),
        usedSlots: DAPI.n.craftQueue.length,
        cap: DAPI.Hi(),
        count: DAPI.Ui(),
        speedMult: DAPI.zi(),
        source: DAPI.n.activePlanetId,
        jobs: DAPI.n.craftQueue.map((e) => ({
          id: e.id,
          key: e.key,
          count: e.count,
          state: e.state,
          left: +(Math.max(0, e.endsAt - Date.now()) / 1e3).toFixed(1),
          rush: DAPI.Id(e),
          hauls: e.hauls | 0,
          fee: e.fee | 0,
          missing: e.missing || {},
          spentKeys: Object.keys(e.spent || {}),
        })),
      };
    },
    craftQueueAdd: function (e, t) {
      return DAPI.ls(e, t || 1);
    },
    craftQueueCancel: function (e) {
      return DAPI.Qp(e);
    },
    craftQueueRush: function (e) {
      return DAPI.Jp(e);
    },
    craftQueueClear: function () {
      return ((DAPI.n.craftQueue = []), !0);
    },
    craftQueueFinish: function () {
      return DAPI.Cd(Date.now() + 1e12);
    },
    craftQueueOffline: function (e) {
      return DAPI.em(Number(e) || 0);
    },
    craftQueueBackdate: function (e) {
      let t = Math.max(0, Number(e) || 0) * 1e3;
      for (let o of DAPI.n.craftQueue) ((o.queuedAt -= t), (o.startedAt -= t), (o.endsAt -= t));
      return DAPI.n.craftQueue.map((o) => ({ id: o.id, key: o.key, state: o.state, left: +((o.endsAt - Date.now()) / 1e3).toFixed(1) }));
    },
    craftHaulNow: function (e) {
      let t = DAPI.n.craftQueue.find((o) => o.id === e);
      return t ? ((t._lastHaulAt = 0), DAPI.tm(t, Date.now())) : !1;
    },
    craftSlotsFn: function () {
      return DAPI.qn();
    },
    craftTime: function (e, t) {
      return DAPI.Wi(e, t || 1);
    },
    craftInputs: function (e, t) {
      return DAPI.ss(e, t || 1);
    },
    craftShort: function (e, t) {
      return DAPI.da(DAPI.ss(e, t || 1));
    },
    craftHave: function (e) {
      return DAPI.oo(e);
    },
    craftCanSmart: function (e, t) {
      return DAPI.Yp(e, t || 1);
    },
    craftHaulProbe: function (e, t) {
      let o = DAPI.da(DAPI.ss(e, t || 1)),
        r = DAPI.Ed(o, DAPI.n.energy);
      return { miss: o, mass: r.mass, fee: r.fee, sent: r.sent, failed: r.failed, possible: Object.keys(o).map((s) => [s, DAPI.Pd(s, o[s])]) };
    },
    chargeState: function (e) {
      let t = e || DAPI.n.activePlanetId,
        o = DAPI.$[t];
      return o
        ? {
            buff: DAPI.a0(t),
            mult: DAPI.s0(t),
            richCharged: o.cells.filter((r) => r && r._chargedEver && r.type === 1).length,
            rareCharged: o.cells.filter((r) => r && r._chargedEver && r.type === 2).length,
            richTotal: o.cells.filter((r) => r && r.type === 1).length,
            rareTotal: o.cells.filter((r) => r && r.type === 2).length,
            sonarCharges: DAPI.n.sonarCharges | 0,
          }
        : null;
    },
    chargeCellNow: function (e) {
      let t = DAPI.n.activePlanet && DAPI.n.activePlanet.cells[Number(e)];
      return t ? DAPI.i0(t, DAPI.n.activePlanet) : null;
    },
    chargeReset: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return !1;
      for (let o of t.cells) o && (o._chargeCooldown = 0);
      return (delete DAPI.n.chargeBuffs[t.id], DAPI.ce(), !0);
    },
    sonarChargesSet: function (e) {
      return ((DAPI.n.sonarCharges = Math.max(0, Math.min(DAPI.Hr, Number(e) | 0))), DAPI.n.sonarCharges);
    },
    coreState: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t
        ? {
            hasCore: DAPI.qr(t),
            mergeTarget: (DAPI.xl(t) || {}).center?.id ?? null,
            rich: t.cells.filter((o) => o && o.type === 1).length,
            rare: t.cells.filter((o) => o && o.type === 2).length,
            cost: { merge: DAPI.vl, core: DAPI.Ro },
          }
        : null;
    },
    mergeRichNow: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return null;
      let o = DAPI.xl(t);
      return o ? DAPI.I0(t.id, o.center.id) : { ok: !1, reason: "no target" };
    },
    buildCoreNow: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return null;
      let o = t.cells.find((r) => r && r.type === 2 && !DAPI.Kn(r) && t.explored.has(r.id));
      return o ? DAPI.C0(t.id, o.id) : { ok: !1, reason: "no rare" };
    },
    loreState: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return {
        insight: DAPI.n.loreMaxInsight | 0,
        slot: t ? DAPI.Os(t.planetIndex) : null,
        fragments: t ? DAPI.ul(t).map((o) => ({ fig: o.index + 1, tier: o.tier, locked: o.locked, gOK: o.gOK, lOK: o.lOK, hint: o.lHint })) : [],
        tracked: Object.keys(DAPI.n.loreProgress).length,
      };
    },
    loreForce: function (e, t, o) {
      e != null && (DAPI.n.loreMaxInsight = Math.max(0, Number(e) | 0));
      let r = DAPI.Os(Number(t) || 1);
      return (r && o && Object.assign(r, o), this.loreState());
    },
    upgradeCostTable: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return null;
      let o = t.planetIndex || 1,
        r = DAPI.zn({ type: 0, level: 0 }, t),
        s = DAPI.zn({ type: 0, level: 9 }, t);
      return { planetIndex: o, upgradeMult: DAPI.To(o), globalMult: DAPI.E0(o), crossMult: DAPI.gl(o), scanMult: DAPI.js(o), lvl0: r, lvl9: s };
    },
    sonarRerollTierForce: function (e) {
      return ((DAPI.n.sonarRerollPeak = Math.max(DAPI.n.sonarRerollPeak | 0, Number(e) | 0)), DAPI.t0(), this.sonarRerollTiers());
    },
    cellBar: function (e) {
      if (!DAPI.n.activePlanet) return null;
      let t = DAPI.n.activePlanet.cells[e];
      if (!t) return null;
      DAPI.eo(t);
      let o = document.getElementById("cell-info-bar");
      return o ? o.innerHTML : null;
    },
    setRes: function (e, t) {
      let o = Math.max(0, Number(t) || 0);
      return (
        e === "energy"
          ? (DAPI.n.energy = o)
          : e === "iron"
            ? ((DAPI.n.iron = o), DAPI.On())
            : e === "kriogen"
              ? ((DAPI.n.kriogen = o), DAPI.On())
              : e === "crystals"
                ? (DAPI.n.crystals = o)
                : e in DAPI.n.extraResources && ((DAPI.n.extraResources[e] = o), DAPI.On()),
        DAPI.Un(),
        DAPI.se(),
        { energy: DAPI.n.energy, iron: DAPI.n.iron, kriogen: DAPI.n.kriogen, crystals: DAPI.n.crystals }
      );
    },
    expProbe: function () {
      let e = DAPI.n.activePlanet;
      if (!e) return null;
      let t = Number(e.perks && e.perks.upgradeCostMult) || 1,
        o = (s) => {
          let c = DAPI.zn(s, e);
          return c ? DAPI.Gr(c) : null;
        },
        r = (s) => DAPI.nr({ level: s });
      return {
        up: t,
        t0L0: o({ type: 0, level: 0 }),
        t0L6: o({ type: 0, level: 6 }),
        t3L0: o({ type: 3, level: 0, resourceKey: "iron" }),
        react0: DAPI.B(DAPI.$n({ level: 0, reactCount: 0 }, e.id)),
        aL1E: DAPI.B(r(0).energy),
        aL1L: DAPI.B(Math.round(r(0).iron * t)),
        aL3E: DAPI.B(r(2).energy),
        aL3L: DAPI.B(Math.round(r(2).iron * t)),
        dE: DAPI.B(Math.round(4e3 * t)),
        dL: DAPI.B(Math.round(500 * t)),
      };
    },
    res: function () {
      return {
        energy: DAPI.n.energy,
        iron: DAPI.n.iron,
        kriogen: DAPI.n.kriogen,
        crystals: DAPI.n.crystals,
        research: DAPI.n.research,
        dust: DAPI.n.dust,
      };
    },
    resourceInfo: function (e) {
      let t = DAPI.te[e];
      return t ? { name: t.name, rare: t.rare, minPlanetIndex: t.minPlanetIndex || 0, researchUnlock: t.researchUnlock || null } : null;
    },
    milestoneFlags: function () {
      return DAPI.n._ccMilestoneFlags;
    },
    forceExploreLatest: function () {
      let e = DAPI.Nr(),
        t = DAPI.$[e];
      if (!t) return null;
      for (let o of t.cells) (t.revealed.add(o.id), t.explored.add(o.id));
      return (DAPI.ce(), DAPI.A0(), DAPI.he(), { id: e, explored: t.explored.size, total: t.cells.length });
    },
    unlockNextProbe: function () {
      return { latest: DAPI.Nr(), nextIndex: DAPI.Fr() + 1, krios: DAPI.n.unlockedPlanets.has("krios"), planets: Object.keys(DAPI.$) };
    },
    saveAudit: function () {
      return DAPI.vk();
    },
    saveRoundTrip: function () {
      return DAPI.xk();
    },
    spaceBG: function (e, t, o) {
      let r = DAPI.ge.PLANETS[e || DAPI.n.activePlanetId];
      if (!r) return null;
      if (t === "info") {
        if (!r._bg) return null;
        let s = r._bg.layers;
        return {
          seed: r.seed >>> 0,
          bgSeed: r._bgSeed,
          ver: r._bgVer,
          neb: r._bg.nebulas.length,
          gal: r._bg.galaxies.length,
          layers: s.length,
          stars: s.reduce((c, l) => c + l.stars.length, 0),
          glowTop: !!(s[s.length - 1] || {}).glow,
        };
      }
      return t === "snap"
        ? r._bg
          ? JSON.stringify(r._bg)
          : null
        : t === "clear"
          ? ((r._bg = null), (r._bgVer = 0), !0)
          : t === "ensure"
            ? (DAPI.jr(r), !!r._bg)
            : t === "seed"
              ? (o !== void 0 && (r.seed = o >>> 0), r.seed >>> 0)
              : null;
    },
    offlineScanAB: function (e, t, o) {
      let r = DAPI.ge.PLANETS[e || "ferrum"];
      if (!r) return null;
      ((o = Number(o) || 600), (t = Number(t) || 1.5));
      let s = DAPI.n.offlinePlanetId,
        c = r.scanBonus;
      ((DAPI.n.offlinePlanetId = e || "ferrum"), (r.scanBonus = null));
      let l = DAPI.n.energy;
      DAPI.vi(o);
      let u = DAPI.n.energy - l;
      ((r.scanBonus = { mult: t, until: Date.now() + 864e5, accuracy: 100 }), DAPI.ce());
      let f = DAPI.n.energy;
      DAPI.vi(o);
      let h = DAPI.n.energy - f;
      return ((r.scanBonus = c), (DAPI.n.offlinePlanetId = s), DAPI.ce(), { d0: u, d1: h });
    },
    markAnomalyDeep: function (e) {
      let t = DAPI.ge.PLANETS[e || "ferrum"];
      if (!t) return null;
      let o = null,
        r = null;
      for (let s in t.cells) {
        let c = t.cells[s];
        c &&
          (c.type === 4 && !o
            ? (t.revealed.add(+s), t.explored.add(+s), (c.level = DAPI.Dn.maxLevel), (c.isDeep = !0), (o = { pid: t.id, id: String(s) }))
            : c.type === 3 && r === null && ((c.level = Math.min(Number(c.level) || 0, 3)), (c.isDeep = !0), (r = String(s))));
      }
      return (o && ((o.c3id = r), DAPI.ce(), DAPI.se()), o);
    },
    cellInfo: function (e, t) {
      let o = DAPI.ge.PLANETS[e],
        r = o && o.cells[t];
      return r ? { type: r.type, isDeep: !!r.isDeep, level: r.level || 0, synth: DAPI.ei(r) } : null;
    },
    eventInfo: function () {
      return DAPI.n.activeEvent
        ? {
            id: DAPI.n.activeEvent.id,
            name: DAPI.n.activeEvent.name,
            desc: DAPI.n.activeEvent.desc || "",
            leftMs: DAPI.n.activeEvent.endsAt - Date.now(),
          }
        : null;
    },
    startEventNow: function (e) {
      let t = DAPI.Qa.find((l) => l.id === e);
      if (!t) return null;
      ((DAPI.n.activeEvent = { ...t, endsAt: Date.now() + t.duration * 1e3 }),
        (window.__eventHistory = window.__eventHistory || []).push({ at: Date.now(), name: t.name, icon: (t.name || "🌠").split(" ")[0] }),
        window.__eventHistory.length > 30 && window.__eventHistory.shift());
      let o = document.getElementById("event-banner"),
        r = document.getElementById("event-banner-name"),
        s = document.getElementById("event-banner-timer"),
        c = document.getElementById("event-banner-desc");
      return (
        r && (r.textContent = t.name),
        s && (s.textContent = t.duration + "с"),
        c && (c.textContent = t.desc || ""),
        o && (o.style.display = "flex"),
        DAPI.n.activeEvent.id
      );
    },
    endEventNow: function () {
      return (DAPI.n.activeEvent && (DAPI.n.activeEvent.endsAt = Date.now() - 1e3), DAPI.n.activeEvent === null);
    },
    scanCostNow: function () {
      return DAPI.ln();
    },
    setBuff: function (e, t, o) {
      return (
        DAPI.Ot[e] || (DAPI.Ot[e] = { mult: 1, until: 0 }),
        (DAPI.Ot[e].mult = Number(t) || 1),
        (DAPI.Ot[e].until = Date.now() + (Number(o) || 0) * 1e3),
        DAPI.Ka(),
        { mult: DAPI.Ot[e].mult, until: DAPI.Ot[e].until }
      );
    },
    getBuff: function (e) {
      let t = DAPI.Ot[e];
      return t ? { mult: t.mult, until: t.until, leftMs: t.until - Date.now() } : null;
    },
    meteorMult: function (e) {
      return DAPI.sn(e);
    },
    rollReward: function () {
      return DAPI.Cr();
    },
    applyReward: function (e, t) {
      let o = DAPI.n.energy,
        r = DAPI.n.iron,
        s = DAPI.n.kriogen,
        c = DAPI.n.crystals;
      return (
        DAPI.qc(e || 100, t || 100),
        { dEnergy: DAPI.n.energy - o, dIron: DAPI.n.iron - r, dKriogen: DAPI.n.kriogen - s, dCrystals: DAPI.n.crystals - c }
      );
    },
    minedKeys: function () {
      return DAPI.Gc();
    },
    meteorTable: function () {
      let e = DAPI._n.reduce((o, r) => o + r.weight, 0),
        t = DAPI._n.filter((o) => o.kind === "buff").reduce((o, r) => o + r.weight, 0);
      return {
        rows: DAPI._n.map((o) => ({
          id: o.id,
          weight: o.weight,
          kind: o.kind,
          key: o.key,
          mult: o.mult || null,
          durMin: o.durMin || null,
          durMax: o.durMax || null,
        })),
        total: e,
        buffShare: t / e,
        instantShare: (e - t) / e,
      };
    },
    rarePool: function () {
      let e = DAPI.ja();
      return { unlockedKeys: e.unlockedKeys.slice(), lockedKeys: e.lockedKeys.slice(), lockedWeights: e.lockedWeights.slice(), reachIdx: e.reachIdx };
    },
    rarePoolFor: function (e, t) {
      let o = !!DAPI.$[e],
        r = DAPI.n.unlockedPlanets.has(e);
      (o || (DAPI.$[e] = { id: e, name: e, planetIndex: Number(t) || 0, seed: 0, cells: [], storage: {}, explored: new Set(), revealed: new Set() }),
        r || DAPI.n.unlockedPlanets.add(e));
      try {
        let s = DAPI.ja();
        return {
          unlockedKeys: s.unlockedKeys.slice(),
          lockedKeys: s.lockedKeys.slice(),
          lockedWeights: s.lockedWeights.slice(),
          reachIdx: s.reachIdx,
        };
      } finally {
        (r || DAPI.n.unlockedPlanets.delete(e), o || delete DAPI.$[e]);
      }
    },
    pickHidden: function (e) {
      let t = DAPI.ja(),
        o = Math.random;
      Math.random = function () {
        return e === void 0 ? 0.5 : Number(e);
      };
      try {
        return DAPI._f(t);
      } finally {
        Math.random = o;
      }
    },
    forcedApply: function (e, t, o, r, s) {
      let c = DAPI._n.find((A) => A.id === e);
      if (!c) return null;
      let l = DAPI._n.reduce((A, T) => A + T.weight, 0),
        u = 0;
      for (let A of DAPI._n) {
        if (A === c) break;
        u += A.weight;
      }
      let f = Math.min(Math.max(Number(t), 0), 0.999999),
        h = Math.min(0.999999, (u + f * c.weight) / l),
        m = o == null ? 0.5 : Number(o),
        g = {
          energy: DAPI.n.energy,
          iron: DAPI.n.iron,
          kriogen: DAPI.n.kriogen,
          crystals: DAPI.n.crystals,
          extras: Object.assign({}, DAPI.n.extraResources),
          hiddenFinds: (DAPI.n.gameSession && DAPI.n.gameSession.hiddenFinds) || 0,
          meteorBuffs: (DAPI.n.gameSession && DAPI.n.gameSession.meteorBuffs) || 0,
        },
        b = Math.random,
        w = !0;
      Math.random = function () {
        return w ? ((w = !1), h) : m;
      };
      let E = DAPI.Cr,
        _ = null;
      DAPI.Cr = function () {
        let A = E();
        return ((_ = A), A);
      };
      try {
        DAPI.qc(r === void 0 ? 100 : r, s === void 0 ? 100 : s);
      } finally {
        ((DAPI.Cr = E), (Math.random = b));
      }
      let R = {};
      for (let A in DAPI.n.extraResources) {
        let T = (DAPI.n.extraResources[A] || 0) - (g.extras[A] || 0);
        Math.abs(T) > 1e-9 && (R[A] = T);
      }
      return {
        reward: _,
        dEnergy: DAPI.n.energy - g.energy,
        dIron: DAPI.n.iron - g.iron,
        dKriogen: DAPI.n.kriogen - g.kriogen,
        dCrystals: DAPI.n.crystals - g.crystals,
        dExtras: R,
        dHiddenFinds: ((DAPI.n.gameSession && DAPI.n.gameSession.hiddenFinds) || 0) - g.hiddenFinds,
        dMeteorBuffs: ((DAPI.n.gameSession && DAPI.n.gameSession.meteorBuffs) || 0) - g.meteorBuffs,
      };
    },
    rollForced: function (e, t, o) {
      let r = DAPI._n.find((g) => g.id === e);
      if (!r) return null;
      let s = DAPI._n.reduce((g, b) => g + b.weight, 0),
        c = 0;
      for (let g of DAPI._n) {
        if (g === r) break;
        c += g.weight;
      }
      let l = Math.min(Math.max(Number(t), 0), 0.999999),
        u = Math.min(0.999999, (c + l * r.weight) / s),
        f = o == null ? 0.5 : Number(o),
        h = Math.random,
        m = !0;
      Math.random = function () {
        return m ? ((m = !1), u) : f;
      };
      try {
        return { rowId: r.id, reward: DAPI.Cr() };
      } finally {
        Math.random = h;
      }
    },
    buffsHTML: function () {
      let e = document.getElementById("meteor-buffs");
      return e ? e.innerHTML : null;
    },
    reservesRaw: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return 0;
      let o = 0;
      return (
        t.explored.forEach((r) => {
          let s = t.cells[r];
          s && (s.type === 3 || s.type === 5) && DAPI.gt(s) && (o += Math.max(0, s.reserve || 0));
        }),
        o
      );
    },
    titleBg: function () {
      let e = window.__ccTitleBg;
      return e ? { running: e.running, ready: e.ready, stars: e.stars.length, nebulas: e.nebulas.length, W: e.W, H: e.H } : null;
    },
    compoundState: function () {
      return { stock: { ...DAPI.n.compoundResources }, bonusMult: DAPI.Ac(), mult: DAPI._d };
    },
    recipeProbe: function (e) {
      let t = DAPI.gr[e];
      if (!t) return null;
      let o = DAPI.cs(e);
      return { key: e, noScale: !!t.noScale, mult: t.noScale ? 1 : t.mult || DAPI._d, inputs: o };
    },
    forceStockCompounds: function (e) {
      ((e = Number(e) || 1e6), (DAPI.n.energy = Math.max(DAPI.n.energy, e * 10)));
      for (let t of ["iron", "kriogen"]) DAPI.At(DAPI.n.activePlanetId, t, e);
      for (let t of ["carbon", "silicon", "helium3", "titanium", "uranium", "biomass", "platinum", "darkMatter"])
        DAPI.n.extraResources[t] = (DAPI.n.extraResources[t] || 0) + e;
      return ((DAPI.n.crystals += e), DAPI.he(), { energy: DAPI.n.energy, ...DAPI.n.extraResources });
    },
    grantCompound: function (e, t) {
      return DAPI.je[e]
        ? ((DAPI.n.compoundResources[e] = (DAPI.n.compoundResources[e] || 0) + Math.max(0, Number(t) || 0)),
          DAPI.ce(),
          DAPI.Xn(),
          DAPI.he(),
          DAPI.se(),
          DAPI.n.compoundResources[e])
        : !1;
    },
    craft: function (e, t) {
      return DAPI.av(e, Number(t) || 1);
    },
    unlockAllRecipes: function () {
      return (
        ["recipe_steel", "recipe_alloy", "recipe_chip", "recipe_core", "recipe_relic", "recipe_core", "recipe_relic"].forEach(
          (e) => (DAPI.n.researchPerks[e] = !0),
        ),
        Object.keys(DAPI.n.researchPerks)
      );
    },
    globalGet: function (e) {
      return DAPI.is(e);
    },
    stellarState: function () {
      return { core: DAPI.n.compoundResources.core | 0, relic: DAPI.n.compoundResources.relic | 0, bonus: ((DAPI.Ac() - 1) * 100).toFixed(2) + "%" };
    },
    warehouseState: function () {
      return { level: DAPI.n.warehouseLevel, max: DAPI.Ls, tonsPerCell: DAPI.Vi(), bonus: (DAPI.Gi() - 1) * 100 + "%" };
    },
    upgradeWarehouse: function () {
      return (DAPI.rm(), DAPI.n.warehouseLevel);
    },
    giveCompounds: function () {
      return (
        (DAPI.n.compoundResources.steel = 200),
        (DAPI.n.compoundResources.alloy = 50),
        (DAPI.n.compoundResources.chip = 20),
        (DAPI.n.compoundResources.core = 10),
        (DAPI.n.compoundResources.relic = 5),
        (DAPI.n.compoundResources.core = 5),
        (DAPI.n.compoundResources.relic = 2),
        DAPI.ce(),
        DAPI.he(),
        DAPI.Xn(),
        DAPI.se(),
        DAPI.n.compoundResources
      );
    },
    autoCraftState: function () {
      return { enabled: DAPI.yt("autoCraft") > 0, priority: { ...DAPI.n.autoCraftPriority }, interval: DAPI.Ze("eso_craft_speed") ? 15e3 : 3e4 };
    },
    autoCraftNow: function () {
      return ((DAPI.n.autoCraftLastAt = 0), DAPI.nm(performance.now()), this.autoCraftState());
    },
    esoPerks: function () {
      return Object.keys(DAPI.n.dustPerks).filter((e) => e.startsWith("eso_"));
    },
    unlockEsoAll: function () {
      return (
        [
          "eso_compound_1",
          "eso_compound_2",
          "eso_warehouse",
          "eso_craft_speed",
          "eso_stellar_1",
          "eso_relic_1",
          "eso_dark_crit",
          "eso_hidden_hint",
        ].forEach((e) => (DAPI.n.dustPerks[e] = 1)),
        DAPI.Bc(),
        DAPI.Mo(),
        this.esoPerks()
      );
    },
    createHidden: function () {
      if (DAPI.n.hiddenWorldUnlocked) return "already";
      let e = DAPI.sm();
      return e
        ? ((DAPI.n.hiddenWorldUnlocked = !0),
          (DAPI.n.compoundResources.relic = Math.max(0, DAPI.n.compoundResources.relic - 5)),
          (DAPI.n.compoundResources.relic = Math.max(0, DAPI.n.compoundResources.relic - 3)),
          DAPI.he(),
          DAPI.se(),
          { id: e.id, cells: e.cells.length })
        : "failed";
    },
    hiddenState: function () {
      return { unlocked: DAPI.n.hiddenWorldUnlocked, planetExists: !!DAPI.$.planet_hidden };
    },
    uniqueWorlds: function () {
      return Object.values(DAPI.$)
        .filter((e) => e.isUnique)
        .map((e) => ({ id: e.id, name: e.name, res: e.resourceList, cells: e.cells.length }));
    },
    shardsState: function () {
      return { shards: DAPI.n.shards, metaPrestiges: DAPI.n.metaPrestiges, perks: { ...DAPI.n.metaPerks }, gain: DAPI.yr() };
    },
    grantShards: function (e) {
      return ((DAPI.n.shards += Math.max(0, Number(e) || 0)), DAPI.gn(), DAPI.se(), DAPI.n.shards);
    },
    buyMeta: function (e) {
      return ((DAPI.n.metaPerks[e] = (DAPI.n.metaPerks[e] || 0) + 1), DAPI.pa(), DAPI.ma(), DAPI.gn(), DAPI.se(), DAPI.yt(e));
    },
    forceMeta: function () {
      return (DAPI.n.totalPrestiges < 3 && (DAPI.n.totalPrestiges = 3), DAPI.n.dustTotal < 100 && (DAPI.n.dustTotal = 1e3), DAPI.dm(), DAPI.vx());
    },
    metaReset: function () {
      ((DAPI.n.shards = 0), (DAPI.n.metaPerks = {}), (DAPI.n.metaPrestiges = 0), (DAPI.n.metaIntroSeen = !1), DAPI.pa(), DAPI.gn(), DAPI.se());
    },
    bossState: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return null;
      let o = DAPI.Xt(t);
      return {
        pid: t.id,
        hp: o.hp,
        maxHp: o.maxHp,
        phase: o.hp <= 0 ? 3 : 0,
        defeated: o.defeated,
        reward: o.reward,
        taps: o.taps,
        fails: o.fails || 0,
        canReviveAt: o.canReviveAt || 0,
        punishment: (o.punishmentCells || []).length,
        bestCombo: o.bestCombo || 0,
        planetIndex: DAPI.Ki(t),
        maxMisses: 3,
        damageMult: 1,
        pointsPerSession: 0,
      };
    },
    sealPoolFor: function (e) {
      return DAPI.Ud(DAPI.$[e || DAPI.n.activePlanetId]).map((t) => t.id);
    },
    sealApplicable: function (e, t) {
      return DAPI.Hd(DAPI.$[e || DAPI.n.activePlanetId], t);
    },
    sealRollPreview: function (e, t) {
      e = e || DAPI.n.activePlanetId;
      let o = DAPI.$[e];
      if (!o) return null;
      let r = {};
      for (let s of t || [1, 2, 3, 4, 5, 6, 7, 8]) {
        let c = DAPI.Ji(o, s);
        r[s] = c.id;
      }
      return { pool: DAPI.Ud(o).map((s) => s.id), rolls: r };
    },
    bossBlockNow: function () {
      return DAPI.vm();
    },
    bossForceStrike: function () {
      return DAPI.n.bossFight ? ((DAPI.n.bossFight.nextStrikeAt = 0), !0) : !1;
    },
    bossV4State: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return null;
      let o = DAPI.ct(t),
        r = DAPI.br(t),
        s = DAPI.jn(t);
      return {
        profileKey: DAPI.tn(t),
        level: o.guardianLevel || 0,
        nextLevel: DAPI.ps(t),
        hpForLevel: DAPI.Zi(t),
        sleepUntil: o.sleepUntil || 0,
        sleeping: DAPI.Wo(t),
        sleepMult: DAPI.ms(t),
        strike: DAPI.n.bossFight
          ? {
              windup: (DAPI.n.bossFight.strikeWindupUntil || 0) > Date.now(),
              open: Date.now() < (DAPI.n.bossFight.openUntil || 0),
              blocks: DAPI.n.bossFight.blocks || 0,
              strikes: DAPI.n.bossFight.strikes || 0,
              shields: DAPI.n.bossFight.shields || 0,
              timeLimitMs: DAPI.Yi,
            }
          : null,
        missedCount: o.missedCount || 0,
        seal: r ? { id: r.id, until: r.until, level: r.level || 0, leftMs: r.until - Date.now() } : null,
        watch: { nextAt: s.nextAt, windowEnds: s.windowEnds, alive: !!s.alive, open: DAPI.jd(t) },
        fightAvailable: DAPI.Vo(t) !== null,
      };
    },
    bossV4SetLevel: function (e, t) {
      let o = DAPI.$[e || DAPI.n.activePlanetId];
      return o ? ((DAPI.ct(o).guardianLevel = Math.max(0, Number(t) || 0)), DAPI.ce(), DAPI.he(), DAPI.se(), this.bossV4State(e)) : !1;
    },
    bossV4ForceWin: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return !1;
      let o = DAPI.Vo(t);
      return !o || ((DAPI.n.energy = Math.max(DAPI.n.energy, DAPI.Vd("energy", t.planetIndex) * 2)), DAPI.us(t.id, o), !DAPI.n.bossFight)
        ? !1
        : ((DAPI.n.bossFight.hpPhase = [0, 0, 0.001]), (DAPI.n.bossFight.phase = 2), DAPI.bm("energy"), !0);
    },
    bossV4ForceLose: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return !1;
      let o = DAPI.Vo(t);
      return !o || (DAPI.us(t.id, o), !DAPI.n.bossFight) ? !1 : ((DAPI.n.bossFight.startedAt = Date.now() - DAPI.Yi - 1e3), !0);
    },
    bossV4SleepNow: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? (DAPI.Sm(t), DAPI.ce(), DAPI.he(), DAPI.se(), this.bossV4State(e)) : !1;
    },
    bossV4ClearSleep: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? (DAPI._m(t), DAPI.ce(), DAPI.he(), DAPI.se(), this.bossV4State(e)) : !1;
    },
    bossV4SetSeal: function (e, t) {
      let o = DAPI.$[e || DAPI.n.activePlanetId];
      if (!o) return !1;
      let r = DAPI.ga.find((c) => c.id === t);
      if (!r) return !1;
      let s = DAPI.ct(o);
      return (
        (s.seal = { id: r.id, until: Date.now() + DAPI.Xi, level: s.guardianLevel || 0 }),
        DAPI.ce(),
        DAPI.he(),
        DAPI.se(),
        this.bossV4State(e)
      );
    },
    bossV4Seals: function () {
      return DAPI.ga.slice();
    },
    watchState: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return null;
      let o = DAPI.jn(t),
        r = DAPI.ct(t);
      return {
        nextAt: o.nextAt,
        windowEnds: o.windowEnds,
        alive: !!o.alive,
        intervalMs: DAPI.hs(t),
        open: DAPI.jd(t),
        status: DAPI.Kd(t),
        level: r.guardianLevel || 0,
        missedCount: r.missedCount || 0,
      };
    },
    watchForceOpen: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return !1;
      let o = DAPI.jn(t);
      return ((o.windowEnds = Date.now() + DAPI.Wd), (o.alive = !0), DAPI.Lt(), DAPI.he(), this.watchState(e));
    },
    watchForceClose: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return !1;
      let o = DAPI.jn(t);
      return ((o.windowEnds = Date.now() - 1e3), (DAPI.n._lastWatchTickAt = 0), DAPI.ou(Date.now()), DAPI.Lt(), DAPI.he(), this.watchState(e));
    },
    watchForceDue: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return !1;
      let o = DAPI.jn(t);
      return (
        (o.nextAt = Date.now() - 1e3),
        (o.windowEnds = 0),
        (DAPI.n._lastWatchTickAt = 0),
        DAPI.ou(Date.now()),
        DAPI.Lt(),
        DAPI.he(),
        this.watchState(e)
      );
    },
    watchResetCycle: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return !1;
      let o = DAPI.jn(t);
      return ((o.nextAt = Date.now() + DAPI.hs(t)), (o.windowEnds = 0), (o.alive = !1), DAPI.Lt(), DAPI.he(), this.watchState(e));
    },
    victorySummary: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? DAPI.qm(t) : null;
    },
    victoryPreview: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t) return !1;
      let o = (DAPI.ct(t).guardianLevel || 0) + 1,
        r = DAPI.Ji(t, o);
      return (DAPI.jm(t, Object.assign({}, r, { until: Date.now() + DAPI.Xi }), o, !1), !0);
    },
    reminderNow: function () {
      return ((DAPI.n._lastGuardianReminderAt = 0), DAPI.ru(), !0);
    },
    profilesList: function () {
      let e = DAPI.Ft(),
        t = [];
      for (let o in e.profiles) {
        let r = e.profiles[o];
        t.push({
          profileKey: o,
          guardianLevel: r.guardianLevel || 0,
          sleepUntil: r.sleepUntil || 0,
          missedCount: r.missedCount || 0,
          seal: r.seal ? r.seal.id : null,
          watch: r.watch ? { nextAt: r.watch.nextAt, windowEnds: r.watch.windowEnds } : null,
        });
      }
      return t;
    },
    sealProbe: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return null;
      let o = DAPI.ct(t),
        r = o.seal,
        s = o.sleepUntil,
        c = o.sleepPenalty,
        l = Date.now() + 99999999;
      ((o.seal = null), (o.sleepUntil = 0), (o.sleepPenalty = 1), DAPI.ce());
      let u = (DAPI.n.planetIncome[t.id] && DAPI.n.planetIncome[t.id].energy) || 0,
        f = DAPI.ln(),
        h = { baseEnergy: u, baseScan: f };
      ((o.seal = { id: "energy_seal", until: l, level: 1 }),
        DAPI.ce(),
        (h.energySeal = u > 0 ? DAPI.n.planetIncome[t.id].energy / u : null),
        (o.seal = { id: "all_seal", until: l, level: 1 }),
        DAPI.ce(),
        (h.allSeal = u > 0 ? DAPI.n.planetIncome[t.id].energy / u : null),
        (o.seal = { id: "scan_seal", until: l, level: 1 }),
        (h.scanSeal = f > 0 ? DAPI.ln() / f : null),
        (o.seal = null),
        (o.sleepUntil = l),
        (o.sleepPenalty = 0.5),
        DAPI.ce(),
        (h.sleepIncome = u > 0 ? DAPI.n.planetIncome[t.id].energy / u : null),
        (h.sleepScan = f > 0 ? DAPI.ln() / f : null));
      let m = t.cells.find((g) => g && g.type === 3 && g.reserve > 0 && !g._destroyed && t.explored.has(g.id));
      if (m) {
        let g = DAPI.ta(m, t);
        ((o.seal = { id: "depletion_seal", until: l, level: 1 }), (h.depletion = g > 0 ? DAPI.ta(m, t) / g : null));
      }
      return ((o.seal = r || null), (o.sleepUntil = s || 0), (o.sleepPenalty = c || 1), DAPI.ce(), h);
    },
    profilePoke: function (e, t) {
      let o = DAPI.$[e || DAPI.n.activePlanetId];
      if (!o) return null;
      let r = DAPI.ct(o),
        s = ["missedCount", "sleepPenalty", "sleepUntil", "guardianLevel"];
      for (let c of s) t && c in t && (r[c] = Number(t[c]) || 0);
      return (t && "clearSeal" in t && t.clearSeal && (r.seal = null), DAPI.ce(), DAPI.he(), DAPI.se(), this.bossV4State(e));
    },
    bossClearCooldown: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return !1;
      let o = DAPI.Xt(t);
      return ((o.canReviveAt = 0), !0);
    },
    destroyedCount: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? t.cells.filter((o) => o && o._destroyed).length : -1;
    },
    rollSealProbe: function (e, t) {
      let o = DAPI.$[e || DAPI.n.activePlanetId];
      if (!o) return null;
      let r = DAPI.Ji(o, Number(t) || 1);
      return r ? r.id : null;
    },
    hpFormulaProbe: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? { idx: DAPI.Ki(t), hp: DAPI.Zi(t), level: DAPI.ps(t), echo: DAPI.n.currentEcho } : null;
    },
    hudRefresh: function () {
      try {
        DAPI.he();
      } catch {}
      try {
        DAPI.$g();
      } catch {}
      let e = document.getElementById("hud-watch-chip"),
        t = document.getElementById("fab-boss");
      return { chip: e ? e.textContent : null, chipTitle: e ? e.title : null, fabReady: t ? t.classList.contains("ready") : null };
    },
    treeState: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t) return null;
      let o = DAPI.lt(e),
        r = t._profileKey ? DAPI.go(t._profileKey) : null;
      return {
        pid: e,
        profileKey: t._profileKey,
        nodes: o.map((s) => ({
          id: s.id,
          tier: s.tier,
          cat: DAPI.Xd(s),
          owned: !!(r && r.treeNodes[s.id]),
          unlocked: DAPI.Qd(e, s),
          cost: DAPI.gs(e, s),
          effect: s.effect,
        })),
        owned: r ? Object.keys(r.treeNodes || {}).length : 0,
        total: o.length,
      };
    },
    treeBuy: function (e, t) {
      if (((e = e || DAPI.n.activePlanetId), !DAPI.$[e])) return { ok: !1, msg: "нет планеты" };
      let s = DAPI.lt(e).find((l) => l.id === t);
      if (!s) return { ok: !1, msg: "нет узла" };
      let c = DAPI.gs(e, s);
      return (c.iron && DAPI.At(e, "iron", c.iron + 1e3), c.research && (DAPI.n.research += c.research + 1e3), DAPI.Jd(e, t));
    },
    treeForceAll: function (e) {
      e = e || DAPI.n.activePlanetId;
      let o = DAPI.lt(e)
          .slice()
          .sort((s, c) => s.tier - c.tier),
        r = [];
      for (let s of o) {
        let c = this.treeBuy(e, s.id);
        r.push({ id: s.id, ok: !!(c && c.ok) });
      }
      return r;
    },
    treeInject: function (e, t) {
      if (((e = e || DAPI.n.activePlanetId), !DAPI.$[e])) return { ok: !1, msg: "нет планеты" };
      let r = DAPI.Gt,
        s = null;
      for (let u of ["climate", "surface", "arm", "role"]) for (let f in r[u]) for (let h of r[u][f]) h.id === t && (s = h);
      for (let u in r.special) r.special[u].id === t && (s = r.special[u]);
      if (!s) return { ok: !1, msg: "нет в пуле" };
      let c = DAPI.lt(e);
      c.some((u) => u.id === s.id) || c.push(s);
      let l = DAPI.gs(e, s);
      return (l.iron && DAPI.At(e, "iron", l.iron + 1e3), l.research && (DAPI.n.research += l.research + 1e3), DAPI.Jd(e, s.id));
    },
    treeMods: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = [
          "allMult",
          "energyMult",
          "ironMult",
          "kriogenMult",
          "rareMult",
          "crystalMult",
          "researchMult",
          "scanCostMult",
          "upgradeCostMult",
          "depletionMult",
          "maxReserveMult",
          "dormancyMult",
          "dormancySpeedup",
          "warehouseCellsMult",
          "coreEffectMult",
          "synthOutMult",
          "synthTimeMult",
          "offlineMult",
          "anomalyBonusMult",
          "watchIntervalMult",
          "energyExportMult",
        ],
        o = {};
      for (let r of t) o[r] = DAPI.mt(e, r);
      return (
        (o._sum_ironPerVeinLevel = DAPI.so(e, "ironPerVeinLevel")),
        (o._sum_synthSlots = DAPI.so(e, "synthSlots")),
        (o._sum_freeUpgradePerHour = DAPI.so(e, "freeUpgradePerHour")),
        (o._sum_restoreVeinPerHour = DAPI.so(e, "restoreVeinPerHour")),
        (o._sum_upgradeRefundChance = DAPI.so(e, "upgradeRefundChance")),
        (o._sum_freeResearchChance = DAPI.so(e, "freeResearchChance")),
        (o._flag_anomalyAllTypes = DAPI.mt(e, "anomalyAllTypes")),
        o
      );
    },
    treeProfiles: function () {
      let e = DAPI.Ft(),
        t = [];
      for (let o in e.profiles) {
        let r = e.profiles[o];
        t.push({
          profileKey: o,
          owned: Object.keys(r.treeNodes || {}).length,
          totalPurchased: r.treePurchased || 0,
          guardianLevel: r.guardianLevel || 0,
        });
      }
      return t;
    },
    treeResetProfile: function (e) {
      let t = DAPI.Ft();
      if (e == null) {
        let o = DAPI.$[DAPI.n.activePlanetId];
        o && (e = DAPI.tn(o));
      }
      delete t.profiles[e];
      for (let o in DAPI.$) {
        let r = DAPI.$[o];
        r && ((r._tree = null), (r._profileKey = null));
      }
      return (DAPI.se(), !0);
    },
    treeHourNow: function () {
      let e = DAPI.Ft();
      return ((e.treeHourAt = Date.now() - DAPI.Bm - 1), DAPI.Om(Date.now()), DAPI.ce(), DAPI.he(), !0);
    },
    treeIncomeProbe: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t) return null;
      let o = DAPI.go(DAPI.tn(t)),
        r = o.treeNodes;
      DAPI.ce();
      let s = Object.assign({}, DAPI.n.planetIncome[e] || {});
      ((o.treeNodes = {}), DAPI.ce());
      let c = Object.assign({}, DAPI.n.planetIncome[e] || {});
      ((o.treeNodes = r), DAPI.ce());
      let l = (u, f) => (f != null && f > 0 && u != null ? u / f : null);
      return {
        energy: l(s.energy, c.energy),
        iron: l(s.iron, c.iron),
        kriogen: l(s.kriogen, c.kriogen),
        crystals: l(s.crystals, c.crystals),
        energyAbs: s.energy || 0,
        crystalsAbs: s.crystals || 0,
        energyBase: c.energy || 0,
        crystalsBase: c.crystals || 0,
      };
    },
    treePool: function () {
      try {
        return JSON.parse(JSON.stringify(DAPI.Gt));
      } catch {
        return null;
      }
    },
    treeVeinProbe: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t) return null;
      let o = null;
      return (
        t.explored.forEach((r) => {
          if (o) return;
          let s = t.cells[r];
          s &&
            (s.type === 3 || s.type === 5) &&
            !s._destroyed &&
            DAPI.gt(s) &&
            (s.maxReserve || 0) > 0 &&
            ((o = { id: s.id, reserve: s.reserve || 0, maxReserve: s.maxReserve || 0 }), (s.reserve = 0), (o.reserve = 0), (o.drained = !0));
        }),
        o
      );
    },
    treeVeinState: function (e, t) {
      e = e || DAPI.n.activePlanetId;
      let o = DAPI.$[e];
      if (!o) return null;
      let r = o.cells[Number(t)];
      return r ? { id: r.id, reserve: r.reserve || 0, maxReserve: r.maxReserve || 0 } : null;
    },
    treeLevelSum: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t) return -1;
      let o = 0;
      return (
        t.explored.forEach((r) => {
          let s = t.cells[r];
          s && !s._destroyed && s.type !== 4 && s.type !== 6 && s.type !== 7 && (o += s.level || 0);
        }),
        o
      );
    },
    treeCostProbe: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t || e !== DAPI.n.activePlanetId) return null;
      let o = DAPI.go(DAPI.tn(t)),
        r = o.treeNodes,
        s = () => {
          let h = t.cells.find((m) => m && (m.type === 3 || m.type === 5) && (m.reserve || 0) > 0 && !m._destroyed && t.explored.has(m.id));
          return h ? DAPI.ta(h, t) : null;
        },
        c = DAPI.ln(),
        l = s();
      ((o.treeNodes = {}), DAPI.ce());
      let u = DAPI.ln(),
        f = s();
      return ((o.treeNodes = r), DAPI.ce(), { scanBase: u, scanTree: c, depBase: f, depTree: l, warehouseCap: DAPI.Hf(t), craftSlots: DAPI.qn() });
    },
    craftSlotsNow: function () {
      return DAPI.qn();
    },
    treeOpenModal: function () {
      try {
        return (DAPI.Lk(), document.getElementById("planet-tree-modal").style.display === "block");
      } catch {
        return !1;
      }
    },
    treePanelBadge: function () {
      try {
        DAPI.Lt();
      } catch {}
      let e = document.getElementById("planet-tree-badge");
      return e ? e.textContent : null;
    },
    linkState: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t) return null;
      let o = DAPI.tn(t),
        r = DAPI.Mm(t),
        s = DAPI.lt(e),
        c = t.role ? DAPI.kt[t.role] : null,
        l = c && DAPI.Gt.role[t.role] ? DAPI.Gt.role[t.role].map((u) => u.id) : [];
      return {
        profileKey: o,
        role: t.role || null,
        roleName: c ? c.name : "—",
        guardianLevel: r.guardianLevel || 0,
        sleepUntil: r.sleepUntil || 0,
        sleeping: DAPI.Wo(t),
        sleepMult: DAPI.ms(t),
        missedCount: r.missedCount || 0,
        pactActive: DAPI.Cm(t),
        watchIntervalMs: DAPI.hs(t),
        treeCount: s.length,
        treeOwned: Object.keys(r.treeNodes || {}).length,
        treeNodes: s.map((u) => ({ id: u.id, tier: u.tier, owned: !!r.treeNodes[u.id], isRoleNode: l.includes(u.id) })),
        allProfiles: Object.keys(DAPI.Ft().profiles).length,
      };
    },
    linkListProfiles: function () {
      let e = DAPI.Ft(),
        t = [];
      for (let o in e.profiles) {
        let r = e.profiles[o];
        t.push({
          profileKey: o,
          guardianLevel: r.guardianLevel || 0,
          treeOwned: Object.keys(r.treeNodes || {}).length,
          sleepUntil: r.sleepUntil || 0,
          missedCount: r.missedCount || 0,
        });
      }
      return t;
    },
    linkForceRoleChange: function (e, t) {
      e = e || DAPI.n.activePlanetId;
      let o = DAPI.$[e];
      if (!o || !DAPI.kt[t]) return !1;
      ((o.role = t), (o.calling = t), (o._tree = null), (o._profileKey = null), DAPI.ce());
      try {
        DAPI.Lt();
      } catch {}
      try {
        let r = document.getElementById("planet-tree-modal");
        r && r.style.display === "block" && DAPI.Pg();
      } catch {}
      return (DAPI.he(), this.linkState(e));
    },
    linkRecomputeTree: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      return t ? ((t._tree = null), (t._profileKey = null), DAPI.lt(e), this.linkState(e)) : !1;
    },
    hudIcons: function () {
      let e = document.getElementById("hud-tree-icons");
      return e
        ? {
            title: e.title,
            html: e.innerHTML,
            spans: (e.innerHTML.match(/<span/g) || []).length,
            parent: e.parentElement ? e.parentElement.id : null,
          }
        : null;
    },
    hudIconsRefresh: function () {
      try {
        DAPI.he();
      } catch {}
      return this.hudIcons();
    },
    roleChangeProbe: function (e, t) {
      e = e || DAPI.n.activePlanetId;
      let o = DAPI.$[e];
      if (!o || !DAPI.kt[t]) return null;
      let r = { role: o.role || null, profileKey: DAPI.tn(o), treeNodeCount: DAPI.lt(e).length };
      ((o.role = t), (o.calling = t), (o._tree = null), (o._profileKey = null));
      let s = { role: o.role, profileKey: DAPI.tn(o), treeNodeCount: DAPI.lt(e).length };
      DAPI.ce();
      try {
        DAPI.Lt();
      } catch {}
      return (DAPI.he(), { before: r, after: s });
    },
    eventProfile: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.ka[(DAPI.$[e] && DAPI.$[e].armId) || "inter"] || DAPI.ka.inter,
        o = DAPI.sc(e),
        r = DAPI.wa(e);
      return {
        pid: e,
        base: { positive: t.positive, mixed: t.mixed, negative: t.negative, rewardMult: t.rewardMult, flavor: t.flavor },
        treeMods: r || null,
        final: {
          positive: o.positive,
          mixed: o.mixed,
          negative: o.negative,
          rewardMult: o.rewardMult,
          eventSpeed: o.eventSpeed,
          comboChance: o.comboChance,
          flavor: o.flavor,
        },
        comboWindowMs: DAPI.Wk(e),
      };
    },
    eventRollPreview: function (e, t) {
      ((e = e || DAPI.n.activePlanetId), (t = Math.min(50, Number(t) || 10)));
      let o = { positive: 0, mixed: 0, negative: 0 };
      for (let r = 0; r < t; r++) {
        let s = DAPI.Cg(DAPI.$[e]);
        s && o[s.polarity] !== void 0 && o[s.polarity]++;
      }
      return o;
    },
    treeCardPreview: function (e, t) {
      e = e || DAPI.n.activePlanetId;
      let o = DAPI.$[e];
      if (!o) return null;
      DAPI.lt(e);
      let r = o._profileKey ? DAPI.go(o._profileKey) : null;
      if (!r) return null;
      let c = DAPI.lt(e).find((l) => l.id === t);
      return c ? DAPI.Ek(e, c, r) : null;
    },
    treeSummary: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t) return null;
      let o = DAPI.wa(e);
      DAPI.lt(e);
      let r = t._profileKey ? DAPI.go(t._profileKey) : null,
        s = DAPI.lt(e),
        c = (r && r.treeNodes) || {};
      return {
        owned: s.filter((l) => c[l.id]).length,
        total: s.length,
        t1: s.filter((l) => c[l.id] && l.tier === 1).length,
        t2: s.filter((l) => c[l.id] && l.tier === 2).length,
        t3: s.filter((l) => c[l.id] && l.tier === 3).length,
        eventMods: o,
        byCategory: (() => {
          let l = {};
          for (let u of s) {
            let f = DAPI.Xd(u);
            (l[f] || (l[f] = { owned: 0, total: 0 }), l[f].total++, c[u.id] && l[f].owned++);
          }
          return l;
        })(),
      };
    },
    treeMapHtml: function () {
      return DAPI.Eg();
    },
    treeMapSelect: function (e) {
      DAPI.n._treeSelectedNodeId = e || null;
      let t = document.getElementById("planet-tree-map-view");
      return (t && (t.innerHTML = DAPI.Eg()), DAPI.Mk(), { selected: DAPI.n._treeSelectedNodeId });
    },
    treeMapViewMode: function (e) {
      return (e && DAPI.Sk(e), DAPI.n._treeViewMode);
    },
    treeMapGrid: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.lt(e);
      return DAPI._k(t);
    },
    guardianLinePreview: function (e, t, o) {
      e = e || DAPI.n.activePlanetId;
      let r = DAPI.$[e];
      if (!r) return null;
      let c = DAPI.ct(r).guardianLevel || 0,
        l = o || DAPI.ya(c || 1),
        u = t || DAPI.Gm(r, "win");
      return { form: l, level: c, context: u, line: DAPI.ic(r, l, u), allContexts: Object.keys(DAPI.cu[l] || {}) };
    },
    guardianLineAll: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t) return null;
      let o = DAPI.ct(t),
        r = DAPI.ya(o.guardianLevel || 1),
        s = {};
      for (let c in DAPI.cu[r]) s[c] = DAPI.ic(t, r, c);
      return { form: r, lines: s };
    },
    weaveState: function () {
      return { weaves: DAPI.yn().weaves };
    },
    echoSlots: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      return t
        ? DAPI.ec(t).map((o, r) => ({
            idx: r,
            unlocked: r === 0 || !!t["__echoSlot_" + r + "_unlocked"],
            cost: r === 0 ? null : DAPI.eu(r),
            slot: o ? { sourcePid: o.sourcePid, nodeId: o.nodeId, share: o.share, kind: o.kind } : null,
          }))
        : null;
    },
    echoRelation: function (e, t) {
      return DAPI.tu(e, t);
    },
    echoMods: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = [
          "allMult",
          "energyMult",
          "ironMult",
          "kriogenMult",
          "rareMult",
          "crystalMult",
          "researchMult",
          "scanCostMult",
          "depletionMult",
          "synthTimeMult",
          "offlineMult",
        ],
        o = {};
      for (let r of t) o[r] = DAPI.fn(e, r);
      return o;
    },
    echoWeave: function (e, t, o, r) {
      return DAPI.Am(e || DAPI.n.activePlanetId, t, o, r);
    },
    echoUnweave: function (e, t) {
      return DAPI.Rm(e || DAPI.n.activePlanetId, t);
    },
    echoUnlockSlot: function (e, t) {
      return DAPI.Lm(e || DAPI.n.activePlanetId, t);
    },
    echoUsage: function (e, t) {
      return DAPI.nu(e, t);
    },
    echoOpenModal: function (e) {
      return (e && DAPI.ge.setActivePlanet(e), DAPI.Rk(), !0);
    },
    echoNetwork: function () {
      let e = DAPI.bo();
      return Object.assign({}, e, { armsConnected: Array.from(e.armsConnected) });
    },
    treeNodeById: function (e) {
      for (let t in DAPI.$) {
        let o = DAPI.$[t];
        if (!o || !o._tree) continue;
        let r = o._tree.find((s) => s.id === e);
        if (r) return r;
      }
      return null;
    },
    echoStoryState: function () {
      let e = DAPI.Pt(),
        t = DAPI.bo();
      return {
        unlocked: Object.keys(e.unlocked),
        unlockedCount: Object.keys(e.unlocked).length,
        total: DAPI.ur.length,
        bonusPct: +((DAPI.od() - 1) * 100).toFixed(2),
        memories: Object.keys(e.planetMemories || {}).length,
        state: {
          totalWeaves: t.totalWeaves,
          uniqueTargets: t.uniqueTargets,
          armsConnected: Array.from(t.armsConnected),
          planetsWithMultiple: t.planetsWithMultipleEchoes,
          maxGuardianLevel: t.maxGuardianLevel,
        },
      };
    },
    echoStoryCheck: function () {
      return ((DAPI.n._lastEchoStoryCheckAt = 0), DAPI.sd(), this.echoStoryState());
    },
    echoStoryForce: function (e) {
      let t = DAPI.Pt();
      return DAPI.ur.find((r) => r.id === e) ? ((t.unlocked[e] = Date.now()), DAPI.ce(), DAPI.he(), !0) : !1;
    },
    echoStoryUnlockAll: function () {
      let e = DAPI.Pt(),
        t = Date.now();
      for (let o of DAPI.ur) e.unlocked[o.id] = t;
      return (
        DAPI.ce(),
        DAPI.he(),
        document.getElementById("echo-story-modal")?.style.display === "block" && DAPI.cf(),
        Object.keys(e.unlocked).length
      );
    },
    echoStoryReset: function () {
      let e = DAPI.Pt();
      return ((e.unlocked = {}), (e.planetMemories = {}), DAPI.ce(), DAPI.he(), !0);
    },
    echoMemoryFor: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t) return null;
      let o = DAPI.$p(t),
        r = DAPI.Pt();
      return { profileKey: o.key, title: o.title, text: o.text, unlocked: !!r.planetMemories[o.key] };
    },
    echoOpenStory: function () {
      return (DAPI.Tk(), this.echoStoryState());
    },
    heartState: function () {
      let e = DAPI.Cn(),
        t = DAPI.os(),
        o = DAPI.Ip();
      return {
        unlocked: DAPI.Ai(),
        fold: e.fold || 0,
        awakening: !!e.awakening,
        keptEchoes: (e.keptEchoes || []).length,
        stage: t ? { name: t.name, allMult: t.allMult, echoKept: t.echoKept } : null,
        next: o ? { name: o.name, fold: o.fold, allMult: o.allMult, echoKept: o.echoKept } : null,
        bonus: DAPI.cd(),
        energyFromGuardians: DAPI.ld(),
        weavesInNetwork: DAPI.id(),
      };
    },
    heartFold: function () {
      return DAPI.dd();
    },
    heartOpen: function () {
      return (DAPI.Ak(), this.heartState());
    },
    heartForceFold: function (e) {
      for (let t = 0; t < (e || 1); t++) {
        let o = DAPI.yn();
        (o.weaves || (o.weaves = {}), o.weaves.ferrum || (o.weaves.ferrum = new Array(DAPI.io).fill(null)));
        for (let r = 0; r < DAPI.io; r++)
          o.weaves.ferrum[r] || (o.weaves.ferrum[r] = { sourcePid: "krios", nodeId: "__dummy__" + r, share: 0.4, kind: "adjacent", at: Date.now() });
        (DAPI.yo(), DAPI.dd());
      }
      return this.heartState();
    },
    heartReset: function () {
      return (DAPI.Ri(), DAPI.ce(), DAPI.he(), this.heartState());
    },
    finalFragmentState: function () {
      let e = DAPI.ud();
      return { open: DAPI.fd(), ready: e.ready, done: e.done, total: e.total, conditions: e.conditions, bonus: DAPI.Tp() };
    },
    finalFragmentForceReady: function () {
      let e = DAPI.Pt(),
        t = Date.now();
      for (let c of DAPI.ur) e.unlocked[c.id] = t;
      let o = DAPI.Cn();
      ((o.fold = 8),
        (o.awakening = !0),
        (!o.keptEchoes || !o.keptEchoes.length) &&
          (o.keptEchoes = [{ targetPid: "ferrum", slotIdx: 0, sourcePid: "krios", nodeId: "tem_growth", share: 0.4, kind: "adjacent" }]));
      let r = DAPI.yn();
      r.weaves || (r.weaves = {});
      let s = ["forge", "frost", "life", "void", "core"];
      for (let c = 0; c < s.length; c++) {
        let l = "__qa_arm_" + c;
        DAPI.$[l] ||
          (DAPI.$[l] = {
            id: l,
            name: "QA-" + s[c],
            armId: s[c],
            seed: 9e3 + c,
            role: null,
            _profileKey: "__qa:" + c,
            cells: [],
            explored: new Set(),
            resourceList: [],
          });
        let u = "__qa_arm_" + ((c + 1) % s.length);
        r.weaves[l] = [{ sourcePid: u, nodeId: "__qa__", share: 0.4, kind: "adjacent", at: t }, null, null, null, null];
      }
      DAPI.yo();
      try {
        let c = DAPI.ct(DAPI.$.ferrum);
        c && (c.guardianLevel = 12);
      } catch {}
      return (DAPI.ce(), this.finalFragmentState());
    },
    finalFragmentCeremony: function () {
      return (DAPI.Dk(), !0);
    },
    finalFragmentOpenNow: function () {
      return DAPI.Cp();
    },
    finalFragmentReset: function () {
      let e = DAPI.Pt();
      delete e.unlocked[DAPI.Gn.id];
      let t = document.getElementById("planet-hud-name") || document.getElementById("planet-badge");
      return (t && ((t.textContent = (t.textContent || "").replace(/^✦\s*/, "")), (t.style.textShadow = "")), DAPI.ce(), DAPI.he(), !0);
    },
    armNetwork: function () {
      return DAPI.Li();
    },
    armNetworkFor: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? { armId: t.armId, mult: DAPI.Ap(t.armId), entry: DAPI.Li()[t.armId] || null } : null;
    },
    newWeaveState: function () {
      return { active: DAPI.fr(), flag: !!DAPI.Cn().newWeave, copiesMax: DAPI.pd(), foldCost: DAPI.ns };
    },
    newWeaveSet: function (e) {
      let t = DAPI.Cn();
      return ((t.newWeave = !!e), (DAPI.pr.epoch = -1), DAPI.yo(), DAPI.ce(), this.newWeaveState());
    },
    echoLinksHtml: function (e) {
      return DAPI.Rp(DAPI.$[e || DAPI.n.activePlanetId]);
    },
    dispatcherWakeNow: function (e) {
      return (DAPI.df(e || "qa"), { wakeups: DAPI.Jt.stats.wakeups || 0, lastRunAt: DAPI.Jt.lastRunAt });
    },
    expandRoute: function (e) {
      return DAPI.wk(e);
    },
    researchCells: function () {
      let e = [];
      for (let t in DAPI.$) {
        let o = DAPI.$[t];
        if (o)
          for (let r of o.cells)
            r.type === 6 && e.push({ pid: t, cellId: r.id, level: r.level || 0, explored: o.explored.has(r.id), destroyed: !!r._destroyed });
      }
      return e;
    },
    rcellUp: function (e, t, o) {
      let r = DAPI.$[e || DAPI.n.activePlanetId];
      if (!r) return !1;
      let s = t != null ? r.cells[t] : r.cells.find((l) => l.type === 6);
      if (!s || s.type !== 6) return !1;
      ((DAPI.n.energy = 1e13), (DAPI.n.crystals = 1e9), (DAPI.n.research = 1e13));
      for (let l in DAPI.n.extraResources) DAPI.n.extraResources[l] = 1e9;
      let c = 0;
      for (let l = 0; l < (o || 1) && DAPI.x0(s).ok; l++) c++;
      return (DAPI.ce(), { upgrades: c, level: s.level, rate: DAPI.Sr() });
    },
    researchBreakdown: function () {
      let e = 0,
        t = 0,
        o = 0,
        r = 0,
        s = 0;
      for (let l in DAPI.$) {
        if (!DAPI.n.unlockedPlanets.has(l)) continue;
        let u = DAPI.$[l];
        if (!u) continue;
        let f = DAPI.Co(l, "research");
        u.explored.forEach((h) => {
          let m = u.cells[h];
          !m ||
            m._destroyed ||
            ((e += 0.003 * f),
            m.type === 0 && (t += (m.level || 0) * 0.002 * f),
            (m.type === 3 || m.type === 5) && (m.level || 0) > 0 && (o += m.level * 0.001 * f),
            m.type === 4 && (r += 0.05 * (1 + (m.level || 0)) * (m.isDeep ? 2 : 1) * f),
            m.type === 6 && (s += DAPI.ci * Math.min(DAPI.Pn, m.level || 0) * f));
        });
      }
      let c = DAPI.zg();
      return {
        mult: +c.toFixed(3),
        cellsBase: +(e * c).toFixed(3),
        cellLevels: +(t * c).toFixed(3),
        veins: +(o * c).toFixed(3),
        anomalies: +(r * c).toFixed(3),
        researchCells: +(s * c).toFixed(3),
        total: +DAPI.Sr().toFixed(3),
      };
    },
    bossPunishNow: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? (DAPI.Xt(t), DAPI.ix(t), this.bossState(e)) : !1;
    },
    startBossFightForTest: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t
        ? (t.cells.forEach((o) => {
            (t.revealed.add(o.id), t.explored.add(o.id));
          }),
          DAPI.us(t.id),
          !!DAPI.n.bossFight)
        : !1;
    },
    bossLive: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? DAPI.Xt(t) : null;
    },
    renderPanel: function () {
      DAPI.Lt();
      let e = document.getElementById("planet-panel-content"),
        t = e ? e.innerHTML : "";
      return { len: t.length, guardDefeated: t.includes("Хранитель повержен"), wakeBtn: t.includes("planet-panel-boss") };
    },
    bossFightState: function () {
      return DAPI.n.bossFight ? Object.assign({}, DAPI.n.bossFight) : null;
    },
    toggleFullscreen: function () {
      return DAPI.xd();
    },
    fullscreenOn: function () {
      return !!DAPI.bd();
    },
    closeModalsForTest: function () {
      return (DAPI._t(), { boss: !!DAPI.n.bossFight, sonar: !!DAPI.Ln.active });
    },
    deficitFn: function (e) {
      let t = Number(e) || 1;
      return { idx: t, prod: DAPI.sr(t), deplete: DAPI.Wr(t) };
    },
    deficitOf: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? { idx: t.planetIndex || 1, hidden: t.biome === "hidden", prod: DAPI.sr(t.planetIndex), deplete: DAPI.Wr(t.planetIndex) } : null;
    },
    costProbe: function (e, t, o) {
      let r = DAPI.$[o || DAPI.n.activePlanetId];
      if (!r) return null;
      let s = t == null ? 0 : Number(t) || 0,
        c = { type: s, level: Math.max(0, Number(e) || 0) };
      return ((s === 3 || s === 5) && (c.resourceKey = (r.resourceList && r.resourceList[0]) || "iron"), DAPI.zn(c, r));
    },
    ladderRowProbe: function (e, t) {
      return DAPI.yl(e === "res" ? DAPI.y0 : DAPI.g0, Math.max(0, Number(t) || 0));
    },
    foreignCross: function (e, t) {
      let o = DAPI.$[t || DAPI.n.activePlanetId];
      return DAPI._0(Math.max(0, Number(e) || 0), o);
    },
    planetKeys: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t
        ? {
            idx: t.planetIndex || 1,
            armId: t.armId || null,
            local: DAPI.ii(t),
            arm: [...DAPI.w0(t)],
            excluded: [...DAPI.M0(t)],
            resList: (t.resourceList || []).slice(),
          }
        : null;
    },
    discoverWorldForTest: function (e) {
      return (DAPI.ge.discoverPlanet(e == null ? {} : { seed: e >>> 0 }), DAPI.Nr());
    },
    loopErrCount: function () {
      return DAPI.n._loopErrCount;
    },
    bfVisualState: function () {
      return DAPI.n.bfv
        ? {
            formId: DAPI.n.bfv.formId,
            flash: +DAPI.n.bfv.flash.toFixed(2),
            shake: +DAPI.n.bfv.shake.toFixed(2),
            slip: +DAPI.n.bfv.slip.toFixed(2),
            sparks: DAPI.n.bfv.sparks.length,
            hasCtx: !!DAPI.n.bfvCtx,
          }
        : null;
    },
    bfVisualHitForTest: function () {
      return (DAPI.xg(), !0);
    },
    bfVisualBreakForTest: function () {
      return (DAPI.kg(), !0);
    },
    bfVisualSlipForTest: function () {
      return (DAPI.wg(), !0);
    },
    bfSquashForTest: function () {
      return DAPI.n.bossFight ? ((DAPI.n.bossFight.hpPhase[DAPI.n.bossFight.phase] = 1), DAPI.Ua(), !0) : !1;
    },
    prominenceProbe: function (e) {
      try {
        let t = DAPI.hi(e || "rich");
        return { frames: t.length, size: (t[0] && t[0].width) || 0 };
      } catch (t) {
        return { err: String((t && t.message) || t) };
      }
    },
    prominenceStateProbe: function (e, t, o) {
      let r = DAPI.$[t || DAPI.n.activePlanetId],
        s = r && r.cells[Number(e)];
      return !s || (s.type !== 1 && s.type !== 2) ? null : DAPI.F0(s, o ? Number(o) : Date.now());
    },
    premiumBannerProbe: function () {
      try {
        return DAPI.lu();
      } catch (e) {
        return "ERR:" + ((e && e.message) || e);
      }
    },
    guardianPanelProbe: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? DAPI._g(t) : null;
    },
    forceOverlord: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return !1;
      let o = DAPI.Yd(t);
      return ((o.guardianDefeated = !0), (o.overlordNextAt = 0), !0);
    },
    failOverlordNow: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? (DAPI.zv(t), !0) : !1;
    },
    forceCollapse: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? (DAPI.Wm(t), !0) : !1;
    },
    recoverPlanet: function (e) {
      return DAPI.sx(e || DAPI.n.activePlanetId);
    },
    echoState: function () {
      return { currentEcho: DAPI.n.currentEcho, essence: DAPI.n.essence };
    },
    guardianState: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? { guardian: t.guardian || null, nextForm: (DAPI.Vo(t) || {}).id || null } : null;
    },
    startGuardianForTest: function (e, t) {
      let o = DAPI.$[e || DAPI.n.activePlanetId];
      if (!o) return !1;
      let r = DAPI.ba.find((s) => s.id === t) || DAPI.ba[1];
      return (DAPI.us(o.id, r), !0);
    },
    assignCalling: function (e, t) {
      let o = DAPI.$[e || DAPI.n.activePlanetId];
      return !o || !DAPI.kt[t] ? !1 : ((o.role = t), (o.calling = t), DAPI.ce(), DAPI.he(), DAPI.se(), !0);
    },
    chainForce: function (e) {
      return ((DAPI.n.chainProgress = Math.max(0, Math.min(DAPI.xa.length, e | 0))), DAPI.rc(), DAPI.se(), DAPI.n.chainProgress);
    },
    chainState: function () {
      return { progress: DAPI.n.chainProgress, step: DAPI.xa[DAPI.n.chainProgress] || null };
    },
    bossRestoreAll: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      if (!t) return !1;
      for (let o of t.cells) o && o._destroyed && ((o._restoreAt = 0), DAPI.ac(e, o.id, { silent: !0 }));
      return (DAPI.ce(), DAPI.he(), !0);
    },
    bossDestroyedCells: function (e) {
      e = e || DAPI.n.activePlanetId;
      let t = DAPI.$[e];
      return t
        ? t.cells
            .filter((o) => o && o._destroyed)
            .map((o) => ({
              id: o.id,
              type: o.type,
              level: o.level,
              restoreIn: Math.max(0, (o._restoreAt || 0) - Date.now()),
              cost: o._restoreCost || DAPI.ro(o),
            }))
        : [];
    },
    bossSimulateMiss: function (e) {
      if (!DAPI.n.bossSession) return !1;
      for (
        let t = 0;
        t < (e || 1) &&
        !(
          !DAPI.n.bossSession ||
          (DAPI.n.bossSession.active || ((DAPI.n.bossSession.index = Math.min(DAPI.n.bossSession.index, DAPI.n.bossSession.seq.length - 1)), void 0),
          !DAPI.n.bossSession || !DAPI.n.bossSession.active)
        );
        t++
      );
      return DAPI.n.bossSession
        ? {
            misses: DAPI.n.bossSession.misses,
            maxMisses: DAPI.n.bossSession.maxMisses || 5,
            alive: DAPI.n.bossSession.misses < (DAPI.n.bossSession.maxMisses || 5),
          }
        : { sessionEnded: !0 };
    },
    bossForceWin: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return !1;
      let o = DAPI.Xt(t);
      return ((o.hp = 0), DAPI.n.bossFight && DAPI.km("win"), DAPI.se(), !0);
    },
    bossStartFight: function (e) {
      return (DAPI.qd(e || DAPI.n.activePlanetId), DAPI.n.bossSession ? { points: DAPI.n.bossSession.seq.length } : null);
    },
    bossDamage: function (e, t) {
      let o = DAPI.$[t || DAPI.n.activePlanetId];
      if (!o) return !1;
      let r = DAPI.Xt(o);
      return (
        (r.hp = Math.max(0, r.hp - (Number(e) || 100))),
        r.hp <= 0 && !r.defeated && DAPI.n.bossFight && DAPI.km("win"),
        DAPI.he(),
        DAPI.se(),
        this.bossState(t)
      );
    },
    bossHeal: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return !1;
      let o = DAPI.Xt(t);
      return ((o.hp = o.maxHp), (o.defeated = !1), (o.reward = null), DAPI.he(), DAPI.se(), !0);
    },
    bossReset: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? ((t.boss = null), DAPI.Xt(t), DAPI.he(), DAPI.se(), !0) : !1;
    },
    openBoss: function (e) {
      return (DAPI.qd(e || DAPI.n.activePlanetId), this.bossState(e));
    },
    fullExplore: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t
        ? (t.cells.forEach((o) => {
            (t.revealed.add(o.id), t.explored.add(o.id));
          }),
          DAPI.ce(),
          DAPI.he(),
          DAPI.se(),
          !0)
        : !1;
    },
    chronicle: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      if (!t) return null;
      let o = DAPI.ul(t);
      return {
        id: t.id,
        name: t.name,
        isUnique: !!t.isUnique,
        planetIndex: t.planetIndex,
        loreMaxInsight: DAPI.n.loreMaxInsight,
        openedCount: o.filter((r) => !r.locked).length,
        totalCount: o.length,
        fragments: o.map((r) => ({ fig: r.index + 1, tier: r.tier, requires: r.requires, locked: r.locked, text: r.locked ? null : r.text })),
      };
    },
    setLoreDepth: function (e) {
      return ((DAPI.n.loreMaxInsight = Math.max(0, Number(e) || 0)), DAPI.se(), DAPI.n.loreMaxInsight);
    },
    discoveryWave: function (e, t) {
      let o = DAPI.$[e || DAPI.n.activePlanetId];
      if (!o) return !1;
      let r = t || (o.palette && o.palette.border) || "#7ee7ff";
      return (DAPI.wf(r), { ok: !0, color: r });
    },
    resetVisit: function (e) {
      let t = DAPI.$[e || DAPI.n.activePlanetId];
      return t ? ((t._visited = !1), DAPI.se(), { id: t.id, visited: !1 }) : !1;
    },
    waveState: function () {
      return {
        active: DAPI.n.discoveryWave.active,
        color: DAPI.n.discoveryWave.color,
        sparks: DAPI.n.discoveryWave.sparks.length,
        tSinceStart: DAPI.n.discoveryWave.active ? performance.now() - DAPI.n.discoveryWave.t0 : 0,
      };
    },
    premiumState: function () {
      return {
        db: DAPI.cc(),
        autoScanUntil: DAPI.n.premium.autoScanUntil,
        autoUpgradeUntil: DAPI.n.premium.autoUpgradeUntil,
        autoTransportUntil: DAPI.n.premium.autoTransportUntil,
        dispatcherUntil: DAPI.n.premium.dispatcherUntil,
        codes: DAPI.n.premium.activatedCodes.length,
        effective: {
          scan: DAPI.$t("autoScan"),
          upgrade: DAPI.$t("autoUpgrade"),
          transport: DAPI.$t("autoTransport"),
          dispatcher: DAPI.$t("dispatcher"),
        },
        remaining: {
          scan: DAPI.nn("autoScan"),
          upgrade: DAPI.nn("autoUpgrade"),
          transport: DAPI.nn("autoTransport"),
          dispatcher: DAPI.nn("dispatcher"),
        },
      };
    },
    premiumActivate: async function (e) {
      return await DAPI.Zm(e);
    },
    premiumDb: function () {
      return DAPI.cc();
    },
    premiumGrant: function (e, t) {
      t = Number(t) || 30;
      let o = t * 864e5,
        r = Date.now(),
        s = (c) => {
          DAPI.n.premium[c] = Math.max(DAPI.n.premium[c] || 0, r) + o;
        };
      if (e === "all" || e === "vip") (s("autoScanUntil"), s("autoUpgradeUntil"), s("autoTransportUntil"), s("dispatcherUntil"));
      else if (e === "autoScan") s("autoScanUntil");
      else if (e === "autoUpgrade") s("autoUpgradeUntil");
      else if (e === "autoTransport") s("autoTransportUntil");
      else if (e === "dispatcher") s("dispatcherUntil");
      else return !1;
      return (DAPI.fu(), DAPI.bs(), DAPI.xr(), DAPI.Sa(), !0);
    },
    premiumReset: function () {
      return (
        (DAPI.n.premium.autoScanUntil = 0),
        (DAPI.n.premium.autoUpgradeUntil = 0),
        (DAPI.n.premium.autoTransportUntil = 0),
        (DAPI.n.premium.dispatcherUntil = 0),
        (DAPI.n.premium.activatedCodes = []),
        (DAPI.n.premium.activationLog = []),
        DAPI.fu(),
        DAPI.bs(),
        DAPI.xr(),
        DAPI.Sa(),
        DAPI.n.premium
      );
    },
    dispatcherState: function () {
      return {
        enabled: DAPI.$t("dispatcher"),
        nonstop: DAPI.Jt.nonstop,
        interval: DAPI.Jt.nonstop ? DAPI.Jt.nonstopIntervalMs : DAPI.Jt.intervalMs,
        stats: { ...DAPI.Jt.stats },
        lastRunAt: DAPI.Jt.lastRunAt,
        lastCheckAt: DAPI.Jt.lastCheckAt,
        idleSince: DAPI.Jt.idleSince,
        log: DAPI.Jt.log.slice(0, 10),
      };
    },
    dispatcherRunNow: function () {
      return ((DAPI.Jt.lastRunAt = -1e12), DAPI.Qg(performance.now()), this.dispatcherState());
    },
    dispatcherDemands: function () {
      return DAPI.cw();
    },
    dispatcherClear: function () {
      return (
        (DAPI.Jt.log = []),
        (DAPI.Jt.stats = { sent: 0, mass: 0, skipped: 0, multi: 0, wakeups: 0, checks: 0 }),
        (DAPI.Jt.lastIdleLogAt = 0),
        (DAPI.Jt.lastCheckAt = 0),
        !0
      );
    },
    sendMulti: function (e, t) {
      return DAPI.xp(e, t);
    },
    buildRoute: function (e, t) {
      return DAPI.Mg(e, t);
    },
    tspOrder: function (e, t) {
      return DAPI.wp(e, t);
    },
    routeDist: function (e, t) {
      return DAPI.Ci(e, t);
    },
    clearRouteDist: function () {
      return (DAPI.es(), DAPI.cr.size);
    },
    routeCacheSize: function () {
      return DAPI.cr.size;
    },
    scanMult: function (e) {
      return DAPI.js(e);
    },
    sparksState: function () {
      return {
        sparks: DAPI.n.planetSparks.length,
        pending: DAPI.n.pendingPlanetAnims.length,
        arrivals: DAPI.n.arrivalEffects.length,
        cooldown: Math.max(0, DAPI.n.planetAnimCooldownUntil - Date.now()),
      };
    },
    introState: function () {
      return DAPI.n.gameIntro ? { phase: DAPI.n.gameIntro.phase } : null;
    },
    introSkip: function () {
      return ((DAPI.n.gameIntro = null), (DAPI.n.crashLanding.active = !1), (DAPI.n.crashLanding.progress = 1), (DAPI.n.zoom = 0.98), !0);
    },
    hygieneState: function () {
      return {
        particles: DAPI.n.particles.length,
        texts: DAPI.n.floatingTexts.length,
        meteors: DAPI.n.meteorites.length,
        particleCap: DAPI.BAL.hygiene.particleCap,
        textCap: DAPI.R0,
        meteorCap: DAPI.U0,
      };
    },
    hygieneStress: function (e) {
      let t = Math.max(1, Number(e) || 300);
      for (let o = 0; o < t; o++) DAPI.He(50 + (o % 200), 80 + (o % 120), "✦", "#ffe88a");
      for (let o = 0; o < t; o++) DAPI.z0(o % 800, 40 + (o % 300), 120, -30, 7);
      return this.hygieneState();
    },
    hygieneClear: function () {
      return ((DAPI.n.floatingTexts.length = 0), (DAPI.n.meteorites.length = 0), this.hygieneState());
    },
    backupInfo: function () {
      let e = window.__V && window.__V.save;
      return e && e.saveBackupInfo ? e.saveBackupInfo() : null;
    },
    dispatchRankScore: function (e) {
      let t = window.__V && window.__V.dispatch;
      return t && t.upgradeRankScore ? t.upgradeRankScore(e) : null;
    },
    iconCoverage: function () {
      let e = { resources: [], compounds: [], currencies: [], missing: [] };
      for (let t in DAPI.te) DAPI.te[t].hidden || (DAPI.$r[t] ? e.resources : e.missing).push(t);
      for (let t in DAPI.je) (DAPI.$r[t] ? e.compounds : e.missing).push(t);
      for (let t in DAPI.Ns) (DAPI.$r[t] ? e.currencies : e.missing).push(t);
      return e;
    },
    iconPreview: function (e, t) {
      return DAPI.Ir(e || "iron", Number(t) || 32);
    },
    iconFallbackReport: function () {
      let e = [],
        t = (o) => {
          let r = DAPI.Ir(o, 16);
          r.indexOf("<svg") === -1 && e.push({ key: o, html: r });
        };
      for (let o in DAPI.te) DAPI.te[o].hidden || t(o);
      for (let o in DAPI.je) t(o);
      for (let o in DAPI.Ns) t(o);
      return e;
    },
    /* ---- v0.0.12.0: баланс, гигиена, «Следы друга», «Раскол», снапшот для багрепорта ---- */
    balanceExport: function (e) {
      var B = window.VORONIA_BALANCE || {},
        rows = [];
      (function w(o, p) {
        for (var k in o) {
          if (!Object.prototype.hasOwnProperty.call(o, k)) continue;
          var v = o[k],
            np = p ? p + "." + k : k;
          if (v && typeof v === "object") w(v, np);
          else rows.push({ путь: np, значение: typeof v === "function" ? "fn" : v });
        }
      })(B, "");
      rows.sort(function (a, b) {
        return a["путь"] < b["путь"] ? -1 : 1;
      });
      if (e !== false) {
        try {
          console.table(rows);
        } catch (x) {}
      }
      return rows;
    },
    balancePath: function (e) {
      return window.__VBALGET(e);
    },
    balanceWired: function () {
      return (window.__VORONIA_BALANCE_WIRED || []).slice();
    },
    balanceCoverage: function () {
      var w = window.__VORONIA_BALANCE_WIRED || [];
      return {
        wired: w.length,
        categories: Object.keys(window.VORONIA_BALANCE || {}).length,
        frozen: Object.isFrozen(window.VORONIA_BALANCE || null),
      };
    },
    sanitizeStats: function () {
      return window.__V.sanitize ? window.__V.sanitize.stats() : null;
    },
    sanitizeNow: function () {
      return window.__V.sanitize ? (window.__V.sanitize.run(), window.__V.sanitize.stats()) : null;
    },
    ghostState: function () {
      return window.__VORONIA_GHOST ? window.__VORONIA_GHOST.friendState() : null;
    },
    ghostExport: function () {
      if (!window.__VORONIA_GHOST) return null;
      var c = window.__VORONIA_GHOST.exportProfile();
      try {
        console.info("[ghost] профиль-след: " + (c.length / 1024).toFixed(1) + " КБ");
      } catch (e) {}
      return c;
    },
    ghostLoadSample: function () {
      return window.__VORONIA_GHOST ? window.__VORONIA_GHOST.loadFriend(window.__VORONIA_GHOST.makeForeignSample()) : null;
    },
    ghostClear: function () {
      return window.__VORONIA_GHOST ? window.__VORONIA_GHOST.clearFriend() : null;
    },
    ghostDrawProbe: function () {
      return window.__VORONIA_GHOST ? window.__VORONIA_GHOST.overlay() : null;
    },
    shardState: function () {
      return window.__VORONIA_SHARDS ? window.__VORONIA_SHARDS.state() : null;
    },
    shardTree: function () {
      var S = window.__VORONIA_SHARDS;
      if (!S) return null;
      var d = S.read(),
        t = S.TREE(),
        out = [];
      for (var k in t) out.push({ id: k, tier: t[k].tier, name: t[k].name, cost: S.nodeCost(k), owned: d.tree[k] || 0 });
      out.sort(function (a, b) {
        return a.tier - b.tier || a.cost - b.cost;
      });
      try {
        console.table(out);
      } catch (e) {}
      return out;
    },
    shardGrant: function (e) {
      return window.__VORONIA_SHARDS ? window.__VORONIA_SHARDS.__test.grantSeeds(e) : null;
    },
    shardBuy: function (e) {
      return window.__VORONIA_SHARDS ? window.__VORONIA_SHARDS.buy(e) : null;
    },
    shardSplit: function (e) {
      return window.__VORONIA_SHARDS ? window.__VORONIA_SHARDS.split(e || {}) : null;
    },
    shardSwitch: function (e) {
      return window.__VORONIA_SHARDS ? window.__VORONIA_SHARDS.switchTo(e, { noReload: true }) : null;
    },
    shardIncomeMult: function (e) {
      return window.__VORONIA_SHARDS ? window.__VORONIA_SHARDS.incomeMult(e) : null;
    },
    shardGuardianMult: function () {
      return window.__VORONIA_SHARDS ? window.__VORONIA_SHARDS.guardianHpMult() : null;
    },
    shardRelax: function () {
      return window.__VORONIA_SHARDS ? window.__VORONIA_SHARDS.__test.relax() : null;
    },
    snapshot: function () {
      var st = window.__V.state || {},
        out = { version: window.__VORONIA_VERSION, at: Date.now(), errors: [], balance: null };
      try {
        out.errors = window.__voroniaErrors ? window.__voroniaErrors.list() : [];
      } catch (e) {}
      try {
        out.state = {};
        [
          "started",
          "gameStartSeed",
          "activePlanetId",
          "energy",
          "iron",
          "kriogen",
          "crystals",
          "dust",
          "dustTotal",
          "essence",
          "essenceTotal",
          "shards",
          "research",
          "totalPrestiges",
          "metaPrestiges",
          "warehouseLevel",
          "deviceScore",
          "devicePower",
          "stockPage",
          "planetPage",
        ].forEach(function (k) {
          var v = st[k];
          out.state[k] = typeof v === "number" && !isFinite(v) ? String(v) : v && v.constructor === Set ? "[Set " + v.size + "]" : v;
        });
        out.state.worlds = st.unlockedPlanets ? st.unlockedPlanets.size || Object.keys(st.unlockedPlanets).length : 0;
        out.state.achievements = Object.keys(st.unlockedAchievements || {}).length;
      } catch (e) {
        out.stateError = String((e && e.message) || e);
      }
      try {
        out.balance = { wired: (window.__VORONIA_BALANCE_WIRED || []).length, frozen: Object.isFrozen(window.VORONIA_BALANCE || null) };
      } catch (e) {}
      try {
        out.sanitize = window.__V.sanitize ? window.__V.sanitize.stats() : null;
      } catch (e) {}
      try {
        out.ghost = window.__VORONIA_GHOST ? window.__VORONIA_GHOST.friendState() : null;
      } catch (e) {}
      try {
        out.shards = window.__VORONIA_SHARDS ? window.__VORONIA_SHARDS.state() : null;
      } catch (e) {}
      try {
        out.perf = window.__ccVis && window.__ccVis.VIS_PERF ? window.__ccVis.VIS_PERF : null;
      } catch (e) {}
      return out;
    },
    downloadSnapshot: function () {
      try {
        var s = JSON.stringify(this.snapshot(), null, 2);
        var b = new Blob([s], { type: "application/json" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.download = "voronia_debug_" + Date.now() + ".json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () {
          try {
            URL.revokeObjectURL(a.href);
          } catch (e) {}
        }, 4000);
        return { ok: true, bytes: s.length };
      } catch (e) {
        return { ok: false, msg: String((e && e.message) || e) };
      }
    },
    v12Report: function () {
      var r = {
        version: window.__VORONIA_VERSION,
        "1_debug": {
          lazy: !window.__ccDebug || !!window.__V.debugApi,
          apiKeys: Object.keys((window.__V || {}).debugApi || {}).length,
          methods: Object.keys(window.__ccDebug || {}).length,
          file: "js/debug.js",
        },
        "2_sanitize": window.__V.sanitize ? window.__V.sanitize.stats() : null,
        "3_balance": {
          wired: (window.__VORONIA_BALANCE_WIRED || []).length,
          frozen: Object.isFrozen(window.VORONIA_BALANCE || null),
          categories: Object.keys(window.VORONIA_BALANCE || {}).length,
        },
        "4_ghost": window.__VORONIA_GHOST ? window.__VORONIA_GHOST.friendState() : null,
        "5_shards": window.__VORONIA_SHARDS ? window.__VORONIA_SHARDS.state() : null,
      };
      try {
        console.info("[Voronia v12]", r);
      } catch (e) {}
      return r;
    },
  };
  /* удобные псевдонимы для разработчика (ссылки стабильны, значения не копируются) */
  try {
    if (DAPI.n) window.__V.debugApi.state = DAPI.n;
    if (DAPI.$) window.__V.debugApi.PLANETS = DAPI.$;
    if (DAPI.p) window.__V.debugApi.stateProxy = DAPI.p;
  } catch (e) {}
  try {
    if (window.__VORONIA_DEBUG_EXTRA_INSTALL) window.__VORONIA_DEBUG_EXTRA_INSTALL(window.__ccDebug, DAPI);
  } catch (e) {
    try {
      console.warn("[Voronia] debug extra install failed:", e);
    } catch (e2) {}
  }
})();
