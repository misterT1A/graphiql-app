import 'whatwg-fetch';
import { TextEncoder } from 'util';

globalThis.fetch = global.fetch;
global.TextEncoder = TextEncoder;
