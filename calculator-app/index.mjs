import {LambdaClient} from '@aws-sdk/client-lambda';
const lambda = new LambdaClient();

export const handler = async (event) => {
    // Add debug logging
    console.log('Event:', JSON.stringify(event, null, 2));
    
    try {
      const body = JSON.parse(event.body);
      console.log('Parsed body:', body);
  
      // Improved input validation
      const num1 = Number(body.num1);
      const num2 = Number(body.num2);
  
      console.log('Parsed numbers:', { num1, num2 });
  
      if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Invalid input: Values must be valid numbers');
      }
  
      const sum = num1 + num2;
      
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          result: sum,
          input: {
            num1: num1,
            num2: num2
          }
        })
      };
      
    } catch(error) {
      console.error('Error:', error);
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          error: error.message,
          type: 'CalculationError'
        })
      };
    }
  }

const formatResponse = function(body) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    isBase64Encoded: false,
    body: body
  }
}

const formatError = function(error) {
  return {
    statusCode: error.statusCode,
    headers: {
      "Content-Type": "text/plain",
      "x-amzn-ErrorType": error.code
    },
    isBase64Encoded: false,
    body: error.code + ": " + error.message
  }
}