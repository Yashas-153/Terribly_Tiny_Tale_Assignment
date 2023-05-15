# Terribly Tiny Tale Assignment

## Components and functions:
1. **App component**: Initially the application consist of a Submit button.

2. **handleButtonClick**: Function that is executed when submit button is clicked that fetches the contents from the given link 
    using fetchAPI. It then parses through the content and finds the top 20 most occuring words after preprocessing it. 
    
3. **BarChart Component** : The component that renders the Histogram from the hashmap which was the output of the 2nd component.

4. **Export Button Component**: This is rendered at the same time when the histogram is rendered.
 
5. **handleExport** : Function that is executed when Export buton is clicked that downloads the CSV file after converting the hashmap
    into new CSV file.
    
## Packages required:

This is React.js application.
### 1. Rechart
  
  Install it using the following command 
  
  `$ npm install recharts `
## How to run:

Run it using the following command
  `$ npm run dev `
