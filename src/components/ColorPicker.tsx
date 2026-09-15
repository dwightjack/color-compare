import { Icon } from '@iconify-icon/solid';
import { JSX } from '@solidjs/web/jsx-runtime';
import { Match, Switch } from 'solid-js';

import { css, cx } from '../../styled-system/css';
import { hstack } from '../../styled-system/patterns';
import { overflowEllipsis, button } from '../../styled-system/recipes';
import { createCopyToClipboard } from '../signals/copy';

export interface ColorPickerProps {
	inputColor: string;
	color: string;
	onColorSpaceToggle: () => void;
	onInput: JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent>;
}

export function ColorPicker(props: ColorPickerProps) {
	const [status, writeClipboardText] = createCopyToClipboard();

	return (
		<div
			class={hstack({
				gap: '0',
				bg: 'white/20',
				borderWidth: '2px',
				// https://frontendmasters.com/blog/automatically-contrasted-colors/
				color: 'lch(from var(--bg-color) calc((49.44 - l) * infinity) 0 0)',
				alignItems: 'stretch',
				borderColor: 'color-mix(in lch, currentcolor, transparent 80%)',
				borderRadius: 'md',
				transition: 'colors',
				transitionDuration: 'fast',
				lineHeight: '2',
			})}
		>
			<button
				type="button"
				class={cx(
					button({ variant: 'transparent', shape: 'square' }),
					css({
						inlineSize: '1lh',
					}),
				)}
				onClick={props.onColorSpaceToggle}
			>
				<span class={css({ srOnly: true })}>Click to toggle the color space</span>
				<Icon icon="heroicons-solid:refresh" />
			</button>
			<span
				class={css({
					display: 'block',
					inlineSize: '1',
					blockSize: '0.5lh',
					borderColor: 'inherit',
					borderInlineEndWidth: '1',
					alignSelf: 'center',
				})}
			/>
			<label
				class={cx(
					overflowEllipsis(),
					css({
						flexGrow: '1',
						cursor: 'pointer',
						paddingInlineStart: '4',
						_focusWithin: {
							outline: 'var(--outline-focus)',
							outlineColor: 'currentcolor',
							outlineOffset: '2px',
						},
					}),
				)}
			>
				<span class={css({ srOnly: true })}>Color value</span>
				<span aria-hidden="true">{props.color}</span>
				<input
					type="color"
					name="color"
					class={css({ srOnly: true })}
					value={props.inputColor}
					onInput={props.onInput}
				/>
			</label>
			<button
				type="button"
				class={cx(
					button({ variant: 'transparent', shape: 'square' }),
					css({
						inlineSize: '1lh',
					}),
				)}
				aria-label="Copy"
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
			</button>
		</div>
	);
}
