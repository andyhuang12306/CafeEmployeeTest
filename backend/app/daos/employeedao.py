from functs import *

class EmployeeDao:

    def __init__(self, databasehelper, cur, con):
        self.databasehelper= databasehelper
        self.cur=cur
        self.con=con
    
    async def  read_employee(self, id, cafeName):
        if id != None:
            statement = f"select id, name, email_address as email, phone_number as phoneNumber, gender, cafe, cast ((julianday(DATE('now'))-julianday(start_date)) as integer) as daysOfWork from employees where id = '{id}'"
        elif cafeName != None:
            statement = f"select id, name, email_address as email , phone_number as phoneNumber, gender, cafe, cast ((julianday(DATE('now'))-julianday(start_date)) as integer) as daysOfWork from employees where cafe = '{cafeName}'"
        else:
            statement = f"select id, name, email_address as email, phone_number as phoneNumber, gender, cafe, cast ((julianday(DATE('now'))-julianday(start_date)) as integer) as daysOfWork from employees"
        self.cur.execute(statement)
        print(statement)
        self.con.commit()
        return handleSqlResult(self.cur)
    
    async def save_employee(self, eply):
        res=employee_info_validate(eply)
        if res==True:
                await check_employee(eply, self.databasehelper.provideAConnection())    
                return generSuccessResponse()
        else:
            return res
        
    async def delete_employee(self, id):
        statement = f"select id from employees"
        self.cur.execute(statement)
        self.con.commit()
        list = [item[0] for item in self.cur.fetchall()]
        if id == None or id not in list:
            return generateInvalidEmployeeIdResponse()
        else:
            statement = f"delete from employees where id = '{id}'"
            statementCf=f"select cafe from employees where id='{id}'"
            self.cur.execute(statementCf)
            cf=self.cur.fetchone()[0]
            statementUpdateCafeEmployees=f"update cafes set employees = employees-1 where '{cf}'=name and employees>0"
            print(statementUpdateCafeEmployees)
            self.cur.execute(statement)
            self.cur.execute(statementUpdateCafeEmployees)
            self.con.commit()
            return generSuccessResponse()    