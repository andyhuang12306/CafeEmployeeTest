import sqlite3

class DatabaseHelper:
    def __init__(self, path):
        with sqlite3.connect(path) as con:
            self.path= path
            self.con= con
            self.cur = con.cursor()

    def provideAConnection(self):
        with sqlite3.connect(self.path) as con:
            return con