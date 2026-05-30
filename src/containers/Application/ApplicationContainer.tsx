'use client';

import { SceneCanvas } from '@/components/SceneCanvas';
import { SplatScene } from '@/components/SplatScene';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ExhibitHud } from '@/components/ExhibitHud';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SplatErrorScreen } from '@/components/SplatErrorScreen';
import { useApplicationPhase } from '@/hooks';

import styles from './ApplicationContainer.module.css';

export const ApplicationContainer = () => {
	const { phase, progress, error, onProgress, onLoaded, onIntroComplete, onError } = useApplicationPhase();

	return (
		<div className={styles.stage}>
			<ErrorBoundary fallback={<SplatErrorScreen />}>
				<SceneCanvas>
					<SplatScene phase={phase} onProgress={onProgress} onLoaded={onLoaded} onIntroComplete={onIntroComplete} onError={onError} />
				</SceneCanvas>
			</ErrorBoundary>
			{!error && phase !== 'INTERACTIVE' && <LoadingScreen progress={progress} active={phase === 'LOADING'} />}
			{error && <SplatErrorScreen />}
			{phase !== 'LOADING' && <ExhibitHud />}
		</div>
	);
};
