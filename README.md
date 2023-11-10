# Fetch_Rewards_Coding_Exercise

## Overview
This repository contains the solution for the Fetch Coding Exercise - SDET, where the task is to find a fake gold bar among 9 bars using a balance scale simulation provided on the [Fetch SDET Challenge website](http://sdetchallenge.fetch.com/).

## Getting Started

### Requirements
* Node.js
* Selenium WebDriver
* Chrome Browser (or other supported browser)

### Setup
* Install Node.js: [Node.js Download](https://nodejs.org/en)
* Install Selenium WebDriver: [Selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)
* Install Chrome Browser: [Chrome Download](https://www.google.com/chrome/)

### Running the Code
* Clone the repository:
```
git clone https://github.com/Rushikesh1234/Fetch_Rewards_Coding_Exercise.git
```
* Navigate to the project directory:
```
cd Fetch_Rewards_Coding_Exercise
```
* Run the code:
```
node index.js
```

### Code Structure
* **goldBarWeighingChallenge.js:** Main JavaScript file containing the solution.
* **selenium-webdriver:** Dependency for handling browser automation.

### Algorithm
The solution uses a divide and conquer algorithm to identify the fake gold bar with the minimum number of weighings. The process involves simulating the weighing steps on the provided website.

### Testing
* Automated tests have been implemented to verify the functionality of the code. The tests cover:
* Clicking on buttons ("Weigh", "Reset").
* Retrieving measurement results.
* Fill out the bowls grids with bar numbers (0 to 8).
* Getting a list of weighings.
* Clicking on the gold bar number at the bottom of the website and checking for the alert message.

## Screen Capture for Demonstrating Automation Scripts

https://github.com/Rushikesh1234/Fetch_Rewards_Coding_Exercise/assets/38386736/adde92ac-7904-4758-ad11-15c63f01cebd
