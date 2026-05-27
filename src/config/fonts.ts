import { Poppins } from "next/font/google"

/** App-wide default — swap the import/loader and `--app-font` in globals.css to change. */
export const appFont = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
