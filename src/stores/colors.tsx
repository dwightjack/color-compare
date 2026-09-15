import { createContext, createUniqueId, type ParentProps, useContext } from 'solid-js';
import { createStore } from 'solid-js';

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
				setState((draft) => {
					const color = draft.colors.find((color) => color.id === id);
					if (color) {
						color.code = newCode;
					}
				});
			},

			add() {
				setState((draft) => {
					draft.colors.push({ id: createUniqueId(), code: draft.colors.at(-1)!.code });
				});
			},

			remove(id: string) {
				setState(({ colors }) => {
					const idx = colors.findIndex((color) => (color.id = id));
					if (idx !== -1) {
						colors.splice(idx);
					}
				});
			},

			setFormat(format: Format) {
				setState((draft) => {
					draft.format = format;
				});
			},
			toggleFormat() {
				setState((draft) => {
					const current = formats.indexOf(draft.format);
					if (current === -1) {
						return;
					}
					let next = current + 1;
					if (next === formats.length) {
						next = 0;
					}
					draft.format = formats[next];
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

	return <ColorsContext value={colorStore}>{props.children}</ColorsContext>;
}

export function useColors() {
	return useContext(ColorsContext);
}
