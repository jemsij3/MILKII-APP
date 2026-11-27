/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useMemo, useState} from 'react';
import {milkiiBackendConfig, milkiiHtml} from 'virtual:milkii-preview';

type PreviewRole = 'buyer' | 'admin' | 'owner';

function buildPreviewShim(role: PreviewRole, theme: 'light' | 'dark'): string {
  const isAdmin = role === 'admin' || role === 'owner';
  const isOwner = role === 'owner';
  const cfg = {
    cloud_name: 'demo',
    regions: milkiiBackendConfig.REGIONS,
    categories: milkiiBackendConfig.CATEGORIES,
    plans: milkiiBackendConfig.PLANS,
    payment: milkiiBackendConfig.DEFAULT_PAYMENT,
    limits: {
      maxImages: milkiiBackendConfig.LIMITS.maxImages,
      maxVideos: milkiiBackendConfig.LIMITS.maxVideos,
      maxVideoSeconds: milkiiBackendConfig.LIMITS.maxVideoSeconds,
      max_pending: milkiiBackendConfig.DEFAULT_LIMITS.max_pending,
      ai_daily: milkiiBackendConfig.DEFAULT_LIMITS.ai_daily,
      upload_daily: milkiiBackendConfig.DEFAULT_LIMITS.upload_daily,
    },
  };

  return `<script>
(function () {
  var PREVIEW_CFG = ${JSON.stringify(cfg)};
  var IS_ADMIN = ${JSON.stringify(isAdmin)};
  var IS_OWNER = ${JSON.stringify(isOwner)};
  var THEME = ${JSON.stringify(theme)};
  var uploadedObjectUrls = {};

  function svgThumb(emoji, title, bg1, bg2) {
    var safeTitle = String(title || '').slice(0, 26).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="' + bg1 + '"/><stop offset="100%" stop-color="' + bg2 + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="600" height="600" fill="url(#g)"/>' +
      '<text x="300" y="290" font-size="160" text-anchor="middle" dominant-baseline="middle">' + emoji + '</text>' +
      '<text x="300" y="470" font-family="sans-serif" font-size="28" font-weight="bold" fill="#18211b" text-anchor="middle">' + safeTitle + '</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function receiptSvgDataUrl() {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="520" height="680" viewBox="0 0 520 680">' +
      '<rect width="520" height="680" fill="#ffffff"/>' +
      '<rect x="24" y="24" width="472" height="632" rx="18" fill="#f6f7f4" stroke="#1f7a4d" stroke-width="3"/>' +
      '<text x="260" y="95" font-family="sans-serif" font-size="28" font-weight="bold" fill="#1f7a4d" text-anchor="middle">CBE Mobile Banking</text>' +
      '<text x="260" y="145" font-family="sans-serif" font-size="20" fill="#18211b" text-anchor="middle">Transfer Successful</text>' +
      '<text x="260" y="220" font-family="sans-serif" font-size="42" font-weight="bold" fill="#18211b" text-anchor="middle">100.00 ETB</text>' +
      '<text x="70" y="310" font-family="sans-serif" font-size="18" fill="#5a685e">Reference: FT26331ETH</text>' +
      '<text x="70" y="355" font-family="sans-serif" font-size="18" fill="#5a685e">To: MILKII APP</text>' +
      '<text x="70" y="400" font-family="sans-serif" font-size="18" fill="#5a685e">Status: Completed</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  var seededAssets = {
    'milkii/items/101/samsung': svgThumb('📱', 'Samsung Galaxy A54', '#dff3e8', '#b8e4cc'),
    'milkii/items/102/honey': svgThumb('🍯', 'Ethiopian Forest Honey', '#fff4cc', '#ffe082'),
    'milkii/items/103/table': svgThumb('🛋️', 'Solid Wood Table', '#efe7da', '#dccab0'),
    'milkii/items/104/physics': svgThumb('📚', 'Grade 12 Physics', '#e3ecfa', '#c3d8f7'),
    'milkii/items/105/repair': svgThumb('🛠️', 'Laptop & Phone Repair', '#e6f4ea', '#c8e6d1'),
    'milkii/items/106/shoes': svgThumb('👟', 'Nike Air Force 1', '#f1e8f7', '#dec8ee'),
    'milkii/items/107/coffee': svgThumb('☕', 'Roasted Arabica Coffee', '#f2e5d7', '#dfc5aa')
  };

  var nowSec = Math.floor(Date.now() / 1000);
  var dbItems = [
    {
      id: 1, owner_id: '101', tg: 'abdi_eth', cat: 'phones',
      title: 'Samsung Galaxy A54 5G 128GB', price: 24500, negotiable: true,
      region: 'Addis Ababa', city: 'Addis Ababa', place: 'Bole',
      desc: 'Clean condition, 8GB RAM / 128GB storage. Original charger and box included.',
      attrs: { item_type: 'Phone', brand: 'Samsung', model: 'Galaxy A54', condition: 'Like new', storage: '128GB', color: 'Awesome Graphite', includes: ['Charger', 'Box', 'Case/cover'] },
      media: [{ type: 'image', id: 'milkii/items/101/samsung' }],
      status: 'approved', reject_reason: null, reports: 0, featured: true,
      plan: 'featured', fee: 100, pay_method: 'CBE', pay_ref: 'FT26119ABC', hasReceipt: true, verified: true, created_at: nowSec - 86400 * 5, approved_at: nowSec - 86400 * 5
    },
    {
      id: 2, owner_id: '102', tg: 'chaltu_honey', cat: 'food',
      title: 'Pure Ethiopian Forest Honey 5kg', price: 3200, negotiable: false,
      region: 'Oromia', city: 'Adama', place: 'Kebele 05',
      desc: '100% natural raw white & red forest honey harvested this season.',
      attrs: { food_type: 'Honey', quantity: 5, unit: 'kg', price_per: 'Price is total for all quantity', ready: 'Ready now', delivery: 'Both' },
      media: [{ type: 'image', id: 'milkii/items/102/honey' }],
      status: 'approved', reject_reason: null, reports: 0, featured: false,
      plan: 'free', fee: 0, pay_method: null, pay_ref: null, hasReceipt: false, verified: false, created_at: nowSec - 86400 * 4, approved_at: nowSec - 86400 * 4
    },
    {
      id: 3, owner_id: '103', tg: 'dawit_home', cat: 'home',
      title: 'Solid Wanza Wood Dining Table', price: 14000, negotiable: true,
      region: 'Sidama', city: 'Hawassa', place: 'Piassa',
      desc: 'Strong local wood dining table with 4 matching chairs. Very clean.',
      attrs: { item_type: 'Furniture', condition: 'Used - good', size: '140 x 80 cm', material: 'Wanza wood', quantity: 1, delivery: 'Pickup only' },
      media: [{ type: 'image', id: 'milkii/items/103/table' }],
      status: 'approved', reject_reason: null, reports: 0, featured: false,
      plan: 'standard', fee: 30, pay_method: 'Telebirr', pay_ref: 'TB991234', hasReceipt: true, verified: true, created_at: nowSec - 86400 * 3, approved_at: nowSec - 86400 * 3
    },
    {
      id: 4, owner_id: '999', tg: 'seller_eth', cat: 'school',
      title: 'Grade 12 Physics Extreme + Notes', price: 450, negotiable: true,
      region: 'Amhara', city: 'Bahir Dar', place: '',
      desc: 'Clean textbook with solved entrance exam sheets for Grade 12.',
      attrs: { item_type: 'Textbook', level: 'Grade 11-12', subject: 'Physics', condition: 'Used - good', quantity: 1 },
      media: [{ type: 'image', id: 'milkii/items/104/physics' }],
      status: 'approved', reject_reason: null, reports: 0, featured: false,
      plan: 'free', fee: 0, pay_method: null, pay_ref: null, hasReceipt: false, verified: false, created_at: nowSec - 86400 * 2, approved_at: nowSec - 86400 * 2
    },
    {
      id: 5, owner_id: '105', tg: 'yusuf_tech', cat: 'services',
      title: 'Laptop & Smartphone Software Repair', price: 300, negotiable: true,
      region: 'Dire Dawa', city: 'Dire Dawa', place: 'Kezira',
      desc: 'Windows installation, screen replacement, and phone unlocking.',
      attrs: { service_type: 'Repair & maintenance', pricing_unit: 'Starting from', area_served: 'All city neighborhoods', availability: 'Mon-Sat 8am-7pm', experience_years: 5, location_type: 'Both', languages: ['Afaan Oromoo', 'Amharic', 'English'] },
      media: [{ type: 'image', id: 'milkii/items/105/repair' }],
      status: 'approved', reject_reason: null, reports: 0, featured: false,
      plan: 'free', fee: 0, pay_method: null, pay_ref: null, hasReceipt: false, verified: false, created_at: nowSec - 86400, approved_at: nowSec - 86400
    },
    {
      id: 6, owner_id: '106', tg: 'sara_style', cat: 'clothes',
      title: 'Nike Air Force 1 White Size 42', price: 3800, negotiable: true,
      region: 'Tigray', city: 'Mekelle', place: 'Ayder',
      desc: 'Brand new with box, size 42 EU.',
      attrs: { gender_group: 'Unisex', item_type: 'Shoes', size: '42', condition: 'New with tag', brand: 'Nike', color: 'White' },
      media: [{ type: 'image', id: 'milkii/items/106/shoes' }],
      status: 'approved', reject_reason: null, reports: 0, featured: false,
      plan: 'free', fee: 0, pay_method: null, pay_ref: null, hasReceipt: false, verified: false, created_at: nowSec - 3600 * 12, approved_at: nowSec - 3600 * 12
    },
    {
      id: 7, owner_id: '999', tg: 'seller_eth', cat: 'food',
      title: 'Roasted Ethiopian Arabica Coffee 2kg', price: 1100, negotiable: false,
      region: 'Oromia', city: 'Jimma', place: 'Kebele 02',
      desc: 'Freshly roasted organic Arabica coffee beans packed in 2kg bag.',
      attrs: { food_type: 'Coffee', quantity: 2, unit: 'kg', price_per: 'Price is total for all quantity', ready: 'Ready now', delivery: 'I can deliver' },
      media: [{ type: 'image', id: 'milkii/items/107/coffee' }],
      status: 'pending', reject_reason: null, reports: 0, featured: true,
      plan: 'featured', fee: 100, pay_method: 'CBE', pay_ref: 'FT26331ETH', hasReceipt: true, verified: false, created_at: nowSec - 1800, approved_at: null,
      receipt: receiptSvgDataUrl()
    }
  ];

  var dbUsers = [
    { user_id: '999', username: 'seller_eth', first_name: 'Selam', first_seen: nowSec - 86400 * 20, last_seen: nowSec, banned: false, banReason: null, isStaff: IS_ADMIN },
    { user_id: '101', username: 'abdi_eth', first_name: 'Abdi', first_seen: nowSec - 86400 * 14, last_seen: nowSec - 3600, banned: false, banReason: null, isStaff: false },
    { user_id: '102', username: 'chaltu_honey', first_name: 'Chaltu', first_seen: nowSec - 86400 * 10, last_seen: nowSec - 7200, banned: false, banReason: null, isStaff: false },
    { user_id: '103', username: 'dawit_home', first_name: 'Dawit', first_seen: nowSec - 86400 * 8, last_seen: nowSec - 18000, banned: false, banReason: null, isStaff: false },
    { user_id: '105', username: 'yusuf_tech', first_name: 'Yusuf', first_seen: nowSec - 86400 * 5, last_seen: nowSec - 43200, banned: false, banReason: null, isStaff: false },
    { user_id: '106', username: 'sara_style', first_name: 'Sara', first_seen: nowSec - 86400 * 2, last_seen: nowSec - 3600 * 6, banned: false, banReason: null, isStaff: false }
  ];

  var dbAudit = [
    { id: 1, admin_id: '999', admin_username: 'seller_eth', action: 'item_approve', target_type: 'item', target_id: '1', target_label: 'Samsung Galaxy A54 5G 128GB', details: 'Samsung Galaxy A54 5G 128GB', created_at: nowSec - 86400 * 4 }
  ];
  var nextAuditId = 2;
  var dbSettings = {
    plans: Object.assign({}, PREVIEW_CFG.plans),
    payment: JSON.parse(JSON.stringify(PREVIEW_CFG.payment)),
    limits: {
      max_pending: PREVIEW_CFG.limits.max_pending,
      ai_daily: PREVIEW_CFG.limits.ai_daily,
      upload_daily: PREVIEW_CFG.limits.upload_daily
    }
  };
  var nextId = 8;
  var currentUser = { id: '999', username: 'seller_eth', isAdmin: IS_ADMIN, isOwner: IS_OWNER, canDm: true };

  function pushAudit(action, targetType, targetId, targetLabel, details) {
    dbAudit.unshift({
      id: nextAuditId++,
      admin_id: currentUser.id,
      admin_username: currentUser.username,
      action: action,
      target_type: targetType,
      target_id: String(targetId),
      target_label: targetLabel || null,
      details: details || null,
      created_at: Math.floor(Date.now() / 1000)
    });
  }

  window.Telegram = {
    WebApp: {
      initData: 'preview_init_data=1',
      colorScheme: THEME,
      ready: function () {},
      expand: function () {},
      requestWriteAccess: function (cb) { if (cb) cb(true); },
      onEvent: function () {},
      openTelegramLink: function (url) {
        var toast = document.getElementById('toast');
        if (toast) {
          toast.textContent = 'Preview link: ' + url;
          toast.classList.add('show');
          setTimeout(function () { toast.classList.remove('show'); }, 2500);
        }
      }
    }
  };

  function resolveAssetUrl(src) {
    if (!src || src.indexOf('res.cloudinary.com/demo/') === -1) return null;
    for (var id in uploadedObjectUrls) {
      if (src.indexOf(id) !== -1) return uploadedObjectUrls[id];
    }
    for (var sid in seededAssets) {
      if (src.indexOf(sid) !== -1) return seededAssets[sid];
    }
    return null;
  }

  var observer = new MutationObserver(function () {
    var imgs = document.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var src = img.getAttribute('src') || '';
      var mapped = resolveAssetUrl(src);
      if (mapped && img.src !== mapped) {
        img.src = mapped;
      }
    }
  });
  window.addEventListener('DOMContentLoaded', function () {
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
  });

  var OrigXHR = window.XMLHttpRequest;
  window.XMLHttpRequest = function () {
    var xhr = new OrigXHR();
    var targetUrl = '';
    var origOpen = xhr.open;
    var origSend = xhr.send;
    xhr.open = function (method, url) {
      targetUrl = String(url || '');
      return origOpen.apply(xhr, arguments);
    };
    xhr.send = function (body) {
      if (targetUrl.indexOf('api.cloudinary.com') !== -1) {
        var pubId = body && body.get ? body.get('public_id') : '';
        var file = body && body.get ? body.get('file') : null;
        if (pubId && file) {
          try { uploadedObjectUrls[pubId] = URL.createObjectURL(file); } catch (e) {}
        }
        setTimeout(function () {
          if (xhr.upload && xhr.upload.onprogress) {
            xhr.upload.onprogress({ lengthComputable: true, loaded: 100, total: 100 });
          }
          Object.defineProperty(xhr, 'status', { value: 200 });
          if (xhr.onload) xhr.onload();
        }, 250);
        return;
      }
      return origSend.apply(xhr, arguments);
    };
    return xhr;
  };

  function jsonRes(obj, status) {
    return new Response(JSON.stringify(obj), {
      status: status || 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  function serialize(it) {
    return {
      id: it.id, cat: it.cat, title: it.title, price: it.price,
      negotiable: it.negotiable, region: it.region || '', city: it.city || '',
      place: it.place || '', desc: it.desc,
      attrs: it.attrs, media: it.media, tg: it.tg, featured: it.featured,
      status: it.status, created_at: it.created_at,
      reports: it.reports || 0, reject_reason: it.reject_reason || null,
      pay: {
        plan: it.plan || 'free', fee: it.fee || 0, method: it.pay_method || null,
        ref: it.pay_ref || null, verified: Boolean(it.verified), hasReceipt: Boolean(it.hasReceipt || it.receipt)
      }
    };
  }

  var origFetch = window.fetch.bind(window);
  window.fetch = async function (input, init) {
    var url = typeof input === 'string' ? input : input.url;
    if (!url || url.indexOf('/api/') !== 0) {
      return origFetch(input, init);
    }
    var method = ((init && init.method) || 'GET').toUpperCase();
    var body = null;
    if (init && typeof init.body === 'string') {
      try { body = JSON.parse(init.body); } catch (e) {}
    }

    if (url === '/api/config') {
      return jsonRes(Object.assign({}, PREVIEW_CFG, {
        plans: dbSettings.plans,
        payment: dbSettings.payment,
        limits: Object.assign({}, PREVIEW_CFG.limits, dbSettings.limits)
      }));
    }
    if (url === '/api/me') return jsonRes(currentUser);

    if (url.indexOf('/api/items') === 0 && method === 'GET') {
      var parsedUrl = new URL(url, 'http://localhost');
      var regFilter = (parsedUrl.searchParams.get('region') || '').trim();
      var cityFilter = (parsedUrl.searchParams.get('city') || '').trim().toLowerCase();
      var live = dbItems
        .filter(function (x) {
          if (x.status !== 'approved') return false;
          if (regFilter && x.region !== regFilter) return false;
          if (cityFilter && String(x.city || '').toLowerCase().indexOf(cityFilter) === -1) return false;
          return true;
        })
        .sort(function (a, b) { return (b.featured - a.featured) || (b.created_at - a.created_at); })
        .map(serialize);
      return jsonRes({ items: live });
    }

    if (url === '/api/mine' && method === 'GET') {
      var mine = dbItems
        .filter(function (x) { return x.owner_id === currentUser.id; })
        .sort(function (a, b) { return b.created_at - a.created_at; })
        .map(serialize);
      return jsonRes({ items: mine });
    }

    if (url === '/api/upload-sign' && method === 'POST') {
      var ts = Math.floor(Date.now() / 1000);
      var pid = 'milkii/items/' + currentUser.id + '/' + Math.random().toString(36).slice(2, 10);
      return jsonRes({
        cloud_name: 'demo',
        api_key: 'demo_key',
        timestamp: ts,
        public_id: pid,
        allowed_formats: body && body.type === 'video' ? 'mp4,mov,webm' : 'jpg,jpeg,png,webp',
        signature: 'demo_sig'
      });
    }

    if (url === '/api/items' && method === 'POST') {
      var fee = dbSettings.plans[body.plan] || 0;
      var created = {
        id: nextId++,
        owner_id: currentUser.id,
        tg: currentUser.username,
        cat: body.cat,
        title: body.title,
        price: Number(body.price),
        negotiable: Boolean(body.negotiable),
        region: body.region || '',
        city: body.city || '',
        place: body.place || '',
        desc: body.desc,
        attrs: body.attrs || {},
        media: body.media || [],
        status: 'pending',
        reject_reason: null,
        reports: 0,
        featured: body.plan === 'featured',
        plan: body.plan,
        fee: fee,
        pay_method: body.pay ? body.pay.method : null,
        pay_ref: body.pay ? body.pay.ref : null,
        receipt: body.pay ? body.pay.receipt : null,
        hasReceipt: Boolean(body.pay && body.pay.receipt),
        verified: false,
        created_at: Math.floor(Date.now() / 1000),
        approved_at: null
      };
      dbItems.unshift(created);
      return jsonRes({ id: created.id, status: 'pending' }, 201);
    }

    var itemMatch = url.match(/^\\/api\\/items\\/(\\d+)\\/(report|sold|delete)$/);
    if (itemMatch && method === 'POST') {
      var iid = Number(itemMatch[1]);
      var act = itemMatch[2];
      var idx = dbItems.findIndex(function (x) { return x.id === iid; });
      if (idx < 0) return jsonRes({ error: 'Item not found' }, 404);
      if (act === 'report') dbItems[idx].reports = (dbItems[idx].reports || 0) + 1;
      if (act === 'sold') dbItems[idx].status = 'sold';
      if (act === 'delete') {
        if (IS_ADMIN) pushAudit('item_delete', 'item', iid, dbItems[idx].title, dbItems[idx].title);
        dbItems.splice(idx, 1);
      }
      return jsonRes({ ok: true });
    }

    if (url.indexOf('/api/admin/items') === 0 && method === 'GET') {
      if (!IS_ADMIN) return jsonRes({ error: 'Admin access required' }, 403);
      var tab = (new URL(url, 'http://localhost')).searchParams.get('tab') || 'pending';
      var list = dbItems.filter(function (x) {
        if (tab === 'pending') return x.status === 'pending';
        if (tab === 'reported') return (x.reports || 0) > 0;
        return true;
      }).map(serialize);
      var stats = {
        total: dbItems.length,
        pending: dbItems.filter(function (x) { return x.status === 'pending'; }).length,
        approved: dbItems.filter(function (x) { return x.status === 'approved'; }).length,
        sold: dbItems.filter(function (x) { return x.status === 'sold'; }).length,
        reported: dbItems.filter(function (x) { return (x.reports || 0) > 0; }).length,
        income: dbItems.reduce(function (acc, x) { return acc + (x.verified ? (x.fee || 0) : 0); }, 0)
      };
      return jsonRes({ items: list, stats: stats });
    }

    var recMatch = url.match(/^\\/api\\/admin\\/receipt\\/(\\d+)$/);
    if (recMatch && method === 'GET') {
      if (!IS_ADMIN) return jsonRes({ error: 'Admin access required' }, 403);
      var rid = Number(recMatch[1]);
      var found = dbItems.find(function (x) { return x.id === rid; });
      pushAudit('receipt_view', 'item', rid, found && found.title, found && found.title);
      var dataUrl = (found && found.receipt) || receiptSvgDataUrl();
      return origFetch(dataUrl);
    }

    var admMatch = url.match(/^\\/api\\/admin\\/items\\/(\\d+)\\/(approve|reject|ban)$/);
    if (admMatch && method === 'POST') {
      if (!IS_ADMIN) return jsonRes({ error: 'Admin access required' }, 403);
      var aid = Number(admMatch[1]);
      var aact = admMatch[2];
      var it = dbItems.find(function (x) { return x.id === aid; });
      if (!it) return jsonRes({ error: 'Item not found' }, 404);
      if (aact === 'approve') {
        it.status = 'approved';
        it.reports = 0;
        it.approved_at = Math.floor(Date.now() / 1000);
        if (it.fee > 0) it.verified = true;
        pushAudit('item_approve', 'item', aid, it.title, it.title);
      } else if (aact === 'reject') {
        it.status = 'rejected';
        it.reject_reason = (body && body.reason) || null;
        pushAudit('item_reject', 'item', aid, it.title, it.reject_reason);
      } else if (aact === 'ban') {
        var owner = it.owner_id;
        var uObj = dbUsers.find(function (u) { return u.user_id === owner; });
        if (uObj && uObj.isStaff) return jsonRes({ error: 'Cannot ban an admin or owner account.' }, 400);
        if (uObj) { uObj.banned = true; uObj.banReason = (body && body.reason) || null; }
        dbItems = dbItems.filter(function (x) { return x.owner_id !== owner; });
        pushAudit('user_ban', 'user', owner, uObj && uObj.username, (body && body.reason) || null);
      }
      return jsonRes({ ok: true });
    }

    if (url.indexOf('/api/admin/users') === 0 && method === 'GET') {
      if (!IS_ADMIN) return jsonRes({ error: 'Admin access required' }, 403);
      var up = new URL(url, 'http://localhost').searchParams;
      var q = (up.get('q') || '').trim().toLowerCase();
      var uf = up.get('filter') || 'all';
      var mapped = dbUsers.map(function (u) {
        var owned = dbItems.filter(function (i) { return i.owner_id === u.user_id; });
        return Object.assign({}, u, {
          itemCount: owned.length,
          approvedCount: owned.filter(function (i) { return i.status === 'approved'; }).length
        });
      }).filter(function (u) {
        if (q && !(u.username.toLowerCase().includes(q) || u.first_name.toLowerCase().includes(q) || u.user_id.includes(q))) return false;
        if (uf === 'banned' && !u.banned) return false;
        if (uf === 'sellers' && u.itemCount === 0) return false;
        return true;
      });
      return jsonRes({ users: mapped, total: mapped.length });
    }

    var usrMatch = url.match(/^\\/api\\/admin\\/users\\/([^/]+)\\/(ban|unban)$/);
    if (usrMatch && method === 'POST') {
      if (!IS_ADMIN) return jsonRes({ error: 'Admin access required' }, 403);
      var uid = decodeURIComponent(usrMatch[1]);
      var uact = usrMatch[2];
      var targetU = dbUsers.find(function (u) { return u.user_id === uid; });
      if (uact === 'ban') {
        if (targetU && targetU.isStaff) return jsonRes({ error: 'Cannot ban an admin or owner account.' }, 400);
        if (targetU) { targetU.banned = true; targetU.banReason = (body && body.reason) || null; }
        dbItems = dbItems.filter(function (x) { return x.owner_id !== uid; });
        pushAudit('user_ban', 'user', uid, targetU && targetU.username, (body && body.reason) || null);
      } else {
        if (targetU) { targetU.banned = false; targetU.banReason = null; }
        pushAudit('user_unban', 'user', uid, targetU && targetU.username, null);
      }
      return jsonRes({ ok: true });
    }

    if (url.indexOf('/api/admin/analytics') === 0 && method === 'GET') {
      if (!IS_ADMIN) return jsonRes({ error: 'Admin access required' }, 403);
      var days = Number(new URL(url, 'http://localhost').searchParams.get('days') || 30);
      var daily = [];
      var todayMs = new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00Z').getTime();
      for (var d = days - 1; d >= 0; d--) {
        var dayStr = new Date(todayMs - d * 86400000).toISOString().slice(0, 10);
        var newItems = dbItems.filter(function (i) { return new Date(i.created_at * 1000).toISOString().slice(0, 10) === dayStr; }).length;
        var appItems = dbItems.filter(function (i) { return i.approved_at && new Date(i.approved_at * 1000).toISOString().slice(0, 10) === dayStr; });
        daily.push({
          day: dayStr,
          newItems: newItems,
          approved: appItems.length,
          income: appItems.reduce(function (a, i) { return a + (i.verified ? (i.fee || 0) : 0); }, 0)
        });
      }
      var catMap = {}, regMap = {}, cityMap = {}, planMap = {};
      dbItems.forEach(function (i) {
        if (!catMap[i.cat]) catMap[i.cat] = { cat: i.cat, count: 0, approved: 0 };
        catMap[i.cat].count++;
        if (i.status === 'approved') catMap[i.cat].approved++;
        var rg = i.region || 'Unknown';
        regMap[rg] = (regMap[rg] || 0) + 1;
        if (i.city) cityMap[i.city] = (cityMap[i.city] || 0) + 1;
        var pl = i.plan || 'free';
        if (!planMap[pl]) planMap[pl] = { plan: pl, count: 0, income: 0 };
        planMap[pl].count++;
        if (i.verified) planMap[pl].income += (i.fee || 0);
      });
      var approvedN = dbItems.filter(function (i) { return i.status === 'approved'; }).length;
      var rejectedN = dbItems.filter(function (i) { return i.status === 'rejected'; }).length;
      return jsonRes({
        days: days,
        totals: {
          users: dbUsers.length,
          newUsers: dbUsers.length,
          activeUsers: dbUsers.length,
          items: dbItems.length,
          approved: approvedN,
          pending: dbItems.filter(function (i) { return i.status === 'pending'; }).length,
          sold: dbItems.filter(function (i) { return i.status === 'sold'; }).length,
          income: dbItems.reduce(function (a, i) { return a + (i.verified ? (i.fee || 0) : 0); }, 0)
        },
        daily: daily,
        byCategory: Object.values(catMap).sort(function (a, b) { return b.count - a.count; }),
        byRegion: Object.keys(regMap).map(function (k) { return { region: k, count: regMap[k] }; }).sort(function (a, b) { return b.count - a.count; }),
        topCities: Object.keys(cityMap).map(function (k) { return { city: k, count: cityMap[k] }; }).sort(function (a, b) { return b.count - a.count; }).slice(0, 10),
        plans: Object.values(planMap),
        approvalRate: (approvedN + rejectedN) > 0 ? Number((approvedN / (approvedN + rejectedN)).toFixed(4)) : 0
      });
    }

    if (url.indexOf('/api/admin/audit') === 0 && method === 'GET') {
      if (!IS_OWNER) return jsonRes({ error: 'Owner access required' }, 403);
      return jsonRes({ rows: dbAudit, next: null });
    }

    if (url === '/api/admin/settings' && method === 'GET') {
      if (!IS_ADMIN) return jsonRes({ error: 'Admin access required' }, 403);
      return jsonRes(dbSettings);
    }

    if (url === '/api/admin/settings' && method === 'PUT') {
      if (!IS_OWNER) return jsonRes({ error: 'Owner access required' }, 403);
      var oldS = JSON.parse(JSON.stringify(dbSettings));
      dbSettings = body;
      pushAudit('settings_update', 'settings', 'all', 'Settings', JSON.stringify({ old: oldS, new: dbSettings }));
      return jsonRes(dbSettings);
    }

    if (url === '/api/ai' && method === 'POST') {
      if (body && body.task === 'translate') {
        return jsonRes({
          text: '[Preview AI Translation -> ' + body.to + ']\\n' + body.text
        });
      }
      var lastMsg = body && Array.isArray(body.messages) ? body.messages[body.messages.length - 1].content.toLowerCase() : '';
      var matches = dbItems.filter(function (x) {
        return x.status === 'approved' && (
          x.title.toLowerCase().includes(lastMsg) ||
          x.cat.toLowerCase().includes(lastMsg) ||
          String(x.city || '').toLowerCase().includes(lastMsg) ||
          String(x.region || '').toLowerCase().includes(lastMsg)
        );
      }).slice(0, 3);
      var reply = matches.length
        ? 'Found on MILKII APP:\\n' + matches.map(function (m) { return '• ' + m.title + ' — ' + m.price + ' Birr (' + m.city + ', ' + m.region + ', @' + m.tg + ')'; }).join('\\n') + '\\n\\nAlways inspect items in person before paying.'
        : 'MILKII APP Preview AI: Try searching for "Samsung", "Honey", "Hawassa", "Adama", or "Addis Ababa". Always inspect items in person before paying!';
      return jsonRes({ text: reply });
    }

    return jsonRes({ error: 'Not found' }, 404);
  };
})();
</script>`;
}

