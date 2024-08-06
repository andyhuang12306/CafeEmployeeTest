from functs import *
import shutil

class CafeDao:

    def __init__(self, databasehelper, cur, con):
        self.databasehelper= databasehelper
        self.cur=cur
        self.con=con
    
    async def read_cafe(self, id):
        if id == None:
            statement =f"select cafes.name, cafes.description, cafes.logo_str as logoStr, cafes.logo_path as logoPath, cafes.employees, locations.name as location from cafes left join locations on cafes.location_id=locations.id"
        else:
            statement = f"select cafes.name, cafes.description, cafes.logo_str as logoStr, cafes.logo_path as logoPath, cafes.employees, locations.name as location from cafes left join locations on cafes.location_id=locations.id where cafes.id = '{id}'"
        self.cur.execute(statement)
        self.con.commit()
        return handleSqlResult(self.cur)
    
    async def save_cafe(self, cafe):
        res=cafe_info_validate(cafe)
        if res==True:
           await check_cafe(cafe, self.databasehelper.provideAConnection())
           return generSuccessResponse()
        else:
            return res
        
    async def upload_file(self, file):
        path = f"files/{file.filename}".replace(" ", "")
        with safe_open_w(path) as f:
            shutil.copyfileobj(file.file, f)
        return {
            "status":0,
            "message":"Success",
            "data":{
            "file":file.filename,
            "content":file.content_type,
            "path":path
            }
        }
    
    async def delete_cafe(self, name, location):
        statement = f"select name from cafes"
        self.cur.execute(statement)
        self.con.commit()
        list = [item[0] for item in self.cur.fetchall()]
        location_id=await find_location(location, self.con)
        if name == None or name not in list:
            return generateInvalidCafeIdResponse()
        else:
            statement = f"delete from cafes where name = '{name}' and location_id='{location_id}'"
            self.cur.execute(statement)
            self.con.commit()
            return generSuccessResponse()