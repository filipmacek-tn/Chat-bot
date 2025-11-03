from flask import Flask
from flask_cors import CORS

def setup_security(app: Flask):
    CORS(
        app,
        supports_credentials=True,
        resources={
            r"/api/*": {
                "origins": ["http://localhost:3000", "http://127.0.0.1:3000"]
            }
        },
    )
    @app.after_request
    def add_headers(resp):
        resp.headers["X-Content-Type-Options"] = "nosniff"
        resp.headers["X-Frame-Options"] = "DENY"
        resp.headers["X-XSS-Protection"] = "1; mode=block"
        return resp
