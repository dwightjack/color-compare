import pandacss from '@pandacss/vite';
import solid from '@solidjs/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [pandacss(), solid()],
});
