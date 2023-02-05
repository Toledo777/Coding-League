import * as esbuild from 'esbuild';
import { recursiveCopy, recursiveWatch } from './recursiveDirUtils.mjs';

async function getCtxDev() {
	return await esbuild.context({
		entryPoints: ['client/index.jsx'],
		bundle: true,
		minify: false,
		sourcemap: true,
		format: 'esm',
		outdir: 'dist',
	});
}


async function getCtx() {
	return await esbuild.context({
		entryPoints: ['client/index.jsx'],
		bundle: true,
		minify: true,
		sourcemap: false,
		format: 'esm',
		outdir: 'dist',
	});
}

export async function build(ctx = getCtx()) {
	ctx = await ctx;
	await recursiveCopy('client/public', 'dist');
	await ctx.rebuild();
}

export async function watch() {
	let ctx = await getCtxDev();

	let start = performance.now();
	await build(ctx);
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