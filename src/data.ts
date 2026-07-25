export type Passage = {
  id: number
  plate: string
  direction: 'Giriş' | 'Çıkış'
  time: string
  type: 'Abone' | 'Ziyaretçi' | 'Personel' | 'Bilinmiyor'
  confidence: number
  gate: string
  status: 'İzin verildi' | 'Onay bekliyor' | 'Reddedildi'
  color: string
}

export const passages: Passage[] = [
  { id: 1, plate: '34 PVF 2026', direction: 'Giriş', time: '20:14:08', type: 'Abone', confidence: 99, gate: 'Ana Giriş', status: 'İzin verildi', color: '#3059d9' },
  { id: 2, plate: '06 ANK 1453', direction: 'Çıkış', time: '20:12:41', type: 'Ziyaretçi', confidence: 97, gate: 'Ana Çıkış', status: 'İzin verildi', color: '#d95c30' },
  { id: 3, plate: '34 ABC 123', direction: 'Giriş', time: '20:10:17', type: 'Personel', confidence: 98, gate: 'Ana Giriş', status: 'İzin verildi', color: '#269a69' },
  { id: 4, plate: '41 KCA 054', direction: 'Giriş', time: '20:08:33', type: 'Bilinmiyor', confidence: 76, gate: 'Ana Giriş', status: 'Onay bekliyor', color: '#d99a30' },
  { id: 5, plate: '35 EGE 1923', direction: 'Çıkış', time: '20:04:09', type: 'Abone', confidence: 99, gate: 'Ana Çıkış', status: 'İzin verildi', color: '#7e57c2' },
]

