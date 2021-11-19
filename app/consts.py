from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve()
REPOSITORY_DIR = os.path.abspath(os.path.join(BASE_DIR, '/repository'))
ROOT = os.path.abspath(os.path.join(BASE_DIR, '..'))
