import Link from "next/link";
import { NavBar } from "@/components/NavBar";

export default function DownloadPage() {
  return (
    <>
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Download Local Program</h1>
        <p className="text-gray-500 text-sm mb-8">
          The local program listens for available passes and automatically opens Google Chrome
          to pre-fill your booking form when a spot is found.
        </p>

        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-gray-700 mb-1">Requirements</h2>
            <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
              <li>Google Chrome must be installed</li>
              <li>Windows 10/11 or macOS</li>
              <li>Must be signed in to the same account as the web app</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-3">Download</h2>
            <div className="space-y-2">
              <a
                href="https://github.com/hike-pass-grabber/local/releases/latest/download/hike-grabber.exe"
                className="flex items-center justify-between bg-green-700 text-white px-4 py-3 rounded-lg hover:bg-green-800 text-sm"
              >
                <span>Windows (.exe)</span>
                <span className="opacity-75">↓</span>
              </a>
              <a
                href="https://github.com/hike-pass-grabber/local/releases/latest/download/hike-grabber.app"
                className="flex items-center justify-between bg-green-700 text-white px-4 py-3 rounded-lg hover:bg-green-800 text-sm"
              >
                <span>macOS (.app)</span>
                <span className="opacity-75">↓</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-1">How to use</h2>
            <ol className="text-sm text-gray-500 list-decimal list-inside space-y-1">
              <li>Download and run the program</li>
              <li>Sign in with your Hike Pass Grabber account</li>
              <li>Start a polling session on the web app</li>
              <li>When a pass is found, Chrome will open automatically with your details pre-filled</li>
              <li>Review and confirm the booking in the browser</li>
            </ol>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          Having issues?{" "}
          <Link href="/contact" className="hover:underline">Contact us</Link>
        </p>
      </div>
    </>
  );
}
