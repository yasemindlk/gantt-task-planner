# Gantt Görev Planlayıcı

React + TypeScript + Vite ile geliştirilmiş interaktif Gantt chart uygulaması. Ana görevler ve alt görevler oluşturabilir, timeline üzerinde sürükle-bırak ile tarihlerini değiştirebilirsiniz.

## Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
yarn install

# Geliştirme sunucusunu başlat
yarn dev

# Production build
yarn build

# Lint kontrolü
yarn lint
```

## Teknoloji Yığını

| Teknoloji | Kullanım Amacı |
|---|---|
| **React 19** + **TypeScript** | UI bileşenleri ve tip güvenliği |
| **Vite** | Geliştirme sunucusu ve build aracı |
| **Redux Toolkit** | Global state (task verileri) |
| **React Context** | UI state (drawer, viewMode, tema, sıralama) |
| **Ant Design (antd)** | UI bileşen kütüphanesi (Table, Drawer, Form, DatePicker vb.) |
| **styled-components** | CSS-in-JS, tema sistemi (light/dark mod) |
| **dayjs** | Tarih hesaplamaları ve formatlama (TR locale) |
| **react-rnd** | Sub task bar'ları için sürükle-bırak ve boyutlandırma |

## Proje Yapısı

```
src/
├── components/
│   ├── atoms/          # En küçük UI parçaları (IconButton, SortableHeader, ThemeToggle, TaskTitle, PrimaryButton)
│   ├── molecules/      # Atom kombinasyonları (FormDateField)
│   └── organisms/      # Büyük bileşenler (TaskList, TaskDrawer, GanttChart)
├── contexts/           # React Context provider'ları (UI state, tema)
├── hooks/              # Custom hook'lar (useDragResize, useUI, useThemeMode)
├── store/              # Redux store ve slice'lar (task CRUD)
├── styles/             # Tema tanımları, global CSS, styled.d.ts
├── types/              # TypeScript tip tanımları
├── utils/              # Yardımcı fonksiyonlar (tarih, sıralama, validasyon, çakışma, timeline)
├── constants/          # Mock veriler
├── App.tsx             # Ana uygulama bileşeni + antd ConfigProvider
└── main.tsx            # Giriş noktası, provider sarmalama, dayjs locale
```

## Mimari Kararlar

### State Yönetimi Ayrımı
- **Redux**: Task verileri (CRUD işlemleri) — birden fazla bileşen aynı veriyi okuyor/yazıyor
- **Context API**: UI state (drawer açık/kapalı, viewMode, sıralama, expanded satırlar, tema) — sadece UI'a özgü, Redux'a koymaya gerek yok

### Atomic Design
- **Atoms**: Tekrar kullanılan en küçük UI elemanları. Bir bileşen birden fazla yerde kullanılıyorsa atom'a çıkarılır.
- **Molecules**: Atom kombinasyonları. `FormDateField` iki kez kullanıldığı (başlangıç + bitiş tarihi) için molecule.
- **Organisms**: Büyük, bağımsız bileşenler (TaskList, TaskDrawer, GanttChart).

### Pozisyonlama Sistemi
Gantt bar'ları tek bir **piksel bazlı** pozisyonlama sistemiyle konumlandırılır (`useDragResize` hook'undaki `dateToPx` / `pxToDate` fonksiyonları). Hem statik main task bar'ları hem sürüklenebilir sub task bar'ları aynı hesaplamayı kullanır.

## Tasarım Kararları ve Varsayımlar

### Çakışma Kuralı
Aynı ana görev altındaki alt görevlerin tarih aralıkları **çakışamaz**. Bu kural hem yeni görev eklerken hem de sürükle-bırak/boyutlandırma sonrasında kontrol edilir. Çakışma tespit edilirse işlem geri alınır ve kullanıcıya uyarı gösterilir.

### Ana Görev Tarih Aralığı
Ana görevlerin başlangıç ve bitiş tarihleri **alt görevlerinden türetilir** (en erken başlangıç → en geç bitiş). Alt görev sürüklendiğinde ana görev aralığı otomatik güncellenir. Alt görevi olmayan ana görevler kendi tarihlerini kullanır.

### Timeline Aralığı
- Her zaman **bulunulan yılın tamamı** (Ocak–Aralık) render edilir
- Görevler yıl dışına taşıyorsa timeline otomatik **genişler** (örn. 2025'te başlayan görev varsa Ocak 2025'ten itibaren gösterilir)
- Görev yoksa mevcut yıl gösterilir

### Hafta Başlangıcı
Haftanın ilk günü **Pazartesi**'dir (dayjs TR locale). Timeline hafta görünümünde tüm kolonlar 7 günlük tam haftalar olarak hizalanır.

### Aynı İsim Kontrolü
Aynı isimde birden fazla ana görev eklenemez (büyük/küçük harf fark etmez). Alt görevlerde bu kısıtlama yoktur.

### Silme Davranışı
Bir ana görev silindiğinde tüm alt görevleri de **kademeli olarak silinir** (cascading delete).

### Tarih Validasyonu
- Bitiş tarihi, başlangıç tarihi seçilmeden aktif olmaz
- Takvimde başlangıç tarihinden önceki günler seçilemez (`disabledDate`)
- Tüm tarihler `DD.MM.YYYY` formatında gösterilir

### Tema
Light ve dark mod desteği. Renk paleti tutarlıdır: primary renk = bar renk = buton renk = radio renk.

## Performans Yaklaşımı

- **`React.memo`**: `GanttChart` bileşeni memo ile sarılı — parent re-render olduğunda (örn. drawer açılınca) prop'lar değişmediyse yeniden render edilmez.
- **`useMemo` zinciri**: GanttChart içindeki hesaplamalar (`tree`, `columns`, `range`, `rows`, `monthGroups`) birbirine bağlı useMemo'larla yönetilir. ViewMode değiştiğinde sadece `columns`, `range` ve `monthGroups` yeniden hesaplanır; `tree` ve `rows` atlanır. Task güncellendiğinde ise tersi geçerlidir.
- **`useCallback`**: Drag/resize handler'ları ve context fonksiyonları useCallback ile sarılı — child bileşenlere geçirilen referanslar gereksiz yere değişmez.
- **Context value `useMemo`**: UIContext value objesi useMemo ile oluşturulur — state değişmediğinde context'i dinleyen bileşenler re-render olmaz.
- **Sabit referanslar**: `CELL_WIDTH`, `RESIZE_HORIZONTAL` gibi objeler bileşen dışında tanımlı — her render'da yeni obje oluşturulmaz.
