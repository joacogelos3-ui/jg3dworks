#!/usr/bin/env python3
"""Regenera catalog/data.js y catalog/img/*.webp desde el scrape de Cults3D.

Uso:
    python3 catalog/build.py /ruta/a/JoacoGelos-cults3d

Espera en esa carpeta:
    catalog.json          (lista de modelos: slug, name, price_usd, url, datePublished, gallery)
    media/<slug>/*.png    (imágenes descargadas; usa la primera estática como portada)

Produce (dentro del repo, relativo a este archivo):
    catalog/img/<slug>.webp   portadas 640px q80 con fondo #151719 pre-compuesto
    catalog/data.js           const CATALOG = [...] con facetas derivadas (marca/vehículo/tipo)

Correr cada vez que Joaco publica modelos nuevos; commitear img/ + data.js.
"""
import json, os, sys, unicodedata
from collections import Counter
from PIL import Image, ImageSequence, ImageFilter, ImageEnhance, ImageStat

def non_latin(s):
    """Detecta alfabetos no latinos (cirílico, CJK, etc.). Cults3D a veces sirve el
    título auto-traducido durante el scrape; esos nombres hay que corregirlos en el
    catalog.json fuente (título original del autor = primera línea de la descripción,
    o el og:title de la página /en/ o /es/)."""
    bad = set()
    for ch in s:
        if ch.isalpha():
            name = unicodedata.name(ch, '')
            if not any(k in name for k in ('LATIN', 'DIGIT')):
                bad.add(name.split(' ')[0])
    return bad

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_IMG = os.path.join(REPO, 'catalog', 'img')
OUT_JS = os.path.join(REPO, 'catalog', 'data.js')

def norm(s):
    return unicodedata.normalize('NFD', s.lower()).encode('ascii', 'ignore').decode()

BRANDS = [
    ('FUELTECH', ['fueltech', 'ft450', 'ft550', 'ft600', 'ft250', 'ft300', 'ft350', 'ft400', 'ft500', 'ft200', 'nano pro', 'wb-o2', 'wideband nano']),
    ('INJEPRO', ['injepro', 't3000', 't4000', 't5000']), ('OCTTANE', ['octtane']),
    ('ECUMASTER', ['ecumaster', 'ecu master', 'adu 7']), ('MOTEC', ['motec']), ('RACETEC', ['racetec']),
    ('GOPRO', ['gopro']), ('STARLINK', ['starlink']), ('MAKITA', ['makita']), ('STANLEY', ['stanley']),
    ('MILWAUKEE', ['milwaukee']), ('DEWALT', ['dewalt']), ('KARCHER', ['karcher', 'hidrolimpiadora', 'hidrolavadora']),
    ('SEADOO', ['seadoo']), ('JOHNSON EVINRUDE', ['johnson', 'evinrude']), ('YAMAHA', ['yamaha']), ('VULCANO', ['vulcano']),
]
VEH = [
    # VW GOLF va ANTES que VW GOL: 'vw gol' es prefijo de 'vw golf' y robaría el match
    ('CHEVETTE', ['chevette']), ('VW GOLF', ['golf', ' bora', 'jetta']),
    ('VW GOL', ['gol g1', 'gol g2', 'gol g3', 'gol g4', 'gol quadrado', 'gol tubarao', ' gol ']),
    ('VW SAVEIRO', ['saveiro']), ('FORD ESCORT', ['escort']), ('FORD FIESTA', ['fiesta']), ('FORD MUSTANG', ['mustang']),
    ('CORSA', ['corsa']), ('ABARTH 500/595', ['abarth']), ('FORD MAVERICK', ['maverick']), ('ZETEC ROCAM', ['zetec', 'rocam']),
    ('CIVIC', ['civic']), ('GRAND CHEROKEE', ['cherokee']),
    ('CITROEN C4 / P307', ['citroen', 'c4 picasso', '307']), ('KIA / HYUNDAI', ['sportage', 'kia ', 'hyundai']),
]

def typ_of(t):
    if any(k in t for k in ['backshell', 'connector', 'conector', 'molex', 'mx120', 'superseal']):
        return 'CONECTORES'
    if any(k in t for k in ['engranaje', 'actuador', 'actuator', 'recambio', 'repuesto', 'replacement', 'impulsor', 'pinon', 'palanca de cambios', 'cubre', 'gatillo', 'codo de', 'mango', 'espejo lateral', 'remplazo', 'diente llave', 'caja velocidad']):
        return 'REPUESTOS'
    if any(k in t for k in ['makita', 'stanley', 'milwaukee', 'dewalt', 'starlink', 'directv', 'termo', 'herramienta', 'pared', 'amoladora', 'caja de almacenamiento', 'caja robusta', 'portapilas', 'bisagra', 'vulcano', 'pileta', 'karcher', 'hidrolavadora', 'llavero', 'fuente de alimentacion']):
        return 'TALLER · HOGAR'
    if any(k in t for k in ['canard', 'side grill', 'bumper', 'paragolpe', 'spoiler']):
        return 'EXTERIOR'
    if any(k in t for k in ['painel', 'panel']) and 'switch panel' not in t:
        return 'PANELES · CONSOLAS'
    if any(k in t for k in ['consola', 'console']) and not any(k in t for k in ['mount', 'soporte', 'suporte', 'bracket', 'holder']):
        return 'PANELES · CONSOLAS'
    return 'SOPORTES'

