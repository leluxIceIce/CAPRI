# Electron -> Tauri v2 shell migration notes

This documents the mapping from the current Electron IPC surface
(`electron/preload.cjs` + `electron/main.cjs`) to the Tauri v2 equivalents.
No React code has been changed yet — `src/components/UpdateNotifier.tsx`
still calls `window.electronAPI.*` and will keep working under Electron
until it's ported.

## Status (post-spike scaffold, prep for Sprint 2/4 — not a final package)

The WebKit rendering spike (WebGL2 + MeshStandardMaterial terrain +
EffectComposer/UnrealBloomPass postprocessing under WebKitGTK, the closest
Linux proxy to macOS WKWebView) proved out: builds, launches, renders
correctly, zero console errors. This pass finalizes the scaffold on top of
that result.

### Done

- **Window shell**: `tauri.conf.json` `app.windows[0]` mirrors the Electron
  `BrowserWindow` config — `label: "main"`, 1440x900, minWidth 1024,
  minHeight 680, `titleBarStyle: "Overlay"` + `hiddenTitle: true` (the
  `hiddenInset` traffic-light look), and `backgroundColor: #EEF2F8` — the
  light canvas of the new Lucid Glass UI, so the load flash matches the app
  background instead of the old near-black `#030307`.
- **Capabilities**: `src-tauri/capabilities/default.json` grants the main
  window Tauri's `core:default` permission set. This file is required by
  Tauri v2 (the hand-built spike scaffold was missing it; the spike didn't
  trip on it only because the frontend makes no Tauri API calls yet). When
  the updater is wired, add `updater:default` + `process:default` here.
- **Identity**: `productName: "EEF Dashboard"`, `identifier: com.eef.dashboard`,
  `version: 0.2.0` — all three match `package.json` / the Electron
  `build.appId`/`productName` exactly, so update channels and OS-level app
  identity stay consistent across the migration.
- **Asset serving**: `frontendDist: ../dist` + Tauri's built-in asset
  protocol replaces Electron's hand-rolled `app://` scheme handler entirely
  (see "Asset serving" section below) — no code needed, just config.
- **Build target**: `bundle.targets` set to `["dmg", "app"]` and
  `bundle.category: "Productivity"` (mirrors electron-builder's
  `mac.category: public.app-category.productivity` + `mac.target: dmg`).
  `bundle.macOS.minimumSystemVersion: "11.0"` set. Verified `cargo build`
  (debug, plain rustc — does not invoke the bundler) still succeeds on this
  Linux container with `dmg` in the target list, so the dmg-only target does
  not block iteration here; the bundler itself only runs (and only cares
  about target validity) inside `cargo tauri build`, which is mac-only for
  the `dmg`/`app` targets regardless.
- **Updater/process deps declared**: `tauri-plugin-updater` and
  `tauri-plugin-process` added to `src-tauri/Cargo.toml`;
  `@tauri-apps/plugin-updater`, `@tauri-apps/plugin-process`, plus the
  baseline `@tauri-apps/api` and `@tauri-apps/cli` (none of the four existed
  in `package.json` before this pass) added to `package.json` and installed
  (`npm install` ran clean, `npm run build` still succeeds). `npm run
  tauri:dev` / `npm run tauri:build` scripts added alongside the existing
  `electron:preview` / `electron:build` ones.
- Verified `cargo build` succeeds with the new Rust plugin crates present
  (they compile; see "What's TODO" — they are not yet registered/used).

### What's TODO (next phase, not done in this pass)

