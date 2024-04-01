import { Icon } from '@iconify-icon/solid';
import Color from 'colorjs.io';
import { type Component, Show } from 'solid-js';
import { css } from '../../styled-system/css';
import { styled } from '../../styled-system/jsx';
import { token } from '../../styled-system/tokens';
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

export const ColorBox: Component<{
	color: string;
	id: string;
	removable?: boolean;
}> = (props) => {
	const [state, actions] = useColors();

	const format = () => state.format;

	const colorObject = () => new Color(props.color);

	const colorOutput = () =>
		colorObject()
			.to(formatMapping[format()]?.space || format())
			.toString({ format: format(), precision: 3 });

	const textColor = () => {
		const color = new Color(props.color);
		const onWhite = Math.abs(color.contrast('white', 'WCAG21'));
		const onBlack = Math.abs(color.contrast('black', 'WCAG21'));
		return onWhite > onBlack
			? token('colors.zinc.300')
			: token('colors.zinc.800');
	};

	return (
		<Box style={{ '--bg-color': props.color, '--text-color': textColor() }}>
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
};
