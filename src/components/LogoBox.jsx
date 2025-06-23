'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Language from '@/assets/images/language.png';

const LogoBox = () => {
  const pathname = usePathname();

  // Extract the language slug from the current pathname
  const match = pathname?.match(/\/dashboards\/(english|french|portugais|espagnol)/i);
  const currentLang = match ? match[1].toLowerCase() : 'espagnol'; 

  const dashboardRoute = `/dashboards/${currentLang}`;

  return (
    <div className="logo-box">
      <Link href={dashboardRoute} className="logo-dark">
        <Image width={28} height={28} src={Language} className="logo-sm" alt="logo sm" />
        <Image width={28} height={30} src={Language} className="logo-lg" alt="logo dark" />
      </Link>
      <Link href={dashboardRoute} className="logo-light">
        <Image width={28} height={28} src={Language} className="logo-sm" alt="logo sm" />
        <Image width={28} height={30} src={Language} className="logo-lg" alt="logo light" />
      </Link>
    </div>
  );
};

export default LogoBox;
