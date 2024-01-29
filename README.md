# React-Django Project

Welcome to our finances app developed by Jakub Spruch, Dariusz Krawczyk and Dawid Kałuża as project for on of our Computer Science classes. It is a simple app to track your finances and crypto transactions. We used React for frontent and Django for backend. 

## Getting Started

### Prerequisites

Make sure you have the following installed on your development machine:

- Node.js and npm
- Python and pipenv
- PostgreSQL (or any other preferred database)

### Installation

1. **Clone this repository:**

    ```bash
    git clone https://github.com/your-username/react-django-project.git
    ```

2. **Change to the project directory:**

    ```bash
    cd react-django-project
    ```

3. **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install
    ```

4. **Install backend dependencies:**

    ```bash
    cd ../backend
    pipenv install
    ```

5. **Create a PostgreSQL database and configure the backend settings in `backend/settings.py`.**

6. **Run database migrations:**

    ```bash
    pipenv run python manage.py migrate
    ```

7. **Start the development servers:**

    ```bash
    # In the 'backend' directory
    pipenv run python manage.py runserver

    # In the 'frontend' directory
    npm start
    ```

Now you should have the development servers running for both the frontend and backend.

## Project Structure

- **frontend**: Contains the React application code and assets.
- **backend**: Contains the Django application code, database models, and API configurations.

## Development Workflow

### Frontend (React)

- Write React components in the `src` directory.
- Use state and props for managing component data.
- Utilize React Router for navigation.
- Use Axios or Fetch for API calls.

### Backend (Django)

- Define models in the `models.py` file.
- Create serializers in the `serializers.py` file.
- Implement views in the `views.py` file.
- Configure URLs in the `urls.py` file.
- Use Django Rest Framework for building APIs.
- Write tests in the `tests` directory.
