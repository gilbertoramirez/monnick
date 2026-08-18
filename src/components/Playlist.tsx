'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/lib/toast-context';
import { useScrollReveal } from '@/lib/use-scroll-reveal';

interface Song {
  title: string;
  artist: string;
  by: string;
}

const DEFAULT_SONGS: Song[] = [
  { title: 'La Bebé', artist: 'Yng Lvcas & Peso Pluma', by: 'Monnick' },
  { title: 'Tití Me Preguntó', artist: 'Bad Bunny', by: 'Monnick' },
  { title: 'Ojitos Lindos', artist: 'Bad Bunny & Bomba Estéreo', by: 'Monnick' },
];

function getSongs(): Song[] {
  try {
    const s = JSON.parse(localStorage.getItem('monnick_songs') || 'null');
    return s?.length ? s : DEFAULT_SONGS;
  } catch { return DEFAULT_SONGS; }
}

export default function Playlist() {
  const { show } = useToast();
  const ref = useScrollReveal<HTMLElement>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  useEffect(() => {
    setSongs(getSongs());
  }, []);

  const addSong = useCallback(() => {
    if (!title.trim()) { show('Escribe el nombre de la canción'); return; }
    const guestName = localStorage.getItem('monnick_guest_name') || 'Invitado';
    const updated = [...songs, { title: title.trim(), artist: artist.trim() || 'Artista', by: guestName }];
    localStorage.setItem('monnick_songs', JSON.stringify(updated));
    setSongs(updated);
    setTitle('');
    setArtist('');
    show('Canción agregada ♪');
  }, [songs, title, artist, show]);

  return (
    <section id="playlist" className="max-w-[900px] mx-auto px-6 py-20 md:py-24" ref={ref}>
      <div className="reveal">
        <p className="font-[family-name:var(--font-syne)] text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
          Ponle ritmo
        </p>
        <h2 className="font-[family-name:var(--font-syne)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold mb-4">
          Playlist Colaborativa
        </h2>
        <p className="text-text-soft max-w-[50ch]">
          Agrega las canciones que no pueden faltar. Entre todos armamos la playlist perfecta.
        </p>
      </div>

      <div className="mt-8 reveal">
        <div className="flex gap-2 mb-6 flex-wrap">
          <input
            className="form-input flex-1 min-w-[200px]"
            placeholder="Nombre de la canción"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSong()}
          />
          <input
            className="form-input flex-1 min-w-[200px]"
            placeholder="Artista"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSong()}
          />
          <button className="btn btn-primary" onClick={addSong}>Agregar</button>
        </div>

        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
          {songs.map((song, i) => (
            <div key={`${song.title}-${i}`} className="flex items-center gap-4 px-4 py-3.5 bg-surface rounded-[var(--radius-sm)] hover:bg-highlight transition-colors">
              {/* Equalizer */}
              <div className={`song-eq flex items-end gap-0.5 h-5 shrink-0 ${i > 0 ? 'opacity-30' : ''}`}>
                {[0,1,2,3].map((j) => (
                  <span
                    key={j}
                    className="block"
                    style={i > 0 ? { animation: 'none', height: '4px' } : undefined}
                  />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[0.9rem] truncate">{song.title}</div>
                <div className="text-[0.78rem] text-text-soft truncate">{song.artist}</div>
              </div>
              <span className="text-[0.7rem] text-accent-soft shrink-0 whitespace-nowrap">por {song.by}</span>
            </div>
          ))}
        </div>

        <p className="text-center mt-4 text-sm text-text-soft">
          {songs.length} {songs.length === 1 ? 'canción' : 'canciones'} en la lista
        </p>
      </div>
    </section>
  );
}
