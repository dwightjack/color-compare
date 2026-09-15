import { Icon } from '@iconify-icon/solid';
import Color from 'colorjs.io';
import { Show } from 'solid-js';

import { css, cx } from '../../styled-system/css';
import { button } from '../../styled-system/recipes';
import { useColors } from '../stores/colors';
import { ColorPicker } from './ColorPicker';

const formats = ['hex', 'rgb', 'hsl', 'oklab', 'oklch'] as const;
type Formats = (typeof formats)[number];

const formatMapping: Partial<Record<Formats, { space: string }>> = {
	hex: { space: 'srgb' },
	rgb: { space: 'srgb' },
};

export function ColorBox(props: { color: string; id: string; removable?: boolean }) {
	const [state, actions] = useColors();

	const format = () => state.format;

	const colorObject = () => new Color(props.color);

	const colorOutput = () =>
		colorObject()
			.to(formatMapping[format()]?.space || format())
			.toString({ format: format(), precision: 3 });

	return (
		<div
			class={css({
				bg: 'var(--bg-color)',
				p: '6',
				gridTemplate: "'. full .' auto / 1fr min(16em, 100%) 1fr",
				alignItems: 'center',
				display: 'grid',
				'&>*': {
					gridArea: 'full',
				},
			})}
			style={{ '--bg-color': props.color }}
		>
			<Show when={props.removable}>
				<button
					type="button"
					class={cx(
						button({ variant: 'contrast', shape: 'circle' }),
						css({
							translate: '100% -100%',
							inlineSize: '6',
							justifySelf: 'end',
						}),
					)}
					onClick={() => actions.remove(props.id)}
				>
					<span class={css({ srOnly: true })}>Remove</span>
					<Icon icon="heroicons-solid:x" />
				</button>
			</Show>
			<ColorPicker
				inputColor={props.color}
				color={colorOutput()}
				onInput={(e) => actions.updateColor(props.id, e.target.value)}
				onColorSpaceToggle={() => actions.toggleFormat()}
			/>
		</div>
	);
}
