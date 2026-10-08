#!/usr/bin/env node
/**
 * GIT_SSH transport wrapper — lets `git push/fetch` operate over SSH in
 * environments without an ssh binary. Implements the subset of the OpenSSH
 * CLI contract that git actually uses:
 *
 *   wrapper [-p port] [-i identity] [-o option]... [user@]host "command"
 *
 * The git pkt-line protocol is piped verbatim between git's stdio and the
 * ssh2 exec stream, so fetch/upload-pack and push/receive-pack both work.
 */
const os = require("os");
const fs = require("fs");
const path = require("path");
const { Client } = require(path.join(__dirname, "..", "node_modules", "ssh2"));

const argv = process.argv.slice(2);
let port = 22;
let identity = null;
let user = "git";
let host = null;
let cmd = [];

for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "-p") port = parseInt(argv[++i], 10);
  else if (a === "-P") port = parseInt(argv[++i], 10);
  else if (a === "-i") identity = argv[++i];
  else if (a === "-l") user = argv[++i];
  else if (a === "-o" || a === "-4" || a === "-6") {
    if (a === "-o") i++; // skip option value (StrictHostKeyChecking etc.)
  } else if (a === "-v" || a === "-q") {
    /* verbosity flags: ignore */
  } else if (host === null) {
    const m = a.match(/^(?:([^@]+)@)?(.+)$/);
    if (m) {
      if (m[1]) user = m[1];
      host = m[2];
    }
  } else {
    cmd.push(a);
  }
}

if (!host || cmd.length === 0) {
  process.stderr.write("git-ssh-wrapper: usage error\n");
  process.exit(255);
}

const keyCandidates = identity
  ? [identity]
  : [
      path.join(os.homedir(), ".ssh", "id_ed25519"),
      path.join(os.homedir(), ".ssh", "id_rsa"),
    ];

let privateKey = null;
for (const k of keyCandidates) {
  try {
    privateKey = fs.readFileSync(k, "utf8");
    break;
  } catch {
    /* try next */
  }
}

if (!privateKey) {
  process.stderr.write("git-ssh-wrapper: no private key found\n");
  process.exit(255);
}

const conn = new Client();

conn
  .on("ready", () => {
    conn.exec(cmd.join(" "), { pty: false }, (err, stream) => {
      if (err) {
        process.stderr.write(`git-ssh-wrapper: exec failed: ${err.message}\n`);
        process.exit(255);
      }
      // Binary pipes both ways — git speaks pkt-line over these.
      process.stdin.pipe(stream.stdin);
      stream.on("data", (chunk) => {
        if (!process.stdout.write(chunk)) {
          stream.stdout.pause?.();
          process.stdout.once("drain", () => stream.stdout.resume?.());
        }
      });
      process.stdin.on("end", () => stream.stdin.end?.());
      process.stdin.on("close", () => stream.stdin.end?.());
      let stderrBuf = "";
      stream.stderr.on("data", (c) => {
        stderrBuf += c.toString();
        if (stderrBuf.length < 8192) process.stderr.write(c);
      });
      stream.on("exit", (code) => {
        conn.end();
        process.exitCode = code ?? 0;
        conn.end();
        setTimeout(() => process.exit(code ?? 0), 50);
      });
      stream.on("close", () => {
        conn.end();
        setTimeout(() => process.exit(process.exitCode ?? 0), 10);
      });
      // window adjustments are handled by ssh2 automatically
    });
  })
  .on("error", (e) => {
    process.stderr.write(`git-ssh-wrapper: ${e.message}\n`);
    process.exit(255);
  })
  .connect({
    host,
    port,
    username: user,
    privateKey,
    readyTimeout: 30000,
    keepaliveInterval: 10000,
  });
