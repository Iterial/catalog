import { FC } from 'react';

import styles from './AlbumItem.module.css';

type Props = {
  albumTitle: string;
  onClick: () => void;
};

const AlbumItem: FC<Props> = ({ albumTitle, onClick }) => {
  return (
    <article className={styles.albumItem} onClick={(e) => {
      e.preventDefault();
      onClick();
    }}>
      <h2 className={styles.albumItem__title}>{albumTitle}</h2>
    </article>
  );
};

export default AlbumItem;