def best_gif_frame(im):
    """Frame representativo de un GIF: varios arrancan con fade desde negro, así que
    el frame 1 puede salir vacío y hay caídas entre escenas. Se toma el frame cuyo
    brillo queda más cerca de la mediana de brillos (cae en la meseta estable de la
    animación, nunca en un fade ni en un flash)."""
    frames = []
    for i, fr in enumerate(ImageSequence.Iterator(im)):
        rgba = fr.convert('RGBA')
        probe = rgba.convert('L').resize((32, 32))
        frames.append((i, ImageStat.Stat(probe).mean[0], rgba))
    ok = [f for f in frames if 25 <= f[1] <= 235] or frames
    med = sorted(f[1] for f in ok)[len(ok) // 2]
    pick = min(ok, key=lambda f: abs(f[1] - med))
    return pick[2]

def to_square(im, size):
    """Portada cuadrada sin barras negras: las casi-cuadradas se recortan al centro;
    las anchas/verticales se apoyan sobre un fondo de la misma foto difuminada y
    oscurecida (así la imagen y su marca de agua quedan completas)."""
    w, h = im.size
    ratio = w / h
    if 0.92 <= ratio <= 1.08:
        side = min(w, h)
        im = im.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
        return im.resize((size, size), Image.LANCZOS)
    side = min(w, h)
    bg = im.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
    bg = bg.resize((size, size), Image.LANCZOS).filter(ImageFilter.GaussianBlur(22))
    bg = ImageEnhance.Brightness(bg).enhance(0.45)
    fg = im.copy()
    fg.thumbnail((size, size), Image.LANCZOS)
    bg.paste(fg, ((size - fg.width) // 2, (size - fg.height) // 2))
    return bg

def cover_for(media_dir, slug, dirs):
    dn = next((c for c in dirs if c == slug or c.startswith(slug[:55]) or slug.startswith(c[:55])), None)
    if not dn:
        return None
    files = sorted(os.listdir(os.path.join(media_dir, dn)))
    statics = [f for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    gifs = [f for f in files if f.lower().endswith('.gif')]
    pick = (statics or gifs)
    return os.path.join(media_dir, dn, pick[0]) if pick else None

def main():
    src = sys.argv[1] if len(sys.argv) > 1 else '/home/agus/Escritorio/Yo/JoacoGelos-cults3d'
    catalog = json.load(open(os.path.join(src, 'catalog.json')))
    media = os.path.join(src, 'media')
    dirs = os.listdir(media)
    os.makedirs(OUT_IMG, exist_ok=True)
    out, missing = [], []
    for m in catalog:
        slug = m['slug']
        scripts = non_latin(m['name'])
        if scripts:
            print(f"⚠ NOMBRE NO LATINO ({'/'.join(sorted(scripts))}) en {slug!r}: {m['name']!r} — corregir en catalog.json")
        t = ' ' + norm(m['name'] + ' ' + slug) + ' '
        img_name = slug[:80] + '.webp'
        srcimg = cover_for(media, slug, dirs)
        if srcimg:
            im = Image.open(srcimg)
            if srcimg.lower().endswith('.gif'):
                im = best_gif_frame(im)
            else:
                im = im.convert('RGBA')
            base = Image.new('RGBA', im.size, (21, 23, 25, 255))  # --img-dark
            base.alpha_composite(im)
            im = base.convert('RGB')
            im = to_square(im, 640)
            im.save(os.path.join(OUT_IMG, img_name), 'WEBP', quality=80, method=6)
        else:
            missing.append(slug)
        out.append({
            's': slug, 'n': m['name'], 'p': m['price_usd'], 'u': m['url'], 'd': m['datePublished'][:10],
            'g': len(m['gallery']), 'img': 'catalog/img/' + img_name,
            'b': next((b for b, kws in BRANDS if any(k in t for k in kws)), ''),
            'v': next((v for v, kws in VEH if any(k in t for k in kws)), ''),
            't': typ_of(t),
        })
    out.sort(key=lambda x: x['d'], reverse=True)
    js = '// Generado por catalog/build.py — NO editar a mano. Fuente: catalog.json del scrape de Cults3D.\nconst CATALOG = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n'
    open(OUT_JS, 'w').write(js)
    print(f'{len(out)} productos → data.js · tipos: {Counter(x["t"] for x in out).most_common()}')
    if missing:
        print('SIN PORTADA (descargar media primero):', missing)

if __name__ == '__main__':
    main()
