const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const webDriverName = 'chrome';
const URL = 'http://sdetchallenge.fetch.com/';

/*
 * Main function for the gold bar weighing challenge.
 * @async
*/
async function goldBarWeighingChallenge() 
{
    let driver = await new Builder().forBrowser(webDriverName).build();
    await driver.get(URL);
    

    let resultArrays = Array.from({ length: 9 }, (_, index) => index);
    let weighingList = [];
    let listNumber = 1;
    let n = resultArrays.length - 1;
 
    while (resultArrays.length !== 1) {
        [resultArrays, weighingList] = await performWeighing(driver, resultArrays, n, weighingList, listNumber);
        n = resultArrays.length;
        listNumber++;
    }
 
    await selectFakeGoldBar(driver, resultArrays[0], weighingList);
}
 
/*
* Perform the gold bar weighing process and update the result array.
* @async
* @param {Object} driver - The WebDriver instance.
* @param {Array} resultArrays - The array of gold bar numbers.
* @param {Array} weighingList - The list to store weighing results.
*/
async function performWeighing(driver, resultArrays, n, weighingList, listNumber) 
{
    let cell = 0;
    try{
        for(let i=0; i<n; i++)
        {
            // For left bowl
            if(i < n/2)
            {
                await driver.findElement(By.id("left_"+cell)).sendKeys(resultArrays[i]);
                cell++;
            }
            // For Right bowl
            else
            {
                if(i == n/2)
                {
                    cell = 0;
                }
                await driver.findElement(By.id("right_"+cell)).sendKeys(resultArrays[i]);
                cell++;
            }
        }

        await driver.findElement(By.id("weigh")).click();

        let listElement = await driver.wait(
            until.elementLocated(By.css('.game-info ol li:nth-child(' + listNumber + ')')),
            15000
        );

        let listText = await listElement.getText();
        weighingList.push(listText);

        let newInputArray = checkArrayForFakeGoldBar(listText);

        await driver.findElement(By.css("div:nth-child(4) > #reset")).click();

        return [newInputArray, weighingList];
    }
    catch(err)
    {
        console.log(err);
    }
}

/*
* Select the fake gold bar from the gold bar list.
* @async
* @param {Object} driver - The WebDriver instance.
* @param {number} fakeGoldBarNumber - The number of the fake gold bar.
*/
async function selectFakeGoldBar(driver, fakeGoldBarNumber, weighingList) 
{
    // Select fake gold bard from gold bar list
    await driver.findElement(By.id("coin_" + fakeGoldBarNumber)).click();

    if (await driver.switchTo().alert().getText() === "Yay! You find it!") {
        console.log("Yay! You find it! We found a fake gold bar - " + fakeGoldBarNumber);
        console.log("Below is the list of weighings made: " + weighingList);
    } else {
        console.log("Oops! Try Again!");
    }    
}

/*
* Check the input string and determine which string (bowl) has a smaller weight than the other to identify a fake gold bar.
* @param {string} inputString - The string representing the weighing result.
* @returns {number[]} - The array representing the bars in the lighter bowl.
*/
function checkArrayForFakeGoldBar(inputString)
{
    let symbol;
    let arrays;

    if (inputString.includes('>')) 
    {
        symbol = '>';
        arrays = inputString.split('>');
    } 
    else if (inputString.includes('<')) 
    {
        symbol = '<';
        arrays = inputString.split('<');
    } 
    else if (inputString.includes('=')) 
    {
        symbol = '=';
        arrays = inputString.split('=');
    } 
    else 
    {
        console.error('Invalid input string format');
    }

    const array1 = JSON.parse(arrays[0].trim());
    const array2 = JSON.parse(arrays[1].trim());

    let resultArray;
    if (symbol === '>') 
    {
        resultArray = array2;
    } 
    else if (symbol === '<') 
    {
        resultArray = array1;
    } 
    else if (symbol === '=') 
    {
        resultArray = [8];
    }

    return resultArray;
}

goldBarWeighingChallenge();
