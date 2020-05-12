let puppeteer =require("puppeteer");
let fs= require("fs");

let item = process.argv[2];

let links = process.argv[3];

(async function(){
    try{
        let data = await fs.promises.readFile(links);
        let {link1 ,link2} = JSON.parse(data);
        console.log("Work in progress...")
        let browser = await puppeteer.launch({
       headless:false,
            args: ["--start-maximized", "--disable-notifications"]
            
          });
         
          let tabs = await browser.pages();  // all opened tabs in array tab
          let tab1 = tabs[0];
        let tab2= await browser.newPage();

      // await Promise.all[tab1.goto(link1),tab2.goto(link2),{ waitUntil: "networkidle0" }]

       await tab1.goto(link1, { waitUntil: "networkidle0" });
       await tab2.goto(link2, { waitUntil: "networkidle0" });
        // await tab2.waitForSelector("LM6RPg");
        //      tab2.click("LM6RPg")
    //  await Promise.all [tab1.waitForNavigation({ waitUntil: "networkidle0" }),
    //     tab2.waitForNavigation({ waitUntil: "networkidle2" })]

      tab1.waitForNavigation();
        await tab1.type("#inputValEnter",item);
        await tab1.click(".sd-icon.sd-icon-search-under-catagory.lfloat")
        tab1.waitForNavigation({ waitUntil: "networkidle0" })

       // await tab2.type("input[type=text]",item);
     // let products=  await tab1.$$(".col-xs-6.favDp.product-tuple-listing.js-tuple ")
      
    //   let price = await tab1.evaluate(function(p){
    //        return p.getAttribute("display-price")
    //   },products[0])
    await tab1.waitForSelector(".lfloat.product-price")

    // let hey=await tab1.evaluate(function(s)
    // {
    //     let price= s.innerText;
    //     return price;
    // },".lfloat.product-price") 
    let e= await tab1.$(".lfloat.product-price");
    let hey= await tab1.evaluate(e => e.textContent,e);
    let convert= hey.substring(3);
    let final = parseInt(convert)

  // let convert= Number(hey)
    console.log("       > Rate at Snapdeal : "+final);
///////////////////////////////////////////////////////////////////////////////////////
 //console.log("****************************")
await tab2.waitForSelector(".desktop-searchBar")
await tab2.type(".desktop-searchBar",item);
await tab2.keyboard.press("Enter");

await tab2.waitForSelector(".product-discountedPrice");
let f=  await tab2.$(".product-discountedPrice")
let hey1= await tab2.evaluate(f=> f.textContent,f);
let convert1= hey1.substring(3);
let final1= parseInt(convert1)
console.log("       > Rate at Myntra : "+final1);

if(final>final1)
{
    console.log("You should buy it from Myntra :) ")
}
else if(final1>final)
{
    console.log("You should buy it from Snapdeal :)")
}
else
{
    console.log("Doesnt really matter.. Buy it from anywhere :)")
}


         console.log("Have a good day <3 ");
    }

    
    catch(err)
    {
        console.log(err);
    }

})();

