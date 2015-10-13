'use strict';

module.exports = {
	client: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
                'public/lib/angular-material/angular-material.min.css'
			],
			js: [
				'public/lib/angular/angular.min.js',
                'public/lib/angular-aria/angular-aria.min.js',
				'public/lib/angular-resource/angular-resource.min.js',
                'public/lib/angular-sanitize/angular-sanitize.min.js',
				'public/lib/angular-animate/angular-animate.min.js',
                'public/lib/angular-material/angular-material.min.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/lib/angular-file-upload/angular-file-upload.min.js',

                'public/lib/snap.svg/dist/snap.svg-min.js',
                'public/lib/gsap/src/minified/plugins/SnapPlugin.js',
                'public/lib/gsap/src/minified/plugins/CSSPlugin.min.js',
                'public/lib/gsap/src/uncompressed/plugins/ColorPropsPlugin.min.js',
                'public/lib/gsap/src/minified/utils/Draggable.min.js',
                'public/lib/gsap/src/minified/TimelineLite.min.js',
                'public/lib/gsap/src/minified/TimelineMax.min.js',
                'public/lib/gsap/src/minified/TweenLite.min.js',
                'public/lib/gsap/src/minified/TweenMax.min.js',

                'public/lib/tinymce-dist/tinymce.min.js',
                'public/lib/angular-ui-tinymce/src/tinymce.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	}
};
