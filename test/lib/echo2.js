/*eslint no-process-exit:0*/
var text = process.argv[2];
if (!text) {
  process.exit(0);
}

process.stdout.write(text);
setTimeout(function() { process.stdout.write(text); }, 200);
