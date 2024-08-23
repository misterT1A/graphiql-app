'use client';

import type { ReactElement } from 'react';
import { useState } from 'react';

import CodeMirrorComp from '@/ui/Code-mirror/CodeMirrorComp';
import Form from '@/ui/Form/Form';
import ResponseView from '@/ui/Response-view/ResponseView';

const initData = {
  query: {},
};

const Test = (): ReactElement => {
  const [response, setResponse] = useState<object>(initData);
  return (
    <div>
      <CodeMirrorComp setResponse={setResponse} />
      <ResponseView response={response} />
      <Form />
    </div>
  );
};

export default Test;
