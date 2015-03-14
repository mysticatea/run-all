import assert from "power-assert";
import {execSync} from "child_process";

// test target
import "../lib/command";

// test
describe("run-all command:", () => {
  it("should execute commands parallelly.", () => {
    const result = execSync(
      `node lib/command.js "node test/lib/echo2.js a" "node test/lib/echo2.js b"`,
      {encoding: "utf8"}
    );

    assert(result === "abab" || result === "baba");
  });

  it("should be possible to use quotes in commands.", () => {
    const result = execSync(
      `node lib/command.js "node test/lib/echo2.js \\"a b\\"" "node test/lib/echo2.js c"`,
      {encoding: "utf8"}
    );

    assert(result === "a bca bc" || result === "ca bca b");
  });

  it("should exit when any of child exited with errors.", () => {
    assert.throws(() => {
      execSync(
        `node lib/command.js "node test/lib/echo2.js a" "node test/lib/echo2.js b" "node test/lib/error.js"`,
        {encoding: "utf8"}
      );
    });
  });
});
