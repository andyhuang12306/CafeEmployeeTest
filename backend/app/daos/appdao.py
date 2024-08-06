from functs import *
import numpy as np

class AppDao:

    def __init__(self, databasehelper, cur, con):
        self.databasehelper= databasehelper
        self.cur=cur
        self.con=con
    
    async def read_chart_data(self):
        over_view_data=np.array([
        ["Location", "Cafés", "Employees"],
        ["East", 0, 0],
        ["North", 0, 0],
        ["South", 0, 0],
        ["West", 0, 0]])
        cafe_statement=f"select l.name, COUNT(*) as numbers from cafes as c left join locations as l on c.location_id=l.id group by 1"
        self.cur.execute(cafe_statement)
        result=np.array(self.cur.fetchall())
        print("charts......:", result)
        employee_statement=f"select c.location, COUNT(*) from employees as e left join (select l.name as location, cf.name as cafe_name from locations as l left join cafes as cf on cf.location_id=l.id) as c on e.cafe=c.cafe_name group by 1"
        self.cur.execute(employee_statement)
        resultE= np.array(self.cur.fetchall())
        print("charts......:", resultE)
        over_view_data[1,1]=result[0,1]
        over_view_data[2,1]=result[1,1]
        over_view_data[3,1]=result[2,1]
        over_view_data[4,1]=result[3,1]
        over_view_data[1,2]=resultE[0,1]
        over_view_data[2,2]=resultE[1,1]
        over_view_data[3,2]=resultE[2,1]
        over_view_data[4,2]=resultE[3,1]
    
        return {'status':0, 'message': 'success', 'data': {
            'bar':over_view_data.tolist()
        }}