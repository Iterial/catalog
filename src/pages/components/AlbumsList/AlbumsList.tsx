import { fetchData } from '@/pages/helpers/fetchData';
import { Album } from '@/pages/types/Album';
import { FC, useEffect, useState } from 'react';
import Loading from '../Loading';
import AlbumItem from '../AlbumItem';

import styles from './AlbumsList.module.css';

type Props = {
  onAlbumClick: (album: Album) => void;
};

const AlbumsList: FC<Props> = ({ onAlbumClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    setIsLoading(true);

    fetchData<Album[]>('https://jsonplaceholder.typicode.com/albums').then(
      (data) => {
        setAlbums(data);
        setIsLoading(false);
      },
    );
  }, []);

  return (
    <section className={styles.albums}>
      {isLoading ? (
        <Loading />
      ) : (
        <ul className={styles.albums__list}>
          {albums.map((album) => (
            <li key={album.id}>
              <AlbumItem
                albumTitle={album.title}
                onClick={() => onAlbumClick(album)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AlbumsList;
