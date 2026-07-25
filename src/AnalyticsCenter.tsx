import { useState } from 'react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  CarFront,
  ChevronRight,
  CircleParking,
  CreditCard,
  DoorOpen,
  Maximize,
  Minus,
  RefreshCw,
  Users,
  WalletCards,
  ZoomIn,
} from 'lucide-react'

const trendToday = [10, 14, 16, 21, 20, 27, 37, 48, 61, 72, 76, 75, 74, 78, 81, 84, 80, 75, 75, 71, 65, 67]
const trendYesterday = [11, 9, 8, 14, 14, 22, 30, 38, 47, 56, 59, 63, 66, 65, 67, 66, 66, 64, 63, 59, 53, 57]

const entries = [
  ['10:24:31', '34 ABC 123', 'Renault Clio', 'Beyaz', 'Giriş 1'],
  ['10:22:18', '06 KLM 78', 'Toyota Corolla', 'Gri', 'Giriş 2'],
  ['10:20:05', '35 YSF 2026', 'Volkswagen Golf', 'Siyah', 'Giriş 1'],
  ['10:17:42', '34 DRT 535', 'Fiat Egea', 'Beyaz', 'Giriş 2'],
  ['10:15:09', '07 HJK 909', 'Honda Civic', 'Mavi', 'Giriş 1'],
]

const exits = [
  ['10:23:55', '34 ABC 123', 'Renault Clio', 'Beyaz', 'Çıkış 1', '₺45,00'],
  ['10:21:43', '06 KLM 78', 'Toyota Corolla', 'Gri', 'Çıkış 2', '₺30,00'],
  ['10:19:32', '35 YSF 2026', 'Volkswagen Golf', 'Siyah', 'Çıkış 1', '₺60,00'],
  ['10:16:50', '34 DRT 535', 'Fiat Egea', 'Beyaz', 'Çıkış 2', '₺40,00'],
  ['10:14:21', '07 HJK 909', 'Honda Civic', 'Mavi', 'Çıkış 1', '₺25,00'],
]

const zones = [
  { name: 'B1-A', count: '98 / 120', rate: '%82', tone: 'good' },
  { name: 'B1-B', count: '76 / 120', rate: '%63', tone: 'medium' },
  { name: 'B1-C', count: '112 / 120', rate: '%93', tone: 'critical' },
  { name: 'B1-D', count: '90 / 120', rate: '%75', tone: 'good' },
  { name: 'MERDİVEN', count: '↙', rate: '', tone: 'closed' },
  { name: 'B1-E', count: '85 / 120', rate: '%71', tone: 'good' },
  { name: 'B1-F', count: '118 / 120', rate: '%98', tone: 'critical' },
  { name: 'B1-G', count: '87 / 120', rate: '%73', tone: 'medium' },
  { name: 'B1-H', count: '76 / 120', rate: '%63', tone: 'good' },
]

function Polyline({ data, color }: { data: number[]; color: string }) {
  const points = data.map((value, index) => `${(index / (data.length - 1)) * 100},${100 - value}`).join(' ')
  return <polyline points={points} fill="none" stroke={color} strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
}

function Metric({ icon: Icon, title, value, sub, tone = 'neutral' }: { icon: typeof CarFront; title: string; value: string; sub: string; tone?: string }) {
  return <article className={`analytics-metric ${tone}`}><span className="analytics-metric-icon"><Icon /></span><div><small>{title}</small><strong>{value}</strong><p>{sub}</p></div></article>
}

function PassageTable({ title, rows, exit = false }: { title: string; rows: string[][]; exit?: boolean }) {
  return <section className="analytics-panel passage-table-panel">
    <div className="analytics-panel-heading"><h2>{title}</h2><button>Tümü <ChevronRight /></button></div>
    <div className="analytics-table"><div className="analytics-tr analytics-th"><span>Zaman</span><span>Plaka</span><span>Araç</span><span>Bariyer / Kapı</span>{exit && <span>Ücret</span>}</div>
      {rows.map((row) => <div className="analytics-tr" key={`${title}-${row[0]}`}><span className={exit ? 'down' : 'up'}>{exit ? <ArrowDownRight /> : <ArrowUpRight />}{row[0]}</span><strong>{row[1]}</strong><span>{row[2]}<small>{row[3]}</small></span><span>{row[4]}</span>{exit && <b>{row[5]}</b>}</div>)}
    </div>
  </section>
}