- **Full updater wiring** — the IPC parity mapping is fully documented below
  (Electron `electronAPI.*` -> Tauri `check()`/`downloadAndInstall()`/
  `relaunch()`), but none of it is implemented yet:
  - `tauri_plugin_updater`/`tauri_plugin_process` are not registered in
    `src/lib.rs` / `src/main.rs` (no `.plugin(...)` calls yet).
  - `tauri.conf.json` has no `plugins.updater` block yet — it needs a real
    signing keypair first: `cargo tauri signer generate -w
    ~/.tauri/eef-dashboard.key` produces the pubkey that goes in
    `plugins.updater.pubkey`, plus an `endpoints` URL (the GitHub Releases
    `latest.json` convention, same release artifacts electron-builder's
    `publish.provider: github` already targets).
  - `src/components/UpdateNotifier.tsx` still imports nothing from
    `@tauri-apps/plugin-updater` — it needs to be ported off
    `window.electronAPI.*` to the `check()`/`downloadAndInstall()`/
    `relaunch()` shape sketched in "Suggested future `UpdateNotifier.tsx`
    shape" below.
  - CI/release pipeline needs to actually sign and upload a `latest.json` +
    signature per release (electron-updater's GitHub provider did this
    automatically; Tauri's updater needs `cargo tauri build` run with
    `TAURI_SIGNING_PRIVATE_KEY` set, or an explicit `tauri-action`-equivalent
    step, to produce the signed manifest).
