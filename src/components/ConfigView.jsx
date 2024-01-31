
import React, { useEffect } from "react";
import Prism from "prismjs";
import 'prismjs/components/prism-ini';
// import "../../node_modules/prismjs/themes/prism-tomorrow.css"
import '../prism-theme-addon.css'

function ConfigView({ code, language }) {
    useEffect(() => {
        Prism.highlightAll();
      }, []);

    return (
        <div className="configview">
            <pre>
                <code className={`language-${language}`}>{code}</code>
            </pre>
        </div>
    );
}

export default ConfigView;
