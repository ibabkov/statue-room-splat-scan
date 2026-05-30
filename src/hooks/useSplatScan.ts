'use client';

import { useEffect, useState } from 'react';
import type { SplatLoader, SplatMesh } from '@sparkjsdev/spark';

import { createSplatMesh, loadPackedSplats, measureScan } from '@/helpers';
import type { SplatScan } from '@/types';

export type UseSplatScanParams = {
	url: string;
	fileType: SplatLoader['fileType'];
	onProgress?: (fraction: number) => void;
};

export type UseSplatScanResult = {
	scan: SplatScan | null;
	error: Error | null;
};

/**
 * Loads a Gaussian splat with download progress, builds a Spark `SplatMesh`.
 */
export const useSplatScan = (params: UseSplatScanParams): UseSplatScanResult => {
	const { url, fileType, onProgress } = params;
	const [scan, setScan] = useState<SplatScan | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let disposed = false;
		let mesh: SplatMesh | null = null;

		(async () => {
			try {
				const packedSplats = await loadPackedSplats(url, fileType, onProgress);

				mesh = await createSplatMesh(packedSplats);

				if (disposed) return;

				setScan({ mesh, ...measureScan(mesh) });
			} catch (err) {
				if (disposed) return;

				setError(err as Error);
			}
		})();

		return () => {
			disposed = true;
			mesh?.dispose();
		};
	}, []);

	return { scan, error };
};
