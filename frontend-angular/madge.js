const madge = require('madge');

madge("./projects/smart-support-inbox/src/app/app.component.ts", {
	fileExtensions: [ "js", "ts" ],
})
.then(res => {
	let circular = res.circular();
	console.log(`Found ${circular.length} circular references in the dependency graph`);
	
	if (circular.length > 0) {
		console.log(circular);
		process.exit(-1);
	} else {
		process.exit(0);
	}
});
