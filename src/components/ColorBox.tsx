import { Icon } from '@iconify-icon/solid';
import Color from 'colorjs.io';
import { Show } from 'solid-js';
import { css } from '../../styled-system/css';
import { styled } from '../../styled-system/jsx';
import { useColors } from '../stores/colors';
import { Button } from './Button';
import { ColorPicker } from './ColorPicker';

const formats = ['hex', 'rgb', 'hsl', 'oklab', 'oklch'] as const;
type Formats = (typeof formats)[number];

const formatMapping: Partial<Record<Formats, { space: string }>> = {
	hex: { space: 'srgb' },
	rgb: { space: 'srgb' },
};

const Box = styled('div', {
	base: {
		bgColor: 'var(--bg-color)',
		p: '6',
		gridTemplate: "'. full .' auto / 1fr min(16em, 100%) 1fr",
		alignItems: 'center',
		display: 'grid',
		'&>*': {
			gridArea: 'full',
		},
	},
});

export function ColorBox(props: {
	color: string;
	id: string;
	removable?: boolean;
}) {
	const [state, actions] = useColors();

	const format = () => state.format;

	const colorObject = () => new Color(props.color);

	const colorOutput = () =>
		colorObject()
			.to(formatMapping[format()]?.space || format())
			.toString({ format: format(), precision: 3 });

	return (
		<Box style={{ '--bg-color': props.color }}>
			<Show when={props.removable}>
				<Button
					variant="contrast"
					shape="circle"
					inlineSize={6}
					onClick={() => actions.remove(props.id)}
					justifySelf="end"
					translate="100% -100%"
				>
					<span class={css({ srOnly: true })}>Remove</span>
					<Icon icon="heroicons-solid:x" />
				</Button>
			</Show>
			<ColorPicker
				inputColor={props.color}
				color={colorOutput()}
				onInput={(e) => actions.updateColor(props.id, e.target.value)}
				onColorSpaceToggle={() => actions.toggleFormat()}
			/>
		</Box>
	);
}
