# Dolt.

Günlük görevleri ve alışkanlıkları tek bir yerden takip etmek için geliştirdiğim, React tabanlı bir görev/alışkanlık yönetim panosu.

**Canlı demo:** _Yakında eklenecek_

## Özellikler

- **Dashboard** — toplam/tamamlanan/devam eden görev sayıları ve günlük tamamlanma oranını gösteren dairesel grafik
- **Today (Bugünün Görevleri)** — görev ekleme, silme, tamamlandı olarak işaretleme
  - Başlığa göre arama
  - Tümü / Aktif / Tamamlanan filtreleme
  - Her görev için kategori (İş, Kişisel, Kişisel Gelişim, Diğer) ve tarih
- **Daily Routine (Günlük Rutin)** — aylık takvim görünümünde alışkanlık takibi, ay ay ileri/geri gezinme, yeni rutin ekleme/silme
- **Dark Mode** — açık/koyu tema geçişi
- **Kalıcı veri** — tüm görev ve rutin verileri tarayıcının `localStorage`'ında saklanır, sayfa yenilendiğinde kaybolmaz

## Kullanılan Teknolojiler

- React 19
- Vite
- Vanilla CSS (herhangi bir UI kütüphanesi kullanılmadı)

## Kurulum

```bash
git clone https://github.com/kullaniciadin/dolt-todo-app.git
cd dolt-todo-app
npm install
npm run dev
```

## Klasör Yapısı

```
src/
├── components/
│   ├── AddTaskForm.jsx    # Yeni görev ekleme formu
│   ├── Header.jsx         # Üst bar, dark mode toggle
│   ├── Sidebar.jsx        # Sayfa navigasyonu
│   ├── Statcard.jsx       # Dashboard istatistik kartı
│   └── TaskList.jsx       # Görev listesi
├── App.jsx                # Ana state ve sayfa yönlendirme mantığı
└── main.jsx
```

## Bilinen Eksikler / Devam Eden Geliştirme

Proje aktif geliştirme aşamasında. Şu an sidebar'da görünüp henüz işlevsel olmayan sayfalar:

- [ ] Calendar
- [ ] Archive
- [ ] Projects
- [ ] Settings

## Yol Haritası

- [ ] Yukarıdaki sekmelerin tamamlanması
- [ ] Backend + veritabanı entegrasyonu (localStorage yerine kalıcı, cihazlar arası senkronize veri)
- [ ] Kullanıcı girişi / kimlik doğrulama
- [ ] Görev önceliklendirme ve hatırlatıcılar
- [ ] Mobil uyumlu (responsive) tasarım iyileştirmeleri

## Ekran Görüntüsü

_Ekran görüntüleri yakında eklenecek_
