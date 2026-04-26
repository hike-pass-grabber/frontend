import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white text-gray-400 text-xs">
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/download" className="hover:text-gray-600">Download Local Program</Link>
          <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-600">Terms of Use</Link>
          <Link href="/contact" className="hover:text-gray-600">Contact</Link>
        </div>
        <p className="text-gray-300">
          Not affiliated with or endorsed by BC Parks or the Government of British Columbia.
        </p>
        <div className="flex justify-between">
          <span>© {new Date().getFullYear()} Hike Pass Grabber</span>
          <span>v1.0</span>
        </div>
      </div>
    </footer>
  );
}
