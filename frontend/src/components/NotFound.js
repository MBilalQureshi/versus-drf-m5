import React from 'react'
// import NoResults from '../assets/no-results.png'
import styles from '../styles/NotFound.module.css'
// import Asset from '../components/Asset'

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
        {/* <Asset src={NoResults} message={"Sorry, the page you're looking for doesn't exist"}/> */}
        <h1>Not found</h1>
    </div>
  )
}

export default NotFound