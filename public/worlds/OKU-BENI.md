# public/worlds — dünya kapak görselleri

Buraya **gerçek** ekran görüntülerini/görselleri koy. Dosya eklenince site
kendiliğinden gerçek görsele geçer (kod değişikliği gerekmez); eksikken zarif
bir placeholder görünür. Sahte/stok görsel yok.

Beklenen dosyalar (content/projects.ts ile eşleşir):

- `caelinus.png` — Caelinus çalışırken gerçek ekran görüntüsü
- `sanri.png` — Sanrı gerçek ekran/görsel

İpuçları:

- Yatay 16:9 tercih (kartlar bu oranda). Genişlik ≥ 1600px iyi.
- PNG veya JPG olur; büyük dosyaları optimize et (next/image zaten yeniden
  boyutlar ama kaynak makul olsun).
- Farklı isim kullanacaksan `content/projects.ts` içindeki `media.poster`
  yolunu güncelle.

> Hero görseli buraya değil, doğrudan `public/hero.jpeg` olarak konur
> (yazısız; metin canlı HTML olarak üstte durur).
