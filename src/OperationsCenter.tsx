import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  BatteryCharging,
  CalendarDays,
  Camera,
  CarFront,
  Check,
  ChevronRight,
  CircleParking,
  CloudSun,
  CreditCard,
  DoorOpen,
  Info,
  ShieldCheck,
  Timer,
  Zap,
} from 'lucide-react'

type SpaceKind = 'available' | 'occupied' | 'charging' | 'accessible'

type Space = {
  id: string
  kind: SpaceKind
  vehicle?: string
}

const vehicleColors = ['graphite', 'white', 'blue', 'orange', 'red', 'black']

function createSpaces(prefix: string, total: number, occupiedIndexes: number[], special: Record<number, SpaceKind> = {}): Space[] {
  return Array.from({ length: total }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    kind: special[index] ?? (occupiedIndexes.includes(index) ? 'occupied' : 'available'),
    vehicle: occupiedIndexes.includes(index) ? vehicleColors[index % vehicleColors.length] : undefined,
  }))
}

const areaA = [
  createSpaces('A1', 10, [0, 3, 5, 8], { 6: 'charging', 7: 'charging' }),
  createSpaces('A2', 10, [1, 4, 7], { 9: 'accessible' }),
  createSpaces('A3', 10, [0, 3, 6, 8], { 9: 'accessible' }),
]

const areaB = [
  createSpaces('B1', 12, [0, 2, 5, 8], { 9: 'charging' }),
  createSpaces('B2', 12, [1, 4, 7, 10], { 11: 'accessible' }),
  createSpaces('B3', 12, [0, 3, 6, 9], { 1: 'charging', 2: 'charging', 11: 'accessible' }),
  createSpaces('B4', 12, [2, 5, 8], { 10: 'accessible' }),
]

const livePassages = [
  { plate: '34 ABC 123', direction: 'Giriş', time: '10:24:18', color: 'white' },
  { plate: '06 YSF 2026', direction: 'Çıkış', time: '10:23:45', color: 'black' },
  { plate: '34 DEF 456', direction: 'Giriş', time: '10:22:31', color: 'graphite' },
  { plate: '35 GHI 789', direction: 'Çıkış', time: '10:21:06', color: 'white' },
  { plate: '07 JKL 101', direction: 'Giriş', time: '10:20:14', color: 'blue' },
]

function MetricCard({ title, value, detail, tone = 'mint', ring, icon }: { title: string; value: string; detail: string; tone?: 'mint' | 'amber'; ring?: number; icon?: boolean }) {
  return <article className="ops-metric">
    <div><span>{title}</span><strong className={tone}>{value}</strong><small>{detail}</small></div>
    {ring !== undefined && <div className={`mini-ring ${tone}`} style={{ '--ring': `${ring}%` } as React.CSSProperties}>{icon && <Zap size={20} />}</div>}
  </article>
}

function ParkingRow({ spaces }: { spaces: Space[] }) {
  return <div className="parking-row">
    {spaces.map((space) => <button className={`parking-space ${space.kind}`} key={space.id} title={`${space.id} · ${space.kind}`}>
      {space.vehicle && <span className={`top-car ${space.vehicle}`}><i /><b /></span>}
      {space.kind === 'charging' && <Zap size={19} />}
      {space.kind === 'accessible' && <span className="accessible-mark">♿</span>}
    </button>)}
  </div>
}

function ParkingArea({ name, rows }: { name: string; rows: Space[][] }) {
  return <section className="parking-area">
    <span className="area-label">{name}</span>
    {rows.map((row, index) => <ParkingRow spaces={row} key={`${name}-${index}`} />)}
  </section>
}

