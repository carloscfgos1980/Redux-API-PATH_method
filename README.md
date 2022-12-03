## Setup app for React-Redux

## STEPS:

1.  In the terminal:
    npx create-react-app todo-app
    npm install redux react-redux
    npm install @reduxjs/toolkit
    npx json-server --watch data/db.json --port 8000 //Create a fake rest API. check note bellow. 
    npx http-server /Users/carlosinfante/Desktop/CodingProjects/Rest-API/Redux-API_PATH-app/data/db.json

    npm install --global http-server-upload /Users/carlosinfante/Desktop/CodingProjects/Rest-API/Redux-API_PATH-app/data/db.json
    npm install react-router-dom@6 //to create links
    npm install recharts //To implement charts
    npm install react-bootstrap bootstrap
    npm add framer-motion

N:Watch a fake rest API from a local folder. "data" is the name of the folder. "db.json" is the name of the file that contains the data in json format. --port 8000 is the HTTP of the local server.

2.  "Clean app". Delete all the files that are not needed.

3.  src: Create another folder named "redux"

4.  src/redux: Create a file "store.js"

5.  src/redux: Create a file "todoSlice.js"

6.  src/index.js:
    6.1 - Import store:
    import store from './redux/store';
    6.2 - Import provider
    import { Provider } from 'react-redux';
    6.3 - Wrap the Provider around the App so the whole app has access to the store:

        <Provider store={store}>
          <App />
        </Provider>

N: Aqui tuve un bug que me tuvo ocupado por una hora. No puedp copiar el index.js de otras app outdated!

7. Elements of the Store. Check src/redux/store.js

8. Create the CongifureSlice(TodoSlice). Several steps:
