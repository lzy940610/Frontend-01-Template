var page = require('webpage').create();
// page.open('http:://localhost:8080/', function (status) {
// page.open('http://www.google.com', function (status) {
page.open('http:://localhost:8080/', function (status) {
    console.log('status :', status)
    if (status === 'success') {
        console.log('rending')
        // page.render('./baidu.png');
        var body = page.evaluate(function () {
            var toString = function(pad, element) {
                let children = element.childNotes
                var childrenString = ''
                for (let i = 0; i < children.length; i++) {
                    childrenString += toString('    ' + pad, children[i] + '\n') 
                }
                var name
                if (element.nodeType === Node.TEXT_NODE) {
                    name = "#text" + JSON.stringify(element.textContent)
                }
                if (element.nodeType === Node.ELEMENT_NODE) {
                    name = element.tagName
                }
                return pad + name + (children ? '\n' : childrenString)
            }
            
            return toString("", document.body) ;
        });
        console.log(body);
    }

    phantom.exit();
});