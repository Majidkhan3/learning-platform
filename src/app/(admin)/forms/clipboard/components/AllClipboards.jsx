'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import useClipboard from '@/hooks/useClipboard';
import { useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CopyFromElement = () => {
  const inputRef = useRef(null);
  const [inputText, setText] = useState('name@example.com');
  const [, copy] = useClipboard();
  const onCopy = text => {
    copy(text).then(copied => {
      if (copied) {
        toast.success('Copy To Clipboard', {
          position: 'top-right',
          autoClose: 2000
        });
      }
    });
  };
  return <ComponentContainerCard id="copy-from-element" title="Copy text from another element" description={<>The value you include on this attribute needs to match another&apos;s element selector.</>}>
      <Row>
        <Col lg={6}>
          <div className="input-group">
            <input ref={inputRef} id="clipboard_example" onChange={e => setText(e.target.value)} value={inputText} type="text" className="form-control" placeholder="name@example.com" />
            <Button variant="primary" className="btn-copy-clipboard" onClick={() => onCopy(inputRef.current?.value ?? '')}>
              Copy
            </Button>
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const CutFromElement = () => {
  const inputRef = useRef(null);
  const [inputText, setText] = useState();
  const [, copy] = useClipboard();
  const onCut = text => {
    copy(text).then(copied => {
      if (copied) {
        toast.success('Cut', {
          position: 'top-right',
          autoClose: 2000
        });
      }
    });
    setText('');
  };
  return <ComponentContainerCard id="cut-from-element" title="Cut text from another element" description={<>
          Additionally, you can define a <code>data-clipboard-action</code> attribute to specify if you want to either <code>copy</code> or{' '}
          <code>cut</code> content.
        </>}>
      <Row>
        <Col lg={6}>
          <div className="d-flex gap-2 align-items-start mb-3">
            <textarea ref={inputRef} onChange={e => setText(e.target.value)} id="clipboard_cut" className="form-control" cols={62} rows={6} value={inputText} defaultValue={'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga.'} />
            <Button variant="primary" onClick={() => onCut(inputRef.current?.value ?? '')}>
              Cut
            </Button>
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const CopyFromAttribute = () => {
  const elementRef = useRef(null);
  const [, copy] = useClipboard();
  const handleCopy = () => {
    const attributeValue = elementRef.current?.getAttribute('clipboard-text');
    if (attributeValue) {
      onCopy(attributeValue);
    }
  };
  const onCopy = text => {
    copy(text).then(copied => {
      if (copied) {
        toast.success('Copy To Clipboard', {
          position: 'top-right',
          autoClose: 2000
        });
      }
    });
  };
  return <ComponentContainerCard id="copy-from-attribute" title="Copy text from attribute" description={<>
          Truth is, you don&apos;t even need another element to copy its content from. You can just include a <code>data-clipboard-text</code>{' '}
          attribute in your trigger element.
        </>}>
      <Row>
        <Col lg={6}>
          <Button variant="primary" ref={elementRef} onClick={handleCopy} id="clipboard_text" clipboard-text="Just because you can doesn't mean dfdyou should — clipboard.js">
            Copy to clipboard
          </Button>
        </Col>
      </Row>
    </ComponentContainerCard>;
};
const AllClipboards = () => {
  return <>
      <CopyFromElement />
      <CutFromElement />
      <CopyFromAttribute />
    </>;
};
export default AllClipboards;