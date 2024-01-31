
import React, { useEffect } from "react";
import Prism from "prismjs";
import 'prismjs/components/prism-ini';
import '../prism-theme-addon.css'

function ConfigView({ code, language }) {

    useEffect(() => {
        Prism.highlightAll();
      }, [code]);

    return (
        <div className="configview">
            <pre>
                <code className={`language-${language}`}>{code}</code>
            </pre>
        </div>
    );
}

export default ConfigView;
