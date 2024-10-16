import React, { useState } from 'react';

function AddNumbers() {
    const [input, setInput] = useState(null); // Initialize as null
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const add = (input) => {
        let cleanedInput = input;
    
        // Check for custom delimiters at the start
        const delimiterMatch = input.match(/^\/\/(.*?)\n(.*)$/);
        if (delimiterMatch) {
            // Custom delimiter logic
            const customDelimiter = delimiterMatch[1].trim();
            cleanedInput = delimiterMatch[2]; // Get the numbers part
        }
    
        // Clean the numbers part by removing leading and trailing quotes and trimming spaces
        const numbersString = cleanedInput.replace(/^"+|"+$/g, '').trim();
    
        // Check if the cleaned numbers string is empty
        if (numbersString === "") {
            setResult("0");
            return;
        }
    
        // Create a regex pattern for delimiters: comma and newline
        const delimiterRegex = /[,\\n]/; // This will match commas and new lines
    
        // Split the numbers using the regex pattern
        const negativeNumbers = [];
        const numbers = numbersString.split(delimiterRegex).map(num => {
            const trimmedNum = num.trim();
            const parsedNum = parseFloat(trimmedNum);
            if (parsedNum < 0) {
                negativeNumbers.push(trimmedNum);
            }
            return parsedNum;
        });
    
        // Check for negative numbers and throw an error if found
        if (negativeNumbers.length > 0) {
            throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(", ")}`);
        }
    
        // Calculate the sum
        const sum = numbers.reduce((acc, curr) => acc + curr, 0);
        setResult(sum); // Set the result to the calculated sum
    };
    
    // Example usage
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            add(input); // Call the add function with the input
        } catch (error) {
            alert(error.message); // Show error message for negative numbers
        }
    };
    

    return (
        <div>
            <h1>Add Numbers</h1>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={input || ''} // Render as an empty string if input is null
                    onChange={(e) => setInput(e.target.value)} // Update input state
                    rows="4" 
                    cols="50" 
                    placeholder="Enter numbers separated by commas....."
                />
                <br />
                <button type="submit">Calculate Sum</button>
            </form>
            {result !== null && <h2>Sum: {result}</h2>}
            {error && <h2 style={{ color: 'red' }}>{error}</h2>}
        </div>
    );
}

export default AddNumbers;
