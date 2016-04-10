import fs from 'fs';
import gulp from 'gulp';
import ts from 'gulp-typescript';
import td from 'gulp-typedoc';
import del from 'del';
import merge from 'merge2';
import runSeq from 'run-sequence';
import { version } from './package.json';
import { exec } from 'child_process';

gulp.task('ts:clean', () => del(['lib', 'src/ver.ts']));
gulp.task('docs:clean', () => del('docs?(.json)'));

gulp.task('ts:build', function() {
	// fs.writeFileSync('./src/ver.ts', hb.compile(
	// 	fs.readFileSync('./ver.ts.hbs', 'utf8')
	// )({ version }));
	fs.writeFileSync('./src/ver.ts', `export var version = "${version}";`);
	let tsResult = gulp.src('src/**/*.ts')
		.pipe(ts({
			target: 'es5',
			module: 'commonjs',
			emitDecoratorMetadata: true,
			experimentalDecorators: true,
			removeComments: true,
			declaration: true,
			noExternalResolve: true
		}));
	return merge([
		tsResult.dts.pipe(gulp.dest('lib')),
		tsResult.js.pipe(gulp.dest('lib'))
	]);
});

gulp.task('ts:typings', (cb) => {
	exec('typings bundle --out lib/typings --name core_ts',
		(err, stdout, stderr) => {
			if (err) return cb(err);
			cb();
		});
});

// gulp.task('docs:build', () => {
// 	return gulp.src()
// });

gulp.task('ts', (cb) => {
	runSeq('ts:clean', 'ts:build', cb);
});

gulp.task('ugh', () => {
	return del('src/**/*.+(d.ts|js?(.map))', { dryRun: false})
		.then((p) => console.log(p.join('\n')));
});