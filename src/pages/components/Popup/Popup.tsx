import { FC, useEffect, useRef, useState } from 'react';

import useOutClick from '@/pages/hooks/useOutClick';
import { AlbumPicture } from '@/pages/types/AlbumPicture';

import styles from './Popup.module.css';
import Loading from '../Loading/Loading';
import { fetchData } from '@/pages/helpers/fetchData';
import Image from 'next/image';

type Props = {
  albumId: number;
  albumTitle: string;
  onPopupClose: () => void;
};

const Popup: FC<Props> = ({ albumId, albumTitle, onPopupClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<AlbumPicture[]>([]);

  const popupRef = useRef<HTMLDivElement | null>(null);

  useOutClick(popupRef, onPopupClose);

  useEffect(() => {
    setIsLoading(true);

    fetchData<AlbumPicture[]>(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
    ).then((photosInfo) => {
      setPhotos(photosInfo);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.background}>
      <div
        className={styles.popup}
        ref={popupRef}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className={styles.popup__header}>
              <h2 className={styles.popup__title}>{albumTitle}</h2>

              <span
                className={styles.popup__close}
                onClick={onPopupClose}
              />
            </div>

            <ul className={styles.popup__list}>
              {photos.map((photo) => (
                <li
                  key={photo.id}
                  className={styles.popup__item}
                >
                  <Image
                    loader={({ src }) => src}
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className={styles.popup__itemImage}
                    width={150}
                    height={150}
                    unoptimized
                  />

                  <p className={styles.popup__itemTitle}>{photo.title}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
