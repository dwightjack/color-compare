// src/iconify.ts
import type { JSX as SolidJSX } from 'solid-js';

declare module '@solidjs/web' {
	namespace JSX {
		interface IntrinsicElements {
			// oxlint-disable-next-line typescript/no-redundant-type-constituents
			'iconify-icon': SolidJSX.HTMLAttributes<HTMLElement> & {
				icon: string;
				width?: string | number;
				height?: string | number;
				flip?: string;
				rotate?: string | number;
				inline?: boolean;
				mode?: 'style' | 'bg' | 'mask' | 'svg';
				observer?: boolean;
				noobserver?: boolean;
			};
		}
	}
}
