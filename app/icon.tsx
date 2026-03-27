import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#1C1C1C",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#7B9E87",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.5px",
          }}
        >
          PM
        </span>
      </div>
    ),
    { ...size }
  );
}
