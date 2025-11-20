import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-[#6fa4c3] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        
        {/* Logo + Title */}
        <div className="flex items-center space-x-3">
          <Image
            src="/images/logo/logo-pemprov-sulut.png"  // ganti sesuai lokasi logo
            width={45}
            height={45}
            alt="Logo"
          />

          <div className="leading-tight text-white">
            <p className="font-semibold text-sm">Dinas Kehutanan Daerah</p>
            <p className="text-xs">Provinsi Sulawesi Utara</p>
          </div>
        </div>

        {/* Navbar Menu */}
        <nav>
          <ul className="flex items-center space-x-6 text-white text-sm font-medium">
            <li className="hover:underline cursor-pointer">BERANDA</li>
            <li className="hover:underline cursor-pointer">VISI DAN MISI</li>
            <li className="hover:underline cursor-pointer">STRUKTUR ORGANISASI</li>
            <li className="hover:underline cursor-pointer">MEDIA CENTER</li>
            <li className="hover:underline cursor-pointer">KONTAK</li>
          </ul>
        </nav>

      </div>
    </header>
  );
}