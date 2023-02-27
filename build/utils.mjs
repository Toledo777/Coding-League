import * as esbuild from 'esbuild';
import * as cssModulesPlugin from 'esbuild-css-modules-plugin';
import { recursiveCopy, recursiveWatch } from './recursiveDirUtils.mjs';

const baseConfig = {
	plugins: [cssModulesPlugin()],
	external: ['*.svg', '*.png', '*.jpg'],
	entryPoints: ['client/index.jsx'],
	bundle: true,
	minify: true,
	sourcemap: false,
	format: 'esm',
	outdir: 'dist',
};

async function getCtxDev() {
	return await esbuild.context({
		...baseConfig,
		minify: false,
		sourcemap: true,
	});
}


async function getCtx() {
	return await esbuild.context(baseConfig);
}

export async function build(ctx = getCtx()) {
	ctx = await ctx;
	await recursiveCopy('client/public', 'dist');
	await ctx.rebuild();
	process.exit(0);
}

export async function watch() {
	let ctx = await getCtxDev();

	let start = performance.now();
	await ctx.rebuild();
	console.log(`Build done in : ${performance.now() - start}ms`);

	console.log('Rebuilding on change...');
	await recursiveCopy('client/public', 'dist');

	await ctx.watch();
	recursiveWatch('client/public', async () => {
		console.log('Static file change detected');
		let start = performance.now();
		recursiveCopy('client/public', 'dist');
		console.log(`Changes applied in : ${performance.now() - start}ms`);
	});

	console.log('Build done! Watching for changes');
}