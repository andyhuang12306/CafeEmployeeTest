from sqlite3 import Cursor, Connection
from typing import Union
from models import Employee, Cafe
import re
import os, os.path
import uuid
import base64
import json
from utils import random_str
from datetime import date

async def check_employee(eply: Employee, con: Connection):
    statement=f"select * from employees where name='{eply.name}'"
    cur=con.cursor()
    cur.execute(statement)
    con.commit()
    isExist=len(cur.fetchall())>0
    if isExist:
        await update_employee(eply, con)
        if eply.cafeId is not None:
            await check_employment(eply, con)
        else:
            pass
    else:
        await save_employee(eply, con)

async def save_employee(eply: Employee, con: Connection):
    eply.id=random_str(7)
    eply.startDate= date.today()
    statement = f"insert into employees values('{eply.id}', '{eply.name}', '{eply.email}', '{eply.phoneNumber}', '{eply.gender}', '{eply.cafe}', '{eply.startDate}', '{eply.startDate}')"
    print("save employee statement: "+statement)
    statementAddCafeEmployee=f"update cafes set employees=employees+1 where name='{eply.cafe}'"
    con.cursor().execute(statement)
    con.cursor().execute(statementAddCafeEmployee)
    con.commit()

async def update_employee(eply: Employee, con: Connection):
    cur=con.cursor()
    currentCafeName=await find_cafe_name(eply, con)
    print('currentCafeName: '+currentCafeName)
    print('eply: '+json.dumps(eply.cafe))
    if(currentCafeName!=eply.cafe):
        statementDecreaseCafeEmployee=f"update cafes set employees=employees-1 where name='{currentCafeName}' and employees>0"
        print(statementDecreaseCafeEmployee)
        cur.execute(statementDecreaseCafeEmployee)
    statement=f"update employees set email_address='{eply.email}', phone_number='{eply.phoneNumber}', gender='{eply.gender}', cafe='{eply.cafe}' where name='{eply.name}'"
    cur.execute(statement)
    statementAddCafeEmployee=f"update cafes set employees=employees+1 where name='{eply.cafe}'"
    cur.execute(statementAddCafeEmployee)
    con.commit()

async def check_employment(eply: Employee, con: Connection):
    statement=f"select * from employment where employee_id='{eply.id}'"
    cur=con.cursor()
    cur.execute(statement)
    isExist=len(cur.fetchall())>0
    if(isExist):
        await update_employment(eply, con)
    else:
        await save_employment(eply, con)

async def update_employment(eply: Employee, con: Connection):
    statement=f"update employments set employee_id='{eply.id}', cafe_id='{eply.cafeId}', start_date='{eply.startDate}', end_date='{eply.endDate}' where employee_id='{eply.id}'"
    con.cursor().execute(statement)
    con.commit()

async def save_employment(eply: Employee, con: Connection):
    statement=f"insert into employments values('{uuid.uuid4()}', '{eply.id}', '{eply.cafeId}', '{eply.startDate}', '{eply.endDate}')'"
    con.cursor().execute(statement)
    con.commit()

async def check_cafe(cafe: Cafe, con: Connection):
    location_id=await find_location(cafe.location, con)
    names=await find_all_cafe_names(con)
    location_ids=await find_all_cafe_location_ids(con)
    print(json.dumps(cafe.name))
    print(json.dumps(names))
    print(json.dumps(cafe.name in names))
    print(json.dumps(location_id in location_ids))
    if cafe.id or ((cafe.name in names) and (location_id in location_ids)):
        await update_cafe(cafe, con)
    else:
        await save_cafe(cafe, con)

async def save_cafe(cafe: Cafe, con: Connection):
    cafe.id= str(uuid.uuid4())
    location_id=await find_location(cafe.location, con)
    statement = f"insert into cafes values('{cafe.id}', '{cafe.name}', '{cafe.description}', '{location_id}',{cafe.employees}, '{cafe.logoStr}','{cafe.logoPath}' )"
    con.cursor().execute(statement)
    con.commit()

async def update_cafe(cafe: Cafe, con: Connection):
    statement=f"update cafes set description='{cafe.description}', logo_str='{cafe.logoStr}', logo_path='{cafe.logoPath}' where name='{cafe.name}'"
    con.cursor().execute(statement)
    con.commit()

async def find_location(location: str, con: Connection):
    cur=con.cursor()
    statement=f"select id from locations where name='{location}'"
    cur.execute(statement)
    con.commit()
    return cur.fetchone()[0]

async def find_cafe_name(eply: Employee, con: Connection):
    cur=con.cursor()
    statement=f"select cafe from employees where name='{eply.name}'"
    cur.execute(statement)
    con.commit()
    return cur.fetchone()[0]

async def find_all_cafe_names(con):
    cur=con.cursor()
    statement = f"select name from cafes"
    cur.execute(statement)
    con.commit()
    names=cur.fetchall()
    if len(names)>0:
        return names[0]
    else:
        return []



async def find_all_cafe_location_ids(con):
    cur=con.cursor()
    statement = f"select location_id from cafes"
    cur.execute(statement)
    con.commit()
    location_ids= cur.fetchall()
    if len(location_ids)>0:
        return location_ids[0]
    else:
        return []


EMAIL_REGEX=re.compile(r"[^@]+@[^@]+\.[^@]+")
PHONE_REGEX=re.compile(r"[89]\d{7}$")
GENDER_GROUP=["Male", "Female"]
def employee_info_validate(epl: Employee):
    if len(epl.name) not in range(6,11):
        return {'status':40001, 'message':'Name should be minium 6 letters and maxmium 10 letters', 'data':None}
    elif not PHONE_REGEX.match(epl.phoneNumber):
        return {'status':40002, 'message':'Invalid phone number', 'data':None}
    elif epl.gender not in GENDER_GROUP:
        return {'status':40003, 'message':'Invalid gender', 'data':None}
    elif not EMAIL_REGEX.match(epl.email):
        return {'status':40004, 'message':'Invalid email', 'data':None}
    else:
        return True


LOCATION_GROUP=["North", "East", "South", "West"]
def cafe_info_validate(cafe: Cafe):
    if len(cafe.name) not in range(6,11):
        return {'status':40005, 'message':'Name should be minium 6 letters and maxmium 10 letters', 'data':None}
    elif len(cafe.description)>256:
        return {'status':40006, 'message':'Description only allow maxmium 256 letters', 'data':None}
    elif cafe.location not in LOCATION_GROUP:
        return {'status':40007, 'message':f'Location should be one of {LOCATION_GROUP}', 'data':None}
    else:
        return True
    
def curResultToDic(cur):
    return [dict(zip([key[0] for key in cur.description], row)) for row in cur.fetchall()]
    
def handleSqlResult(cur: Cursor):
    result= curResultToDic(cur)
    for r in result:
        if "logoPath" in r and r['logoPath']!=None:
            try:
                with open(r['logoPath'], "rb") as image_file:
                    r['logoStr']=base64.b64encode(image_file.read())
            except Exception:
                print("Cannot open the file!")
    return {'status':0, 'message': 'success', 'data': result}

def generSuccessResponse():
    return {'status':0, 'message': 'success', 'data': None}

def generateInvalidCafeIdResponse():
    return {'status':40008, 'message': 'Invalid cafe id', 'data': None}

def generateInvalidEmployeeIdResponse():
    return {'status':40009, 'message': 'Invalid employee id', 'data': None}


def safe_open_w(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    return open(path, 'w+b')