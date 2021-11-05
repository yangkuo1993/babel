import intl from 'intl2';
/**
 * App
 */


function App() {
    const title = "title";
    const desc = "desc";
    const desc3 = "title2";
    const desc2 = /*i18n-disable*/`desc`;
    return (
        <div className="ce" title={"测试"}>
            <h1>${title}</h1>
            <p>${desc}</p>
            <div>
                {
                    /*i18n-diable*/ '中文'
                }
            </div>
        </div>
    )
}