from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

class AppInit:
    def __init__(self):
        self.origins = ["http://localhost","http://localhost:3000"]
        

    def getInitializedApp(self):
        app = FastAPI()
        app.add_middleware(
            CORSMiddleware,
            allow_origins=self.origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        return app