function OperationsCenter() {
  const [activeFlow, setActiveFlow] = useState<'Giriş' | 'Çıkış'>('Giriş')
  const [now, setNow] = useState(new Date())
  const filteredPassages = useMemo(() => livePassages.filter((item) => item.direction === activeFlow), [activeFlow])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return <div className="operations-center">
    <header className="ops-header">
      <div><p className="ops-kicker">CANLI SİSTEM</p><h1>Operasyon Merkezi</h1></div>
      <div className="ops-context">
        <span><CloudSun />18°C</span><i /><span><CalendarDays />25 Temmuz 2026<small>Cumartesi</small></span><i /><span><Timer />{now.toLocaleTimeString('tr-TR')}</span>
      </div>
    </header>

    <div className="ops-layout">
      <div className="ops-main">
        <section className="ops-metrics">
          <MetricCard title="Doluluk" value="%65" detail="78 / 120" />
          <MetricCard title="Alan A" value="%81" detail="41 / 50" tone="amber" ring={81} />
          <MetricCard title="Alan B" value="%58" detail="29 / 50" ring={58} />
          <MetricCard title="EV Şarj" value="%40" detail="8 / 20" ring={40} icon />
        </section>

        <section className="parking-map">
          <div className="map-road top-road"><span>↓</span><span>↓</span><span>↑</span><span>↑</span><span>↓</span></div>
          <div className="map-gate entrance"><strong>GİRİŞ</strong><span className="barrier-arm" /><Camera /><small>ANPR</small></div>
          <div className="map-gate exit"><strong>ÇIKIŞ</strong><span className="barrier-arm" /><Camera /><small>ANPR</small></div>
          <ParkingArea name="Alan A" rows={areaA} />
          <div className="map-divider"><span>→</span><span>←</span><span>→</span><span>←</span></div>
          <ParkingArea name="Alan B" rows={areaB} />
          <div className="map-landscape top-left" /><div className="map-landscape top-right" /><div className="map-landscape bottom-left" /><div className="map-landscape bottom-right" />
          <div className="map-legend"><span><i className="available" />Müsait</span><span><i className="occupied" />Dolu</span><span><i className="charging" />EV Şarj</span><span><i className="accessible" />Engelli</span><span className="entry-arrow">→ Giriş</span><span className="exit-arrow">→ Çıkış</span></div>
        </section>
      </div>

      <aside className="ops-side">
        <section className="ops-panel live-passages">
          <div className="ops-panel-title"><h2>Canlı Geçişler</h2><button>Tümü</button></div>
          <div className="flow-tabs"><button className={activeFlow === 'Giriş' ? 'active' : ''} onClick={() => setActiveFlow('Giriş')}>Giriş</button><button className={activeFlow === 'Çıkış' ? 'active' : ''} onClick={() => setActiveFlow('Çıkış')}>Çıkış</button></div>
          <div className="passage-cards">
            {filteredPassages.map((item) => <article key={item.plate}>
              <span className={`side-car ${item.color}`}><CarFront /></span>
              <div><strong>{item.plate}</strong><small className={item.direction === 'Giriş' ? 'entry-text' : 'exit-text'}>● {item.direction}</small></div>
              <time>{item.time}</time>
            </article>)}
          </div>
        </section>

        <section className="ops-panel device-health">
          <div><DoorOpen /><span>Bariyerler</span><Check /><small>Aktif</small></div>
          <div><Camera /><span>ANPR</span><Check /><small>Aktif</small></div>
          <div><CreditCard /><span>Ödeme</span><Check /><small>Aktif</small></div>
          <div className="all-active"><strong>Tümü</strong><b>Aktif</b><ShieldCheck /></div>
        </section>

        <section className="ops-panel notifications-panel">
          <div className="ops-panel-title"><h2>Aktivite & Bildirimler</h2><button>Tümü</button></div>
          <div className="notification-list">
            <article className="warn"><AlertTriangle /><div><strong>Yüksek Doluluk</strong><small>Alan A doluluk %80'i geçti.</small></div><time>10:23</time></article>
            <article className="info"><Info /><div><strong>Ödeme Başarılı</strong><small>34 ABC 123 · ₺120,00</small></div><time>10:22</time></article>
            <article className="good"><Check /><div><strong>Abonelik Girişi</strong><small>06 YSF 2026 · Aylık Abone</small></div><time>10:21</time></article>
            <article className="charge"><BatteryCharging /><div><strong>EV Şarj İstasyonu</strong><small>İstasyon 3 kullanıma alındı.</small></div><time>10:20</time></article>
          </div>
        </section>
      </aside>
    </div>
  </div>
}

export default OperationsCenter
