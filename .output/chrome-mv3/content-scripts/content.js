var content=(function(){function e(e){return e}var t=[],n=null,r=[];function i(e){let t=e.match(/\/chat\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);return t?t[1]:null}function a(e){let t=e.closest(`.group`);if(t){let e=t.querySelector(`button[aria-label^="More options for "]`);if(e){let t=(e.getAttribute(`aria-label`)??``).replace(/^More options for\s+/,``).trim();if(t)return t}}return e.textContent?.trim()||e.getAttribute(`aria-label`)||``}function o(){let e=document.querySelectorAll(`nav[aria-label="Sidebar"] a[href*="/chat/"]`);return e.length>0?s(e):s(document.querySelectorAll(`a[href*="/chat/"]`))}function s(e){let t=[];return e.forEach(e=>{let n=i(e.getAttribute(`href`)||``);n&&t.push({id:n,element:e,title:a(e)})}),t}function ee(){let e=o();t.map(e=>e.id).join(`,`)!==e.map(e=>e.id).join(`,`)&&(t=e,r.forEach(e=>e(t)))}function c(){return t}function te(e){r.push(e)}function ne(){ee(),n=new MutationObserver(()=>ee()),n.observe(document.body,{childList:!0,subtree:!0}),console.debug(`[CCC] Chat list initialized, found:`,t.length,`chats`)}function re(){n?.disconnect(),n=null,t=[],r.length=0}var l=`cbd-hover`,u=`cbd-selected`,d=`idle`,f=new Set,p=null,m=[],ie=[];function h(){return d}function g(){return f}function ae(){return c().filter(e=>f.has(e.id))}function oe(e){m.push(e)}function se(e){ie.push(e)}function _(){d!==`active`&&(d=`active`,f=new Set,p=null,document.activeElement?.blur?.(),m.forEach(e=>e(d)),b())}function v(){d!==`idle`&&(d=`idle`,f=new Set,p=null,fe(),m.forEach(e=>e(d)),b())}function ce(e){p!==e&&(p&&c().find(e=>e.id===p)?.element.classList.remove(l),p=e,e&&c().find(t=>t.id===e)?.element.classList.add(l))}function le(e){f.has(e)?f.delete(e):f.add(e);let t=c().find(t=>t.id===e);t&&t.element.classList.toggle(u,f.has(e)),b()}function ue(){p&&le(p)}function de(){c().forEach(e=>{f.add(e.id),e.element.classList.add(u)}),b()}function y(){c().forEach(e=>e.element.classList.remove(u)),f=new Set,b()}function fe(){c().forEach(e=>{e.element.classList.remove(l,u)})}function pe(){d===`active`&&c().forEach(e=>{e.element.classList.toggle(u,f.has(e.id)),e.element.classList.toggle(l,e.id===p)})}function b(){ie.forEach(e=>e(f))}var me=5,he=150,x=null;async function ge(){if(x)return x;try{let e=await fetch(`https://claude.ai/api/organizations`,{credentials:`include`});return e.ok?(x=(await e.json())?.[0]?.uuid??null,x):null}catch{return null}}async function _e(e,t){try{return(await fetch(`https://claude.ai/api/organizations/${t}/chat_conversations/${e}`,{method:`DELETE`,credentials:`include`})).ok}catch{return!1}}function ve(e,t){let n=[];for(let r=0;r<e.length;r+=t)n.push(e.slice(r,r+t));return n}function ye(e){return new Promise(t=>setTimeout(t,e))}async function be(e,t){let n=await ge();if(!n)return{succeeded:[],failed:e};let r=[],i=[],a=ve(e,me),o=0;for(let s of a){let a=await Promise.all(s.map(e=>_e(e,n)));s.forEach((e,t)=>{a[t]?r.push(e):i.push(e)}),o+=s.length,t?.(o,e.length),o<e.length&&await ye(he)}return{succeeded:r,failed:i}}var S=globalThis.browser?.runtime?.id?globalThis.browser:globalThis.chrome;function C(e,t){try{return S.i18n.getMessage(e,t)||e}catch{return e}}var xe=()=>navigator.platform.toUpperCase().includes(`MAC`),Se=`cbd-overlay-host`,Ce=`
  /* ── theme tokens ─────────────────────────────────────────────────────────── */
  :host {
    /* dark (default) */
    --bg:              rgba(18,18,18,0.88);
    --border:          rgba(255,255,255,0.09);
    --shadow:          0 4px 24px rgba(0,0,0,0.35);
    --text:            #e5e5e5;
    --text-muted:      rgba(255,255,255,0.45);
    --text-dim:        rgba(255,255,255,0.35);
    --text-faint:      rgba(255,255,255,0.18);
    --shortcut-bg:     rgba(255,255,255,0.08);
    --shortcut-fg:     rgba(255,255,255,0.65);
    --divider:         rgba(255,255,255,0.08);
    --btn-ghost-bg:    rgba(255,255,255,0.09);
    --btn-ghost-fg:    rgba(255,255,255,0.65);
    --btn-exit-fg:     rgba(255,255,255,0.35);
    --btn-exit-border: rgba(255,255,255,0.1);
    --title-fg:        #fff;
    --dot:             #10a37f;
    --dot-warn:        #f59e0b;
    --dot-danger:      #ef4444;
    --badge-active:    #10a37f;
    --badge-warn:      #f59e0b;
    --badge-danger:    #ef4444;
    --success:         #10a37f;
    --error:           #ef4444;
  }
  :host(.light) {
    --bg:              rgba(250,250,250,0.95);
    --border:          rgba(0,0,0,0.1);
    --shadow:          0 4px 24px rgba(0,0,0,0.12);
    --text:            #1a1a1a;
    --text-muted:      rgba(0,0,0,0.55);
    --text-dim:        rgba(0,0,0,0.42);
    --text-faint:      rgba(0,0,0,0.3);
    --shortcut-bg:     rgba(0,0,0,0.07);
    --shortcut-fg:     rgba(0,0,0,0.6);
    --divider:         rgba(0,0,0,0.08);
    --btn-ghost-bg:    rgba(0,0,0,0.07);
    --btn-ghost-fg:    rgba(0,0,0,0.65);
    --btn-exit-fg:     rgba(0,0,0,0.4);
    --btn-exit-border: rgba(0,0,0,0.12);
    --title-fg:        #111;
    --dot:             #0a8f6e;
    --dot-warn:        #d97706;
    --dot-danger:      #dc2626;
    --badge-active:    #0a8f6e;
    --badge-warn:      #d97706;
    --badge-danger:    #dc2626;
    --success:         #0a8f6e;
    --error:           #dc2626;
  }

  /* ── host layout ─────────────────────────────────────────────────────────── */
  :host {
    all: initial;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  /* ── shared card ─────────────────────────────────────────────────────────── */
  .card {
    background: var(--bg);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: var(--shadow);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }
  .card.hidden {
    opacity: 0;
    transform: translateY(5px);
    pointer-events: none;
  }

  /* ── idle card ───────────────────────────────────────────────────────────── */
  .idle-card {
    display: flex;
    flex-direction: column;
    padding: 8px 10px 8px 13px;
    margin-bottom: 6px;
  }
  .idle-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .idle-hint {
    font-size: 11px;
    color: var(--text-dim);
    white-space: nowrap;
  }
  .idle-result {
    display: none;
    font-size: 11px;
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px solid var(--divider);
  }
  .idle-result.visible         { display: block; }
  .idle-result.idle-success    { color: var(--success); }
  .idle-result.idle-error      { color: var(--error); }

  /* ── select-mode panel ───────────────────────────────────────────────────── */
  .panel {
    padding: 12px 16px;
    color: var(--text);
    min-width: 215px;
    margin-bottom: 6px;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
  .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--dot);
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .dot.warn   { background: var(--dot-warn); }
  .dot.danger { background: var(--dot-danger); }

  .title { font-weight: 600; color: var(--title-fg); font-size: 13px; }

  .count-badge {
    margin-left: auto;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    white-space: nowrap;
    transition: color 0.15s;
  }
  .count-badge.has-selection { color: var(--badge-active); }
  .count-badge.warn   { color: var(--badge-warn); }
  .count-badge.danger { color: var(--badge-danger); }

  .hints {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 3px 10px;
  }
  .key {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 11px;
    color: var(--shortcut-fg);
    text-align: right;
    white-space: nowrap;
  }
  .label { font-size: 11px; color: var(--text-muted); }

  /* ── buttons ─────────────────────────────────────────────────────────────── */
  .btn {
    font-size: 11px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    border: none;
    border-radius: 6px;
    padding: 5px 10px;
    cursor: pointer;
    font-weight: 500;
    transition: opacity 0.15s;
    white-space: nowrap;
    pointer-events: auto;
  }
  .btn:hover { opacity: 0.8; }

  .btn-select {
    background: var(--btn-ghost-bg);
    color: var(--btn-ghost-fg);
  }
  .btn-delete { background: var(--dot-danger); color: #fff; }
  .btn-clear  { background: var(--btn-ghost-bg); color: var(--btn-ghost-fg); }
  .btn-exit   {
    width: 100%;
    background: transparent;
    color: var(--btn-exit-fg);
    border: 1px solid var(--btn-exit-border);
    transition: background 0.15s, color 0.15s;
  }
  .btn-exit:hover { background: var(--btn-ghost-bg); color: var(--text-muted); opacity: 1; }

  /* ── action bar (shown when chats selected) ─────────────────────────────── */
  .action-bar {
    display: none;
    gap: 6px;
    margin-top: 10px;
    padding-top: 8px;
    border-top: 1px solid var(--divider);
  }
  .action-bar.visible { display: flex; }

  /* ── exit bar ────────────────────────────────────────────────────────────── */
  .exit-bar {
    margin-top: 8px;
    padding-top: 6px;
    border-top: 1px solid var(--divider);
  }

  /* ── status / progress ───────────────────────────────────────────────────── */
  .status {
    display: none;
    font-size: 12px;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--divider);
    color: var(--text-muted);
  }
  .status.visible  { display: block; }
  .status.confirm  { color: var(--dot-warn); }
  .status.error    { color: var(--error); }
  .status.success  { color: var(--success); }

  .progress-bar { height: 2px; background: var(--divider); border-radius: 1px; margin-top: 6px; display: none; overflow: hidden; }
  .progress-bar.visible { display: block; }
  .progress-fill { height: 100%; background: var(--dot); border-radius: 1px; transition: width 0.2s; width: 0%; }

  /* ── shortcut chip (shared) ──────────────────────────────────────────────── */
  .shortcut {
    font-family: 'SF Mono', 'Fira Code', monospace;
    background: var(--shortcut-bg);
    color: var(--shortcut-fg);
    border-radius: 3px;
    padding: 1px 4px;
  }

`,w=null,T=null,E=null,D=null,O=null,k=null,A=null,j=null,M=null,N=null,P=null,F=null,I=null,L=null,R=null,z=null,B=``,V=null,H=null,U=null,W=null,G=null;function we(){return document.documentElement.classList.contains(`dark`)?`dark`:window.matchMedia(`(prefers-color-scheme: light)`).matches?`light`:`dark`}function Te(e){w?.classList.toggle(`light`,e===`light`)}function Ee(){if(document.getElementById(Se))return;let e=xe(),t=e?`⌘`:`Ctrl+`;B=e?`⌘⇧X`:`Ctrl+Shift+X`;let n=[[`click / Space`,C(`key_chat`)],[`${t}A`,C(`key_all`)],[`${t}D`,C(`key_clear`)],[`↩ × 2`,C(`key_delete`)],[`Esc`,C(`key_exit`)]];w=document.createElement(`div`),w.id=Se,T=w.attachShadow({mode:`open`}),T.innerHTML=`
    <style>${Ce}</style>

    <div class="card idle-card">
      <div class="idle-row">
        <span class="idle-hint"><span class="shortcut">${B}</span> ${C(`idle_hint`)}</span>
        <button class="btn btn-select">${C(`btn_select`)}</button>
      </div>
      <span class="idle-result"></span>
    </div>

    <div class="card panel hidden">
      <div class="header">
        <span class="dot"></span>
        <span class="title">${C(`mode_title`)}</span>
        <span class="count-badge">${C(`sel0`)}</span>
      </div>
      <div class="hints">
        ${n.map(([e,t])=>`<span class="key">${e}</span><span class="label">${t}</span>`).join(``)}
      </div>
      <div class="action-bar">
        <button class="btn btn-clear">${C(`btn_clear`)}</button>
        <button class="btn btn-delete">${C(`btn_del1`)}</button>
      </div>
      <div class="status"></div>
      <div class="progress-bar"><div class="progress-fill"></div></div>
      <div class="exit-bar">
        <button class="btn btn-exit">${C(`btn_exit`)}</button>
      </div>
    </div>

  `,document.body.appendChild(w),D=T.querySelector(`.idle-card`),O=T.querySelector(`.idle-result`),k=T.querySelector(`.panel`),A=T.querySelector(`.dot`),j=T.querySelector(`.count-badge`),M=T.querySelector(`.status`),N=T.querySelector(`.progress-bar`),P=T.querySelector(`.progress-fill`),F=T.querySelector(`.action-bar`),I=T.querySelector(`.btn-delete`),L=T.querySelector(`.btn-clear`),R=T.querySelector(`.btn-exit`),z=T.querySelector(`.btn-select`),z?.addEventListener(`click`,()=>U?.()),I?.addEventListener(`click`,()=>V?.()),L?.addEventListener(`click`,()=>H?.()),R?.addEventListener(`click`,()=>W?.()),Te(we()),E=new MutationObserver(()=>Te(we())),E.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`]}),oe(e=>{let t=e===`active`;D?.classList.toggle(`hidden`,t),k?.classList.toggle(`hidden`,!t),t||Pe()}),se(e=>{if(!j)return;let t=e.size;j.textContent=t===0?C(`sel0`):t===1?C(`sel1`):C(`selN`,[String(t)]),j.classList.toggle(`has-selection`,t>0),j.classList.remove(`warn`,`danger`),A?.classList.remove(`warn`,`danger`),F?.classList.toggle(`visible`,t>0),I&&(I.textContent=t===1?C(`btn_del1`):C(`btn_delN`,[String(t)]))}),h()===`active`&&(D?.classList.add(`hidden`),k?.classList.remove(`hidden`))}function De(e){U=e}function Oe(e){V=e}function ke(e){H=e}function Ae(e){W=e}function je(e){Fe(e===1?C(`conf1`):C(`confN`,[String(e)]),`confirm`),j?.classList.add(`warn`),A?.classList.add(`warn`)}function Me(e,t){Ie(),!(!N||!P)&&(N.classList.add(`visible`),P.style.width=`${Math.round(e/t*100)}%`)}function Ne(e,t){if(G&&=(clearTimeout(G),null),!O)return;let n=t===0?e===1?C(`done1`):C(`doneN`,[String(e)]):C(`doneFail`,[String(e),String(t)]);O.textContent=n,O.className=`idle-result visible ${t===0?`idle-success`:`idle-error`}`,G=setTimeout(()=>{G=null,O&&(O.className=`idle-result`)},3e3)}function Pe(){Ie(),N?.classList.remove(`visible`),j?.classList.remove(`warn`,`danger`),A?.classList.remove(`warn`,`danger`)}function Fe(e,t){M&&(M.textContent=e,M.className=`status visible ${t}`)}function Ie(){M&&(M.textContent=``,M.className=`status`)}function Le(){E?.disconnect(),E=null,G&&=(clearTimeout(G),null),w?.remove(),w=T=D=O=k=A=j=M=N=P=F=I=L=R=z=null,V=H=U=W=null,B=``}var Re=2e3,K=!1,q=null,J=e=>xe()?e.metaKey:e.ctrlKey;function Y(){K=!1,q&&=(clearTimeout(q),null),Pe()}async function ze(){let e=[...g()];if(!e.length)return;let t=ae();t.forEach(e=>{let t=e.element.closest(`li`)??e.element.parentElement??e.element;t.style.display=`none`}),v();let n=await be(e,(e,t)=>Me(e,t));n.failed.forEach(e=>{let n=t.find(t=>t.id===e);if(n){let e=n.element.closest(`li`)??n.element.parentElement??n.element;e.style.display=``}}),Ne(n.succeeded.length,n.failed.length)}async function Be(){if(g().size){if(!K){K=!0,je(g().size),q=setTimeout(Y,Re);return}Y(),await ze()}}function Ve(e){if(J(e)&&e.shiftKey&&e.code===`KeyX`){e.preventDefault(),h()===`idle`?_():(Y(),v());return}if(h()!==`active`)return;if(e.key===`Escape`){e.preventDefault(),Y(),v();return}let t=document.activeElement;if(!(t&&(t.tagName===`INPUT`||t.tagName===`TEXTAREA`||t.isContentEditable)))switch(e.code){case`Space`:e.preventDefault(),Y(),ue();break;case`KeyA`:J(e)&&(e.preventDefault(),Y(),de());break;case`KeyD`:J(e)&&(e.preventDefault(),Y(),y());break;case`Enter`:e.preventDefault(),Be();break}}var He=`nav[aria-label="Sidebar"] a[href*="/chat/"], a[href*="/chat/"]`;function X(e){return!e||!(e instanceof Element)?null:e.closest(He)}function Ue(e){if(h()!==`active`)return;let t=X(e.target);if(!t)return;let n=t.dataset.chatId??i(t.getAttribute(`href`)||``);n&&(t.dataset.chatId||(t.dataset.chatId=n),ce(n))}function We(e){if(h()!==`active`)return;let t=X(e.target);t&&(t.contains(e.relatedTarget)||ce(null))}function Ge(e){if(!e||!(e instanceof Element))return!1;let t=e.closest(`button[aria-haspopup]`);return t?!!t.closest(`nav[aria-label="Sidebar"] li, nav[aria-label="Sidebar"] .group`):!1}function Ke(e){h()===`active`&&Ge(e.target)&&(e.preventDefault(),e.stopPropagation())}function qe(e){if(h()!==`active`)return;if(Ge(e.target)){e.preventDefault(),e.stopPropagation();return}let t=X(e.target);if(!t)return;e.preventDefault(),e.stopPropagation();let n=t.dataset.chatId??i(t.getAttribute(`href`)||``);n&&le(n)}function Je(){De(()=>_()),Oe(()=>ze()),ke(()=>y()),Ae(()=>{Y(),v()}),document.addEventListener(`keydown`,Ve,{capture:!0}),document.addEventListener(`mousedown`,Ke,{capture:!0}),document.addEventListener(`mouseover`,Ue,{capture:!0}),document.addEventListener(`mouseout`,We,{capture:!0}),document.addEventListener(`click`,qe,{capture:!0})}function Ye(){Y(),document.removeEventListener(`keydown`,Ve,{capture:!0}),document.removeEventListener(`mousedown`,Ke,{capture:!0}),document.removeEventListener(`mouseover`,Ue,{capture:!0}),document.removeEventListener(`mouseout`,We,{capture:!0}),document.removeEventListener(`click`,qe,{capture:!0})}var Z=`cbd-styles`,Xe=`
/* Hovered chat in selection mode */
a.cbd-hover {
  outline: 2px solid rgba(16, 163, 127, 0.7) !important;
  outline-offset: -2px !important;
  border-radius: 6px !important;
  cursor: pointer !important;
}

/* Selected chat */
a.cbd-selected {
  background-color: rgba(16, 163, 127, 0.18) !important;
  border-radius: 6px !important;
}

/* Hovered + selected */
a.cbd-hover.cbd-selected {
  background-color: rgba(16, 163, 127, 0.28) !important;
  outline-color: #10a37f !important;
}
`;function Ze(){if(document.getElementById(Z))return;let e=document.createElement(`style`);e.id=Z,e.textContent=Xe,document.head.appendChild(e)}function Qe(){document.getElementById(Z)?.remove()}var $e=e({matches:[`https://claude.ai/*`,`http://localhost:3334/*`],main(){return Ze(),Ee(),et(()=>{ne(),Je(),te(()=>pe())}),()=>{Ye(),re(),Le(),Qe()}}});function et(e){if(document.querySelector(`nav[aria-label="Sidebar"]`)){e();return}let t=new MutationObserver(()=>{document.querySelector(`nav[aria-label="Sidebar"]`)&&(t.disconnect(),e())});t.observe(document.body,{childList:!0,subtree:!0})}var tt={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)},Q=class e extends Event{static EVENT_NAME=$(`wxt:locationchange`);constructor(t,n){super(e.EVENT_NAME,{}),this.newUrl=t,this.oldUrl=n}};function $(e){return`${S?.runtime?.id}:content:${e}`}var nt=typeof globalThis.navigation?.addEventListener==`function`;function rt(e){let t,n=!1;return{run(){n||(n=!0,t=new URL(location.href),nt?globalThis.navigation.addEventListener(`navigate`,e=>{let n=new URL(e.destination.url);n.href!==t.href&&(window.dispatchEvent(new Q(n,t)),t=n)},{signal:e.signal}):e.setInterval(()=>{let e=new URL(location.href);e.href!==t.href&&(window.dispatchEvent(new Q(e,t)),t=e)},1e3))}}}var it=class e{static SCRIPT_STARTED_MESSAGE_TYPE=$(`wxt:content-script-started`);id;abortController;locationWatcher=rt(this);constructor(e,t){this.contentScriptName=e,this.options=t,this.id=Math.random().toString(36).slice(2),this.abortController=new AbortController,this.stopOldScripts(),this.listenForNewerScripts()}get signal(){return this.abortController.signal}abort(e){return this.abortController.abort(e)}get isInvalid(){return S.runtime?.id??this.notifyInvalidated(),this.signal.aborted}get isValid(){return!this.isInvalid}onInvalidated(e){return this.signal.addEventListener(`abort`,e),()=>this.signal.removeEventListener(`abort`,e)}block(){return new Promise(()=>{})}setInterval(e,t){let n=setInterval(()=>{this.isValid&&e()},t);return this.onInvalidated(()=>clearInterval(n)),n}setTimeout(e,t){let n=setTimeout(()=>{this.isValid&&e()},t);return this.onInvalidated(()=>clearTimeout(n)),n}requestAnimationFrame(e){let t=requestAnimationFrame((...t)=>{this.isValid&&e(...t)});return this.onInvalidated(()=>cancelAnimationFrame(t)),t}requestIdleCallback(e,t){let n=requestIdleCallback((...t)=>{this.signal.aborted||e(...t)},t);return this.onInvalidated(()=>cancelIdleCallback(n)),n}addEventListener(e,t,n,r){t===`wxt:locationchange`&&this.isValid&&this.locationWatcher.run(),e.addEventListener?.(t.startsWith(`wxt:`)?$(t):t,n,{...r,signal:this.signal})}notifyInvalidated(){this.abort(`Content script context invalidated`),tt.debug(`Content script "${this.contentScriptName}" context invalidated`)}stopOldScripts(){document.dispatchEvent(new CustomEvent(e.SCRIPT_STARTED_MESSAGE_TYPE,{detail:{contentScriptName:this.contentScriptName,messageId:this.id}})),this.options?.noScriptStartedPostMessage||window.postMessage({type:e.SCRIPT_STARTED_MESSAGE_TYPE,contentScriptName:this.contentScriptName,messageId:this.id},`*`)}verifyScriptStartedEvent(e){let t=e.detail?.contentScriptName===this.contentScriptName,n=e.detail?.messageId===this.id;return t&&!n}listenForNewerScripts(){let t=e=>{!(e instanceof CustomEvent)||!this.verifyScriptStartedEvent(e)||this.notifyInvalidated()};document.addEventListener(e.SCRIPT_STARTED_MESSAGE_TYPE,t),this.onInvalidated(()=>document.removeEventListener(e.SCRIPT_STARTED_MESSAGE_TYPE,t))}},at={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)};return(async()=>{try{let{main:e,...t}=$e;return await e(new it(`content`,t))}catch(e){throw at.error(`The content script "content" crashed on startup!`,e),e}})()})();
content;