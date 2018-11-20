# Weather Assistant and Crop Prediction Bot By Team INFINITE LOOP 

Stack Used : Nodejs,Socket io <br>
User Interface : HTML,CSS<br>

We have hosted our project in https://weather-bot-godwin.herokuapp.com/

Input  : Voice Input using Voice Recognition <br>
Output : Speech using Speech Synthesis and Text Output <br>

Requirement : build in Microphone and Speaker on your system

We have implemented a weather assistant bot that accepts the voice input using microphone and tells weather report of the any input place all over the world through speech <br>

Currently we have implemented to the bot which finds the weather data and also predicts the crop and the next step will be the bot which has knowledge about everything and gives us the response as per and acts as the intelligent robot

# Working

  Initially onclicking on the button(Microphone icon) , the browser prompts you for enabling the microphone on your system , then the microphone starts listening to the voice input , Once the voice input(name of the city) is given , the voice input is converted into text using voice recognition and then posted to the api link along with my api key. Then the api request hits the server and returns back as a JSON response , I parsed the JSON response and formated it into a readable paragraph and send the result to the SpeechSynthesis which converts the Text into Speech , Finally the Output is given Speech , Now this weather data is analysed with the data set of the crops and the crops can be predicted  <br>
  
The Next Step of implementation will be the Intelligent Robot that knows about everything , initially we have started with Weather Assistant and Crop Prediction Bot

