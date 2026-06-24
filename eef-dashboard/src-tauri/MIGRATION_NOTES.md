# Electron -> Tauri v2 shell migration notes (spike phase)

This documents the mapping from the current Electron IPC surface
(`electron/preload.cjs` + `electron/main.cjs`) to the Tauri v2 equivalents.
No React code has been changed yet — `src/components/UpdateNotifier.tsx`
still calls `window.electronAPI.*` and will keep working under Electron
until it's ported.

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

This is noted as a TODO for the next phase — `src-tauri/Cargo.toml` lists
`tauri-plugin-updater` and `tauri-plugin-process` commented out since they
aren't wired into `src/main.rs` yet (spike just opens the window).

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
