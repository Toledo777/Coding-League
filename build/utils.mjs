import * as esbuild from 'esbuild';
import { recursiveCopy, recursiveWatch } from './recursiveDirUtils.mjs';

const baseConfig = {
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

	// Make sure we can kill the process,
	// This fixes an issue on ubuntu
	process.on('SIGTERM', stopHandler);
	process.on('SIGINT', stopHandler);
	process.on('SIGHUP', stopHandler);

	function stopHandler() {
		console.log('Stopped forcefully');
		process.exit(0);
	}

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