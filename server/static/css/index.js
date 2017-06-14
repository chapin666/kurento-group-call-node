import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  charset: 'UTF-8',
  // * (C) Copyright 2016 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
  'body': {
    'font': [{ 'unit': 'px', 'value': 13 }, { 'unit': 'string', 'value': '"Lucida' }, { 'unit': 'string', 'value': 'Grande",' }, { 'unit': 'string', 'value': 'Tahoma,' }, { 'unit': 'string', 'value': 'Verdana,' }, { 'unit': 'string', 'value': 'sans-serif' }],
    'color': '#404040',
    'background': '#0ca3d2'
  },
  'input[type=checkbox]': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#c0c0c0' }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'em', 'value': 0.1 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'fontSize': [{ 'unit': 'px', 'value': 16 }],
    'lineHeight': [{ 'unit': 'em', 'value': 1 }],
    'width': [{ 'unit': 'em', 'value': 1.25 }],
    'height': [{ 'unit': 'em', 'value': 1.25 }],
    'background': '#fff',
    'background': '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#ededed),
		to(#fbfbfb))',
    'WebkitAppearance': 'none',
    'WebkitBoxShadow': '1px 1px 1px #fff',
    'WebkitBorderRadius': '0.25em',
    'verticalAlign': 'text-top',
    'display': 'inline-block'
  },
  'input[type=radio]': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#c0c0c0' }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'em', 'value': 0.1 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'fontSize': [{ 'unit': 'px', 'value': 16 }],
    'lineHeight': [{ 'unit': 'em', 'value': 1 }],
    'width': [{ 'unit': 'em', 'value': 1.25 }],
    'height': [{ 'unit': 'em', 'value': 1.25 }],
    'background': '#fff',
    'background': '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#ededed),
		to(#fbfbfb))',
    'WebkitAppearance': 'none',
    'WebkitBoxShadow': '1px 1px 1px #fff',
    'WebkitBorderRadius': '0.25em',
    'verticalAlign': 'text-top',
    'display': 'inline-block'
  },
  'input[type=radio]': {
    'WebkitBorderRadius': '2em',
    // Make radios round
  },
  'input[type=checkbox]:checked::after': {
    'content': '"✔"',
    'display': 'block',
    'textAlign': 'center',
    'fontSize': [{ 'unit': 'px', 'value': 16 }],
    'height': [{ 'unit': 'px', 'value': 16 }],
    'lineHeight': [{ 'unit': 'px', 'value': 18 }]
  },
  'input[type=radio]:checked::after': {
    'content': '"●"',
    'display': 'block',
    'height': [{ 'unit': 'px', 'value': 16 }],
    'lineHeight': [{ 'unit': 'px', 'value': 15 }],
    'fontSize': [{ 'unit': 'px', 'value': 20 }],
    'textAlign': 'center'
  },
  'select': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#D0D0D0' }],
    'background': 'url(http://www.quilor.com/i/select.png) no-repeat right
		center, -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fbfbfb),
		to(#ededed))',
    'background': '-moz-linear-gradient(19% 75% 90deg, #ededed, #fbfbfb)',
    'WebkitBoxShadow': '0 1px 2px rgba(0, 0, 0, .05)',
    'MozBoxShadow': '0 1px 2px rgba(0, 0, 0, .05)',
    'WebkitBoxShadow': '0 1px 2px rgba(0, 0, 0, .05)',
    'color': '#444'
  },
  'container': {
    'margin': [{ 'unit': 'px', 'value': 50 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 50 }, { 'unit': 'string', 'value': 'auto' }],
    'width': [{ 'unit': 'px', 'value': 640 }]
  },
  'join': {
    'position': 'relative',
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'padding': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }],
    'width': [{ 'unit': 'px', 'value': 310 }],
    'background': 'white',
    'borderRadius': '3px',
    'WebkitBoxShadow': '0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px
		rgba(0, 0, 0, 0.3)',
    'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 200 }, { 'unit': 'string', 'value': 'rgba(255, 255, 255, 0.5)' }, { 'unit': 'string', 'value': 'rgba(255, 255, 255, 0.5),' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 2 }],
    // Transition
    'WebkitTransition': 'all 0.3s linear',
    'MozTransition': 'all 0.3s linear',
    'OTransition': 'all 0.3s linear',
    'transition': 'all 0.3s linear'
  },
  'join:before': {
    'content': '''',
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': -8 }],
    'right': [{ 'unit': 'px', 'value': -8 }],
    'bottom': [{ 'unit': 'px', 'value': -8 }],
    'left': [{ 'unit': 'px', 'value': -8 }],
    'zIndex': '-1',
    'background': 'rgba(0, 0, 0, 0.08)',
    'borderRadius': '4px'
  },
  'join h1': {
    'margin': [{ 'unit': 'px', 'value': -20 }, { 'unit': 'px', 'value': -20 }, { 'unit': 'px', 'value': 21 }, { 'unit': 'px', 'value': -20 }],
    'lineHeight': [{ 'unit': 'px', 'value': 40 }],
    'fontSize': [{ 'unit': 'px', 'value': 15 }],
    'fontWeight': 'bold',
    'color': '#555',
    'textAlign': 'center',
    'textShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'white' }, { 'unit': 'px', 'value': 1 }],
    'background': '#f3f3f3',
    'borderBottom': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#cfcfcf' }],
    'borderRadius': '3px 3px 0 0',
    'backgroundImage': '-webkit-linear-gradient(top, whiteffd, #eef2f5)',
    'backgroundImage': '-moz-linear-gradient(top, whiteffd, #eef2f5)',
    'backgroundImage': '-o-linear-gradient(top, whiteffd, #eef2f5)',
    'backgroundImage': 'linear-gradient(to bottom, whiteffd, #eef2f5)',
    'WebkitBoxShadow': '0 1px whitesmoke',
    'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'whitesmoke' }, { 'unit': 'px', 'value': 1 }]
  },
  'join p': {
    'margin': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'join p:first-child': {
    'marginTop': [{ 'unit': 'px', 'value': 0 }]
  },
  'join input[type=text]': {
    'width': [{ 'unit': 'px', 'value': 278 }]
  },
  'join input[type=password]': {
    'width': [{ 'unit': 'px', 'value': 278 }]
  },
  'join psubmit': {
    'textAlign': 'center'
  },
  ':-moz-placeholder': {
    'color': '#c9c9c9 !important',
    'fontSize': [{ 'unit': 'px', 'value': 13 }]
  },
  '::-webkit-input-placeholder': {
    'color': '#ccc',
    'fontSize': [{ 'unit': 'px', 'value': 13 }]
  },
  'input': {
    'fontFamily': ''Lucida Grande', Tahoma, Verdana, sans-serif',
    'fontSize': [{ 'unit': 'px', 'value': 14 }]
  },
  'input[type=text]': {
    'margin': [{ 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }],
    'width': [{ 'unit': 'px', 'value': 200 }],
    'height': [{ 'unit': 'px', 'value': 34 }],
    'color': '#404040',
    'background': 'white',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }],
    'borderColor': '#c4c4c4 #d1d1d1 #d4d4d4',
    'borderRadius': '2px',
    'outline': '5px solid #eff4f7',
    'MozOutlineRadius': '3px',
    'WebkitBoxShadow': 'inset 0 1px 3px rgba(0, 0, 0, 0.12)',
    'boxShadow': [{ 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'string', 'value': 'rgba(0, 0, 0, 0.12)' }]
  },
  'input[type=password]': {
    'margin': [{ 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }],
    'width': [{ 'unit': 'px', 'value': 200 }],
    'height': [{ 'unit': 'px', 'value': 34 }],
    'color': '#404040',
    'background': 'white',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }],
    'borderColor': '#c4c4c4 #d1d1d1 #d4d4d4',
    'borderRadius': '2px',
    'outline': '5px solid #eff4f7',
    'MozOutlineRadius': '3px',
    'WebkitBoxShadow': 'inset 0 1px 3px rgba(0, 0, 0, 0.12)',
    'boxShadow': [{ 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'string', 'value': 'rgba(0, 0, 0, 0.12)' }]
  },
  'input[type=text]:focus': {
    'borderColor': '#7dc9e2',
    'outlineColor': '#dceefc',
    'outlineOffset': '0'
  },
  'input[type=password]:focus': {
    'borderColor': '#7dc9e2',
    'outlineColor': '#dceefc',
    'outlineOffset': '0'
  },
  'input[type=button]': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 18 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 18 }],
    'height': [{ 'unit': 'px', 'value': 29 }],
    'fontSize': [{ 'unit': 'px', 'value': 12 }],
    'fontWeight': 'bold',
    'color': '#527881',
    'textShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': '#e3f1f1' }, { 'unit': 'px', 'value': 1 }],
    'background': '#cde5ef',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }],
    'borderColor': '#b4ccce #b3c0c8 #9eb9c2',
    'borderRadius': '16px',
    'outline': '0',
    'WebkitBoxSizing': 'content-box',
    'MozBoxSizing': 'content-box',
    'boxSizing': 'content-box',
    'backgroundImage': '-webkit-linear-gradient(top, #edf5f8, #cde5ef)',
    'backgroundImage': '-moz-linear-gradient(top, #edf5f8, #cde5ef)',
    'backgroundImage': '-o-linear-gradient(top, #edf5f8, #cde5ef)',
    'backgroundImage': 'linear-gradient(to bottom, #edf5f8, #cde5ef)',
    'WebkitBoxShadow': 'inset 0 1px white, 0 1px 2px rgba(0, 0, 0, 0.15)',
    'boxShadow': [{ 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'white,' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'string', 'value': 'rgba(0, 0, 0, 0.15)' }]
  },
  'input[type=submit]': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 18 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 18 }],
    'height': [{ 'unit': 'px', 'value': 29 }],
    'fontSize': [{ 'unit': 'px', 'value': 12 }],
    'fontWeight': 'bold',
    'color': '#527881',
    'textShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': '#e3f1f1' }, { 'unit': 'px', 'value': 1 }],
    'background': '#cde5ef',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }],
    'borderColor': '#b4ccce #b3c0c8 #9eb9c2',
    'borderRadius': '16px',
    'outline': '0',
    'WebkitBoxSizing': 'content-box',
    'MozBoxSizing': 'content-box',
    'boxSizing': 'content-box',
    'backgroundImage': '-webkit-linear-gradient(top, #edf5f8, #cde5ef)',
    'backgroundImage': '-moz-linear-gradient(top, #edf5f8, #cde5ef)',
    'backgroundImage': '-o-linear-gradient(top, #edf5f8, #cde5ef)',
    'backgroundImage': 'linear-gradient(to bottom, #edf5f8, #cde5ef)',
    'WebkitBoxShadow': 'inset 0 1px white, 0 1px 2px rgba(0, 0, 0, 0.15)',
    'boxShadow': [{ 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'white,' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'string', 'value': 'rgba(0, 0, 0, 0.15)' }]
  },
  'input[type=button]:active': {
    'background': '#cde5ef',
    'borderColor': '#9eb9c2 #b3c0c8 #b4ccce',
    'WebkitBoxShadow': 'inset 0 0 3px rgba(0, 0, 0, 0.2)',
    'boxShadow': [{ 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'string', 'value': 'rgba(0, 0, 0, 0.2)' }]
  },
  'input[type=submit]:active': {
    'background': '#cde5ef',
    'borderColor': '#9eb9c2 #b3c0c8 #b4ccce',
    'WebkitBoxShadow': 'inset 0 0 3px rgba(0, 0, 0, 0.2)',
    'boxShadow': [{ 'unit': 'string', 'value': 'inset' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'string', 'value': 'rgba(0, 0, 0, 0.2)' }]
  },
  'lt-ie9 input[type=text]': {
    'lineHeight': [{ 'unit': 'px', 'value': 34 }]
  },
  'lt-ie9 input[type=password]': {
    'lineHeight': [{ 'unit': 'px', 'value': 34 }]
  },
  '#room': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'textAlign': 'center'
  },
  '#button-leave': {
    'textAlign': 'center',
    'position': 'absolute',
    'bottom': [{ 'unit': 'px', 'value': 10 }]
  },
  'participant': {
    'borderRadius': '4px',
    // border: 2px groove;
    'marginLeft': [{ 'unit': 'px', 'value': 5 }],
    'marginRight': [{ 'unit': 'px', 'value': 5 }],
    'width': [{ 'unit': 'px', 'value': 150 }],
    'textAlign': 'center',
    'overflow': 'hide',
    'float': 'left',
    'padding': [{ 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 5 }],
    'borderRadius': '10px',
    'WebkitBoxShadow': '0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px
		rgba(0, 0, 0, 0.3)',
    'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 200 }, { 'unit': 'string', 'value': 'rgba(255, 255, 255, 0.5)' }, { 'unit': 'string', 'value': 'rgba(255, 255, 255, 0.5),' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 2 }],
    // Transition
    'WebkitTransition': 'all 0.3s linear',
    'MozTransition': 'all 0.3s linear',
    'OTransition': 'all 0.3s linear',
    'transition': 'all 0.3s linear'
  },
  'participant:before': {
    'content': '''',
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': -8 }],
    'right': [{ 'unit': 'px', 'value': -8 }],
    'bottom': [{ 'unit': 'px', 'value': -8 }],
    'left': [{ 'unit': 'px', 'value': -8 }],
    'zIndex': '-1',
    'background': 'rgba(0, 0, 0, 0.08)',
    'borderRadius': '4px'
  },
  'participant:hover': {
    'opacity': '1',
    'backgroundColor': '0A33B6',
    'WebkitTransition': 'all 0.5s linear',
    'transition': 'all 0.5s linear'
  },
  'participant video': {
    'width': [{ 'unit': '%H', 'value': 1 }, { 'unit': 'string', 'value': '!important' }],
    'height': [{ 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': '!important' }]
  },
  'participantmain video': {
    'width': [{ 'unit': '%H', 'value': 1 }, { 'unit': 'string', 'value': '!important' }],
    'height': [{ 'unit': 'string', 'value': 'auto' }, { 'unit': 'string', 'value': '!important' }]
  },
  'participant span': {
    'color': 'PapayaWhip'
  },
  'participantmain': {
    'width': [{ 'unit': '%H', 'value': 0.2 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }]
  },
  'participantmain video': {
    'height': [{ 'unit': 'string', 'value': 'auto' }]
  },
  'animate': {
    'WebkitAnimationDuration': '0.5s',
    'WebkitAnimationFillMode': 'both',
    'MozAnimationDuration': '0.5s',
    'MozAnimationFillMode': 'both',
    'OAnimationDuration': '0.5s',
    'OAnimationFillMode': 'both',
    'MsAnimationDuration': '0.5s',
    'MsAnimationFillMode': 'both',
    'animationDuration': '0.5s',
    'animationFillMode': 'both'
  },
  'removed': {
    'WebkitAnimation': 'disapear 1s',
    'WebkitAnimationFillMode': 'forwards',
    'animation': 'disapear 1s',
    'animationFillMode': 'forwards'
  },
  'ahovertext': {
    'position': 'relative',
    'width': [{ 'unit': 'px', 'value': 500 }],
    'textDecoration': 'none !important',
    'textAlign': 'center'
  },
  'ahovertext:after': {
    'content': 'attr(title)',
    'position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'em', 'value': 0.5 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'em', 'value': 0.5 }, { 'unit': 'px', 'value': 20 }],
    'width': [{ 'unit': 'px', 'value': 460 }],
    'background': 'rgba(0, 0, 0, 0.8)',
    'textDecoration': 'none !important',
    'color': '#fff',
    'opacity': '0',
    'WebkitTransition': '0.5s',
    'MozTransition': '0.5s',
    'OTransition': '0.5s',
    'MsTransition': '0.5s'
  },
  'ahovertext:hover:after': {
    'opacity': '1.0'
  },
  'ahovertext:focus:after': {
    'opacity': '1.0'
  }
});
