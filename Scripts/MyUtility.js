
// ==================================================
// 注意事項: 使用本公用程式, 建議在您的 web page, 引用 jQuery (1.11.2)
// ==================================================

// ==================================================
// 註: 
// 1. 本函式以 <signature> 模擬 overload 的情境
// 2. 本函式提供的2種處理方式, 在同一個頁面裡, 不可混用, 只能擇一使用
// 3. 本函式的第1個方式, 因為係以純文字模式輸出, 外層必須加上 <pre> </pre> 的 tag,
//     才能輸出 \t, \r 這類的控制字元, 達到階層的效果
// 4. 本函式的第2個方式 (採用 ul tag), 無法呈現階層性, 且在頁面需有以下元素
//      <body>
//          <ul id="foo"></ul>
//      </body>
// ==================================================
function dispLog(msg, ul) {
    /// <signature>
    ///  <summary>顯示訊息, using document.writeln()</summary>
    ///  <param name="msg" type="String">要顯示的訊息</param>
    /// <returns type="void"></returns>
    /// </signature>
    /// <signature>
    ///  <summary>顯示訊息, using page "ul" element</summary>
    ///  <param name="msg" type="String">要顯示的訊息</param>
    ///  <param name="ul" type="Boolean">是否要與 id 為 foo 的 ul 標籤整合</param>
    /// <returns type="void"></returns>
    /// </signature>
    var d = new Date();
    if (ul === undefined) {
        document.writeln(d.toISOString().substr(14, 9) + " " + msg);
    }
    else {
        if (ul === false) {
            document.writeln(d.toISOString().substr(14, 9) + " " + msg);
        }
        else {
            //with pure Javascript
            var obj = window.document.getElementById("foo");
            var text = obj.innerHTML;
            text += "<li>" + d.toISOString().substr(14, 9) + " " + msg + "</li>";
            obj.innerHTML = text;
            ////with jQuery
            //$("<li />").text(d.toISOString().substr(14, 9) + " " + msg).appendTo("#foo");
        }
    }
}

function iterateObjectAllProperties(obj, level, onlyOwnedProperties) {
    /// <signature>
    ///  <summary>列舉物件的屬性 name, value 值對</summary>
    ///  <param name="obj" type="Object">被列舉的物件</param>
    ///  <param name="level" type="Number">第幾層 (物件的某個屬性可能也是物件, 要一併列舉)</param>
    /// <returns type="void"></returns>
    /// </signature>
    /// <signature>
    ///  <summary>列舉物件的屬性 name, value 值對</summary>
    ///  <param name="obj" type="Object">被列舉的物件</param>
    ///  <param name="level" type="Number">第幾層 (物件的某個屬性可能也是物件, 要一併列舉)</param>
    ///  <param name="onlyOwnedProperties" type="Boolean">只列舉單純屬於該物件的屬性</param>
    /// <returns type="void"></returns>
    /// </signature>
    function doOutput()
    {
        var msg = "";

        //前置放 tabs
        if (level !== 0) {
            for (var i = 0; i < level ; i++) {
                msg += "\t";
            }
        }
        if (obj[prop] === null) {
            msg += "obj[" + prop + "] = " + null;
            dispLog(msg);
        } else {
            try {
                msg += "obj[" + prop + "] = " + obj[prop].toString();
            } catch (e) {
                msg += "obj[" + prop + "] = " + e.message;
            }
            dispLog(msg);
        }
        //如果是子物件, 就遞迴 ...
        if (typeof (obj[prop]) == "object" && obj[prop] != null) {
            level++;
            iterateObjectAllProperties(obj[prop], level, onlyOwnedProperties);
            level--;
        }
    }

    var listAll = false;
    for (var prop in obj) {
        msg = "";
        if (onlyOwnedProperties === undefined) {
            listAll = true;
        } else {
            if (onlyOwnedProperties === false) {
                listAll = true;
            }
        }

        //如果全部列舉
        if (listAll == true) {
            doOutput();
        } else {
            //如果只列舉物件本身
            if (obj.hasOwnProperty(prop)) {
                doOutput();
            }
        }
    }
}


function iterateObjectProperties(obj, onlyOwnedProperties) {
    /// <signature>
    ///  <summary>列舉物件的屬性 name, value 值對</summary>
    ///  <param name="obj" type="Object">被列舉的物件</param>
    /// <returns type="void"></returns>
    /// </signature>
    /// <signature>
    ///  <summary>列舉物件的屬性 name, value 值對</summary>
    ///  <param name="obj" type="Object">被列舉的物件</param>
    ///  <param name="onlyOwnedProperties" type="Boolean">只列舉單純屬於該物件的屬性</param>
    /// <returns type="void"></returns>
    /// </signature>
    iterateObjectAllProperties(obj, 0, onlyOwnedProperties);
}

