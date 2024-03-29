import { Icon } from '@iconify-icon/solid';
import { type Component, type JSX, Match, Switch } from 'solid-js';
import { HStack, styled } from '../../styled-system/jsx';
import { visuallyHidden } from '../../styled-system/patterns';
import { overflowEllipsis } from '../../styled-system/recipes';
import { createCopyToClipboard } from '../signals/copy';
import { Button } from './Button';

export interface ColorPickerProps {
	inputColor: string;
	color: string;
	onColorSpaceToggle: () => void;
	onInput: JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent>;
}

export const ColorPicker: Component<ColorPickerProps> = (props) => {
	const [status, writeClipboardText] = createCopyToClipboard();

	return (
		<HStack
			width="min(16em, 100%)"
			bgt="white/80"
			gap="0"
			borderWidth="2px"
			color="var(--text-color)"
			alignItems="stretch"
			borderColor="color-mix(in srgb, var(--text-color), transparent 80%)"
			borderRadius="md"
			transition="colors"
			transitionDuration="fast"
			lineHeight="2"
		>
			<Button
				variant="transparent"
				shape="square"
				width="1lh"
				onClick={props.onColorSpaceToggle}
			>
				<span class={visuallyHidden()}>Click to toggle the color space</span>
				<Icon icon="heroicons-solid:refresh" />
			</Button>
			<styled.span
				display="block"
				w="1"
				h="0.5lh"
				borderColor="inherit"
				borderInlineEndWidth="1"
				alignSelf="center"
			/>
			<styled.label
				flexGrow="1"
				cursor="pointer"
				paddingInlineStart="4"
				class={overflowEllipsis()}
			>
				<span class={visuallyHidden()}>Color value</span>
				<span aria-hidden="true">{props.color}</span>
				<input
					type="color"
					name="color"
					class={visuallyHidden()}
					value={props.inputColor}
					onInput={props.onInput}
				/>
			</styled.label>
			<Button
				variant="transparent"
				shape="square"
				aria-label="Copy"
				width="1lh"
				onClick={() => writeClipboardText(props.color)}
			>
				<Switch fallback={<Icon icon="heroicons-solid:clipboard" />}>
					<Match when={status() === 'success'}>
						<Icon icon="heroicons-solid:check-circle" />
					</Match>
					<Match when={status() === 'error'}>
						<Icon icon="heroicons-solid:heroicons-solid:x-circle" />
					</Match>
				</Switch>
			</Button>
		</HStack>
	);
};