function AnalyticsCenter() {
  const [period, setPeriod] = useState('24 Saat')
  return <div className="analytics-center">
    <section className="analytics-metrics">
      <article className="analytics-metric occupancy-analytics"><div className="analytics-donut"><CarFront /></div><div><small>DOLULUK ORANI</small><strong>78 <em>/ 120 Dolu</em></strong><b>%65</b><p>Boş: 42</p></div></article>
      <Metric icon={WalletCards} title="BUGÜNKÜ GELİR" value="₺18.642" sub="Dün: ₺17.235     ▲ %8,15" tone="revenue" />
      <Metric icon={Users} title="AKTİF ABONE" value="1.284" sub="Dün: 1.268       ▲ %1,26" />
      <Metric icon={AlertTriangle} title="AKTİF ALARMLAR" value="3 Kritik" sub="Toplam: 5     Detaylar →" tone="alarm" />
    </section>

    <section className="analytics-primary-grid">
      <article className="analytics-panel trend-panel">
        <div className="analytics-panel-heading"><h2>DOLULUK TRENDİ</h2><div className="period-tabs">{['6 Saat', '24 Saat', '7 Gün', '30 Gün'].map((item) => <button className={period === item ? 'active' : ''} onClick={() => setPeriod(item)} key={item}>{item}</button>)}</div></div>
        <div className="chart-legend"><span className="today">● Doluluk Oranı (%)</span><span className="yesterday">● Dün (%)</span></div>
        <div className="trend-chart"><div className="y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><svg viewBox="0 0 100 100" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff4545" stopOpacity=".22"/><stop offset="1" stopColor="#ff4545" stopOpacity="0"/></linearGradient></defs><polygon points={`0,100 ${trendToday.map((v, i) => `${(i / (trendToday.length - 1)) * 100},${100-v}`).join(' ')} 100,100`} fill="url(#chartFill)"/><Polyline data={trendToday} color="#ff4747"/><Polyline data={trendYesterday} color="#2f8de4"/></svg><div className="x-labels"><span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>24:00</span></div><b className="chart-current red">65%</b><b className="chart-current blue">57%</b></div>
        <p className="chart-note">ⓘ Veriler 5 dakikada bir güncellenir.</p>
      </article>

      <article className="analytics-panel zone-panel">
        <div className="analytics-panel-heading"><h2>KAT / BÖLGE DOLULUK HARİTASI</h2><select aria-label="Kat seçimi"><option>B1. Kat</option><option>B2. Kat</option></select></div>
        <div className="zone-map"><div className="map-tools"><button><ZoomIn /></button><button><Minus /></button><button><Maximize /></button></div><div className="zones">{zones.map((zone) => <button className={`zone ${zone.tone}`} key={zone.name}><strong>{zone.name}</strong><span>{zone.count}</span><small>{zone.rate}</small></button>)}</div><div className="zone-legend"><span><i className="good" />0 - 60%</span><span><i className="medium" />61 - 85%</span><span><i className="critical" />86 - 100%</span><span><i className="closed" />Kapalı</span></div></div>
      </article>
    </section>

    <section className="analytics-bottom-grid">
      <PassageTable title="GİRİŞ GEÇİŞLERİ" rows={entries} />
      <PassageTable title="ÇIKIŞ GEÇİŞLERİ" rows={exits} exit />
      <div className="analytics-side-stack">
        <section className="analytics-panel health-panel"><div className="analytics-panel-heading"><h2>CİHAZ SAĞLIĞI</h2><button>Tümü <ChevronRight /></button></div><div className="health-cards"><div><Camera /><span>ANPR KAMERA</span><strong>18<small>/20</small></strong><b className="ok">● Çevrimiçi</b></div><div><DoorOpen /><span>GİRİŞ BARİYERİ</span><strong>8<small>/8</small></strong><b className="ok">● Çevrimiçi</b></div><div><DoorOpen /><span>ÇIKIŞ BARİYERİ</span><strong>7<small>/8</small></strong><b className="attention">● Dikkat</b></div><div><CreditCard /><span>ÖDEME TERMİNALİ</span><strong>4<small>/5</small></strong><b className="offline">● Çevrimdışı</b></div></div></section>
        <section className="analytics-panel payments-panel"><div className="analytics-panel-heading"><h2>SON ÖDEMELER</h2><button>Tümü <ChevronRight /></button></div><div className="payment-rows"><div className="payment-head"><span>Zaman</span><span>İşlem</span><span>Plaka</span><span>Tutar</span><span>Durum</span></div>{exits.slice(0,4).map((row) => <div key={`pay-${row[0]}`}><span>{row[0]}</span><span>Çıkış ödemesi</span><span>{row[1]}</span><b>{row[5]}</b><strong>Başarılı</strong></div>)}</div></section>
      </div>
    </section>
    <footer className="analytics-footer"><span>◷ {new Date().toLocaleTimeString('tr-TR')} &nbsp; · &nbsp; 25 Temmuz 2026 Cumartesi</span><span>Veri güncellendi: az önce <RefreshCw /></span></footer>
  </div>
}

export default AnalyticsCenter
