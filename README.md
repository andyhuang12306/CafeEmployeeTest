## Café Employee Management System Demo

This is a demo system for managing café and employee. It includes backend(a SQLite database file inside) and frontend. Backend is building on python FastApi. Frontend is building on React with React-Router for navigation, React-Redux for state management, Antd for UI components and is bootstrapped with Vite.


## HardCoded Logic:

1. Locations are both hardcoded on backend database and frontend dropdown selection.

2. Database path is hardcoded in backend pointing to a local SQLite db file inside "backend/app/employee_cafe.db".

3. API includes get/post/delete only, shared post apis for saving and editing.


## Protential Issues Happy To Hear Feedback

1. Database table employement logic has not been finished. But fully finished with cafes locations employees table and related logic.

2. All the code are written base on docuements and my past experience. Code might not be so standardlized since not much experience on full stack project as a mobile developer mostly. But excited to have this project for practice and insterested to learn deeper.


## How to run

1. install docker and running it and make sure your port 8000 and 3000 available

2. cd "/CafeEmpolyeeTest"

3. CMD "docker compose up"

4. open browser with URL "http://localhost:3000"
