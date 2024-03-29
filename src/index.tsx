/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App';
import './index.css';
import { ColorsProvider } from './stores/colors';

const root = document.getElementById('root');

if (root) {
	render(
		() => (
			<ColorsProvider>
				<App />
			</ColorsProvider>
		),
		root,
	);
}
