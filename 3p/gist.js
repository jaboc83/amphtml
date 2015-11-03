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

import {loadScript} from '../src/3p';
import {setStyles} from '../src/style';

/**
 * @param {!Window} global
 * @param {!Object} data
 */
export function gist(global, data) {
  let gist = document.createElement('div');
  gist.id = 'gist';
  let width = data.initialWindowWidth;
  let height = data.initialWindowHeight;
  gist.style.width = '100%';
  let a = document.createElement('a');
  console.log(data.src);
  a.href=data.src;
  gist.appendChild(a);
  global.document.getElementById('c').appendChild(gist);

  // Dimensions are given by the parent frame.
  delete data.width;
  delete data.height;

  render();
};


function render() {
  var iframe = global.document.querySelector('#c iframe');
  var body = iframe.contentWindow.document.body;
  context.updateDimensions(
    body./*OK*/offsetWidth,
    body./*OK*/offsetHeight + /* margins */ 20);
}
