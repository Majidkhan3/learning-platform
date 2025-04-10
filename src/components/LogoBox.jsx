import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
import logoSm from '@/assets/images/logo-sm.png';
import Image from 'next/image';
import Link from 'next/link';
import Language from "@/assets/images/language.png"
const LogoBox = () => {
  return <div className="logo-box">
      <Link href="/dashboards/espagnol" className="logo-dark">
        <Image width={28} height={28} src={Language} className="logo-sm" alt="logo sm" />
        <Image width={28} height={30} src={Language} className="logo-lg" alt="logo dark" />
      </Link>
      <Link href="/dashboards/espagnol" className="logo-light">
        <Image width={28} height={28} src={Language} className="logo-sm" alt="logo sm" />
        <Image width={28} height={30} src={Language} className="logo-lg" alt="logo light" />
      </Link>
    </div>;
};
export default LogoBox;