import App from './App.svelte';

const viewId = 5744049;
kintone.events.on('app.record.index.show', event => {
	if (event.viewId !== viewId) return;
	const app = new App({
		target: document.getElementById('app'),
	});
});

export default app;