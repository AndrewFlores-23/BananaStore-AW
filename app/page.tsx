'use client';

import { useMemo, useState } from 'react';

type Product = { id: number; name: string; image: string; category: 'Camisa' | 'Camiseta' | 'Vestido' | 'Short' | 'Pantalón' | 'Top'; audience: 'Hombre' | 'Mujer'; price: string; color: string; isNew?: boolean };

const products: Product[] = [
  { id: 1, name: 'Camisa Sol', image: '/catalog/camisa-sol.png', category: 'Camisa', audience: 'Mujer', price: '₡18.900', color: 'Amarillo', isNew: true },
  { id: 2, name: 'Camiseta Noir', image: '/catalog/camiseta-noir.png', category: 'Camiseta', audience: 'Hombre', price: '₡14.500', color: 'Negro', isNew: true },
  { id: 3, name: 'Vestido Limón', image: '/catalog/vestido-limon.png', category: 'Vestido', audience: 'Mujer', price: '₡22.900', color: 'Amarillo', isNew: true },
  { id: 4, name: 'Short Arena', image: '/catalog/short-arena.png', category: 'Short', audience: 'Hombre', price: '₡16.900', color: 'Beige' },
  { id: 5, name: 'Camisa Riviera', image: '/catalog/camisa-riviera.png', category: 'Camisa', audience: 'Hombre', price: '₡17.900', color: 'Crema', isNew: true },
  { id: 6, name: 'Vestido Satén', image: '/catalog/vestido-saten.png', category: 'Vestido', audience: 'Mujer', price: '₡24.900', color: 'Negro' },
  { id: 7, name: 'Jean Atlántico', image: '/catalog/jean-atlantico.png', category: 'Pantalón', audience: 'Hombre', price: '₡21.500', color: 'Azul' },
  { id: 8, name: 'Top Órbita', image: '/catalog/top-orbita.png', category: 'Top', audience: 'Mujer', price: '₡13.900', color: 'Negro' },
];

const filters = ['Todo', 'Nuevos', 'Mujer', 'Hombre', 'Camisa', 'Vestido', 'Short', 'Pantalón'];

