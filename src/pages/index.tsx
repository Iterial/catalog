import classNames from 'classnames';

import Head from 'next/head';

import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { Album } from './types/Album';
import AlbumsList from './components/AlbumsList';
import Popup from './components/Popup';
import Loading from './components/Loading/Loading';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const handlePopupClose = () => setSelectedAlbum(null);

  return (
    <>
      <Head>
        <title>Catalog</title>
        <meta
          name="description"
          content="Postavte 60"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <main className={classNames(styles.catalog, inter.className)}>
        <h1 className={styles.catalog__header}>Catalog</h1>

        <AlbumsList onAlbumClick={setSelectedAlbum} />

        {selectedAlbum && (
          <Popup
            albumId={selectedAlbum.id}
            albumTitle={selectedAlbum.title}
            onPopupClose={handlePopupClose}
          />
        )}
      </main>
    </>
  );
}
