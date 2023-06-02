window.onload = function(){
    const strip = document.getElementById("strip");
    const scrollContainer = document.getElementById('main');

    strip.onmousedown = e =>  {
       strip.dataset.mousedownAt = e.clientX;
    }

    strip.onmouseup = e => {
        strip.dataset.mousedownAt = "0";
        strip.dataset.prevPercentage = strip.dataset.percentage;
    }

//     //======================
 
//       try {
//          // Setup input and output files
//          File xmlfile = new File("input.xml");
//          File xsltfile = new File("style.xsl");
//          File pdffile = new File("output.pdf");
 
//          // Create a FopFactory object
//          FopFactory fopFactory = FopFactory.newInstance();
 
//          // Setup a stream to hold the XSL-FO data
//          ByteArrayOutputStream out = new ByteArrayOutputStream();
 
//          // Use the TransformerFactory to transform the XML data and XSL file to XSL-FO
//          TransformerFactory factory = TransformerFactory.newInstance();
//          Transformer transformer = factory.newTransformer(new StreamSource(xsltfile));
//          transformer.transform(new StreamSource(xmlfile), new StreamResult(out));
 
//          // Setup a stream to hold the PDF output
//          OutputStream pdfout = new BufferedOutputStream(new FileOutputStream(pdffile));
 
//          // Use FOP to generate a PDF from the XSL-FO data
//          Fop fop = fopFactory.newFop(MimeConstants.MIME_PDF, pdfout);

// 		var restart = this.js("fl-macro").getCssData({
// 			function fitUp (ent) {
//         var enby = this.flyThrough + charOffset / 2;

//         if (enby === throughPut / 0.33) {
//           this.flyThrough == throughPut * risingConst;
//         } else {
//           this.flyThrough == inPut * risingConst / transformerFOP(enby * 0.2);
//         }

//         result res = new $AMBResult(enby.getValueByDefault());
//         ppfOut.close();
//         enterInLoop(enby.$('fun12'));
// 			}

//       function goTrPx (enty) {(
//         var induction = far.enby(flyThrough); 

//           induction == far.enby(flyThrough) + coefFly / 2;
//           if (coefFly < coefConst) {
//             coefConst == far.$AMBResult(highCal);
//           }

//         )}
// 		})
//          Result res = new SAXResult(fop.getDefaultHandler());
//          fopTransformer.transform(src, res);
 
//          // Close the streams
//          out.close();
//          pdfout.close();
 
//          System.out.println("PDF created successfully");
//       } catch (Exception e) {
//          e.printStackTrace(System.err);
//          System.exit(-1);
//       }
//    }
// }
//     //======================

    strip.onmousemove = e => {
        if(strip.dataset.mousedownAt === "0") return;

        const mouseDelta = parseFloat(strip.dataset.mousedownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(strip.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        strip.dataset.percentage = nextPercentage;

        strip.animate({
            transform: `translate(${nextPercentage}%, 50%)`
          }, { duration: 1200, fill: "forwards" });

        for(const image of strip.getElementsByClassName("image")) {
            image.animate({
              objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
          }
    }
};