/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Shows a GitHub gist.
 * Examples:
 * <code>
 *
 * <amp-gist height=200 width=400
 *   data-src="https://gist.github.com/cramforce/c5d8ae62be229291e421.js">
 * </amp-gist>
 *
 * </code>
 */

import {getIframe, listen, prefetchBootstrap} from '../../../src/3p-frame';
import {isLayoutSizeDefined} from '../../../src/layout';
import {loadPromise} from '../../../src/event-helper';

class AmpGist extends AMP.BaseElement {
  /** @override */
  createdCallback() {
    prefetchBootstrap(this.getWin());
  }

  /** @override */
  isLayoutSupported(layout) {
    return isLayoutSizeDefined(layout);
  }

  /** @override */
  layoutCallback() {
    const gistUrl = AMP.assert(this.element.getAttribute('data-src'),
      'The data-src attribute is required for <amp-gist> %s',
      this.element);

    var iframe = getIframe(this.element.ownerDocument.defaultView,
        this.element, 'gist');
    this.applyFillContent(iframe);
    this.element.appendChild(iframe);
    // Triggered by context.updateDimensions() inside the iframe.
    listen(iframe, 'embed-size', data => {
      iframe.height = data.height;
      iframe.width = data.width;
      let amp = iframe.parentElement;
      amp.setAttribute('height', data.height);
      amp.setAttribute('width', data.width);
      this.changeHeight(data.height);
    });

    return loadPromise(iframe);
  }
};

AMP.registerElement('amp-gist', AmpGist);
