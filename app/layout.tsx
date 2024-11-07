import localFont from "next/font/local";
import "./globals.css";

// Подключаем каждый вес и стиль
const mulishRegular = localFont({
  src: "./fonts/Mulish-Regular.ttf",
  variable: "--font-mulish-regular",
});

const mulishItalic = localFont({
  src: "./fonts/Mulish-Italic.ttf",
  variable: "--font-mulish-italic",
});

const mulishLight = localFont({
  src: "./fonts/Mulish-Light.ttf",
  variable: "--font-mulish-light",
});

const mulishLightItalic = localFont({
  src: "./fonts/Mulish-LightItalic.ttf",
  variable: "--font-mulish-light-italic",
});

const mulishBold = localFont({
  src: "./fonts/Mulish-Bold.ttf",
  variable: "--font-mulish-bold",
});

const mulishBoldItalic = localFont({
  src: "./fonts/Mulish-BoldItalic.ttf",
  variable: "--font-mulish-bold-italic",
});
const mulishSemiBold = localFont({
  src: "./fonts/Mulish-SemiBold.ttf",
  variable: "--font-mulish-semibold",
});
// Добавьте другие веса и стили аналогичным образом

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body
        className={`${mulishRegular.variable} ${mulishItalic.variable} ${mulishLight.variable} ${mulishLightItalic.variable} ${mulishBold.variable} ${mulishBoldItalic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
