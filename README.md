# eLink

Home, Reimagined.

eLink is a premium e-paper photo display. This repository is the first software version: a studio for preparing photographs and previewing them on a simulated frame. It does not connect to physical hardware.

## Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run lint
npm run build
npm start
```

## What you can do

- Upload JPG, JPEG, PNG, and WebP photographs, up to 15 MB each.
- Preview, select, and delete them. Files stay in this browser (IndexedDB).
- Fit a photograph to the panel, fill the panel, or crop to the panel shape.
- Preview color, or a graphite tone that approximates monochrome e-paper.
- Send the prepared 800 × 480 frame to a simulated display.
- Name the demo device, pair it with a one-time code, and review refresh history.

Pairing codes, connection status, and “Send to display” are demo behavior. A result is never described as confirmed by a physical eLink. `hardwareConfirmed` stays `false`.

## How the code is split

| Area | Location | Today |
| --- | --- | --- |
| Studio UI | `src/components/studio` | Upload, gallery, crop, simulated frame |
| Photo storage | `src/lib/photos` | `MediaStore`, implemented with IndexedDB |
| Placement math | `src/lib/display` | Fit, fill, crop, and canvas rendering |
| Demo device | `src/lib/device` | Name, pairing, and history in localStorage |
| Delivery | `src/lib/hardware/gateway.ts` | Calls the simulated transport only |
| Simulated panel | `src/lib/hardware/simulated-transport.ts` | Updates the on-screen frame |
| Future controller | `src/lib/hardware/esp32-transport.ts` | Reports that no endpoint is configured |

A backend can replace `MediaStore` without rewriting the studio. A real controller should be added inside the ESP32 transport. The gateway is the only switch, and it must not report a hardware success unless the controller acknowledges the frame.

## Remaining hardware work

The target is an ESP32-S3 on the back of an e-paper panel.

1. Choose the panel and confirm resolution, bus, color depth, and refresh behavior. The simulator currently targets a 7.5 inch landscape panel at 800 × 480. Firmware can advertise a different geometry later.
2. Write firmware that joins Wi-Fi, downloads a payload, checks its hash, drives the panel, and posts an acknowledgement. Sleep between updates.
3. Add an authenticated backend for accounts, device pairing, photograph storage, and a refresh queue. Do not put device credentials in frontend code.
4. Move the final buffer server-side: resize to the panel, dither for that panel, pack the bytes, and hash them. The browser canvas is the preview, not the hardware format.
5. Pair by a one-time code shown on the physical panel. The code in this app is a local demo and is not authentication.
6. Show the device as online only after a heartbeat. Change the on-screen copy to say the photograph is on the eLink only after the acknowledgement route receives a success.

Suggested routes, not implemented:

- `POST /api/pairings`
- `GET /api/devices/:id`
- `PUT /api/devices/:id/frame`
- `POST /api/devices/:id/acks`

The in-app plan is on the Hardware page.
