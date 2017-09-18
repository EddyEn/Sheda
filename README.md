# ShedaTest
This is a single page application with a chat-bot agent from Motion.ai. The web has a xml file as data store and use XMLhttpHttpRequest to fetch data from a web server. Then xsl files is used to format the data.
******************************************
There is no need for a server-side application. The web application runs javascript on client side.
It calls XMLhttpRequest to retrieve data in HTML, XML and XSL files then renders HTML strings and 
adds to the index page. As the web calls the htttp request, it requires responses from a web sever.

The chat bot is located at the bottom right of the index page. It calls api from Motion.ai.
******************************************
Installation
- Copy all files and folders to a web directory of any web server.
- Call index.html page from the web address.
