import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Twój Myszyniec — lokalny portal o Myszyńcu";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1f5c39 0%, #2f7a4d 55%, #2f7fb5 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            opacity: 0.9,
          }}
        >
          <span>Lokalny portal społecznościowy · Kurpie</span>
        </div>
        <div style={{ display: "flex", fontSize: 110, fontWeight: 800, marginTop: 12 }}>
          Twój Myszyniec
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 16, opacity: 0.95 }}>
          Newsy · Pogoda · Wydarzenia · Ważne dla regionu
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 28, fontStyle: "italic", opacity: 0.85 }}>
          „Witôjcie u nôs!”
        </div>
      </div>
    ),
    { ...size },
  );
}
