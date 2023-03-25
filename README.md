# flow-free-clone

 Play in the browser over GitHub: https://samuel-risner.github.io/flow-free-clone/

# How does this repo work?

 ## General
  This project is designed to be a static webpage, but still uses JavaScript modules, meaning that it isn't enough to open the entrypoint ("index.html") in your browser but you need to run a [web server (Python Flask in this case)](#run-the-server) to fully view the page.
 
 ## Requirements
  To run the web server you need to install Python and install the modules under "requirements.txt", alternatively you can use a virtual environment, instructions for that are [here](#create-python-virtual-environment-windows).
  
  If you want to change [how the page works](#compile-typescript) or [how it looks](#compile-tailwind-css) you need to install the node packages under "package.json", instructions can be found [here](#install-nodejs-stuff).

# Install/Create Stuff

 ## Create Python Virtual Environment (Windows)
  Open your terminal in this directory, then:

  ```sh
   python -m venv venv
   venv\Scripts\activate
   python.exe -m pip install --upgrade pip
   pip install -r requirements.txt
   deactivate
  ```

 ## Install Node.js Stuff
  Open your terminal in this directory, then:

  ```sh
   npm install
  ```

# Compile Stuff

 ## Compile TypeScript 
  ```sh
   npm run build_ts
  ``` 

 ## Compile Tailwind CSS
  ```sh
   npm run build_tw
  ```

 ## Watch Tailwind CSS
 ```sh
  npm run watch_tw
 ```

 ## Watch TypeScript
 ```sh
  npm run watch_ts
 ```

# Run the server (Windows cmd)
 Don't forget to install the Python [requirements](#create-python-virtual-environment-windows).

 Open your terminal in this directory, then:

 ```sh 
  venv\Scripts\activate
  python main.py
 ```

 To stop the server press "CTRL+C", then:
  
  ```sh
   deactivate
  ```
