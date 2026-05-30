'use client';

import React from 'react';

import styles from './LoadingScreen.module.css';

export type LoadingScreenProps = {
	progress: number;
	/** Whether the scan is still loading, when false the screen fades out. */
	active: boolean;
};

export const LoadingScreen = (props: LoadingScreenProps) => {
	const { progress, active } = props;
	const percent = Math.round(Math.min(Math.max(progress, 0), 1) * 100);

	return (
		<div className={styles.container} data-active={active} aria-hidden={!active}>
			<p className={styles.title}>Entering the exhibit</p>
			<div className={styles.bar}>
				<span className={styles.fill} style={{ width: `${percent}%` }} />
			</div>
			<p className={styles.percent}>{percent}%</p>
		</div>
	);
};
