import styles from '../styles/Card.module.css'

function Listing() {
    return (
        <>
            <div className={styles.card}>
                <div className={`${styles.number} ${styles.displayflex}`}>
                    Rapport #1
                </div>
                <div className={styles.typestatus}>
                    <div className={styles.type}>
                        Facture
                    </div>
                    <div className={styles.status}>
                        Traité
                    </div>
                </div>
                <div className={`${styles.infos} ${styles.displayflex}`}>
                    <div className={styles.date}>
                        22/03/2025
                    </div>
                    <div className={styles.client}>
                        Client
                    </div>
                    <div className={styles.address}>
                        Address
                    </div>
                    <div className={styles.materiel}>
                        Pelleteuse CAT320
                    </div>
                </div>
                <div className={styles.price}>
                    1 500E
                </div>
                <div className={`${styles.description} ${styles.displayflex}`}>
                    Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description
                </div>
            </div>
        </>
    );
}

export default Listing;