'use client';

import { useEffect, useMemo, useState } from 'react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

type ProductColor = { name: string; hex: string };
type Product = {
  id: number;
  name: string;
  image: string;
  category: 'Camisa' | 'Camiseta' | 'Vestido' | 'Short' | 'Pantalón' | 'Top';
  audience: 'Hombre' | 'Mujer';
  price: string;
  color: string;
  description: string;
  sizes: string[];
  colors: ProductColor[];
  isNew?: boolean;
};

const products: Product[] = [
  { id: 1, name: 'Camisa Sol', image: '/catalog/camisa-sol.png', category: 'Camisa', audience: 'Mujer', price: '₡18.900', color: 'Amarillo', description: 'Camisa ligera de silueta relajada, ideal para llevar abierta o cerrada. Su textura fresca y caída suave la convierten en una pieza fácil de combinar todos los días.', sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Amarillo sol', hex: '#f5ca23' }, { name: 'Crema', hex: '#eee4ca' }, { name: 'Negro', hex: '#1c1c19' }], isNew: true },
  { id: 2, name: 'Camiseta Noir', image: '/catalog/camiseta-noir.png', category: 'Camiseta', audience: 'Hombre', price: '₡14.500', color: 'Negro', description: 'Camiseta oversized de algodón pesado con tacto suave y estructura limpia. Una base versátil para looks urbanos y combinaciones relajadas.', sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Negro', hex: '#151512' }, { name: 'Hueso', hex: '#e9e1cf' }, { name: 'Mostaza', hex: '#d9ab18' }], isNew: true },
  { id: 3, name: 'Vestido Limón', image: '/catalog/vestido-limon.png', category: 'Vestido', audience: 'Mujer', price: '₡22.900', color: 'Amarillo', description: 'Vestido corto de línea limpia y cintura ligeramente recogida. Fresco, alegre y cómodo para pasar del día a una salida especial.', sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Limón', hex: '#f6d64a' }, { name: 'Marfil', hex: '#f2ead8' }, { name: 'Coral', hex: '#db745c' }], isNew: true },
  { id: 4, name: 'Short Arena', image: '/catalog/short-arena.png', category: 'Short', audience: 'Hombre', price: '₡16.900', color: 'Beige', description: 'Short de corte sastre con pinzas discretas y mezcla de lino. Se siente liviano, se ve pulido y funciona tanto con camiseta como con camisa.', sizes: ['28', '30', '32', '34', '36'], colors: [{ name: 'Arena', hex: '#c8ae89' }, { name: 'Oliva', hex: '#6f7352' }, { name: 'Carbón', hex: '#3a3935' }] },
  { id: 5, name: 'Camisa Riviera', image: '/catalog/camisa-riviera.png', category: 'Camisa', audience: 'Hombre', price: '₡17.900', color: 'Crema', description: 'Camisa de manga corta con cuello camp y rayas finas. Una pieza fresca con aire resort para elevar cualquier combinación casual.', sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Crema', hex: '#e6dcc4' }, { name: 'Celeste', hex: '#8db6c9' }, { name: 'Negro', hex: '#242421' }], isNew: true },
  { id: 6, name: 'Vestido Satén', image: '/catalog/vestido-saten.png', category: 'Vestido', audience: 'Mujer', price: '₡24.900', color: 'Negro', description: 'Vestido midi de satén con escote drapeado y tirantes delicados. Su acabado sutilmente brillante crea un look elegante sin esfuerzo.', sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Negro', hex: '#19191c' }, { name: 'Champaña', hex: '#d9c3a1' }, { name: 'Vino', hex: '#692f3a' }] },
  { id: 7, name: 'Jean Atlántico', image: '/catalog/jean-atlantico.png', category: 'Pantalón', audience: 'Hombre', price: '₡21.500', color: 'Azul', description: 'Jean recto de tiro medio con lavado azul clásico. Cómodo desde el primer uso y diseñado para acompañar todas tus camisetas y camisas.', sizes: ['28', '30', '32', '34', '36'], colors: [{ name: 'Azul medio', hex: '#55728f' }, { name: 'Azul oscuro', hex: '#273b51' }, { name: 'Negro lavado', hex: '#4a4b4b' }] },
  { id: 8, name: 'Top Órbita', image: '/catalog/top-orbita.png', category: 'Top', audience: 'Mujer', price: '₡13.900', color: 'Negro', description: 'Top tejido de un hombro con escote escultórico y ajuste favorecedor. La pieza perfecta para transformar un jean o una falda sencilla.', sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Negro', hex: '#171715' }, { name: 'Marfil', hex: '#eee8da' }, { name: 'Azul noche', hex: '#24304b' }] },
];

const filters = ['Todo', 'Nuevos', 'Mujer', 'Hombre', 'Camisa', 'Vestido', 'Short', 'Pantalón'];

function ProductCard({ product, favorite, onFavorite, onOpen }: { product: Product; favorite: boolean; onFavorite: () => void; onOpen: (product: Product) => void }) {
  const open = () => onOpen(product);
  return (
    <article className="product-card product-card-action" onClick={open} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } }} tabIndex={0} role="button" aria-label={`Ver detalles de ${product.name}`}>
      <div className="product-image">
        <img src={`${basePath}${product.image}`} alt={`${product.name}, ${product.category.toLowerCase()} para ${product.audience.toLowerCase()}`} />
        {product.isNew && <span className="new-pill">Nuevo</span>}
        <button className={favorite ? 'is-favorite' : ''} onClick={(event) => { event.stopPropagation(); onFavorite(); }} aria-label={`${favorite ? 'Quitar' : 'Guardar'} ${product.name}`} aria-pressed={favorite}>{favorite ? '♥' : '♡'}</button>
        <span className="quick-view">Ver detalles <b>↗</b></span>
      </div>
      <div className="product-info"><div><p>{product.audience} · {product.category}</p><h3>{product.name}</h3><small>{product.color}</small></div><strong>{product.price}</strong></div>
    </article>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const message = `Hola, quisiera consultar la disponibilidad de ${product.name}, talla ${selectedSize}, color ${selectedColor.name}.`;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('modal-open');
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.classList.remove('modal-open'); };
  }, [onClose]);

  return (
    <div className="product-modal-backdrop" onMouseDown={onClose} role="presentation">
      <section className="product-modal glass" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar detalle">×</button>
        <div className="modal-product-image"><img src={`${basePath}${product.image}`} alt={product.name} />{product.isNew && <span className="new-pill">Nuevo</span>}</div>
        <div className="modal-details">
          <p className="modal-kicker">{product.audience} · {product.category}</p>
          <div className="modal-title-row"><h2 id="product-modal-title">{product.name}</h2><strong>{product.price}</strong></div>
          <p className="modal-description">{product.description}</p>
          <fieldset className="option-group"><legend>Talla disponible <span>{selectedSize}</span></legend><div className="size-options">{product.sizes.map((size) => <button type="button" key={size} className={selectedSize === size ? 'selected' : ''} onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size}>{size}</button>)}</div></fieldset>
          <fieldset className="option-group"><legend>Color <span>{selectedColor.name}</span></legend><div className="color-options">{product.colors.map((color) => <button type="button" key={color.name} className={selectedColor.name === color.name ? 'selected' : ''} onClick={() => setSelectedColor(color)} aria-pressed={selectedColor.name === color.name} title={color.name}><i style={{ backgroundColor: color.hex }} /><span>{color.name}</span></button>)}</div></fieldset>
          <a className="whatsapp-button" href={`https://wa.me/50687709970?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer"><span className="whatsapp-icon">◉</span> Consultá disponibilidad por WhatsApp <b>↗</b></a>
          <p className="availability-note"><span /> La disponibilidad se confirma directamente con la tienda.</p>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Todo');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesFilter = activeFilter === 'Todo' || (activeFilter === 'Nuevos' && product.isNew) || product.audience === activeFilter || product.category === activeFilter;
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) || product.category.toLowerCase().includes(query.toLowerCase()) || product.audience.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  }), [activeFilter, query]);

  const toggleFavorite = (id: number) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <main>
      <nav className="glass nav-shell">
        <a className="brand" href="#inicio" aria-label="Banana Store, inicio"><span className="brand-mark">Ba</span><span>Banana</span></a>
        <div className="nav-links" aria-label="Navegación principal"><a href="#nuevos">Nuevos</a><a href="#catalogo">Catálogo</a><a href="#nosotros">Nosotros</a></div>
        <div className="nav-tools"><button className="icon-button" onClick={() => setSearchOpen(!searchOpen)} aria-label="Buscar">⌕</button><a className="favorite-counter" href="#catalogo" aria-label={`${favorites.length} favoritos`}>♡ <span>{favorites.length}</span></a><a className="nav-cta" href="#catalogo">Ver colección <span>↗</span></a></div>
        {searchOpen && <div className="glass search-popover"><label htmlFor="search">Buscar en el catálogo</label><input autoFocus id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Camisa, mujer, vestido…" /><button onClick={() => { setQuery(''); setSearchOpen(false); }} aria-label="Cerrar búsqueda">×</button></div>}
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="hero-copy"><p className="eyebrow"><span /> Nueva colección 2026</p><h1>Tu estilo.<br /><em>Sin complicaciones.</em></h1><p className="hero-lead">Prendas frescas, versátiles y con mucha actitud. Elegí tu favorita y armá el look a tu manera.</p><div className="hero-actions"><a className="button button-dark" href="#catalogo">Explorar catálogo <span>↓</span></a><a className="button button-glass" href="#nuevos">Lo más nuevo</a></div><div className="hero-note"><span className="avatar-stack"><i /><i /><i /></span><p><strong>Nuevos looks cada semana</strong><br />Elegidos para vos, con amor local.</p></div></div>
        <div className="hero-visual"><div className="hero-image-wrap"><img src={`${basePath}/catalog/camisa-sol.png`} alt="Modelo con camisa amarilla y pantalón crema" /><div className="glass look-card"><span className="look-dot" /><div><strong>Look del día</strong><small>Camisa Sol · ₡18.900</small></div><button onClick={() => setSelectedProduct(products[0])} aria-label="Ver Camisa Sol">＋</button></div></div><div className="logo-badge glass"><img src={`${basePath}/banana-logo.jpeg`} alt="Logo de Banana Store" /></div><span className="float-label glass">Fresco · Local · Vos</span></div>
      </section>

      <section className="benefits" aria-label="Beneficios"><div><span>01</span><p><strong>Selección curada</strong><small>Prendas que sí combinan</small></p></div><div><span>02</span><p><strong>Asesoría cercana</strong><small>Te ayudamos a elegir</small></p></div><div><span>03</span><p><strong>Novedades semanales</strong><small>Siempre algo nuevo</small></p></div></section>

      <section className="section section-preview" id="nuevos">
        <div className="section-heading"><div><p className="eyebrow"><span /> Recién llegados</p><h2>Lo nuevo está <em>aquí.</em></h2></div><button onClick={() => { setActiveFilter('Nuevos'); document.querySelector('#catalogo')?.scrollIntoView(); }}>Ver toda la colección <span>→</span></button></div>
        <div className="product-grid preview-grid">{products.filter((item) => item.isNew).slice(0, 3).map((item) => <ProductCard key={item.id} product={item} favorite={favorites.includes(item.id)} onFavorite={() => toggleFavorite(item.id)} onOpen={setSelectedProduct} />)}</div>
      </section>

      <section className="catalog-section" id="catalogo">
        <div className="catalog-inner"><div className="catalog-title"><p className="eyebrow light"><span /> Todo Banana</p><h2>Encontrá tu<br /><em>próximo favorito.</em></h2><p>Una colección pequeña, alegre y fácil de combinar. Seleccioná una prenda para conocer sus tallas, colores y detalles.</p></div><div className="filter-bar glass" role="toolbar" aria-label="Filtros del catálogo">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}</button>)}</div>{query && <p className="result-note">Resultados para “{query}” · <button onClick={() => setQuery('')}>Limpiar búsqueda</button></p>}<div className="product-grid catalog-grid">{visibleProducts.map((item) => <ProductCard key={item.id} product={item} favorite={favorites.includes(item.id)} onFavorite={() => toggleFavorite(item.id)} onOpen={setSelectedProduct} />)}</div>{visibleProducts.length === 0 && <div className="empty-state"><span>⌕</span><h3>No encontramos esa prenda</h3><p>Probá otro término o volvé a ver toda la colección.</p><button onClick={() => { setQuery(''); setActiveFilter('Todo'); }}>Ver todo</button></div>}</div>
      </section>

      <section className="story-section" id="nosotros"><div className="story-media"><img src={`${basePath}/catalog/vestido-limon.png`} alt="Modelo de Banana Store con vestido amarillo" /><div className="glass story-sticker"><strong>Hecho para sentirte vos</strong><span>☀</span></div></div><div className="story-copy"><p className="eyebrow"><span /> Nuestra historia</p><h2>Somos Banana.<br /><em>Somos color.</em></h2><p>Banana Store nació para hacer la moda más simple, divertida y cercana. Seleccionamos prendas versátiles para que encontrés algo que se sienta muy vos, sin importar la ocasión.</p><p>Creemos en vestir con libertad, mezclar sin reglas y disfrutar el proceso. Aquí siempre vas a encontrar atención cálida, looks fáciles de armar y una dosis de buena energía.</p><a className="button button-dark" href="#visitanos">Conocé el local <span>↓</span></a></div></section>

      <section className="visit-section" id="visitanos">
        <div className="store-photo-card" style={{ backgroundImage: `url(${basePath}/local-banana-huacas-hd.jpg)` }}>
          <img src={`${basePath}/local-banana-huacas-hd.jpg`} alt="Fachada del local Banana Store en Huacas, Guanacaste" />
          <div className="store-photo-shade" />
          <div className="store-location glass"><span className="location-pin">⌖</span><div><p>Estamos en</p><strong>Huacas, Guanacaste<br />Costa Rica</strong></div><a href="https://www.google.com/maps/search/?api=1&query=Banana+Huacas+Guanacaste+Costa+Rica" target="_blank" rel="noreferrer">Cómo llegar <b>↗</b></a></div>
          <span className="store-photo-label">Nuestro local</span>
        </div>
        <div className="visit-card"><p className="eyebrow light"><span /> Vení a conocernos</p><h2>Tu próximo look<br /><em>te está esperando.</em></h2><div className="visit-grid"><div><span>Ubicación</span><strong>Huacas, Guanacaste<br />Costa Rica</strong></div><div><span>Horario demo</span><strong>Lun — Sáb<br />10:00 — 19:00</strong></div><div><span>WhatsApp</span><strong>+506 8770-9970<br />Consultas y disponibilidad</strong></div></div><p className="demo-note">El horario es demostrativo y puede reemplazarse por el horario oficial del local.</p></div>
        <div className="newsletter glass"><span>🍌</span><div><p className="eyebrow"><span /> Club Banana</p><h3>Enterate primero.</h3><p>Recibí novedades, nuevos ingresos y looks de la semana.</p></div><form onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="email">Correo electrónico</label><input id="email" type="email" placeholder="tu@email.com" required /><button type="submit" aria-label="Suscribirse">→</button></form></div>
      </section>

      <footer><a className="footer-brand" href="#inicio"><span className="brand-mark">Ba</span><strong>Banana</strong></a><p>Moda alegre para todos los días.</p><div className="footer-links"><a href="#nuevos">Nuevos</a><a href="#catalogo">Catálogo</a><a href="#nosotros">Quiénes somos</a><a href="#visitanos">Contacto</a></div><div className="footer-bottom"><span>© 2026 Banana Store · Sitio de demostración</span><div className="creation-credit"><span>Propuesta web creada por</span><img src={`${basePath}/aw-risecr-logo.png`} alt="Logo de AW-RiseCR" /><strong>AW-RiseCR</strong></div></div></footer>

      {selectedProduct && <ProductModal key={selectedProduct.id} product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </main>
  );
}
