import styles from './ExhibitHud.module.css';

export const ExhibitHud = () => {
	return (
		<div className={styles.container}>
			<span className={styles.hint}>drag to orbit · scroll to zoom</span>
			<span className={styles.label}>Statue of Philip V</span>
		</div>
	);
};
