// Haein
var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess;
    xml2js = require('xml2js'); // thing that i did for additon 

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname,'views'))); // something that we provide to user
router.use(express.urlencoded({extended: true}));// thing that i did for additon
router.use(express.json()); // thing that i did for additon
// thing that i did for additon
// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}
//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.writeFile(filepath, xml, cb);
}


router.get('/',function(req, res){
    res.render('index');
})

router.get('/get/html', function(req, res) { // we change this from '/'

    res.writeHead(200, {'Content-Type': 'text/html'});

    var xml = fs.readFileSync('ApplebookStore.xml', 'utf8');
    var xsl = fs.readFileSync('ApplebookStore.xsl', 'utf8');
    console.log(xml); //colsole
    var doc = xmlParse(xml);
    var stylesheet = xmlParse(xsl);

    var result = xsltProcess(doc, stylesheet);

    res.end(result.toString());


});

// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  
  function appendJSON(obj) {
    console.log(obj);
    // Function to read in XML file, convert it to JSON, add a new object and write back to XML file
    xmlFileToJs('ApplebookStore.xml', function(err, result) {
      if (err) throw (err);
       result.bookList.entree.push({'isbn': obj.isbn, 'author': obj.author,'title': obj.title, 'publisher': obj.publisher, 'publishedyear' : obj.publishedyear,'genre': obj.sec_genre,'price': obj.price});
      console.log(result);
      jsToXmlFile('ApplebookStore.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  }

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);

  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});

server.listen(process.env.PORT || 3000, process.env.IP, function(){
var addr = server.address();
console.log("Server is listening at", addr.address + ":" + addr.port)
});