export default function App() {
  const [role, setRole] = useState<PreviewRole>('owner');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const cycleRole = () => {
    setRole((r) => (r === 'buyer' ? 'admin' : r === 'admin' ? 'owner' : 'buyer'));
  };

  const srcDoc = useMemo(() => {
    const shim = buildPreviewShim(role, theme);
    return milkiiHtml.replace(
      '<script src="https://telegram.org/js/telegram-web-app.js"></script>',
      shim
    );
  }, [role, theme]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center">
      <div className="w-full bg-stone-900 border-b border-stone-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-400 text-sm">MILKII APP Preview</span>
          <span className="text-stone-400 hidden sm:inline">
            GitHub files ready: <code className="text-stone-200">schema.sql</code> ·{' '}
            <code className="text-stone-200">migration.sql</code> ·{' '}
            <code className="text-stone-200">functions/api/[[route]].js</code> ·{' '}
            <code className="text-stone-200">public/index.html</code>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cycleRole}
            className={`px-3 py-1.5 rounded-lg font-semibold border transition cursor-pointer ${
              role !== 'buyer'
                ? 'bg-emerald-700 border-emerald-500 text-white'
                : 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
            }`}
          >
            Role: {role === 'owner' ? 'Owner' : role === 'admin' ? 'Admin' : 'Buyer / Seller'}
          </button>
          <button
            type="button"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            className="px-3 py-1.5 rounded-lg font-semibold bg-stone-800 border border-stone-700 text-stone-200 hover:bg-stone-700 cursor-pointer"
          >
            Theme: {theme === 'light' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      <div className="w-full max-w-[560px] flex-1 my-0 sm:my-4 sm:rounded-3xl overflow-hidden border-0 sm:border-4 sm:border-stone-800 shadow-2xl bg-white">
        <iframe
          key={`${role}-${theme}`}
          title="MILKII APP Telegram Mini App Preview"
          srcDoc={srcDoc}
          className="w-full h-[calc(100vh-52px)] sm:h-[calc(100vh-88px)] border-0 block"
          sandbox="allow-scripts allow-forms allow-same-origin"
        />
      </div>
    </div>
  );
}
