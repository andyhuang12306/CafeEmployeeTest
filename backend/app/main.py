import sqlite3, os, os.path
from typing import Union
from fastapi import UploadFile, File
from functs import *
from models import Employee, Cafe
import numpy as np
from databasehelper import DatabaseHelper
from appinit import AppInit 
from daos.employeedao import EmployeeDao
from daos.cafedao import CafeDao
from daos.appdao import AppDao

app=AppInit().getInitializedApp()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "employee_cafe.db")

databasehelper= DatabaseHelper(db_path)
cur= databasehelper.cur
con= databasehelper.con

employeeDao= EmployeeDao(databasehelper, cur, con)
cafeDao= CafeDao(databasehelper, cur, con)
appDao= AppDao(databasehelper, cur, con)


@app.get("/employees/")
async def read_employee(id: Union[str, None] = None, cafeName: Union[str, None]=None):
    return await employeeDao.read_employee(id, cafeName)


@app.post("/employees/")
async def save_employee(eply: Employee):
    return await employeeDao.save_employee(eply)

@app.delete("/employees/")
async def delete_employee(id: Union[str, None] = None):
    return await employeeDao.delete_employee(id)

@app.get("/cafes/")
async def read_cafe(id: Union[str, None]=None):
    return await cafeDao.read_cafe(id)

@app.get("/charts/")
async def read_over_view_data_for_chart():
    return await appDao.read_chart_data()

@app.post("/cafes/")
async def save_cafe(cafe: Cafe):
    return await cafeDao.save_cafe(cafe)
    
@app.post('/upload/file')
async def upload_file(file:UploadFile = File(...)):
    return await cafeDao.upload_file(file)

@app.delete("/cafes/")
async def delete_cafe(name: Union[str, None] = None, location: Union[str, None]=None):
    return await cafeDao.delete_cafe(name, location)