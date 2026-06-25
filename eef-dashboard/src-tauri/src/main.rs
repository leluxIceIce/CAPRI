// Prevents an additional console window from popping up on Windows in release.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Spike-phase entry point: just open the window pointing at the bundled
// frontend (frontendDist in tauri.conf.json) / dev server (devUrl). No IPC
// parity yet — see Cargo.toml and tauri.conf.json TODOs for the
// tauri-plugin-updater wiring that replaces electron-updater + the
// updater:* IPC handlers from electron/main.cjs.
fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running EEF Dashboard");
}
