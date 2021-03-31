import './style.css';

class Button extends HTMLElement {
  constructor() {
    super();
    const button = this.createButton();
    const shadow = this.createShadow();
    shadow.appendChild(button);
  }

  createShadow = () => {
    const shadow = this.attachShadow({ mode: 'closed' });
    return shadow;
  };

  createButton = () => {
    const button = document.createElement('button');
    button.setAttribute('class', 'oxygen-button');
    button.innerText = '测试';
    return button;
  };
}

export default Button;
