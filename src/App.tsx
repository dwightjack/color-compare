import { Icon } from '@iconify-icon/solid';
import { For } from 'solid-js';
import { css } from '../styled-system/css';
import { styled } from '../styled-system/jsx';
import { center } from '../styled-system/patterns';
import { Button } from './components/Button';
import { ColorBox } from './components/ColorBox';
import { useColors } from './stores/colors';

function App() {
	const [state, actions] = useColors();

	return (
		<>
			<styled.div
				minBlockSize="100vh"
				display="grid"
				smDown={{
					gridAutoRows: 'minmax(33.33vh, 1fr)',
				}}
				sm={{
					gridTemplateColumns: 'repeat(auto-fit, minmax(33.33%, 1fr))',
					gridAutoRows: 'minmax(33.33vh, 1fr)',
				}}
			>
				<For each={state.colors}>
					{(color, idx) => (
						<ColorBox color={color.code} id={color.id} removable={idx() > 0} />
					)}
				</For>
				<styled.div class={center()} viewTimeline="--scrollFade block">
					<Button
						shape="circle"
						inlineSize={14}
						fontSize="x-large"
						variant="primary"
						onClick={actions.add}
					>
						<span class={css({ srOnly: true })}>Add color</span>
						<Icon icon="heroicons-solid:plus" />
					</Button>
					<styled.div
						pos="fixed"
						insetInlineStart="10"
						insetBlockEnd="10"
						color="zinc.100"
						fontSize="xx-large"
						mixBlendMode="difference"
						backgroundColor="zinc.100/40"
						inlineSize="1.5em"
						aspectRatio="square"
						display="flex"
						alignItems="center"
						justifyContent="center"
						animation="fade-scroll linear both"
						animationTimeline="--scrollFade"
						animationRange="cover entry 40%"
						rounded="full"
					>
						<Icon icon="heroicons-solid:chevron-double-down" />
					</styled.div>
				</styled.div>
			</styled.div>
		</>
	);
}

export default App;
