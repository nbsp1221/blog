const PRETENDARD_VERSION = "1.3.9";
const PRETENDARD_BASE =
  "https://cdn.jsdelivr.net/npm/pretendard@" +
  PRETENDARD_VERSION +
  "/dist/public/static/alternative";

async function loadPretendardFont(weight: number): Promise<ArrayBuffer> {
  const fileName =
    weight >= 700 ? "Pretendard-Bold.ttf" : "Pretendard-Regular.ttf";
  const res = await fetch(`${PRETENDARD_BASE}/${fileName}`);

  if (!res.ok) {
    throw new Error("Failed to download Pretendard font. Status: " + res.status);
  }

  return res.arrayBuffer();
}

async function loadGoogleFonts(
  _text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "Pretendard",
      weight: 400,
      style: "normal",
    },
    {
      name: "Pretendard",
      weight: 700,
      style: "bold",
    },
  ];

  const fonts = await Promise.all(
    fontsConfig.map(async ({ name, weight, style }) => {
      const data = await loadPretendardFont(weight);
      return { name, data, weight, style };
    })
  );

  return fonts;
}

export default loadGoogleFonts;
