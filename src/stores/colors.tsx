import {
	createContext,
	createUniqueId,
	type ParentProps,
	useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';

export const formats = ['hex', 'rgb', 'hsl', 'oklab', 'oklch'] as const;
export type Format = (typeof formats)[number];

export function createColorStore() {
	const [state, setState] = createStore({
		colors: [
			{
				id: createUniqueId(),
				code: '#bb3e3e',
			},
		],
		format: 'hex' as Format,
	});

	return [
		state,
		{
			updateColor(id: string, newCode: string) {
				setState('colors', (color) => color.id === id, 'code', newCode);
			},

			add() {
				setState('colors', (colors) => [
					...colors,
					// biome-ignore lint/style/noNonNullAssertion: This is always defined
					{ id: createUniqueId(), code: colors.at(-1)!.code },
				]);
			},

			remove(id: string) {
				setState('colors', (colors) =>
					colors.filter((color) => color.id !== id),
				);
			},

			setFormat(format: Format) {
				setState('format', format);
			},
			toggleFormat() {
				setState('format', (current) => {
					let next = formats.indexOf(current) + 1;
					if (next === formats.length) {
						next = 0;
					}
					return formats[next];
				});
			},
		},
	] as const;
}

export const makeColorsContext = () => createColorStore();

type ColorsContextType = ReturnType<typeof makeColorsContext>;
export const ColorsContext = createContext<ColorsContextType>();

export function ColorsProvider(props: ParentProps) {
	const colorStore = createColorStore();

	return (
		<ColorsContext.Provider value={colorStore}>
			{props.children}
		</ColorsContext.Provider>
	);
}

export function useColors() {
	// biome-ignore lint/style/noNonNullAssertion: This is always defined
	return useContext(ColorsContext)!;
}
