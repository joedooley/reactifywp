'use strict';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Html from './components/Html.jsx';

print(ReactDOMServer.renderToString(React.createFactory(Html)()));