- **App icon** — DONE. `src-tauri/icons/` is now generated from a real,
  on-brand EEF mark: `icon-source.svg` (hand-authored — a frosted light
  squircle with stacked cobalt spectral/terrain bands and a soft
  remote-sensing "sun", the app's literal visual signature) rendered to
  `icon-source.png` (1024x1024, via a Playwright/Chromium rasteriser because
  ImageMagick's SVG delegate mangled the gradients/clipPath) and run through
  `cargo tauri icon`. The full desktop set (`icon.icns` 240KB, `icon.ico`,
  the PNG sizes, Windows logos) is committed; the generated android/ios
  subdirs were removed (macOS desktop beta only). This replaces both the
  earlier placeholder AND the old Electron default — Electron-builder never
  had a real `mac.icon` configured.
- **Size verification** — the spike's 175MB binary is an unstripped *debug*
  build (`cargo build`, not `cargo tauri build --release`); the actual
  release/bundle size relevant to the Sprint 2 <100MB goal has not been
  measured yet and needs a release build (ideally on the real macOS target)
  to confirm.

### Building the real macOS dmg

This cannot be done in this Linux container — `dmg`/`.app` bundling and
code-signing require running on an actual macOS host (or a macOS CI runner,
e.g. GitHub Actions `macos-14`/`macos-latest`). From the project root, on a
macOS machine with Xcode command line tools, Rust, and the
`aarch64-apple-darwin` target installed (`rustup target add
aarch64-apple-darwin`):

```bash
npm install
npm run build && cargo tauri build --target aarch64-apple-darwin
```

(equivalently `npm run tauri:build`, which wraps the same `tauri build
--target aarch64-apple-darwin` invocation via the `@tauri-apps/cli` script
added in this pass). Output lands in
`src-tauri/target/aarch64-apple-darwin/release/bundle/dmg/`.

## Current Electron surface

`window.electronAPI` (exposed via `contextBridge` in `electron/preload.cjs`):

| Call                          | IPC channel           | Implementation (electron/main.cjs)                          |
|--------------------------------|------------------------|---------------------------------------------------------------|
| `electronAPI.getAppVersion()`  | `updater:get-version`  | `ipcMain.handle` returns `app.getVersion()`                   |
| `electronAPI.checkForUpdates()`| `updater:check`        | `ipcMain.handle` calls `autoUpdater.checkForUpdates()`         |
| `electronAPI.quitAndInstall()` | `updater:install`      | `ipcMain.handle` calls `autoUpdater.quitAndInstall()`          |
| `electronAPI.onUpdateStatus(cb)`| `updater:status` (push)| `mainWindow.webContents.send('updater:status', status)` events|

Used in `src/components/UpdateNotifier.tsx` to render a banner driven by a
state machine: `idle -> checking -> available -> downloading -> downloaded`
(or `not-available` / `error`).

## Tauri v2 equivalents

Tauri has no `preload.cjs`/`contextBridge` concept — the frontend calls
`@tauri-apps/api` directly (Rust commands are allow-listed via capabilities
instead of a hand-written bridge script).

| Electron call                  | Tauri v2 replacement                                                                 |
|----------------------------------|----------------------------------------------------------------------------------------|
| `electronAPI.getAppVersion()`    | `import { getVersion } from '@tauri-apps/api/app'; await getVersion();`                |
| `electronAPI.checkForUpdates()`  | `import { check } from '@tauri-apps/plugin-updater'; const update = await check();`    |
| `electronAPI.quitAndInstall()`   | `await update.downloadAndInstall(); await relaunch();` (relaunch from `@tauri-apps/plugin-process`) |
| `electronAPI.onUpdateStatus(cb)` | No direct push-event equivalent — `check()`/`downloadAndInstall()` resolve/reject and `downloadAndInstall(progressCallback)` accepts an `onEvent` callback with `Started/Progress/Finished` chunks instead of a custom `updater:status` channel. |

Key behavioral differences to account for when porting `UpdateNotifier.tsx`:

- electron-updater's flow is: background `checkForUpdates()` -> event
  `update-available` -> (main process) auto-calls `downloadUpdate()` because
  `autoDownload = false` is only disabling the *automatic* download on
  check, but main.cjs immediately re-triggers it manually -> `update-downloaded`
  -> user clicks "Restart" -> `quitAndInstall()`.
- `tauri-plugin-updater`'s `check()` returns an `Update` object (or `null`
  if none available) rather than firing a `not-available` event — the
  "not-available" UI state becomes simply "`check()` resolved to `null`".
- Download progress comes from the `onEvent` callback passed into
  `update.downloadAndInstall(onEvent)`, not a separate subscription, so the
  banner's `downloading` percent state would be computed from accumulated
  `Progress` chunks (`chunkLength` / `contentLength`) rather than a single
  `percent` field.
- There's no separate "downloaded, click to restart" step required by the
  plugin — `downloadAndInstall()` does both, and you call `relaunch()`
  yourself afterward, so the install step naturally becomes "download
  finished -> show Restart button -> call `relaunch()`" which maps closely
  to the existing UI.

### Suggested future `UpdateNotifier.tsx` shape (not implemented yet)

```ts
import { check, type Update } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

const update: Update | null = await check();
if (update) {
  let downloaded = 0;
  let contentLength = 0;
  await update.downloadAndInstall((event) => {
    switch (event.event) {
      case 'Started':
        contentLength = event.data.contentLength ?? 0;
        break;
      case 'Progress':
        downloaded += event.data.chunkLength;
        // update percent = downloaded / contentLength
        break;
      case 'Finished':
        // show "Restart" button -> onClick: relaunch()
        break;
    }
  });
}
```

This is noted as a TODO for the next phase — `src-tauri/Cargo.toml` declares
`tauri-plugin-updater` and `tauri-plugin-process` (and `package.json`
declares the matching `@tauri-apps/plugin-updater` / `@tauri-apps/plugin-process`
JS packages) as real dependencies as of the scaffold-finalization pass, but
neither is registered yet in `src/lib.rs` / `src/main.rs` via
`.plugin(tauri_plugin_updater::Builder::new().build())` /
`.plugin(tauri_plugin_process::init())`, and `tauri.conf.json` has no
`plugins.updater` config block yet (needs a real signing keypair from
`cargo tauri signer generate` first — see "What's TODO" below). `src/main.rs`
still just opens the window pointing at `frontendDist`/`devUrl`.

## Asset serving: app:// protocol vs Tauri's default

Electron's `main.cjs` has to manually register a privileged `app://` scheme
(`protocol.registerSchemesAsPrivileged`) and implement a handler
(`protocol.handle('app', ...)`) that reads files out of `dist/` and turns
them into `net.fetch` responses. This exists purely because loading the
built Vite bundle over `file://` breaks ES module imports due to CORS
restrictions in Chromium.

Tauri v2 does not need any of this: `frontendDist` in `tauri.conf.json`
already points at `../dist`, and Tauri's built-in asset protocol
(`tauri://localhost` on Windows/Linux, a custom `https://tauri.localhost`-style
origin on macOS via WKWebView) serves the bundled frontend directly with
the right headers and module/CORS semantics out of the box — no custom
protocol registration or fetch shim required.
