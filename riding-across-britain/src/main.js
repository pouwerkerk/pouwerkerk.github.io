const React = require("react");
const ReactDOM = require("react-dom");
const Page = require("./components/page");
const styles = require("./static/styles.css");

(() => {
    const wrapper = document.createElement("div");
    document.body.appendChild(wrapper);
    if (wrapper)
        ReactDOM.render(<Page />, wrapper);
})();
