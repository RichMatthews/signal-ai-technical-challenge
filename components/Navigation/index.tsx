import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '/styles/Navigation.module.css'

export const Navigation = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={router.pathname === '/' ? styles.active : ''}>
          <Link href="/">Home</Link>
        </div>
        <div className={router.pathname === '/favourites' ? styles.active : ''}>
          <Link href="/favourites">Favourites</Link>
        </div>
      </div>
    </div>
  )
}
