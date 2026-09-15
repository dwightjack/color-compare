import { Icon } from '@iconify-icon/solid';
import { For } from 'solid-js';

import { css, cx } from '../styled-system/css';
import { center } from '../styled-system/patterns';
import { button } from '../styled-system/recipes';
import { ColorBox } from './components/ColorBox';
import { useColors } from './stores/colors';

function App() {
	const [state, actions] = useColors();

	return (
		<div
			class={css({
				minBlockSize: '100vh',
				display: 'grid',
				smDown: {
					gridAutoRows: 'minmax(33.33vh, 1fr)',
				},
				sm: {
					gridTemplateColumns: 'repeat(auto-fit, minmax(33.33%, 1fr))',
					gridAutoRows: 'minmax(33.33vh, 1fr)',
				},
			})}
		>
			<For each={state.colors}>
				{(color, idx) => <ColorBox color={color.code} id={color.id} removable={idx() > 0} />}
			</For>
			<div class={center({ viewTimeline: '--scrollFade block' })}>
				<button
					type="button"
					class={cx(
						button({
							variant: 'primary',
							shape: 'circle',
						}),
						css({
							inlineSize: '14',
							fontSize: 'x-large',
						}),
					)}
					onClick={() => actions.add()}
				>
					<span class={css({ srOnly: true })}>Add color</span>
					<Icon icon="heroicons-solid:plus" />
				</button>
				<div
					class={css({
						pos: 'fixed',
						insetInlineStart: '10',
						insetBlockEnd: '10',
						color: 'zinc.100',
						fontSize: 'xx-large',
						mixBlendMode: 'difference',
						backgroundColor: 'zinc.100/40',
						inlineSize: '1.5em',
						aspectRatio: 'square',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						animation: 'fade-scroll linear both',
						animationTimeline: '--scrollFade',
						animationRange: 'cover entry 40%',
						rounded: 'full',
					})}
				>
					<Icon icon="heroicons-solid:chevron-double-down" />
				</div>
			</div>
		</div>
	);
}

export default App;
