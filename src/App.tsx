/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {milkiiHtml} from 'virtual:milkii-app';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center">
      <div className="w-full max-w-[560px] flex-1">
        <iframe
          title="MILKII APP"
          srcDoc={milkiiHtml}
          className="w-full h-screen border-0 block bg-white"
          sandbox="allow-scripts allow-forms allow-same-origin"
        />
      </div>
    </div>
  );
}
