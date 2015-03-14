# run-all

CLI tool to execute multiple commands parallelly.


## Installation

```
npm install run-all
```


## Usage

```
Usage: run-all [OPTIONS] [COMMANDS...]

  If there are spaces in command text, enclose the command by double quotes.

  Options:
    -h, --help      Print this help text.
    -v, --version   Print the version number.
```


## Examples

```
run-all "babel src --out-dir lib --watch" "mocha test/*.js --watch --colors"
```
