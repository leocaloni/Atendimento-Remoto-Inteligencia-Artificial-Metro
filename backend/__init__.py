from .funcionario import Funcionario
from .passageiro import Passageiro
from .routes import app
import db
from .db import get_funcionario_collection
from .db import get_passageiro_collection
from .db import get_passenger_photos
from deepface import DeepFace
import cv2
import threading
import base64
import numpy as np
from pymongo import MongoClient
import unidecode
import os
from flask import Flask, request, jsonify
from bcrypt import hashpw, gensalt, checkpw
from bson import ObjectId