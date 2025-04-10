'use client';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import ReactQuill from 'react-quill';

// styles
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
let valueBubble = '';
let valueSnow = '';
valueSnow = valueBubble = `<h3><span class="ql-size-large">Hello World!</span></h3>
    <p><br/></p>
    <h3>This is a simple editable area.</h3>
    <p><br/></p>
    <ul>
      <li>Select a text to reveal the toolbar.</li>
      <li>Edit rich document on-the-fly, so elastic!</li>
    </ul>
<p><br/></p>
<p>End of simple area</p>`;
const SnowEditor = () => {
  const modules = {
    toolbar: [[{
      font: []
    }, {
      size: []
    }], ['bold', 'italic', 'underline', 'strike'], [{
      color: []
    }, {
      background: []
    }], [{
      script: 'super'
    }, {
      script: 'sub'
    }], [{
      header: [false, 1, 2, 3, 4, 5, 6]
    }, 'blockquote', 'code-block'], [{
      list: 'ordered'
    }, {
      list: 'bullet'
    }, {
      indent: '-1'
    }, {
      indent: '+1'
    }], ['direction', {
      align: []
    }], ['link', 'image', 'video'], ['clean']]
  };
  return <ComponentContainerCard id="quill-snow-editor" title="Snow Editor" description={<>
          Use <code>snow-editor</code> id to set snow editor.
        </>}>
      <ReactQuill id="snow-editor" modules={modules} defaultValue={valueSnow} theme="snow" />
    </ComponentContainerCard>;
};
const BubbleEditor = () => {
  return <ComponentContainerCard id="quill-snow-editor" title="Bubble Editor" description={<>
          Use <code>Bubble Editor</code> id to set snow editor.
        </>}>
      <div id="snow-editor" style={{
      height: 300
    }}>
        <ReactQuill id="bubble-editor" defaultValue={valueBubble} theme="bubble" style={{
        height: 300
      }} />
      </div>
    </ComponentContainerCard>;
};
const AllEditors = () => {
  return <>
      <SnowEditor />
      <BubbleEditor />
    </>;
};
export default AllEditors;