import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import DropzoneFormInput from './from/DropzoneFormInput';
const FileUpload = ({
  title
}) => {
  return <Card>
      <CardHeader>
        <CardTitle as={'h4'}>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <DropzoneFormInput className="py-5" iconProps={{
        icon: 'bx:cloud-upload',
        height: 48,
        width: 48,
        className: 'mb-4 text-primary'
      }} text="Drop your images here, or click to browse" helpText={<span className="text-muted fs-13 ">(1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed )</span>} showPreview />
      </CardBody>
    </Card>;
};
export default FileUpload;