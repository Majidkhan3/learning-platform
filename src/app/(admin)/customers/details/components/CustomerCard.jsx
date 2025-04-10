import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { ProgressBar } from 'react-bootstrap';
const CustomerCard = ({
  customer
}) => {
  const {
    Property,
    count,
    icon,
    progress,
    title,
    variant
  } = customer;
  return <div className="border p-2 rounded">
      <div className="d-flex gap-3 align-items-center">
        <div className={`avatar bg-${variant} bg-opacity-10 rounded flex-centered`}>
          <IconifyIcon icon={icon} width={28} height={28} className={`fs-28 text-${variant}`} />
        </div>
        <div>
          <p className="text-dark fw-semibold fs-16 mb-0">{title}</p>
          <p className="mb-0">
            {Property} Property {variant == 'warning' ? 'View' : variant == 'primary' ? 'Own' : 'Active'}
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <p className="mb-1 text-dark  fw-medium fa-15">View Property</p>
        <div>
          <p className="mb-0 text-dark fw-semibold fs-15">{count}</p>
        </div>
      </div>
      <ProgressBar style={{
      height: 10
    }} striped animated variant={variant} className="mt-2" role="progressbar" now={progress} />
    </div>;
};
export default CustomerCard;