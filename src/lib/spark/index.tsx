'use client';

import { extend } from '@react-three/fiber';
import { SparkRenderer as SparkRendererImpl } from '@sparkjsdev/spark';

export const SparkRenderer = extend(SparkRendererImpl);
