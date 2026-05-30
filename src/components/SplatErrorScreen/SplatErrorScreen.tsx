import { StatusPage } from '@/components/StatusPage';

import styles from './SplatErrorScreen.module.css';

export const SplatErrorScreen = () => {
	return (
		<div className={styles.container}>
			<StatusPage title="Unavailable" description="Please refresh to try again." />
		</div>
	);
};
