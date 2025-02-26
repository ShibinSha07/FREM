class Config:
    """Configuration settings for the Flask app."""
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:1234@localhost/FREM'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
