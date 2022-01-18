import type { NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useContext, useEffect, useState, useMemo } from 'react'
import { PreviousSearchContext } from '/context/PreviousSearch'
import styles from '/styles/Show.module.css'

type ImageTextRow<T> = {
  data: T[]
  iterator: string
}

export const ImageTextRow = <T,>({ data, iterator }: ImageTextRow<T>) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className={styles.showsContainer}>
        {data?.map(i => (
          <div
            key={i?.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img src={i?.image?.medium} style={{ width: '80px' }} />
            {i?.[iterator]}
          </div>
        ))}
      </div>
    </div>
  )
}
