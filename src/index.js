import Button from './Button';

window.customElements.define('app-button', Button);

const app = document.createElement('app-button');
document.getElementById('root').appendChild(app);
