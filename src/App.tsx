import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Camera,
  CarFront,
  ChevronRight,
  CircleParking,
  Clock3,
  Cpu,
  DoorOpen,
  Gauge,
  LayoutDashboard,
  ListFilter,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Users,
  Wifi,
  X,
} from 'lucide-react'
import { passages, type Passage } from './data'

const navigation = [
  { label: 'Genel Bakış', icon: LayoutDashboard, active: true },
  { label: 'Canlı Geçişler', icon: Camera },
  { label: 'Araçlar', icon: CarFront },
  { label: 'Aboneler', icon: Users },
  { label: 'Otopark', icon: CircleParking },
  { label: 'Cihazlar', icon: Cpu },
  { label: 'Raporlar', icon: BarChart3 },
  { label: 'Ayarlar', icon: Settings },
]

function StatusPill({ status }: { status: Passage['status'] }) {
  const tone = status === 'İzin verildi' ? 'success' : status === 'Reddedildi' ? 'danger' : 'warning'
  return <span className={`status-pill ${tone}`}>{status}</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [gateOpen, setGateOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.toLocaleUpperCase('tr-TR').trim()
    if (!normalized) return passages
    return passages.filter((item) => item.plate.includes(normalized) || item.type.toLocaleUpperCase('tr-TR').includes(normalized))
  }, [query])

  function triggerGate() {
    setGateOpen(true)
    setNotice('Ana giriş bariyeri manuel olarak açıldı.')
    window.setTimeout(() => setGateOpen(false), 3500)
    window.setTimeout(() => setNotice(''), 5000)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><CarFront size={25} strokeWidth={2.2} /></div>
          <div><strong>PROVIFE</strong><span>Akıllı Otopark</span></div>
          <button className="icon-button close-menu" onClick={() => setMenuOpen(false)} aria-label="Menüyü kapat"><X /></button>
        </div>
        <nav>
          <p className="nav-caption">YÖNETİM</p>
          {navigation.map(({ label, icon: Icon, active }) => (
            <button className={`nav-item ${active ? 'active' : ''}`} key={label} onClick={() => setMenuOpen(false)}>
              <Icon size={20} /> <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="site-card">
          <div className="site-icon"><CircleParking size={22} /></div>
          <div><span>AKTİF TESİS</span><strong>Provife Merkez</strong><small>İstanbul · 120 kapasite</small></div>
          <ChevronRight size={18} />
        </div>
        <div className="sidebar-footer"><span className="online-dot" /> Sistem çevrimiçi <small>v0.1.0</small></div>
      </aside>

      {menuOpen && <button className="overlay" aria-label="Menüyü kapat" onClick={() => setMenuOpen(false)} />}

      <main className="main-content">
        <header className="topbar">
          <button className="icon-button menu-button" onClick={() => setMenuOpen(true)} aria-label="Menüyü aç"><Menu /></button>
          <div className="search-box"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Plaka veya abone ara..." /></div>
          <div className="header-actions">
            <div className="connection"><Wifi size={17} /><span>Yerel bağlantı</span></div>
            <button className="icon-button notification" aria-label="Bildirimler"><Bell size={20} /><i /></button>
            <div className="avatar">TA</div>
          </div>
        </header>

        <div className="page">
          <section className="page-heading">
            <div><p className="eyebrow">25 TEMMUZ 2026 · CUMARTESİ</p><h1>İyi akşamlar, Tez Bey</h1><p>Otopark operasyonunuzun anlık durumu burada.</p></div>
            <button className={`gate-button ${gateOpen ? 'opened' : ''}`} onClick={triggerGate}><DoorOpen size={19} />{gateOpen ? 'Bariyer açıldı' : 'Bariyeri aç'}</button>
          </section>

          {notice && <div className="toast"><ShieldCheck size={19} />{notice}</div>}

          <section className="stats-grid">
            <article className="stat-card"><div className="stat-icon blue"><CarFront /></div><div><span>İçerideki Araç</span><strong>78</strong><small><b>+12</b> bugünkü net değişim</small></div></article>
            <article className="stat-card"><div className="stat-icon green"><CircleParking /></div><div><span>Boş Kapasite</span><strong>42 <em>/ 120</em></strong><small>Doluluk oranı %65</small></div></article>
            <article className="stat-card"><div className="stat-icon orange"><Activity /></div><div><span>Bugünkü Geçiş</span><strong>342</strong><small><b>+8%</b> geçen cumartesiye göre</small></div></article>
            <article className="stat-card"><div className="stat-icon violet"><Clock3 /></div><div><span>Ortalama Süre</span><strong>2s 14dk</strong><small>Son 30 gün ortalaması</small></div></article>
          </section>

          <section className="content-grid">
            <article className="panel live-panel">
              <div className="panel-header"><div><span className="live-dot" /> CANLI KAMERA <h2>Ana Giriş</h2></div><button className="text-button">Tüm kameralar <ChevronRight size={17} /></button></div>
              <div className="camera-view">
                <div className="camera-grid" />
                <div className="camera-placeholder"><Camera size={44} /><strong>RTSP kamera bekleniyor</strong><span>Canlı akış yerel servis bağlandığında burada görünecek</span></div>
                <div className="camera-meta"><span><i /> CAM-01 · ÇEVRİMİÇİ</span><span>1080p · 25 FPS</span></div>
                <div className="detection-box"><span>34 PVF 2026 · %99</span></div>
              </div>
              <div className="recognition-result">
                <div className="vehicle-swatch" />
                <div className="plate-block"><span>SON OKUNAN PLAKA</span><strong>34 <b>PVF</b> 2026</strong></div>
                <div className="result-info"><span>Abone</span><strong>Provife Teknoloji</strong></div>
                <div className="result-info"><span>Güven</span><strong className="confidence">%99</strong></div>
                <StatusPill status="İzin verildi" />
              </div>
            </article>

            <article className="panel occupancy-panel">
              <div className="panel-header"><div><p className="eyebrow">ANLIK DURUM</p><h2>Otopark Doluluğu</h2></div><Gauge size={23} /></div>
              <div className="donut" style={{ '--value': '65%' } as React.CSSProperties}><div><strong>%65</strong><span>DOLU</span></div></div>
              <div className="capacity-line"><div><span className="legend occupied" />Dolu<strong>78</strong></div><div><span className="legend empty" />Boş<strong>42</strong></div></div>
              <div className="zone-list">
                <div><span>A Blok</span><div className="bar"><i style={{ width: '82%' }} /></div><strong>41/50</strong></div>
                <div><span>B Blok</span><div className="bar"><i style={{ width: '58%' }} /></div><strong>29/50</strong></div>
                <div><span>Misafir</span><div className="bar"><i style={{ width: '40%' }} /></div><strong>8/20</strong></div>
              </div>
            </article>
          </section>

          <section className="panel passages-panel">
            <div className="panel-header"><div><p className="eyebrow">BUGÜN</p><h2>Son Geçişler</h2></div><div className="table-actions"><button className="filter-button"><ListFilter size={17} /> Filtrele</button><button className="text-button">Tümünü gör <ChevronRight size={17} /></button></div></div>
            <div className="table-wrap"><table><thead><tr><th>ARAÇ</th><th>PLAKA</th><th>YÖN</th><th>TÜR</th><th>GÜVEN</th><th>KAPI</th><th>SAAT</th><th>DURUM</th></tr></thead><tbody>
              {filtered.map((item) => <tr key={item.id}><td><span className="car-dot" style={{ background: item.color }}><CarFront size={18} /></span></td><td><strong className="table-plate">{item.plate}</strong></td><td><span className={`direction ${item.direction === 'Giriş' ? 'in' : 'out'}`}>{item.direction}</span></td><td>{item.type}</td><td><strong className={item.confidence < 85 ? 'low-confidence' : ''}>%{item.confidence}</strong></td><td>{item.gate}</td><td>{item.time}</td><td><StatusPill status={item.status} /></td></tr>)}
            </tbody></table>{filtered.length === 0 && <div className="empty-state">Aramanızla eşleşen geçiş bulunamadı.</div>}</div>
          </section>

          <section className="system-strip">
            <div><span className="system-icon"><Cpu size={19} /></span><p><strong>Yerel sunucu</strong><small>Çevrimiçi · 18 ms</small></p><i className="ok-dot" /></div>
            <div><span className="system-icon"><Camera size={19} /></span><p><strong>Kameralar</strong><small>2 / 2 çevrimiçi</small></p><i className="ok-dot" /></div>
            <div><span className="system-icon"><DoorOpen size={19} /></span><p><strong>Bariyerler</strong><small>2 / 2 hazır</small></p><i className="ok-dot" /></div>
            <div className="warning-item"><span className="system-icon"><AlertTriangle size={19} /></span><p><strong>Uyarılar</strong><small>1 düşük güvenli okuma</small></p><i className="warning-dot" /></div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App