function ProductCard({ product, favorite, onFavorite }: { product: Product; favorite: boolean; onFavorite: () => void }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={`${product.name}, ${product.category.toLowerCase()} para ${product.audience.toLowerCase()}`} />
        {product.isNew && <span className="new-pill">Nuevo</span>}
        <button className={favorite ? 'is-favorite' : ''} onClick={onFavorite} aria-label={`${favorite ? 'Quitar' : 'Guardar'} ${product.name}`} aria-pressed={favorite}>{favorite ? '♥' : '♡'}</button>
        <div className="size-strip"><span>XS</span><span>S</span><span>M</span><span>L</span></div>
      </div>
      <div className="product-info"><div><p>{product.audience} · {product.category}</p><h3>{product.name}</h3><small>{product.color}</small></div><strong>{product.price}</strong></div>
    </article>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Todo');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

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
        <div className="hero-copy">
          <p className="eyebrow"><span /> Nueva colección 2026</p>
          <h1>Tu estilo.<br /><em>Sin complicaciones.</em></h1>
          <p className="hero-lead">Prendas frescas, versátiles y con mucha actitud. Elegí tu favorita y armá el look a tu manera.</p>
          <div className="hero-actions"><a className="button button-dark" href="#catalogo">Explorar catálogo <span>↓</span></a><a className="button button-glass" href="#nuevos">Lo más nuevo</a></div>
          <div className="hero-note"><span className="avatar-stack"><i /><i /><i /></span><p><strong>Nuevos looks cada semana</strong><br />Elegidos para vos, con amor local.</p></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap"><img src="/catalog/camisa-sol.png" alt="Modelo con camisa amarilla y pantalón crema" /><div className="glass look-card"><span className="look-dot" /><div><strong>Look del día</strong><small>Camisa Sol · ₡18.900</small></div><a href="#catalogo" aria-label="Ver Camisa Sol">＋</a></div></div>
          <div className="logo-badge glass"><img src="/banana-logo.jpeg" alt="Logo de Banana Store" /></div>
          <span className="float-label glass">Fresco · Local · Vos</span>
        </div>
      </section>

      <section className="benefits" aria-label="Beneficios"><div><span>01</span><p><strong>Selección curada</strong><small>Prendas que sí combinan</small></p></div><div><span>02</span><p><strong>Asesoría cercana</strong><small>Te ayudamos a elegir</small></p></div><div><span>03</span><p><strong>Novedades semanales</strong><small>Siempre algo nuevo</small></p></div></section>

      <section className="section section-preview" id="nuevos">
        <div className="section-heading"><div><p className="eyebrow"><span /> Recién llegados</p><h2>Lo nuevo está <em>aquí.</em></h2></div><button onClick={() => { setActiveFilter('Nuevos'); document.querySelector('#catalogo')?.scrollIntoView(); }}>Ver toda la colección <span>→</span></button></div>
        <div className="product-grid preview-grid">{products.filter((item) => item.isNew).slice(0, 3).map((item) => <ProductCard key={item.id} product={item} favorite={favorites.includes(item.id)} onFavorite={() => toggleFavorite(item.id)} />)}</div>
      </section>

      <section className="catalog-section" id="catalogo">
        <div className="catalog-inner">
          <div className="catalog-title"><p className="eyebrow light"><span /> Todo Banana</p><h2>Encontrá tu<br /><em>próximo favorito.</em></h2><p>Una colección pequeña, alegre y fácil de combinar. Filtrá por lo que estás buscando.</p></div>
          <div className="filter-bar glass" role="toolbar" aria-label="Filtros del catálogo">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}</button>)}</div>
          {query && <p className="result-note">Resultados para “{query}” · <button onClick={() => setQuery('')}>Limpiar búsqueda</button></p>}
          <div className="product-grid catalog-grid">{visibleProducts.map((item) => <ProductCard key={item.id} product={item} favorite={favorites.includes(item.id)} onFavorite={() => toggleFavorite(item.id)} />)}</div>
          {visibleProducts.length === 0 && <div className="empty-state"><span>⌕</span><h3>No encontramos esa prenda</h3><p>Probá otro término o volvé a ver toda la colección.</p><button onClick={() => { setQuery(''); setActiveFilter('Todo'); }}>Ver todo</button></div>}
        </div>
      </section>

      <section className="story-section" id="nosotros">
        <div className="story-media"><img src="/catalog/vestido-limon.png" alt="Modelo de Banana Store con vestido amarillo" /><div className="glass story-sticker"><strong>Hecho para sentirte vos</strong><span>☀</span></div></div>
        <div className="story-copy"><p className="eyebrow"><span /> Nuestra historia</p><h2>Somos Banana.<br /><em>Somos color.</em></h2><p>Banana Store nació para hacer la moda más simple, divertida y cercana. Seleccionamos prendas versátiles para que encontrés algo que se sienta muy vos, sin importar la ocasión.</p><p>Creemos en vestir con libertad, mezclar sin reglas y disfrutar el proceso. Aquí siempre vas a encontrar atención cálida, looks fáciles de armar y una dosis de buena energía.</p><a className="button button-dark" href="#visitanos">Conocé el local <span>↓</span></a></div>
      </section>

      <section className="visit-section" id="visitanos">
        <div className="visit-card"><p className="eyebrow light"><span /> Vení a conocernos</p><h2>Tu próximo look<br /><em>te está esperando.</em></h2><div className="visit-grid"><div><span>Ubicación</span><strong>Consultá la dirección<br />por nuestras redes</strong></div><div><span>Horario demo</span><strong>Lun — Sáb<br />10:00 — 19:00</strong></div><div><span>Contacto demo</span><strong>@bananastore<br />+506 0000-0000</strong></div></div><p className="demo-note">Los datos de contacto son demostrativos y se pueden reemplazar por la información real del local.</p></div>
        <div className="newsletter glass"><span>🍌</span><div><p className="eyebrow"><span /> Club Banana</p><h3>Enterate primero.</h3><p>Recibí novedades, nuevos ingresos y looks de la semana.</p></div><form onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="email">Correo electrónico</label><input id="email" type="email" placeholder="tu@email.com" required /><button type="submit" aria-label="Suscribirse">→</button></form></div>
      </section>

      <footer><a className="footer-brand" href="#inicio"><span className="brand-mark">Ba</span><strong>Banana</strong></a><p>Moda alegre para todos los días.</p><div className="footer-links"><a href="#nuevos">Nuevos</a><a href="#catalogo">Catálogo</a><a href="#nosotros">Quiénes somos</a><a href="#visitanos">Contacto</a></div><div className="footer-bottom"><span>© 2026 Banana Store · Sitio de demostración</span><span>Hecho con energía amarilla ☀</span></div></footer>
    </main>
  );
}
