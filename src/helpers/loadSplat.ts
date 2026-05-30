import { type PackedSplats, SplatLoader, SplatMesh } from '@sparkjsdev/spark';

export const loadPackedSplats = (
	url: string,
	fileType: SplatLoader['fileType'],
	onProgress?: (fraction: number) => void,
): Promise<PackedSplats> => {
	const loader = new SplatLoader();
	loader.fileType = fileType;

	return loader.loadAsync(url, event => {
		if (event.lengthComputable) onProgress?.(event.loaded / event.total);
	});
};

export const createSplatMesh = async (packedSplats: PackedSplats): Promise<SplatMesh> => {
	await SplatMesh.staticInitialize();
	const mesh = new SplatMesh({ packedSplats });
	await mesh.initialized;

	return mesh;
};
