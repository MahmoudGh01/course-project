import { type Cat } from '../../api'

import styles from './CatImage.module.css'

export type CatImageProps = {
  cat?: Cat
  isLoading?: boolean
}

/**
 * Component for displaying a cat image or placeholder
 */
export default function CatImage({
  cat,
  isLoading = false,
}: CatImageProps): React.JSX.Element {
  if (!cat || isLoading) {
    return (
      <div className={styles.placeholder} role="img" aria-label="Loading cat">
        <div className={styles.spinner} />
      </div>
    )
  }

  return (
    <div className={styles.imageContainer}>
      <img
        src={cat.url}
        alt={`Cat with tags: ${cat.tags.join(', ')}`}
        className={styles.image}
      />
      {cat.tags.length > 0 && (
        <div className={styles.tags}>
          {cat.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
