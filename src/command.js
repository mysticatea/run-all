#!/usr/bin/env node
/*eslint no-process-exit:0*/
import {readFileSync} from "fs";
import {join as joinPath} from "path";
import {spawn} from "child_process";

if (require.main === module) {
  main(defineExec(spawn, process.platform), process.argv.slice(2));
}

function main(exec, commands) {
  switch (commands[0]) {
    case undefined:
    case "-h":
    case "--help":
      printHelp();
      process.exit(0);
      break;

    case "-v":
    case "--version":
      printVersion();
      process.exit(0);
      break;
  }

  commands.forEach(command => {
    const cp = exec(command);
    cp.stdout.pipe(process.stdout);
    cp.stderr.pipe(process.stderr);
    cp.on("exit", code => {
      if (code) {
        console.error(`Non-Zero Exit(${code}): ${command}`);
        process.exit(1);
      }
    });
    cp.on("error", err => {
      console.error(`Error(${err.message}): ${command}`);
      process.exit(1);
    });
  });
}

function defineExec(spawn, platform) {
  if (platform === "win32") {
    const FILE = process.env.comspec || "cmd.exe";
    const OPTIONS = {windowsVerbatimArguments: true};
    return function exec(command) {
      return spawn(FILE, ["/s", "/c", `"${command}"`], OPTIONS);
    };
  }
  else {
    return function exec(command) {
      return spawn("/bin/sh", ["-c", command]);
    };
  }
}

function printHelp() {
  console.log(`
Usage: run-all [OPTIONS] [COMMANDS...]

  If there are spaces in command text, enclose the command by double quotes.

  Options:
    -h, --help      Print this help text.
    -v, --version   Print the version number.

  See Also:
    https://github.com/mysticatea/run-all
`);
}

function printVersion() {
  const version = JSON.parse(
    readFileSync(
      joinPath(__dirname, "../package.json"),
      {encoding: "utf8"}
    )
  ).version;

  console.log("v" + version);
}
