import { useState } from "react";

const SITE = {
  title: "Photos by Aashay",
  tagline: "Nature · Travel · Wildlife",
  email: "aashaytripathi.photo@gmail.com",
  instagram: "https://www.instagram.com/your_handle/"
};

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600",
    title: "Sunwapta Falls",
    location: "Jasper, AB",
    category: "Landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1600",
    title: "Humpback Breach",
    location: "Vancouver Island",
    category: "Wildlife"
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600",
    title: "Icefields Parkway",
    location: "Banff–Jasper, AB",
    category: "Travel"
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600",
    title: "Athabasca Falls",
    location: "Jasper, AB",
    category: "Landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600",
    title: "Orca Pod",
    location: "Juan de Fuca Strait",
    category: "Wildlife"
  }
];

const CATS = ["All", "Landscape", "Wildlife", "Travel"];

export default function Home() {
  const [open, setOpen] = useState(null);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = IMAGES.filter(img => {
    const inCat = cat === "All" || img.category === cat;
    const text = (img.title + " " + img.location + " " + img.category).toLowerCase();
    const inSearch = text.includes(q.trim().toLowerCase());
    return inCat && inSearch;
  });

  return (
    <div className="page">
      <header className="top">
        <div>
          <h1>{SITE.title}</h1>
          <div className="muted">{SITE.tagline}</div>
        </div>
        <div className="actions">
          <a className="btn" href={`mailto:${SITE.email}`}>Contact</a>
          <a className="btn" href={SITE.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </header>

      <section className="controls">
        <div className="tabs">
          {CATS.map(c => (
            <button
              key={c}
              className={`tab ${c === cat ? "active" : ""}`}
              onClick={() => setCat(c)}
            >{c}</button>
          ))}
        </div>
        <input
          className="search"
          placeholder="Search title/place/category…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </section>

      <main className="grid">
        {filtered.map((img, i) => (
          <figure key={img.src} className="card" onClick={() => setOpen(i)}>
            <img src={img.src} alt={img.title} loading="lazy" />
            <figcaption>
              <span className="title">{img.title}</span>
              <span className="muted">{img.location}</span>
            </figcaption>
          </figure>
        ))}
      </main>

      <footer className="foot">
        <div>© {new Date().getFullYear()} {SITE.title}</div>
        <div className="muted">{SITE.email}</div>
      </footer>

      {open !== null && (
        <div className="overlay" onClick={() => setOpen(null)}>
          <div className="lightbox" onClick={e => e.stopPropagation()}>
            <img src={filtered[open].src} alt={filtered[open].title} />
            <div className="lbrow">
              <div>
                <div className="title">{filtered[open].title}</div>
                <div className="muted">
                  {filtered[open].location} · {filtered[open].category}
                </div>
              </div>
              <button className="icon" onClick={() => setOpen(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
