/**
 * Generates an OpenSSH-format ED25519 keypair (no ssh-keygen binary needed).
 * Writes:
 *   ~/.ssh/id_ed25519      — private key (OpenSSH "openssh-key-v1" format, unencrypted)
 *   ~/.ssh/id_ed25519.pub  — public key ("ssh-ed25519 AAAA... comment")
 *   ~/.ssh/config          — strict host-key config for github.com
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
const rawPub = publicKey.export({ type: "spki", format: "der" }).subarray(-32); // last 32 bytes = raw point
const rawPriv = privateKey.export({ type: "pkcs8", format: "der" });
// pkcs8 DER: last 32 bytes contain the seed
const seed = rawPriv.subarray(rawPriv.length - 32);

/* ---------- SSH wire helpers ---------- */
function sshString(buf) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(buf.length);
  return Buffer.concat([len, buf]);
}
function u32(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32BE(n);
  return b;
}

/* ---------- Public key: "ssh-ed25519" + raw point ---------- */
const pubBlob = Buffer.concat([
  sshString(Buffer.from("ssh-ed25519")),
  sshString(rawPub),
]);
const pubLine = `ssh-ed25519 ${pubBlob.toString("base64")} elevatec-demo-sandbox`;

/* ---------- Private key: openssh-key-v1 container ---------- */
const check = crypto.randomBytes(4);

const parts = [
  check,
  check,
  sshString(Buffer.from("ssh-ed25519")),
  sshString(rawPub),
  sshString(Buffer.concat([seed, rawPub])), // 64 bytes: seed || public
  sshString(Buffer.from("elevatec-demo-sandbox")),
];
let inner = Buffer.concat(parts);
const pads = [];
let p = 1;
while ((inner.length + pads.length) % 8 !== 0) pads.push(p++);
inner = Buffer.concat([inner, Buffer.from(pads)]);

const privContainer = Buffer.concat([
  Buffer.from("openssh-key-v1\0"),
  sshString(Buffer.from("none")), // cipher
  sshString(Buffer.from("none")), // kdf
  sshString(Buffer.alloc(0)), // kdfoptions
  u32(1), // number of keys
  sshString(pubBlob),
  sshString(inner),
]);

const privPEM =
  "-----BEGIN OPENSSH PRIVATE KEY-----\n" +
  privContainer.toString("base64").replace(/(.{70})/g, "$1\n") +
  "\n-----END OPENSSH PRIVATE KEY-----\n";

/* ---------- Write files ---------- */
const sshDir = path.join(process.env.HOME, ".ssh");
fs.mkdirSync(sshDir, { recursive: true });
fs.writeFileSync(path.join(sshDir, "id_ed25519"), privPEM, { mode: 0o600 });
fs.writeFileSync(path.join(sshDir, "id_ed25519.pub"), pubLine + "\n", {
  mode: 0o644,
});
fs.writeFileSync(
  path.join(sshDir, "config"),
  "Host github.com\n  IdentityFile ~/.ssh/id_ed25519\n  IdentitiesOnly yes\n  StrictHostKeyChecking accept-new\n",
  { mode: 0o600 }
);
console.log("PUBLIC KEY:\n" + pubLine);
const hash = crypto
  .createHash("sha256")
  .update(pubBlob)
  .digest("base64")
  .replace(/=+$/, "");
console.log("Fingerprint SHA256:" + hash);
